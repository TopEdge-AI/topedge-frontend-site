/**
 * Film harness. Open /?comp=05-S1&t=4.2 to look at one frame, or let the
 * renderer drive window.__render(frame) frame by frame.
 */
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { useState } from 'react';
import { CineContext, FPS, SizeContext, TimeContext } from './lib/time';
import { Lens, Studio } from './lib/cine';
import { COMPS } from './comps';

declare global {
  interface Window {
    __render: (frame: number) => Promise<void>;
    __comp: { id: string; w: number; h: number; duration: number };
  }
}

const q = new URLSearchParams(location.search);
const id = q.get('comp') ?? '05-S1';
const comp = COMPS[id];
if (!comp) throw new Error(`unknown composition ${id}`);
window.__comp = { id, w: comp.w, h: comp.h, duration: comp.duration };

let setT: (t: number) => void = () => {};

function App() {
  const [t, set] = useState(Number(q.get('t') ?? 0));
  setT = set;
  const Comp = comp.Component;
  return (
    <TimeContext.Provider value={t}>
      <SizeContext.Provider value={{ w: comp.w, h: comp.h }}>
        <div style={{ position: 'relative', width: comp.w, height: comp.h, overflow: 'hidden' }}>
          {comp.cine ? (
            <CineContext.Provider value={Boolean(comp.cine.tone)}>
              {comp.cine.tone ? <Studio t={t} tone={comp.cine.tone} w={comp.w} h={comp.h} /> : null}
              <Lens t={t} w={comp.w} h={comp.h} keys={comp.cine.cam}>
                <Comp t={t} />
              </Lens>
            </CineContext.Provider>
          ) : (
            <Comp t={t} />
          )}
        </div>
      </SizeContext.Provider>
    </TimeContext.Provider>
  );
}

const root = createRoot(document.getElementById('root')!);
flushSync(() => root.render(<App />));

window.__render = async (frame: number) => {
  flushSync(() => setT(frame / FPS));
  await Promise.all([...document.images].map((i) => (i.complete ? null : i.decode().catch(() => null))));
};
