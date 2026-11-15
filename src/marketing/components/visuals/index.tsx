/**
 * Scene registry for the feature pages.
 *
 * Each file in ./scenes is named after a ProductPageId and default-exports a
 * SceneMap keyed by the image path that productPages.ts already carries. The
 * page keeps its data untouched: where a scene exists for a path it is drawn
 * instead of the screenshot, and where none exists the screenshot still shows.
 * Scenes load as one lazy chunk per page, so a feature page only pays for its
 * own visuals.
 */
import { createContext, useContext, useEffect, useState } from 'react';
import { Stage, type Scene, type SceneMap } from './kit';

const MODULES = import.meta.glob<{ default: SceneMap }>('./scenes/*.tsx');

const loaderFor = (pageId: string) => MODULES[`./scenes/${pageId}.tsx`];

type ScenesState = {
  /** True while this page's scene chunk is still on its way. */
  pending: boolean;
  map: SceneMap | null;
};

const EMPTY: ScenesState = { pending: false, map: null };
const cache = new Map<string, SceneMap>();

export const ScenesContext = createContext<ScenesState>(EMPTY);

/** Load the scenes for one feature page. */
export function usePageScenes(pageId: string): ScenesState {
  const loader = loaderFor(pageId);
  const [state, setState] = useState<ScenesState>(() =>
    cache.has(pageId)
      ? { pending: false, map: cache.get(pageId)! }
      : { pending: Boolean(loader), map: null },
  );

  useEffect(() => {
    if (cache.has(pageId)) {
      setState({ pending: false, map: cache.get(pageId)! });
      return;
    }
    if (!loader) {
      setState(EMPTY);
      return;
    }
    let live = true;
    setState({ pending: true, map: null });
    loader()
      .then((m) => {
        cache.set(pageId, m.default);
        if (live) setState({ pending: false, map: m.default });
      })
      // A failed chunk falls back to the screenshot rather than an empty frame.
      .catch(() => live && setState(EMPTY));
    return () => {
      live = false;
    };
  }, [pageId, loader]);

  return state;
}

const keyOf = (src: string) => src.split('?')[0];

/**
 * What to draw for an image path: the scene, a backdrop-only placeholder while
 * the chunk loads, or null (caller renders the screenshot).
 */
export function useScene(src: string): { Scene: Scene | null; pending: boolean } {
  const { pending, map } = useContext(ScenesContext);
  const Scene = map?.[keyOf(src)] ?? null;
  return { Scene, pending: pending && !Scene };
}

/** Backdrop shown in a frame while its scene chunk is loading. */
export function ScenePlaceholder({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <Stage label={label} shape={wide ? 'wide' : 'square'}>
      {null}
    </Stage>
  );
}
