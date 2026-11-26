/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BILLING_CATALOG_URL?: string;
  readonly NEXT_PUBLIC_BILLING_CATALOG_URL?: string;
  /** GA4 measurement id (G-XXXXXXXXXX). Analytics is off when unset. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

/** public/docs/img/shots.json, served by the docs-shots plugin in vite.config.ts. */
declare module 'virtual:docs-shots' {
  const shots: Record<string, { w: number; h: number }>;
  export default shots;
}

/** Blog post card fields and per-post body loaders, served by the blog-split plugin in vite.config.ts; typed in src/data/blogContent.ts. */
declare module 'virtual:blog-index' {
  export const blogIndex: unknown[];
  export const blogBodies: Record<string, () => Promise<{ default: unknown }>>;
}
