/**
 * Chapter 09 — Chat rules (docs/video/feature-library/ch09_chat_rules.md).
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  CheckmarkCircle02Icon, Crown02Icon, FlashIcon, FlowConnectionIcon, HeadsetIcon, InboxIcon, Message01Icon, PauseIcon,
  Tag01Icon, Target02Icon, TouchInteraction01Icon, UserCheck01Icon,
} from '@hugeicons/core-free-icons';
import { E, clamp, lerp, prog, spring, typed, useSize } from '../lib/time';
import { Backdrop, C, Card, CardHeader, Chip, Cursor, FONT, Icon, Layer, Pill, Toast, pop } from '../lib/ui';
import { Avatar, Toggle, rowIn } from '../lib/kit2';
import { cursorAt } from '../lib/rig';

const T = 1080;
const W = 1920;
const sat = (k: number, node: ReactNode, style: CSSProperties, origin: string) => {
  const p = pop(k);
  return <div style={{ position: 'absolute', transform: `scale(${p.s})`, transformOrigin: origin, opacity: p.o, zIndex: 30, ...style }}>{node}</div>;
};
const Wall = ({ children, h, pad = 22 }: { children: ReactNode; h?: number; pad?: number }) => (
  <div style={{ height: h, borderRadius: 20, background: C.waBg, padding: pad, position: 'relative', overflow: 'hidden', backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>{children}</div>
);
const In = ({ children, time }: { children: ReactNode; time?: string }) => (
  <div style={{ display: 'flex' }}><div style={{ background: '#fff', borderRadius: 20, borderTopLeftRadius: 6, padding: '12px 18px 8px', fontSize: 27, lineHeight: 1.36, maxWidth: 620, boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)' }}>{children}{time ? <div style={{ textAlign: 'right', fontSize: 17, color: '#667781' }}>{time}</div> : null}</div></div>
);
const Out = ({ children, time, tag }: { children: ReactNode; time?: string; tag?: ReactNode }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}><div style={{ background: C.waOut, borderRadius: 20, borderTopRightRadius: 6, padding: '12px 18px 8px', fontSize: 27, lineHeight: 1.36, maxWidth: 640, boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)' }}>{tag}{children}{time ? <div style={{ textAlign: 'right', fontSize: 17, color: '#667781' }}>{time} <span style={{ color: '#53BDEB' }}>✓✓</span></div> : null}</div></div>
);
const Sys = ({ icon, color, children, o = 1 }: { icon: typeof Tag01Icon; color: string; children: ReactNode; o?: number }) => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0', opacity: o, transform: `translateY(${lerp(10, 0, o)}px)` }}>
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.96)', borderRadius: 14, padding: '9px 16px', fontSize: 22, color: C.ink2, boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}><Icon icon={icon} size={24} color={color} />{children}</span>
  </div>
);
const Row = ({ icon, color = C.ink2, a, b, right, style, lead }: { icon?: typeof Tag01Icon; color?: string; a: ReactNode; b: ReactNode; right?: ReactNode; style?: CSSProperties; lead?: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 20px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}`, marginTop: 12, background: '#fff', ...style }}>
    {lead ?? (icon ? <Icon icon={icon} size={34} color={color} /> : null)}
    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 28, fontWeight: 600, whiteSpace: 'nowrap' }}>{a}</div><div style={{ fontSize: 22, color: C.muted, marginTop: 2, whiteSpace: 'nowrap' }}>{b}</div></div>
    {right}
  </div>
);

/* ================================================================= 09-H */
export function H({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const ins = prog(t, 0.6, 1.1, E.move);
  const assigned = prog(t, 3.2, 3.6);
  const reply = spring(t, 5.7, 0.55, 0.15);
  const list: [string, string, string, string, ReactNode][] = [
    ['Farhan Ali', '#0F766E', 'Can I cancel my COD order?', 'now', assigned > 0.5 ? <Avatar key="a" name="Arjun Rao" color="#7C3AED" size={36} /> : <span key="b" style={{ minWidth: 30, height: 30, borderRadius: 99, background: '#25D366', color: '#fff', fontSize: 18, fontWeight: 700, display: 'grid', placeItems: 'center' }}>1</span>],
    ['Ananya Iyer', '#0284C7', 'Thanks, received it!', '2m', null],
    ['Kabir Shah', '#7C3AED', 'Is the M size back?', '9m', <span key="c" style={{ minWidth: 30, height: 30, borderRadius: 99, background: '#25D366', color: '#fff', fontSize: 18, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{t > 10 ? 3 : 2}</span>],
    ['Meera Pillai', '#DB2777', 'Refund status?', '14m', null],
  ];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="orchid" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 1500, height: 780, borderRadius: 30, background: '#fff', display: 'flex', overflow: 'hidden', boxShadow: '0 40px 90px -40px rgba(40,24,96,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
            <div style={{ width: 520, background: '#FBFBFD', borderRight: `1.5px solid ${C.line}`, padding: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}><span style={{ flex: 1, fontSize: 32, fontWeight: 600 }}>Live Chat</span><Chip size={20}>All teams</Chip></div>
              <div style={{ position: 'relative', height: 640 }}>
                {list.map(([n, col, m, tm, right], i) => (
                  <div key={n} style={{ position: 'absolute', left: 0, right: 0, top: i === 0 ? 0 : (i - 1 + ins) * 112, display: 'flex', gap: 16, alignItems: 'center', padding: '16px 14px', borderRadius: 18, background: i === 0 ? 'rgba(124,58,237,0.06)' : 'transparent', ...(i === 0 ? rowIn(t, 0.6) : {}) }}>
                    <Avatar name={n} color={col} size={58} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 26 }}>{n}</b><span style={{ fontSize: 19, color: C.faint }}>{tm}</span></div>
                      <div style={{ fontSize: 22, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m}</div>
                    </div>
                    {right}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 96, display: 'flex', alignItems: 'center', gap: 16, padding: '0 28px', borderBottom: `1.5px solid ${C.line}` }}>
                <Avatar name="Farhan Ali" color="#0F766E" size={58} />
                <div><div style={{ fontSize: 28, fontWeight: 600 }}>Farhan Ali</div><div style={{ fontSize: 21, color: C.muted }}>+91 90000 12355 · Order #2207 · COD</div></div>
              </div>
              <div style={{ flex: 1, background: C.waBg, padding: 28, backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>
                <div style={rowIn(t, 0.8)}><In time="12:08">Can I cancel my COD order?</In></div>
                <Sys icon={Tag01Icon} color={C.violet} o={prog(t, 1.9, 2.3)}>Rule matched: <b>COD, cancel</b></Sys>
                <Sys icon={UserCheck01Icon} color={C.emerald} o={prog(t, 3.2, 3.6)}>Assigned to <b>Arjun · Ops team</b></Sys>
                {t > 4.4 && t < 5.7 ? <div style={{ display: 'flex', justifyContent: 'flex-end' }}><span style={{ width: 70, height: 40, borderRadius: 18, background: C.waOut, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 8, height: 8, borderRadius: 9, background: '#7FA88A', opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 5 + i)) }} />)}</span></div> : null}
                {reply > 0 ? <div style={{ opacity: clamp(reply * 2), transform: `translateY(${lerp(16, 0, reply)}px)` }}><Out time="12:09">Hi Farhan, Arjun here. I've cancelled #2207 for you. Anything else?</Out></div> : null}
              </div>
            </div>
          </div>
          {sat(spring(t, 1.8, 0.55, 0.16) * (1 - prog(t, 3.7, 4.0)), <Toast icon={FlowConnectionIcon} title="Rule: COD, cancel" sub="Assign to Ops team" size={29} dark />, { left: 700, top: -50 }, '50% 100%')}
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 09-T1 */
export function T1({ t }: { t: number }) {
  const hl = (at: number) => prog(t, at, at + 0.25, E.move);
  const mark = (w: string, k: number) => <span style={{ backgroundImage: `linear-gradient(#FEF08A, #FEF08A)`, backgroundSize: `${k * 100}% 100%`, backgroundRepeat: 'no-repeat', borderBottom: k > 0.9 ? '2.5px solid #FACC15' : '2.5px solid transparent', padding: '0 3px' }}>{w}</span>;
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="mint" pattern="lines" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={Tag01Icon} title="Rule · COD, cancel" size={34} right={<Toggle on={1} />} />
          <Wall><In time="12:08">{mark('COD', hl(1.0))} {mark('cancel', hl(1.25))} karna hai</In></Wall>
          <div style={rowIn(t, 1.6)}><Row icon={Target02Icon} color={C.emerald} a="2 keywords matched" b="COD · cancel" /></div>
          <div style={rowIn(t, 2.4)}><Row lead={<Avatar name="Arjun Rao" color="#7C3AED" size={52} />} a="Assigned to Ops team" b="Arjun picks it up" right={<Chip tone="emerald" icon={CheckmarkCircle02Icon} size={21}>Routed</Chip>} /></div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 09-T2 */
export function T2({ t }: { t: number }) {
  const r = spring(t, 2.2, 0.55, 0.15);
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lime" pattern="mesh" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={HeadsetIcon} title="Support" size={34} right={<Chip tone="emerald" dot size={22}>Priya online</Chip>} />
          <Wall h={440}>
            <In time="16:40">Can I talk to a person please?</In>
            <Sys icon={Target02Icon} color={C.emerald} o={prog(t, 1.2, 1.6)}>Intent: <b>human agent</b> · bot paused</Sys>
            {r > 0 ? <div style={{ opacity: clamp(r * 2), transform: `translateY(${lerp(16, 0, r)}px)` }}><Out time="16:41">Hi, I'm Priya. I can see order #2211, how can I help?</Out></div> : null}
          </Wall>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 09-T3 */
export function T3({ t }: { t: number }) {
  const n = t > 3.0 && t < 7.1 ? 5 : 4;
  const flash = prog(t, 3.0, 3.2) * (1 - prog(t, 3.6, 4.4));
  const count = (v: ReactNode, tone?: string) => <span style={{ minWidth: 52, height: 44, padding: '0 12px', borderRadius: 99, background: tone ?? '#F0F0F3', color: tone ? '#fff' : C.ink, fontSize: 24, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{v}</span>;
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="lagoon" pattern="dots" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={860}>
          <CardHeader icon={InboxIcon} title="Live Chat" size={34} />
          <Row lead={<Avatar name="Arjun Rao" color="#7C3AED" size={48} />} a="Assigned to me" b="COD confirms" right={<span style={{ transform: `scale(${1 + 0.12 * flash})` }}>{count(n, C.violet)}</span>} style={{ background: C.sunk }} />
          <Row icon={Message01Icon} a="Open" b="All teams" right={count(12)} />
          <div style={rowIn(t, 1.4)}><Row icon={TouchInteraction01Icon} color="#D97706" a="Needs help" b="Escalated by a rule" right={<Chip tone="amber" size={22}>2</Chip>} /></div>
          <Row icon={Crown02Icon} color="#B45309" a="VIP" b="Tagged by Shopify" right={count(3)} />
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 09-S1 */
export function S1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[2.8, 1600, h - 80], [3.8, 960, CY + 300], [4.2, 960, CY + 300], [5.0, 1650, h + 80]], [3.9]);
  const live = prog(t, 3.95, 4.2);
  const pills: [string, number][] = [['refund', -1], ['return', 0.8], ['paisa wapas', 1.4]];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="coral" pattern="beams" w={W} h={h} />
      <Layer x={960} y={CY} s={1.05}>
        <Card w={1060} pad={40}>
          <CardHeader icon={FlowConnectionIcon} title="New rule" size={36} />
          <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted, marginBottom: 14 }}>WHEN A MESSAGE CONTAINS</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {pills.map(([p, at]) => { const k = at < 0 ? 1 : spring(t, at, 0.5, 0.2); return <span key={p} style={{ height: 54, padding: '0 22px', borderRadius: 99, background: '#E6F4FB', boxShadow: '0 0 0 1.5px rgba(2,132,199,0.22)', color: '#0369A1', fontSize: 25, fontWeight: 600, display: 'grid', placeItems: 'center', opacity: clamp(k * 2), transform: `scale(${lerp(0.85, 1, k)})` }}>{p}</span>; })}
          </div>
          <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '0.12em', color: C.muted, margin: '24px 0 0', opacity: prog(t, 2.0, 2.3) }}>THEN</div>
          <div style={rowIn(t, 2.0)}><Row icon={UserCheck01Icon} color={C.violet} a="Assign to Support" b="Round robin · 3 agents" /></div>
          <div style={rowIn(t, 2.5)}><Row icon={PauseIcon} a="Pause the bot" b="Until an agent replies" right={<Toggle on={prog(t, 2.8, 3.0, E.move)} />} /></div>
          <div style={{ marginTop: 22, position: 'relative', height: 68 }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 1 - live }}><Pill kind="primary" size={26} icon={FlashIcon} full press={cur.press}>Publish rule</Pill></div>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: live }}><Chip tone="emerald" dot size={26} pulse={(t * 0.8) % 1}>Rule live · applies to new chats</Chip></div>
          </div>
        </Card>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 2.8, 3.05) * (1 - prog(t, 4.7, 5.0))} s={1.8} />
    </div>
  );
}

/* ================================================================= 09-S2 */
export function S2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const q: [string, string, string, string, string, number, ReactNode][] = [
    ['OPS', 'Rahul Mehta', '#0F766E', 'COD confirm · #2204', 'Keyword: COD', 1.0, <Chip key="a" tone="violet" size={20}>Arjun</Chip>],
    ['VIP', 'Riya Sharma', '#BE185D', 'Exchange request', 'Tag: VIP', 2.0, <Chip key="b" tone="violet" size={20}>Priya</Chip>],
    ['SUPPORT', 'Kabir Shah', '#7C3AED', 'Damaged item', 'Photo attached', 3.0, <Chip key="c" tone="amber" size={20}>Needs help</Chip>],
  ];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="bloom" pattern="grid" w={W} h={h} />
      <Layer x={960} y={CY} s={1.02}>
        <div style={{ position: 'relative' }}>
          <Card w={1120} pad={40}>
            <CardHeader icon={InboxIcon} title="Queues" size={36} right={<Chip size={22}>3 agents online</Chip>} />
            {q.map(([lab, n, col, a, b, at, chip]) => {
              const k = prog(t, at, at + 0.3);
              return (
                <div key={n} style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '0.14em', color: C.muted, marginBottom: 6 }}>{lab}</div>
                  <Row lead={<Avatar name={n} color={col} size={54} />} a={`${n} · ${a}`} b={b} right={<span style={{ position: 'relative', width: 200, height: 40, display: 'inline-block' }}><span style={{ position: 'absolute', right: 0, opacity: 1 - k }}><Chip size={20}>Unassigned</Chip></span><span style={{ position: 'absolute', right: 0, opacity: k, transform: `scale(${lerp(0.85, 1, k)})` }}>{chip}</span></span>} style={{ marginTop: 0 }} />
                </div>
              );
            })}
          </Card>
          {sat(spring(t, 3.6, 0.6, 0.16), <Toast icon={UserCheck01Icon} title="Average pickup 42s" sub="Today, all queues" size={29} />, { right: 30, bottom: -60 }, '100% 100%')}
        </div>
      </Layer>
    </div>
  );
}

/* ================================================================= 09-S3 */
export function S3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[1.3, 1600, h - 80], [2.1, 1450, CY - 290], [2.6, 1450, CY - 290], [3.4, 1700, h + 80]], [2.2]);
  const took = prog(t, 2.25, 2.5);
  const ai = spring(t, 0.9, 0.55, 0.15);
  const priya = typed("Hi Rahul, Priya here. I've called the courier, they'll reach you by 4 pm.", t, 4.2, 32);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dusk" pattern="rings" w={W} h={h} />
      <Layer x={960} y={CY}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 1200, borderRadius: 30, background: '#fff', overflow: 'hidden', boxShadow: '0 40px 90px -40px rgba(40,24,96,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
            <div style={{ height: 100, display: 'flex', alignItems: 'center', gap: 16, padding: '0 28px', borderBottom: `1.5px solid ${C.line}` }}>
              <Avatar name="Rahul Mehta" color="#0F766E" size={58} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 28, fontWeight: 600 }}>Rahul Mehta</div><div style={{ fontSize: 21, color: C.muted }}>Order #2204 · Out for delivery</div></div>
              <span style={{ position: 'relative', width: 330, height: 56 }}>
                <span style={{ position: 'absolute', right: 0, opacity: 1 - took }}><Pill kind="primary" size={23} press={cur.press}>Take control</Pill></span>
                <span style={{ position: 'absolute', right: 0, top: 8, opacity: took }}><Chip tone="amber" icon={PauseIcon} size={22}>AI and flows paused</Chip></span>
              </span>
            </div>
            <div style={{ background: C.waBg, padding: 28, minHeight: 560, backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>
              <In time="12:10">The courier never called me.</In>
              {ai > 0 ? <div style={{ marginTop: 12, opacity: clamp(ai * 2) }}><Out time="12:10" tag={<div style={{ fontSize: 17, fontWeight: 700, color: C.violet, marginBottom: 2 }}>AI</div>}>Sorry about that! Let me check with the courier.</Out></div> : null}
              <Sys icon={UserCheck01Icon} color="#D97706" o={prog(t, 2.8, 3.2)}><b>Priya</b> took control · AI replies paused on this chat</Sys>
              {priya ? <div style={{ marginTop: 6 }}><Out time="12:11">{priya}</Out></div> : null}
            </div>
          </div>
          {sat(spring(t, 3.2, 0.6, 0.16), <Toast icon={FlowConnectionIcon} title="Chat rules still on" sub="Routing and tags keep working" size={29} />, { right: -30, bottom: -60 }, '100% 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 1.3, 1.55) * (1 - prog(t, 3.0, 3.4))} s={1.8} />
    </div>
  );
}

export const rules = {
  '09-H': { w: W, h: 1080, duration: 15, Component: H },
  '09-T1': { w: T, h: T, duration: 7.5, Component: T1 },
  '09-T2': { w: T, h: T, duration: 7.5, Component: T2 },
  '09-T3': { w: T, h: T, duration: 7.5, Component: T3 },
  '09-S1': { w: W, h: 1200, duration: 12.5, Component: S1 },
  '09-S2': { w: W, h: 1200, duration: 12.5, Component: S2 },
  '09-S3': { w: W, h: 1200, duration: 12.5, Component: S3 },
};
