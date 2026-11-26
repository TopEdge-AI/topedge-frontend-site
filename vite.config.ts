import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

/** Serve static legal HTML at /privacy and /terms (mirrors Netlify force rewrites). */
function legalStaticHtml(): Plugin {
  const sendLegal = (
    req: { url?: string },
    res: { setHeader: (k: string, v: string) => void; end: (b: string | Buffer) => void },
    next: () => void,
  ) => {
    const url = req.url?.split('?')[0] ?? '';
    const map: Record<string, string> = {
      '/privacy': 'privacy.html',
      '/privacy/': 'privacy.html',
      '/terms': 'terms.html',
      '/terms/': 'terms.html',
    };
    const fileName = map[url];
    if (!fileName) return next();
    const file = path.resolve(__dirname, 'public', fileName);
    if (!fs.existsSync(file)) return next();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(fs.readFileSync(file));
  };

  return {
    name: 'legal-static-html',
    configureServer(server) {
      server.middlewares.use(sendLegal);
    },
    configurePreviewServer(server) {
      server.middlewares.use(sendLegal);
    },
  };
}

/**
 * `virtual:docs-shots` = public/docs/img/shots.json, or `{}` when it does not
 * exist yet. The docs renderer needs each screenshot's width and height in the
 * prerendered HTML, and Vite will not import a file from public/ directly.
 */
function docsShots(): Plugin {
  const id = 'virtual:docs-shots';
  const resolved = `\0${id}`;
  const file = path.resolve(__dirname, 'public', 'docs', 'img', 'shots.json');
  return {
    name: 'docs-shots',
    resolveId(source) {
      return source === id ? resolved : null;
    },
    load(source) {
      if (source !== resolved) return null;
      this.addWatchFile(file);
      let json = '{}';
      try {
        if (fs.existsSync(file)) json = JSON.stringify(JSON.parse(fs.readFileSync(file, 'utf8')));
      } catch (err) {
        this.warn(`public/docs/img/shots.json is not valid JSON; rendering no screenshots (${err})`);
      }
      return `export default ${json};`;
    },
    configureServer(server) {
      server.watcher.add(file);
      const reload = (changed: string) => {
        if (path.resolve(changed) !== file) return;
        const mod = server.moduleGraph.getModuleById(resolved);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', reload);
      server.watcher.on('change', reload);
    },
  };
}

// https://vitejs.dev/config/
/**
 * `virtual:blog-index` and `virtual:blog-body/<slug>` (finding H7, 24 Nov 2026 audit).
 *
 * src/data/blogPosts.ts (with blogPostsQ4.ts and blogPostsRoundups.ts) holds every
 * post's full HTML, about 1 MB of source. Imported directly, the whole of it shipped
 * in one chunk to every blog page, so a reader of one post downloaded all of them.
 * The data files stay the one source of truth; this plugin evaluates them at build
 * time and serves two kinds of module:
 *
 *   - `virtual:blog-index`: every post's card fields (title, description, dates,
 *     image, category, keywords) and a map of slug -> () => import(body). The blog
 *     index, archives and related-posts use only this.
 *   - `virtual:blog-body/<slug>`: one post's content, FAQs, summary, item list,
 *     inline images and FAQ heading. Rollup emits one small chunk per post.
 *
 * Nothing about the rendered HTML changes: BlogPost suspends until its body chunk
 * is in, and the prerender waits for the <h1>, which only renders after that.
 */
function blogSplit(): Plugin {
  const INDEX_ID = 'virtual:blog-index';
  const BODY_PREFIX = 'virtual:blog-body/';
  const dataFiles = ['blogPosts.ts', 'blogPostsQ4.ts', 'blogPostsRoundups.ts', 'faqHtml.ts'].map((f) =>
    path.resolve(__dirname, 'src', 'data', f),
  );
  const BODY_KEYS = ['content', 'faqs', 'summary', 'itemList', 'inlineImages', 'faqHeading'];
  let cache: Promise<Record<string, unknown>[]> | null = null;

  const loadPosts = () => {
    cache ??= (async () => {
      const { build } = await import('esbuild');
      const os = await import('node:os');
      const { pathToFileURL } = await import('node:url');
      const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-blog-split-'));
      const outfile = path.join(outDir, 'blogPosts.mjs');
      try {
        await build({
          entryPoints: [dataFiles[0]],
          bundle: true,
          format: 'esm',
          platform: 'node',
          outfile,
          logLevel: 'error',
        });
        const mod = await import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
        return mod.blogPosts as Record<string, unknown>[];
      } finally {
        fs.rmSync(outDir, { recursive: true, force: true });
      }
    })();
    return cache;
  };

  return {
    name: 'blog-split',
    resolveId(source) {
      if (source === INDEX_ID || source.startsWith(BODY_PREFIX)) return `\0${source}`;
      return null;
    },
    async load(id) {
      if (!id.startsWith('\0virtual:blog-')) return null;
      for (const f of dataFiles) this.addWatchFile(f);
      const posts = await loadPosts();
      if (id === `\0${INDEX_ID}`) {
        const index = posts.map((p) => Object.fromEntries(Object.entries(p).filter(([k]) => !BODY_KEYS.includes(k))));
        const loaders = posts
          .map((p) => `${JSON.stringify(p.slug)}: () => import(${JSON.stringify(BODY_PREFIX + String(p.slug))})`)
          .join(',\n  ');
        return `export const blogIndex = ${JSON.stringify(index)};\nexport const blogBodies = {\n  ${loaders}\n};\n`;
      }
      const slug = id.slice(`\0${BODY_PREFIX}`.length);
      const post = posts.find((p) => p.slug === slug);
      if (!post) this.error(`blog-split: no post with slug "${slug}"`);
      const body = Object.fromEntries(BODY_KEYS.filter((k) => k in post!).map((k) => [k, post![k]]));
      return `export default ${JSON.stringify(body)};\n`;
    },
    configureServer(server) {
      const reload = (changed: string) => {
        if (!dataFiles.includes(path.resolve(changed))) return;
        cache = null;
        for (const mod of server.moduleGraph.idToModuleMap.values()) {
          if (mod.id?.startsWith('\0virtual:blog-')) server.moduleGraph.invalidateModule(mod);
        }
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('change', reload);
    },
  };
}

export default defineConfig(({ mode }) => {
  const plugins = [react(), legalStaticHtml(), docsShots(), blogSplit()];

  // Only add visualizer in development mode
  if (mode === 'development') {
    try {
      const { visualizer } = require('rollup-plugin-visualizer');
      plugins.push(
        visualizer({
          open: true,
          filename: 'bundle-report.html',
          gzipSize: true,
          brotliSize: true,
        }),
      );
    } catch (error) {
      console.warn('rollup-plugin-visualizer not available, skipping...');
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
      build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
      // Do not modulepreload charts/heavy on every route — homepage never needs them.
      modulePreload: {
        resolveDependencies(filename, deps) {
          return deps.filter(
            (d) =>
              !d.includes('charts') &&
              !d.includes('heavy'),
          );
        },
      },
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      rollupOptions: {
        output: {
          // Keep React in a leaf vendor chunk. Do NOT force-split app source
          // (marketing) — that created vendor→community cycles and
          // left React undefined when framer-motion called createContext
          // (blank pages + prerender h1 timeouts on Netlify).
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (
              id.includes('/react-dom/') ||
              id.includes('/react/') ||
              id.includes('/scheduler/') ||
              id.includes('/react-router') ||
              id.includes('/react-helmet-async/') ||
              id.includes('/react-hot-toast/')
            ) {
              return 'vendor';
            }
            if (id.includes('framer-motion') || id.includes('/gsap/') || id.includes('/lenis/')) {
              return 'animations';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'charts';
            }
            if (id.includes('jspdf') || id.includes('mathjs')) {
              return 'heavy';
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    },
  };
});
