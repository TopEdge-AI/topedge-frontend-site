/**
 * Launch films for the feature pages that have no home story: AI Brain, Meta
 * Manager, Chat Rules, Warranty. Same kit and rules as launch.tsx (12 s loops).
 */
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  AiBrain01Icon, CheckmarkCircle02Icon, Clock01Icon, CrownIcon, Key01Icon, MoneyReceive01Icon, PackageIcon, Route01Icon,
  Shield01Icon, UserIcon, WorkflowSquare01Icon, Megaphone01Icon,
} from '@hugeicons/core-free-icons';
import { E, clamp, lerp, prog, spring, typed } from '../lib/time';
import { Bubble, DISPLAY, DateChip, FONT, WaHeader, WaScreen } from '../lib/ui';
import { DoorbellShot } from '../lib/products';
import { KurtaShot } from '../lib/kit2';
import {
  Caption, DoneTick, FanIn, Figure, GlassIcon, GlassPill, GRAD, L, Obj, Panel, Phone3D, Ring, Space, Stage, Tag, Words,
  orbit, track, useLayout, win,
} from '../lib/launch';

const W = 1920;
const H = 1080;
const Ic = ({ icon, size = 30, color = '#fff' }: { icon: IconSvgElement; size?: number; color?: string }) => <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={1.9} />;
const Chat = ({ children }: { children: React.ReactNode }) => (
  <WaScreen>
    <WaHeader name="Rangrez Studio" letter="R" color="#7C3AED" />
    <div style={{ position: 'absolute', top: 128, left: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <DateChip />
      {children}
    </div>
  </WaScreen>
);
const pop = (k: number, dy = 30) => ({ opacity: clamp(k * 1.6), transform: `translateY(${(1 - k) * dy}px)` });

/* ================================================================= BRAIN */
const KEYS: [string, string][] = [['OpenAI', '#10A37F'], ['Claude', '#D97757'], ['Gemini', '#4F7CF7']];
export function LaunchBrain({ t }: { t: number }) {
  const P = useLayout().portrait;
  const deep = track(t, [[0, 1], [3.9, 1], [4.5, 0], [8.0, 0], [8.6, 1]]);
  const s1 = win(t, 0.1, 4.2, 0.5);
  const spread = spring(t, 0.3, 1.4, 0.1);
  const pick = prog(t, 2.4, 3.0, E.move);
  const s2 = win(t, 4.0, 8.4, 0.6);
  const rise = spring(t, 4.0, 1.3, 0.08);
  const q = spring(t, 4.7, 0.6, 0.2), a = spring(t, 5.8, 0.7, 0.2), j = spring(t, 7.0, 0.6, 0.2);
  const s3 = win(t, 8.2, 11.5, 0.6);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} deep={deep} />
      <Space cam={{ s: lerp(1, 1.05, prog(t, 0, 4, E.move)) }}>
        <Obj x={960} y={540} z={-40} o={s1}><div style={{ transform: `scale(${spread})` }}><Ring rx={520} ry={200} k={spread} /></div></Obj>
        {KEYS.map(([name, col], i) => {
          const p = orbit(i, 3, t, 520 * spread, 200 * spread, 0.25, 0.4);
          const chosen = i === 1;
          return (
            <Obj key={name} x={lerp(960 + p.x, chosen ? 960 : 960 + p.x, pick)} y={lerp(540 + p.y, chosen ? 330 : 540 + p.y, pick)} z={(p.depth - 0.5) * 360 * (1 - pick)} s={p.s} o={s1 * prog(t, 0.4 + i * 0.15, 0.9 + i * 0.15) * (chosen ? 1 : 1 - pick * 0.6)} dof={0.006}>
              <Tag dark size={30} tone={col}>{name}</Tag>
            </Obj>
          );
        })}
        <Obj x={960} y={540} z={60} o={s1} s={lerp(0.6, 1, spring(t, 0.2, 1, 0.2))}>
          <div style={{ display: 'grid', justifyItems: 'center', gap: 18 }}>
            <GlassIcon icon={Key01Icon} size={180} shine={prog(t, 2.6, 3.4)} />
            <div style={{ color: L.deepInk, fontSize: 30, fontWeight: 600, whiteSpace: 'nowrap', opacity: prog(t, 1.0, 1.5) }}>Your own key</div>
          </div>
        </Obj>
        <Obj x={960} y={800} o={s1 * prog(t, 3.0, 3.4)}><Caption dark>Model bills stay on your account</Caption></Obj>

        <Phone3D x={P ? 960 : 900} y={lerp(1350, 545, rise)} rx={lerp(28, 5, rise)} ry={lerp(-32, -12, rise) + prog(t, 4.8, 8.2, E.move) * 18} s={1.06} o={s2}>
          <Chat>
            <div style={pop(q)}><Bubble out read time="4:20 pm">is the silk kurta there in XL? can I wash it at home?</Bubble></div>
            <div style={pop(a, 40)}>
              <Bubble time="4:20 pm" maxW={300}>
                <div>Yes, XL is in stock at ₹3,450. Dry clean is best for silk; a gentle cold hand wash works too.</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>{['Catalog', 'Care policy'].map((c) => <span key={c} style={{ fontSize: 12, fontWeight: 600, color: '#6D28D9', background: '#F3EEFF', padding: '2px 8px', borderRadius: 6 }}>{c}</span>)}</div>
              </Bubble>
            </div>
            <div style={{ ...pop(j), display: 'flex', justifyContent: 'center' }}><span style={{ fontSize: 13, color: '#54656F', background: '#FFF7D6', borderRadius: 8, padding: '5px 10px' }}>Priya joined · AI paused</span></div>
          </Chat>
        </Phone3D>
        <Obj x={P ? 960 : 1420} y={P ? 70 : 380} z={200} o={s2 * prog(t, 6.2, 6.7)}><Tag tone={L.violet} icon={AiBrain01Icon} size={26}>Answered from your catalog</Tag></Obj>
        <Obj x={P ? 960 : 1420} y={P ? 1015 : 700} z={200} o={s2 * prog(t, 7.2, 7.7)}><Tag tone="#F59E0B" icon={UserIcon} size={26}>Steps back when an agent joins</Tag></Obj>

        <Obj x={960} y={460} z={lerp(-400, 0, prog(t, 8.2, 9.1, E.enter))} o={s3}><Figure value="₹0" size={220} dark /></Obj>
        <Obj x={960} y={640} o={s3 * prog(t, 8.9, 9.4)}><Caption dark>added by TopEdge to any AI reply</Caption></Obj>
        <Obj x={960} y={740} o={s3 * prog(t, 9.6, 10.1)} s={lerp(0.85, 1, spring(t, 9.6, 0.6, 0.3))}><GlassPill dark size={26} glow={0.4}>about ₹0.10 to ₹0.30 a reply on your bill</GlassPill></Obj>
      </Space>
    </div>
  );
}

/* ================================================================== META */
export function LaunchMeta({ t }: { t: number }) {
  const P = useLayout().portrait;
  const deep = track(t, [[0, 0], [5.9, 0], [6.5, 1], [11.0, 1], [11.6, 0]]);
  const s1 = win(t, 0.1, 6.2, 0.6);
  const body = typed('Hi {{1}}, your order {{2}} is confirmed. We will message you when it ships.', t, 0.8, 34);
  const status = t < 2.9 ? 0 : t < 4.3 ? 1 : 2;
  const st = [['Draft', '#E5E7EB', '#374151'], ['In review with Meta', '#FEF3C7', '#92400E'], ['Approved', '#DCFCE7', '#15803D']][status];
  const stamp = spring(t, 4.3, 0.6, 0.3);
  const s2 = win(t, 6.2, 11.4, 0.6);
  const fan = prog(t, 6.9, 7.9, E.move);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} deep={deep} />
      <Space cam={{ s: lerp(1, 1.04, prog(t, 0, 6, E.move)) }}>
        <Obj x={960} y={560} rx={lerp(18, 8, prog(t, 0, 6))} ry={lerp(-14, -4, prog(t, 0, 6))} z={lerp(-300, 0, spring(t, 0.1, 1.2, 0.05)) + prog(t, 5.6, 6.2, E.exit) * 800} o={s1} mb={prog(t, 5.6, 6.2) * 8} ms={0.82}>
          <Panel w={1000} r={32} pad={40}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 700, flex: 1, letterSpacing: '-0.02em' }}>order_confirmed</span>
              <span style={{ fontSize: 22, fontWeight: 600, padding: '6px 14px', borderRadius: 12, background: '#EDE9FE', color: L.violet }}>Utility</span>
              <span style={{ fontSize: 22, fontWeight: 700, padding: '6px 14px', borderRadius: 12, background: st[1], color: st[2], display: 'flex', alignItems: 'center', gap: 8 }}>
                {status === 1 ? <span style={{ width: 16, height: 16, borderRadius: 99, border: '3px solid #D97706', borderTopColor: 'transparent', transform: `rotate(${t * 400}deg)` }} /> : null}
                {st[0]}
              </span>
            </div>
            <div style={{ marginTop: 28, padding: 26, borderRadius: 22, background: '#F7F4FF', fontSize: 30, lineHeight: 1.45, minHeight: 170, color: L.ink }}>
              {body.split(/(\{\{\d\}\})/).map((part, i) => (/\{\{\d\}\}/.test(part) ? <span key={i} style={{ color: L.violet, fontWeight: 700, background: '#EDE9FE', borderRadius: 8, padding: '0 6px' }}>{part}</span> : <span key={i}>{part}</span>))}
              <span style={{ display: 'inline-block', width: 3, height: 34, background: L.violet, marginLeft: 3, verticalAlign: 'middle', opacity: t < 3 && Math.floor(t * 2.5) % 2 ? 1 : 0 }} />
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 22 }}>
              {['Track order', 'Talk to us'].map((b) => <span key={b} style={{ flex: 1, height: 64, borderRadius: 16, display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 600, color: '#0A84C6', boxShadow: 'inset 0 0 0 1.5px rgba(10,132,198,0.25)' }}>{b}</span>)}
            </div>
          </Panel>
        </Obj>
        <Obj x={P ? 960 : 1500} y={P ? 120 : 260} z={260} o={s1 * clamp(stamp * 2)} s={lerp(1.8, 1, prog(t, 4.3, 4.6, E.exit))} rz={-8}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 26px', borderRadius: 24, border: '4px solid #16A34A', color: '#15803D', background: 'rgba(255,255,255,0.92)', fontFamily: DISPLAY, fontWeight: 800, fontSize: 40, letterSpacing: '0.02em' }}><Ic icon={CheckmarkCircle02Icon} size={44} color="#16A34A" />APPROVED</div>
        </Obj>
        <Obj x={P ? 960 : 520} y={P ? 960 : 900} z={120} o={s1 * prog(t, 4.8, 5.2)}><Tag tone={L.violet} icon={Shield01Icon} size={24}>Nothing sends until Meta approves</Tag></Obj>

        {/* deep: the approved template feeds journeys and campaigns */}
        <Obj x={960} y={300} z={lerp(-300, 0, prog(t, 6.3, 7.1, E.enter))} o={s2}>
          <GlassPill dark size={32} glow={0.5} icon={<Ic icon={CheckmarkCircle02Icon} size={34} color="#86EFAC" />}>order_confirmed · approved</GlassPill>
        </Obj>
        {s2 > 0 ? <div style={{ position: 'absolute', left: 0, top: 0, opacity: s2 }}><FanIn from={[[960, 360], [960, 360]]} to={[620, 600]} k={fan} /><FanIn from={[[960, 360]]} to={[1300, 600]} k={fan} /></div> : null}
        {[[620, 'Journeys', WorkflowSquare01Icon, '₹0.1150', 'utility'], [1300, 'Campaigns', Megaphone01Icon, '₹0.8631', 'marketing']].map(([x, label, icon, price, cat], i) => (
          <Obj key={label as string} x={x as number} y={680} z={40} o={s2 * prog(t, 7.6 + i * 0.2, 8.1 + i * 0.2)} s={lerp(0.8, 1, spring(t, 7.6 + i * 0.2, 0.7, 0.25))}>
            <div style={{ display: 'grid', justifyItems: 'center', gap: 16 }}>
              <GlassIcon icon={icon as IconSvgElement} size={130} />
              <div style={{ color: L.deepInk, fontSize: 30, fontWeight: 700 }}>{label as string}</div>
              <div style={{ color: L.deepMute, fontSize: 23, whiteSpace: 'nowrap', opacity: prog(t, 9.0, 9.5) }}>{price as string} per {cat as string} message</div>
            </div>
          </Obj>
        ))}
        <Obj x={960} y={930} o={s2 * prog(t, 9.6, 10.1)}><Tag dark tone={L.green} size={26}>0% markup on Meta fees</Tag></Obj>
      </Space>
    </div>
  );
}

/* ================================================================= RULES */
const LANES: [string, string, string, string][] = [['COD', 'Ops', 'Rahul', '#FBBF24'], ['Refund', 'Support', 'Priya', '#F472B6'], ['VIP', 'VIP desk', 'Anjali', '#A78BFA']];
const INCOMING: [string, number][] = [['is COD available for pincode 411001?', 0], ['I want a refund for order #2190', 1], ['need help with my 6th order', 2], ['can I pay cash on delivery?', 0], ['refund still not received', 1], ['VIP early access link?', 2]];
export function LaunchRules({ t }: { t: number }) {
  const P = useLayout().portrait;
  const deep = track(t, [[0, 1], [7.4, 1], [8.0, 0], [11.0, 0], [11.6, 1]]);
  const s1 = win(t, 0.1, 7.7, 0.6);
  const s2 = win(t, 7.6, 11.5, 0.6);
  const laneY = (i: number) => (P ? 300 + i * 210 : 300 + i * 240);
  const hubX = P ? 960 : 860;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} deep={deep} bloom={[0.45, 0.5]} />
      <Space cam={{ s: lerp(1, 1.04, prog(t, 0, 7.5, E.move)) }}>
        {/* lanes */}
        {s1 > 0 ? <div style={{ position: 'absolute', left: 0, top: 0, opacity: s1 * prog(t, 0.6, 1.2) }}>{LANES.map((_, i) => <FanIn key={i} from={[[hubX, 540]]} to={[P ? 960 : 1400, laneY(i)]} k={prog(t, 0.8 + i * 0.15, 1.6 + i * 0.15)} pulse={t > 2 ? t * 0.5 : 0} />)}</div> : null}
        <Obj x={hubX} y={540} z={60} o={s1} s={lerp(0.6, 1, spring(t, 0.1, 1, 0.2))}>
          <div style={{ display: 'grid', justifyItems: 'center', gap: 14 }}><GlassIcon icon={Route01Icon} size={150} shine={(t * 0.4) % 1} /><div style={{ color: L.deepInk, fontSize: 26, fontWeight: 600 }}>Rules</div></div>
        </Obj>
        {LANES.map(([kw, team, who, col], i) => (
          <Obj key={kw} x={P ? 960 : 1500} y={P ? laneY(i) + (i - 1) * 0 : laneY(i)} z={0} o={s1 * prog(t, 1.2 + i * 0.15, 1.7 + i * 0.15) * (P ? 0 : 1)} ms={0.85}>
            <Panel dark w={380} r={26} pad="18px 22px">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ width: 58, height: 58, borderRadius: 99, background: col, color: '#1B1340', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 22 }}>{who[0]}</span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 26, fontWeight: 700 }}>{who} · {team}</div><div style={{ fontSize: 20, color: L.deepMute }}>“{kw}” chats</div></div>
                <span style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: col }}>{INCOMING.filter(([, l], k) => l === i && t > 2.2 + k * 0.75 + 0.9).length}</span>
              </div>
            </Panel>
          </Obj>
        ))}
        {INCOMING.map(([text, lane], k) => {
          const at = 2.2 + k * 0.75;
          const a = prog(t, at, at + 0.5, E.enter), b = prog(t, at + 0.5, at + 1.0, E.move);
          const sx = P ? 960 : 330, sy = P ? 1000 : 540;
          const x = b > 0 ? lerp(hubX, P ? 960 : 1500, b) : lerp(sx - 200, hubX, a);
          const y = b > 0 ? lerp(540, laneY(lane), b) : lerp(sy + (k % 2 ? 60 : -60), 540, a);
          return (
            <Obj key={k} x={x} y={y} z={b > 0 ? 100 : 40} s={b > 0 ? lerp(0.32, 0.4, b) : lerp(0.95, 0.32, a)} o={s1 * clamp(a * 3) * (1 - prog(t, at + 0.8, at + 1.0))} mb={Math.sin(Math.max(a < 1 ? a : b, 0) * Math.PI) * 3}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 20, borderTopLeftRadius: 6, background: '#fff', color: '#111B21', fontSize: 26, whiteSpace: 'nowrap', boxShadow: `0 0 0 3px ${LANES[lane][3]}, 0 20px 40px -14px rgba(0,0,0,0.55)` }}>{text}</div>
            </Obj>
          );
        })}
        {/* inbox */}
        <Obj x={960} y={560} rx={lerp(18, 10, prog(t, 7.6, 11))} ry={lerp(-12, -4, prog(t, 7.6, 11))} z={lerp(-400, 0, prog(t, 7.6, 8.6, E.enter))} o={s2} ms={0.82}>
          <Panel w={1100} r={32} pad={36}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em' }}>Inbox</span>
              <span style={{ fontSize: 23, color: L.mute }}>every chat already with the right person</span>
            </div>
            {INCOMING.slice(0, 4).map(([text, lane], k) => {
              const kk = prog(t, 8.2 + k * 0.25, 8.7 + k * 0.25);
              return (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 18px', borderRadius: 16, background: '#F7F4FF', marginTop: 10, opacity: kk, transform: `translateY(${(1 - kk) * 16}px)` }}>
                  <span style={{ fontSize: 19, fontWeight: 700, padding: '4px 12px', borderRadius: 10, background: LANES[lane][3] + '33', color: '#4C1D95', width: 100, textAlign: 'center' }}>{LANES[lane][0]}</span>
                  <span style={{ flex: 1, fontSize: 24, color: L.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 600, color: L.ink2 }}><span style={{ width: 34, height: 34, borderRadius: 99, background: LANES[lane][3], display: 'grid', placeItems: 'center', fontSize: 15, fontWeight: 800, color: '#1B1340' }}>{LANES[lane][2][0]}</span>{LANES[lane][2]}</span>
                </div>
              );
            })}
          </Panel>
        </Obj>
        <Obj x={960} y={P ? 960 : 950} z={200} o={s2 * prog(t, 9.6, 10.1)}><Tag tone={L.green} icon={CheckmarkCircle02Icon} size={26}>0 chats waiting to be assigned</Tag></Obj>
      </Space>
    </div>
  );
}

/* ============================================================== WARRANTY */
export function LaunchWarranty({ t }: { t: number }) {
  const P = useLayout().portrait;
  const deep = track(t, [[0, 0], [6.6, 0], [7.2, 1], [11.0, 1], [11.6, 0]]);
  const s1 = win(t, 0.1, 6.9, 0.6);
  const rise = spring(t, 0.2, 1.4, 0.06);
  const otp = '4829'.slice(0, Math.max(0, Math.min(4, Math.floor((t - 2.4) * 5))));
  const done = t > 3.6;
  const s2 = win(t, 6.8, 11.5, 0.6);
  const states = ['Claim opened', 'Assigned to Rahul', 'Replacement shipped'];
  const stage = t < 8.4 ? 0 : t < 9.4 ? 1 : 2;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} deep={deep} />
      <Space cam={{ s: lerp(1, 1.04, prog(t, 0, 6.8, E.move)) }}>
        <Obj x={P ? 960 : 520} y={P ? 120 : 520} z={-80} o={s1 * prog(t, 0.3, 0.9)} ry={P ? 0 : 18} ms={P ? 0.5 : 1}>
          <Panel w={420} r={30} pad={18} style={{ overflow: 'hidden' }}>
            <div style={{ height: 300, borderRadius: 20, overflow: 'hidden' }}><DoorbellShot /></div>
            <div style={{ padding: '16px 8px 6px', fontSize: 26, fontWeight: 700 }}>Smart video doorbell<div style={{ fontSize: 21, color: L.mute, fontWeight: 500 }}>Order #2204 · 1-year warranty</div></div>
          </Panel>
        </Obj>
        <Phone3D x={P ? 960 : 1180} y={lerp(1350, 545, rise)} rx={lerp(28, 5, rise)} ry={lerp(-30, -12, rise) + prog(t, 1.4, 6.6, E.move) * 16} s={1.04} o={s1} mb={prog(t, 6.3, 6.9) * 6}>
          <div style={{ position: 'absolute', inset: 0, background: '#fff', fontFamily: FONT, color: L.ink, padding: '80px 22px 0' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: L.violet, letterSpacing: '0.08em' }}>RANGREZ HOME</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 27, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 6 }}>{done ? 'Warranty registered' : 'Register your warranty'}</div>
            {!done ? (
              <>
                <div style={{ marginTop: 18, fontSize: 14, color: L.mute }}>WhatsApp number</div>
                <div style={{ marginTop: 6, height: 48, borderRadius: 12, boxShadow: 'inset 0 0 0 1.5px rgba(20,15,46,0.15)', display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 17, fontWeight: 600 }}>+91 90000 12345</div>
                <div style={{ marginTop: 18, fontSize: 14, color: L.mute }}>Code sent on WhatsApp</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  {[0, 1, 2, 3].map((i) => <span key={i} style={{ width: 58, height: 64, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 700, boxShadow: `inset 0 0 0 ${otp.length === i ? 2.5 : 1.5}px ${otp.length === i ? L.violet : 'rgba(20,15,46,0.15)'}` }}>{otp[i] ?? ''}</span>)}
                </div>
                <div style={{ marginTop: 24, height: 54, borderRadius: 30, background: GRAD, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 600 }}>Verify and register</div>
              </>
            ) : (
              <div style={{ marginTop: 30, display: 'grid', justifyItems: 'center', gap: 16 }}>
                <DoneTick k={prog(t, 3.6, 4.4)} size={110} />
                <div style={{ width: '100%', borderRadius: 16, background: '#F7F4FF', padding: 16, fontSize: 15, lineHeight: 1.6, opacity: prog(t, 4.2, 4.7) }}>
                  <div><b>Smart video doorbell</b></div><div>Order #2204</div><div>Covered till 12 Nov 2027</div>
                </div>
              </div>
            )}
          </div>
        </Phone3D>
        <Obj x={P ? 960 : 1180} y={P ? 1015 : 130} z={60} o={s1 * prog(t, 4.6, 5.1)}><Tag tone={L.green} icon={Shield01Icon} size={24}>No app, no login, just a WhatsApp code</Tag></Obj>

        {/* deep: the claim moves through the hub */}
        <Obj x={960} y={480} z={lerp(-400, 0, prog(t, 6.9, 7.8, E.enter))} o={s2} ms={0.85}>
          <Panel dark w={900} r={32} pad={38}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <GlassIcon icon={PackageIcon} size={84} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 34, fontWeight: 700 }}>Claim #W-118 · Doorbell</div><div style={{ fontSize: 22, color: L.deepMute }}>Order #2204 · Riya Sharma · registered 3 Mar</div></div>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
              {states.map((s, i) => {
                const on = stage >= i;
                return <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderRadius: 16, background: on ? 'rgba(139,92,246,0.35)' : 'rgba(255,255,255,0.06)', boxShadow: on && stage === i ? '0 0 30px rgba(167,139,250,0.6), inset 0 0 0 1.5px rgba(221,214,254,0.6)' : 'inset 0 0 0 1px rgba(196,181,253,0.2)', fontSize: 21, fontWeight: 600, color: on ? '#fff' : L.deepMute }}><Ic icon={i === 0 ? Clock01Icon : i === 1 ? UserIcon : CheckmarkCircle02Icon} size={24} color={on ? '#fff' : '#8B84B0'} />{s}</div>;
              })}
            </div>
          </Panel>
        </Obj>
        <Obj x={960} y={760} o={s2 * prog(t, 9.8, 10.3)}><Caption dark>1,000 registrations cost about ₹115 in Meta fees</Caption></Obj>
      </Space>
    </div>
  );
}

export const launch3 = {
  'L-brain': { w: W, h: H, duration: 12, Component: LaunchBrain },
  'L-meta': { w: W, h: H, duration: 12, Component: LaunchMeta },
  'L-rules': { w: W, h: H, duration: 12, Component: LaunchRules },
  'L-warranty': { w: W, h: H, duration: 12, Component: LaunchWarranty },
};
void [CrownIcon, MoneyReceive01Icon, KurtaShot, Words];
