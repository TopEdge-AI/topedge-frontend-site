/**
 * Chapter 08 — Meta manager and Chapter 10 — Warranty
 * (docs/video/feature-library/ch08_meta_manager.md, ch10_warranty.md).
 */
import type { CSSProperties, ReactNode } from 'react';
import {
  CheckmarkCircle02Icon, Download04Icon, File01Icon, InboxIcon, LayoutTable01Icon, Message01Icon, QrCode01Icon,
  RefreshIcon, SentIcon, Shield01Icon, Store01Icon, UserCheck01Icon,
} from '@hugeicons/core-free-icons';
import { SiMeta, SiShopify } from 'react-icons/si';
import { E, clamp, lerp, prog, spring, typed, useSize } from '../lib/time';
import {
  Backdrop, Bubble, C, Card, CardHeader, Chip, Cursor, DateChip, DISPLAY, FONT, Icon, Layer, Pill, TemplateBubble, Toast, Touch,
  WaHeader, WaScreen, pop,
} from '../lib/ui';
import { Avatar, KurtaShot, countUp, rowIn } from '../lib/kit2';
import { DoorbellShot, SerumShot, ShoeShot } from '../lib/products';
import { LockScreen, PhoneRig, backdropState, cursorAt, phoneOffset, phoneTouch, screenY } from '../lib/rig';

const T = 1080;
const W = 1920;
const MONO = "'Geist Mono','SF Mono',ui-monospace,monospace";
const sat = (k: number, node: ReactNode, style: CSSProperties, origin: string) => {
  const p = pop(k);
  return <div style={{ position: 'absolute', transform: `scale(${p.s})`, transformOrigin: origin, opacity: p.o, zIndex: 30, ...style }}>{node}</div>;
};
const Row = ({ icon, color = C.ink2, a, b, right, style, lead, mono }: { icon?: typeof File01Icon; color?: string; a: ReactNode; b: ReactNode; right?: ReactNode; style?: CSSProperties; lead?: ReactNode; mono?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 20px', borderRadius: 20, boxShadow: `0 0 0 1.5px ${C.line}`, marginTop: 12, background: '#fff', ...style }}>
    {lead ?? (icon ? <Icon icon={icon} size={34} color={color} /> : null)}
    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 28, fontWeight: 600, whiteSpace: 'nowrap', fontFamily: mono ? MONO : FONT, letterSpacing: mono ? '-0.02em' : undefined }}>{a}</div><div style={{ fontSize: 22, color: C.muted, marginTop: 2, whiteSpace: 'nowrap' }}>{b}</div></div>
    {right}
  </div>
);
const Tok = ({ children }: { children: ReactNode }) => <span style={{ background: '#E6F4FB', color: '#0369A1', borderRadius: 8, padding: '1px 8px', fontWeight: 600 }}>{children}</span>;
const MetaToast = ({ title, sub }: { title: string; sub: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 26px 16px 18px', borderRadius: 22, background: '#fff', whiteSpace: 'nowrap', boxShadow: '0 22px 44px -14px rgba(16,24,40,0.24), inset 0 0 0 1.5px rgba(16,24,40,0.08)', fontFamily: FONT }}>
    <span style={{ width: 52, height: 52, borderRadius: 14, background: '#EEF3FF', display: 'grid', placeItems: 'center' }}><SiMeta size={30} color="#0866FF" /></span>
    <div><div style={{ fontSize: 28, fontWeight: 600 }}>{title}</div><div style={{ fontSize: 22, color: C.muted, marginTop: 2 }}>{sub}</div></div>
  </div>
);

/** QR with real structure: three finder squares + deterministic modules. */
export function QR({ size = 220, centre = '#25D366', sweep = -1 }: { size?: number; centre?: string; sweep?: number }) {
  const n = 25;
  const cell = size / n;
  const on = (x: number, y: number) => {
    const inF = (fx: number, fy: number) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7;
    if (inF(0, 0) || inF(n - 7, 0) || inF(0, n - 7)) return false;
    const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return v - Math.floor(v) > 0.52;
  };
  const finder = (fx: number, fy: number) => (
    <g key={`${fx}-${fy}`}>
      <rect x={fx * cell} y={fy * cell} width={7 * cell} height={7 * cell} rx={cell * 1.4} fill="#111" />
      <rect x={(fx + 1) * cell} y={(fy + 1) * cell} width={5 * cell} height={5 * cell} rx={cell} fill="#fff" />
      <rect x={(fx + 2) * cell} y={(fy + 2) * cell} width={3 * cell} height={3 * cell} rx={cell * 0.7} fill="#111" />
    </g>
  );
  const cells: ReactNode[] = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (on(x, y) && !(Math.abs(x - 12) < 3 && Math.abs(y - 12) < 3)) cells.push(<rect key={`${x}.${y}`} x={x * cell + 0.5} y={y * cell + 0.5} width={cell - 1} height={cell - 1} rx={cell * 0.3} fill="#111" />);
  return (
    <svg width={size} height={size} style={{ display: 'block', background: '#fff' }}>
      {cells}{finder(0, 0)}{finder(n - 7, 0)}{finder(0, n - 7)}
      <rect x={10 * cell} y={10 * cell} width={5 * cell} height={5 * cell} rx={cell * 1.5} fill={centre} />
      {sweep >= 0 && sweep <= 1 ? <rect x={0} y={sweep * size - 6} width={size} height={12} fill="rgba(16,185,129,0.55)" /> : null}
    </svg>
  );
}

function Stepper({ review, approved }: { review: number; approved: number }) {
  const pill = (label: string, bg: string, fg: string) => <span style={{ height: 46, padding: '0 20px', borderRadius: 99, background: bg, color: fg, fontSize: 22, fontWeight: 600, display: 'grid', placeItems: 'center', whiteSpace: 'nowrap' }}>{label}</span>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {pill('Draft', '#F0F0F3', C.ink2)}
      <span style={{ flex: 1, height: 3, background: review > 0.5 ? C.amber : C.line, borderRadius: 2 }} />
      {pill('In review', review > 0.5 && approved < 0.5 ? C.amberSoft : '#F0F0F3', review > 0.5 && approved < 0.5 ? C.amber : C.ink2)}
      <span style={{ flex: 1, height: 3, background: `linear-gradient(90deg, ${C.emerald} ${approved * 100}%, ${C.line} ${approved * 100}%)`, borderRadius: 2 }} />
      {pill('Approved', approved > 0.9 ? C.emeraldSoft : '#F0F0F3', approved > 0.9 ? C.emerald : C.ink2)}
    </div>
  );
}

/* ================================================================= 08-H */
export function MH({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const bd = backdropState(t, 6.4);
  const off = phoneOffset(t, 6.55);
  const cur = cursorAt(t, [[0.6, 1500, h - 100], [2.2, 960, CY + 190], [2.6, 960, CY + 190], [3.4, 1500, h + 80]], [2.3]);
  const waiting = prog(t, 2.35, 2.6);
  const approved = prog(t, 5.0, 5.6, E.move);
  const breathe = 1 - 0.2 * Math.sin(clamp((t - 2.8) / 1.6) * Math.PI);
  const chatIn = prog(t, 7.75, 8.2, E.enter);
  const bubble = spring(t, 7.9, 0.6, 0.15);
  const reply = spring(t, 9.6, 0.5, 0.15);
  const touch = phoneTouch(t, [[7.2, 7.9, 195, 278]], off);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="sunrise" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY - 20} s={bd.s * 1.05} o={bd.o} blur={bd.blur}>
        <div style={{ position: 'relative' }}>
          <Card w={1160} pad={40}>
            <CardHeader icon={File01Icon} title="cart_recovery_1" size={36} right={<Chip size={22}>Marketing</Chip>} />
            <Stepper review={prog(t, 2.6, 2.8)} approved={approved} />
            <div style={{ fontSize: 22, color: C.muted, margin: '24px 0 8px' }}>Body</div>
            <div style={{ borderRadius: 18, boxShadow: 'inset 0 0 0 1.5px rgba(16,24,40,0.12)', padding: '18px 22px', fontSize: 29, lineHeight: 1.5 }}>Hi <Tok>{'{{first_name}}'}</Tok>, your <Tok>{'{{product}}'}</Tok> is still in your cart.</div>
            <div style={{ marginTop: 22, position: 'relative', height: 68 }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 1 - waiting }}><Pill kind="primary" size={26} icon={SentIcon} full press={cur.press}>Submit to Meta</Pill></div>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: waiting * (1 - approved) * breathe }}><Chip tone="amber" dot size={26}>Waiting for Meta</Chip></div>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: approved }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={26}>Approved · live</Chip></div>
            </div>
          </Card>
          {sat(spring(t, 5.2, 0.6, 0.16), <MetaToast title="Approved by Meta" sub="Ready for journeys and campaigns" />, { left: '50%', bottom: -70, marginLeft: -250 }, '50% 0')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.6, 0.85) * (1 - prog(t, 3.0, 3.4))} s={1.8} />
      <PhoneRig offset={off} time="18:20">
        <LockScreen t={t} time="18:20" date="Monday, 23 November" bannerAt={7.1} bannerTitle="Glow Co" bannerBody="Still thinking it over? Your gel is waiting" wall={['#FFD3C4', '#C9B8FF']} />
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(chatIn)}px)`, opacity: chatIn > 0 ? 1 : 0 }}>
          <WaScreen>
            <WaHeader name="Glow Co" letter="G" color="#C8603F" />
            <div style={{ position: 'absolute', top: 124, left: 0, right: 0 }}><DateChip /></div>
            <div style={{ position: 'absolute', top: 160, left: 12, opacity: clamp(bubble * 2), transform: `translateY(${lerp(30, 0, bubble)}px)` }}>
              <TemplateBubble media={<SerumShot />} title="Still thinking it over?" body="Hi Aarav, your hydrating gel is still in your cart." time="18:20" cta="Complete order" />
            </div>
            {reply > 0 ? <div style={{ position: 'absolute', top: 470, left: 12, right: 12, opacity: clamp(reply * 2) }}><Bubble out time="18:24" read>Ordering now, thanks!</Bubble></div> : null}
          </WaScreen>
        </div>
      </PhoneRig>
      {touch ? <Touch {...touch} /> : null}
      {sat(spring(t, 10.2, 0.6, 0.16), <Toast icon={CheckmarkCircle02Icon} title="Delivered and read" sub="cart_recovery_1 · ₹0.8631" size={31} />, { left: 1330, top: CY + 120 }, '0 50%')}
    </div>
  );
}

/* ================================================================= 08-T1 */
export function MT1({ t }: { t: number }) {
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="coral" pattern="beams" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={LayoutTable01Icon} title="Templates" size={34} right={<span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 21, fontWeight: 600, color: '#0866FF' }}><SiMeta size={26} />Synced</span>} />
          <div style={rowIn(t, 0.5)}><Row mono a="order_confirm" b="Utility · ₹0.115" right={<Chip tone="emerald" icon={CheckmarkCircle02Icon} size={20}>Approved</Chip>} /></div>
          <div style={rowIn(t, 1.1)}><Row mono a="cart_recovery_1" b="Marketing · ₹0.8631" right={<Chip tone="amber" dot size={20}>In review</Chip>} /></div>
          <div style={rowIn(t, 1.7)}><Row mono a="festive_promo_v1" b="Promo text in a Utility template" right={<Chip tone="rose" size={20}>Rejected</Chip>} style={{ background: 'rgba(225,29,72,0.04)', boxShadow: '0 0 0 2px rgba(225,29,72,0.3)' }} /></div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 08-T2 */
export function MT2({ t }: { t: number }) {
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="bloom" pattern="grid" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={860}>
          <CardHeader icon={File01Icon} title="Cart recovery blueprint" size={32} right={<Chip tone="emerald" dot size={21}>Live product</Chip>} />
          <div style={{ borderRadius: 22, background: C.waBg, padding: 26, display: 'flex', justifyContent: 'center', backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>
            <div style={{ transform: 'scale(1.55)', transformOrigin: '50% 0', height: 520 }}>
              <TemplateBubble media={<SerumShot />} title={t > 0.6 ? 'Still thinking it over?' : ''} body={typed('Hi Aarav, your hydrating gel is still in your cart. Complete your order and get free shipping today.', t, 0.7, 40)} time="18:20" cta="Complete order" />
            </div>
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 08-T3 */
export function MT3({ t }: { t: number }) {
  const thumbs = [<SerumShot key="a" />, <KurtaShot key="b" />, <ShoeShot key="c" />, <DoorbellShot key="d" />];
  const sweep = t > 3.0 && t < 3.8 ? (t - 3.0) / 0.8 : -1;
  return (
    <div style={{ width: T, height: T, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dusk" pattern="rings" w={T} h={T} />
      <Layer x={540} y={540}>
        <Card w={880}>
          <CardHeader icon={Store01Icon} title="Catalog" size={34} right={<span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 22, fontWeight: 600, color: '#5E8E3E' }}><SiShopify size={26} />{Math.round(countUp(t, 0.4, 142, 1.4))} synced</span>} />
          <div style={{ display: 'flex', gap: 26 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, width: 420 }}>
              {thumbs.map((th, i) => { const k = spring(t, 0.4 + i * 0.12, 0.5, 0.2); return <div key={i} style={{ height: 190, borderRadius: 18, overflow: 'hidden', opacity: clamp(k * 2), transform: `scale(${lerp(0.85, 1, k)})` }}>{th}</div>; })}
            </div>
            <div style={{ flex: 1, background: C.sunk, borderRadius: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ padding: 14, background: '#fff', borderRadius: 18 }}><QR size={230} sweep={sweep} /></div>
              <span style={{ fontSize: 24, fontWeight: 600 }}>Scan to chat</span>
            </div>
          </div>
        </Card>
      </Layer>
    </div>
  );
}

/* ================================================================= 08-S1 */
export function MS1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.3, 1600, h - 80], [0.95, 1380, CY - 215], [1.3, 1380, CY - 215], [2.0, 1700, h + 80]], [1.0]);
  const spin = prog(t, 1.0, 1.6, E.move) * 360;
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="rose" pattern="lines" w={W} h={h} />
      <Layer x={960} y={CY} s={1.04}>
        <div style={{ position: 'relative' }}>
          <Card w={1120} pad={40}>
            <CardHeader icon={LayoutTable01Icon} title="Template library" size={36} right={<Pill kind="secondary" size={23} press={cur.press}><span style={{ display: 'inline-flex', transform: `rotate(${spin}deg)` }}><Icon icon={RefreshIcon} size={24} /></span>Sync from Meta</Pill>} />
            {t < 1.5 ? <div style={{ fontSize: 24, color: C.faint, padding: '30px 0', textAlign: 'center' }}>Last synced 2 days ago</div> : null}
            <div style={rowIn(t, 1.5)}><Row icon={File01Icon} mono a="order_confirm" b="Utility · English" right={<Chip tone="emerald" icon={CheckmarkCircle02Icon} size={21}>Approved</Chip>} /></div>
            <div style={rowIn(t, 2.1)}><Row icon={File01Icon} mono a="cod_to_prepaid" b="Utility · Hindi" right={<Chip tone="amber" dot size={21}>In review</Chip>} /></div>
            <div style={rowIn(t, 2.7)}><Row icon={File01Icon} color={C.rose} mono a="festive_promo_v1" b="Rejected: promotional content in a Utility template" right={<Chip tone="rose" size={21}>Rejected</Chip>} style={{ background: 'rgba(225,29,72,0.04)', boxShadow: '0 0 0 2px rgba(225,29,72,0.3)' }} /></div>
          </Card>
          {sat(spring(t, 3.5, 0.6, 0.16), <MetaToast title="3 templates synced" sub="Statuses straight from Meta" />, { right: -30, bottom: -66 }, '100% 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 1.7, 2.0))} s={1.8} />
    </div>
  );
}

/* ================================================================= 08-S2 */
export function MS2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const body = 'Hi {{1}}, your order {{2}} has shipped and arrives by {{3}}.';
  const typedBody = typed(body, t, 0.6, 26);
  const render = typedBody.split(/(\{\{\d\}\}?)/).map((p, i) => (/^\{\{\d/.test(p) ? <Tok key={i}>{p}</Tok> : <span key={i}>{p}</span>));
  const prev = spring(t, 3.0, 0.6, 0.15);
  const cur = cursorAt(t, [[3.6, 1300, h - 80], [4.2, 700, CY + 310], [4.6, 700, CY + 310], [5.4, 1300, h + 80]], [4.3]);
  const sub = prog(t, 4.35, 4.6);
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="orchid" pattern="mesh" w={W} h={h} />
      <Layer x={960} y={CY}>
        <div style={{ width: 1500, borderRadius: 30, background: '#fff', overflow: 'hidden', display: 'flex', boxShadow: '0 40px 90px -40px rgba(40,24,96,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
          <div style={{ flex: 1.1, padding: 38 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}><span style={{ flex: 1, fontSize: 34, fontWeight: 600 }}>Template studio</span><Chip size={22}>Utility</Chip></div>
            <div style={{ fontSize: 21, color: C.muted, marginBottom: 6 }}>Name</div>
            <div style={{ height: 60, borderRadius: 14, boxShadow: 'inset 0 0 0 1.5px rgba(16,24,40,0.12)', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 25, fontFamily: MONO }}>order_shipped</div>
            <div style={{ fontSize: 21, color: C.muted, margin: '16px 0 6px' }}>Body</div>
            <div style={{ minHeight: 140, borderRadius: 14, boxShadow: 'inset 0 0 0 2px rgba(124,58,237,0.5)', padding: '14px 16px', fontSize: 26, lineHeight: 1.6 }}>{render}</div>
            <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '0.12em', color: C.muted, margin: '16px 0 8px' }}>VARIABLES</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 21 }}><Tok>{'{{1}}'} first_name</Tok><Tok>{'{{2}}'} order_id</Tok><Tok>{'{{3}}'} delivery_date</Tok></div>
            <div style={{ marginTop: 20, position: 'relative', height: 64 }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 1 - sub }}><Pill kind="primary" size={24} icon={SentIcon} full press={cur.press}>Submit to Meta</Pill></div>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: sub }}><Chip tone="amber" dot size={24}>In review at Meta</Chip></div>
            </div>
          </div>
          <div style={{ flex: 0.9, background: C.waBg, padding: 34, backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>
            <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '0.12em', color: '#6B5E4E', marginBottom: 16 }}>PREVIEW</div>
            <div style={{ opacity: clamp(prev * 2), transform: `translateY(${lerp(20, 0, prev)}px)`, background: '#fff', borderRadius: 20, borderTopLeftRadius: 6, overflow: 'hidden', boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '16px 20px', fontSize: 27, lineHeight: 1.4 }}>Hi Rahul, your order #2204 has shipped and arrives by Friday.<div style={{ textAlign: 'right', fontSize: 17, color: '#667781' }}>10:30</div></div>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', height: 62, display: 'grid', placeItems: 'center', color: C.waLink, fontSize: 25, fontWeight: 500 }}>↗ Track order</div>
            </div>
          </div>
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 3.6, 3.85) * (1 - prog(t, 5.0, 5.4))} s={1.8} />
    </div>
  );
}

/* ================================================================= 08-S3 */
export function MS3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.3, 900, h - 80], [0.8, 760, CY - 245], [1.2, 760, CY - 245], [4.1, 1330, CY + 215], [4.6, 1330, CY + 215], [5.4, 1700, h + 80]], [0.9, 4.4]);
  const items: [ReactNode, string, string, string, number][] = [
    [<KurtaShot key="a" />, 'Rani pink silk kurta', 'In stock · 24', '₹2,499', 1.4],
    [<SerumShot key="b" />, 'Hydrating gel serum', 'In stock · 112', '₹729', 1.9],
    [<ShoeShot key="c" />, 'Cloudrun 2', 'Low stock · 3', '₹3,450', 2.4],
  ];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="ocean" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 1500, borderRadius: 30, background: '#fff', padding: 38, display: 'flex', gap: 34, boxShadow: '0 40px 90px -40px rgba(30,40,100,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
            <div style={{ flex: 1.3 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}><Icon icon={Store01Icon} size={34} color={C.ink} /><span style={{ flex: 1, fontSize: 34, fontWeight: 600, marginLeft: 14 }}>Catalog</span><Pill kind="secondary" size={22} press={cur.press * prog(t, 0.7, 0.8)} icon={RefreshIcon}>Refresh from Shopify</Pill></div>
              {items.map(([img, a, b, p, at]) => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '12px 14px', borderRadius: 18, boxShadow: `0 0 0 1.5px ${C.line}`, marginTop: 12, ...rowIn(t, at) }}>
                  <div style={{ width: 80, height: 80, borderRadius: 14, overflow: 'hidden' }}>{img}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 27, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 22, color: b.startsWith('Low') ? C.amber : C.muted }}>{b}</div></div>
                  <b style={{ fontSize: 28 }}>{p}</b>
                </div>
              ))}
            </div>
            <div style={{ flex: 0.8, background: C.sunk, borderRadius: 24, padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ padding: 12, background: '#fff', borderRadius: 16 }}><QR size={250} /></div>
              <div style={{ fontFamily: MONO, fontSize: 22 }}>wa.me/919000012345</div>
              <div style={{ fontSize: 21, color: C.muted }}>Opens a chat with your store</div>
              <Pill kind="primary" size={23} icon={Download04Icon} press={cur.press * prog(t, 4.3, 4.35)}>Download PNG</Pill>
            </div>
          </div>
          {sat(spring(t, 4.8, 0.6, 0.16), <Toast icon={QrCode01Icon} title="store-qr.png saved" sub="Print it on packaging and ads" size={29} />, { right: -30, bottom: -60 }, '100% 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 5.0, 5.4))} s={1.8} />
    </div>
  );
}

/* ================================================================= 10-H */
const WarrantyCard = () => (
  <div style={{ borderRadius: 12, background: 'linear-gradient(135deg,#0F766E,#134E4A)', color: '#fff', padding: '12px 14px', fontFamily: FONT }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon icon={Shield01Icon} size={18} color="#99F6E4" /><span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: '#99F6E4' }}>WARRANTY ACTIVE</span></div>
    <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6 }}>Air purifier X2</div>
    <div style={{ fontSize: 12, opacity: 0.85 }}>Serial AP2-48213 · till 12 Sep 2028</div>
  </div>
);
export function WH({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const bd = backdropState(t, 2.9);
  const off = phoneOffset(t, 3.05);
  const sweep = t > 0.9 && t < 1.9 ? (t - 0.9) / 1.0 : -1;
  const tapQR = { x: 1170, y: CY + 20, o: prog(t, 0.5, 0.7) * (1 - prog(t, 1.4, 1.6)), press: prog(t, 0.82, 0.9) * (1 - prog(t, 1.0, 1.1)), ripple: prog(t, 0.9, 1.4) };
  const m1 = spring(t, 3.8, 0.5, 0.15), m2 = spring(t, 5.0, 0.5, 0.15), m3 = spring(t, 7.6, 0.5, 0.15), m4 = spring(t, 8.7, 0.5, 0.15);
  const scroll = lerp(0, 140, prog(t, 7.4, 7.9, E.move)) + lerp(0, 140, prog(t, 8.5, 9.0, E.move));
  const qrPress = prog(t, 6.82, 6.9) * (1 - prog(t, 7.0, 7.1));
  const touch = phoneTouch(t, [[6.4, 7.3, 140, 448 - 0]], off);
  const fade = (k: number): CSSProperties => ({ opacity: clamp(k * 2), transform: `translateY(${lerp(16, 0, k)}px)`, marginTop: 8 });
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="mint" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY} s={bd.s} o={bd.o} blur={bd.blur} ry={-8}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 1100, height: 640, borderRadius: 26, background: 'linear-gradient(160deg,#FBFAF6,#ECE8DF)', boxShadow: '30px 0 0 -2px #D9D3C6, 0 50px 90px -40px rgba(30,40,30,0.5)', padding: 60, position: 'relative' }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 72, fontWeight: 600, color: '#0F766E', letterSpacing: '-0.03em' }}>aura</div>
            <div style={{ fontSize: 40, fontWeight: 600, marginTop: 6 }}>Air purifier X2</div>
            <div style={{ fontFamily: MONO, fontSize: 24, color: C.muted, marginTop: 14 }}>S/N AP2-48213</div>
            <div style={{ position: 'absolute', right: 60, top: 90, width: 380, background: '#fff', borderRadius: 22, padding: 26, boxShadow: '0 10px 30px -14px rgba(0,0,0,0.3)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}><QR size={250} sweep={sweep} /></div>
              <div style={{ fontSize: 25, fontWeight: 700, marginTop: 14 }}>Register your warranty</div>
              <div style={{ fontSize: 20, color: C.muted }}>Scan with your phone camera</div>
            </div>
          </div>
          {sat(spring(t, 1.8, 0.55, 0.16), <Toast icon={QrCode01Icon} title="Scanned" sub="Opening WhatsApp" size={29} dark />, { right: -20, bottom: -54 }, '100% 100%')}
        </div>
      </Layer>
      <Touch {...tapQR} />
      <PhoneRig offset={off} time="18:04">
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${screenY(1)}px)` }}>
          <WaScreen>
            <WaHeader name="Aura Home" letter="A" color="#0F766E" />
            <div style={{ position: 'absolute', top: 124 - scroll, left: 12, right: 12 }}>
              <DateChip />
              {m1 > 0 ? <div style={fade(m1)}><Bubble out time="18:04" read>Hi! I want to register my warranty. Serial AP2-48213</Bubble></div> : null}
              {m2 > 0 ? (
                <div style={fade(m2)}>
                  <Bubble time="18:04">Found it, Vikram. Air purifier X2 from order #1144, delivered 12 Sept. Register this one?</Bubble>
                  <div style={{ marginTop: 6, width: 240, height: 40, borderRadius: 10, background: `rgba(255,255,255,${1 - 0.25 * qrPress})`, display: 'grid', placeItems: 'center', color: C.waLink, fontSize: 15.5, fontWeight: 500, boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)' }}>Yes, register it</div>
                </div>
              ) : null}
              {m3 > 0 ? <div style={fade(m3)}><Bubble out time="18:05" read>Yes, register it</Bubble></div> : null}
              {m4 > 0 ? (
                <div style={fade(m4)}>
                  <div style={{ width: 290, background: '#fff', borderRadius: 14, borderTopLeftRadius: 4, padding: 6, boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)' }}>
                    <WarrantyCard />
                    <div style={{ padding: '8px 6px 2px', fontSize: 15.5, lineHeight: 1.38 }}>You're covered for 24 months. Reply CLAIM here any time you need help.<div style={{ textAlign: 'right', fontSize: 11.5, color: '#667781' }}>18:05</div></div>
                  </div>
                </div>
              ) : null}
            </div>
          </WaScreen>
        </div>
      </PhoneRig>
      {touch ? <Touch {...touch} /> : null}
      {sat(spring(t, 9.6, 0.6, 0.16), <Toast icon={Shield01Icon} title="Record created" sub="Warranty hub · Vikram Nair" size={31} />, { left: 1330, top: CY + 140 }, '0 50%')}
    </div>
  );
}

/* ================================================================= 10-S1 */
export function WS1({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.3, 1600, h - 80], [1.1, 1360, CY - 250], [1.5, 1360, CY - 250], [3.5, 1560, CY + 10], [3.8, 1560, CY + 10], [4.6, 1700, h + 80]], [1.2, 3.6]);
  const card = spring(t, 1.5, 0.6, 0.16) * (1 - prog(t, 3.9, 4.2));
  const ins = prog(t, 4.0, 4.5, E.move);
  const rows: [string, string, string, ReactNode][] = [
    ['Kavya Iyer', 'Air fryer 4L · #1150 · 12 months', '#0F766E', <Chip key="k" tone="emerald" dot size={20}>Active</Chip>],
    ['Nikhil Bansal', 'Mixer grinder · #1098', '#D97706', <Chip key="n" tone="amber" dot size={20}>Claim open</Chip>],
    ['Arjun Kapoor', 'Smart TV 43" · #1120', '#0284C7', <Chip key="a" tone="emerald" dot size={20}>Active</Chip>],
    ['Pooja Menon', 'Air purifier X2 · #1131', '#DB2777', <Chip key="p" size={20}>Expires in 30 days</Chip>],
  ];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="dusk" pattern="mesh" w={W} h={h} />
      <Layer x={960} y={CY} s={1.04}>
        <div style={{ position: 'relative' }}>
          <Card w={1100} pad={40}>
            <CardHeader icon={Shield01Icon} title="Warranty hub" size={36} right={<Pill kind="primary" size={23} press={cur.press * prog(t, 1.0, 1.1)}>+ New record</Pill>} />
            <div style={{ position: 'relative', height: 3 * 100 + 100 * ins }}>
              {rows.map(([n, d, col, chip], i) => (
                <div key={n} style={{ position: 'absolute', left: 0, right: 0, top: i === 0 ? 0 : (i - 1 + ins) * 100, ...(i === 0 ? rowIn(t, 4.1) : {}) }}>
                  <Row lead={<Avatar name={n} color={col} size={52} />} a={n} b={d} right={chip} style={{ marginTop: 0, background: i === 0 ? `rgba(5,150,105,${0.06 * (1 - prog(t, 6, 8))})` : '#fff' }} />
                </div>
              ))}
            </div>
          </Card>
          {sat(card, (
            <div style={{ width: 560, background: '#fff', borderRadius: 26, padding: 28, boxShadow: '0 30px 70px -24px rgba(16,24,40,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 14 }}>New record</div>
              {[['Customer', typed('Kavya Iyer', t, 1.9, 16)], ['Product', typed('Air fryer 4L · 12 months', t, 2.5, 22)]].map(([l, v]) => (
                <div key={l} style={{ marginBottom: 12 }}><div style={{ fontSize: 21, color: C.muted, marginBottom: 6 }}>{l}</div><div style={{ height: 58, borderRadius: 14, boxShadow: 'inset 0 0 0 1.5px rgba(16,24,40,0.14)', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 24 }}>{v}</div></div>
              ))}
              <Pill kind="primary" size={23} full press={cur.press * prog(t, 3.5, 3.55)}>Save</Pill>
            </div>
          ), { right: -60, top: -40 }, '100% 0')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.3, 0.55) * (1 - prog(t, 4.3, 4.6))} s={1.8} />
    </div>
  );
}

/* ================================================================= 10-S2 */
export function WS2({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[0.5, 1600, h - 80], [1.5, 1360, CY + 34], [1.9, 1360, CY + 34], [2.05, 1480, CY + 120], [2.4, 1480, CY + 120], [3.2, 1700, h + 80]], [1.6, 2.1]);
  const picker = spring(t, 1.65, 0.45, 0.16) * (1 - prog(t, 2.15, 2.35));
  const pk = pop(picker);
  const took = prog(t, 2.15, 2.4);
  const rows: [string, string, string][] = [['Harsh Vora', '#1141 · Water purifier · 13 Sep', '#0284C7'], ['Ritu Saxena', '#1140 · Air fryer · 11 Sep', '#DB2777'], ['Manish Gupta', '#1139 · Smart bulbs · 11 Sep', '#D97706']];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="rose" pattern="dots" w={W} h={h} />
      <Layer x={960} y={CY} s={1.05}>
        <div style={{ position: 'relative' }}>
          <Card w={1080} pad={40}>
            <CardHeader icon={InboxIcon} title="Unassigned" size={36} right={<Chip tone="amber" dot size={22}>{took > 0.5 ? 2 : 3} waiting</Chip>} />
            {rows.map(([n, d, col], i) => (
              <Row key={n} lead={<Avatar name={n} color={col} size={52} />} a={n} b={d} style={{ background: i === 1 ? C.sunk : '#fff', position: 'relative' }} right={i === 1 ? (
                <span style={{ position: 'relative', width: 170, height: 52, display: 'inline-block' }}>
                  <span style={{ position: 'absolute', right: 0, opacity: 1 - took }}><Pill kind="secondary" size={22} press={cur.press * prog(t, 1.5, 1.55)}>Assign</Pill></span>
                  <span style={{ position: 'absolute', right: 0, top: 6, opacity: took, display: 'inline-flex', alignItems: 'center', gap: 8, background: C.violetSoft, borderRadius: 99, padding: '4px 14px 4px 4px', fontSize: 21, fontWeight: 600, color: C.violet }}><Avatar name="Sana Qureshi" color="#7C3AED" size={34} />Sana</span>
                </span>
              ) : <Pill kind="secondary" size={22}>Assign</Pill>} />
            ))}
          </Card>
          {sat(picker, (
            <div style={{ width: 420, background: '#fff', borderRadius: 22, padding: 14, boxShadow: '0 30px 70px -24px rgba(16,24,40,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)', transform: `scale(${pk.s})` }}>
              {[['Sana Qureshi', 'Support', true], ['Karan Joshi', 'Ops', false]].map(([n, r, a]) => (
                <div key={n as string} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, borderRadius: 14, background: a ? C.violetSoft : 'transparent' }}><Avatar name={n as string} color="#7C3AED" size={44} /><div><div style={{ fontSize: 24, fontWeight: 600 }}>{n as string}</div><div style={{ fontSize: 20, color: C.muted }}>{r as string}</div></div></div>
              ))}
            </div>
          ), { right: -120, top: 260 }, '0 0')}
          {sat(spring(t, 2.8, 0.6, 0.16), <Toast icon={UserCheck01Icon} title="Sana took #1140" sub="Ritu gets a WhatsApp update" size={29} />, { right: -30, bottom: -60 }, '100% 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 0.5, 0.75) * (1 - prog(t, 2.9, 3.2))} s={1.8} />
    </div>
  );
}

/* ================================================================= 10-S3 */
export function WS3({ t }: { t: number }) {
  const { h } = useSize();
  const CY = h / 2;
  const cur = cursorAt(t, [[3.0, 1700, h - 80], [3.8, 1350, CY + 250], [4.2, 1350, CY + 250], [5.0, 1700, h + 80]], [3.9]);
  const auto = spring(t, 0.9, 0.5, 0.15);
  const done = prog(t, 3.95, 4.2);
  const fields: [string, string, number][] = [['Shopify order', '#1066 · Aman Verma', 1.4], ['Product', 'Air fryer 4L · 9 months left', 2.1], ['Teammate', 'Sana Qureshi', 2.8]];
  return (
    <div style={{ width: W, height: h, position: 'relative', fontFamily: FONT }}>
      <Backdrop t={t} palette="orchid" pattern="beams" w={W} h={h} />
      <Layer x={960} y={CY}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 1500, borderRadius: 30, background: '#fff', overflow: 'hidden', boxShadow: '0 40px 90px -40px rgba(40,24,96,0.4), 0 0 0 1.5px rgba(16,24,40,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '26px 34px', borderBottom: `1.5px solid ${C.line}` }}><Icon icon={Shield01Icon} size={34} color={C.ink} /><span style={{ flex: 1, fontSize: 34, fontWeight: 600 }}>New claim</span><Chip tone="amber" dot size={22}>Open</Chip></div>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, background: C.waBg, padding: 30, minHeight: 520, backgroundImage: 'radial-gradient(rgba(120,100,70,0.10) 1.2px, transparent 1.6px)', backgroundSize: '26px 26px' }}>
                <div style={{ display: 'inline-block', background: '#fff', borderRadius: 20, borderTopLeftRadius: 6, padding: '14px 18px', fontSize: 27 }}>CLAIM, my air fryer stopped heating 😕<div style={{ textAlign: 'right', fontSize: 17, color: '#667781' }}>10:12</div></div>
                {auto > 0 ? <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14, opacity: clamp(auto * 2) }}><div style={{ background: C.waOut, borderRadius: 20, borderTopRightRadius: 6, padding: '14px 18px', fontSize: 27, maxWidth: 560 }}>Sorry about that, Aman. Our team is on it, you'll hear back today.</div></div> : null}
              </div>
              <div style={{ flex: 1, padding: 34 }}>
                {fields.map(([l, v, at]) => (
                  <div key={l} style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 22, color: C.muted, marginBottom: 6 }}>{l}</div>
                    <div style={{ height: 62, borderRadius: 16, boxShadow: 'inset 0 0 0 1.5px rgba(16,24,40,0.14)', display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 26, fontWeight: 600 }}>{typed(v, t, at, 22)}</div>
                  </div>
                ))}
                <div style={{ position: 'relative', height: 66, marginTop: 8 }}>
                  <div style={{ position: 'absolute', inset: 0, opacity: 1 - done }}><Pill kind="primary" size={25} full press={cur.press}>Assign claim</Pill></div>
                  <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: done }}><Chip tone="emerald" icon={CheckmarkCircle02Icon} size={25}>Assigned to Sana</Chip></div>
                </div>
              </div>
            </div>
          </div>
          {sat(spring(t, 4.6, 0.6, 0.16), <Toast icon={Message01Icon} title="Aman notified" sub="Claim #W-208 on WhatsApp" size={29} />, { right: -30, bottom: -60 }, '100% 100%')}
        </div>
      </Layer>
      <Cursor x={cur.x} y={cur.y} press={cur.press} o={prog(t, 3.0, 3.25) * (1 - prog(t, 4.6, 5.0))} s={1.8} />
    </div>
  );
}

export const meta = {
  '08-H': { w: W, h: 1080, duration: 15, Component: MH },
  '08-T1': { w: T, h: T, duration: 7.5, Component: MT1 },
  '08-T2': { w: T, h: T, duration: 7.5, Component: MT2 },
  '08-T3': { w: T, h: T, duration: 7.5, Component: MT3 },
  '08-S1': { w: W, h: 1200, duration: 12.5, Component: MS1 },
  '08-S2': { w: W, h: 1200, duration: 12.5, Component: MS2 },
  '08-S3': { w: W, h: 1200, duration: 12.5, Component: MS3 },
  '10-H': { w: W, h: 1080, duration: 15, Component: WH },
  '10-S1': { w: W, h: 1200, duration: 12.5, Component: WS1 },
  '10-S2': { w: W, h: 1200, duration: 12.5, Component: WS2 },
  '10-S3': { w: W, h: 1200, duration: 12.5, Component: WS3 },
};
