/**
 * Home-page launch films, part 1 (16:9, 1920x1080, 12 s loops): cart, campaigns,
 * opt-in, pixel, COD. Built from the launch kit: Air / Deep stages, one short
 * kinetic line at most, glass objects in a 3D space, one payoff per film.
 */
import {
  BrowserIcon, BubbleChatIcon, CheckmarkCircle02Icon, Clock01Icon, EyeIcon, FlashIcon, QrCodeIcon,
  ShoppingBag01Icon, ShoppingCart01Icon, Ticket01Icon, UserGroupIcon, Logout01Icon, CreditCardIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import { SiWhatsapp } from 'react-icons/si';
import { E, clamp, lerp, prog, spring, typed } from '../lib/time';
import { Bubble, DISPLAY, DateChip, FONT, TemplateBubble, WaHeader, WaScreen } from '../lib/ui';
import { KurtaShot, inr } from '../lib/kit2';
import { ShirtShot } from '../lib/products';
import { SuccessPage } from '../lib/rig';
import {
  Caption, Confetti, DoneTick, FanIn, Figure, GlassIcon, GlassPill, GRAD, Hand, L, Obj, Panel, Parcel, Phone3D, Ping, Ring,
  Ribbon, Space, Sparkle, Stage, Tag, TouchAt, Words, handAt, useLayout, onPhone, orbit, track, win,
} from '../lib/launch';

const W = 1920;
const H = 1080;
const rnd = (i: number, s = 1) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const tapK = (t: number, at: number) => prog(t, at - 0.1, at) * (1 - prog(t, at + 0.15, at + 0.3));

/* ================================================================== CART */
export function LaunchCart({ t }: { t: number }) {
  const P = useLayout().portrait;
  const deep = track(t, [[0, 0], [2.7, 0], [3.3, 1], [7.0, 1], [7.6, 0]]);
  const s1 = win(t, 0.15, 3.0, 0.5);
  const cartIn = spring(t, 0.15, 0.9, 0.18);
  const away = prog(t, 2.0, 3.0, E.exit);
  const drop = prog(t, 0.75, 1.5, E.move);
  const badge = spring(t, 1.45, 0.5, 0.35);

  const ph = win(t, 3.0, 7.35, 0.7);
  const rise = spring(t, 3.0, 1.5, 0.06);
  const msg = spring(t, 3.9, 0.7, 0.2);
  const tapAt = 5.35;
  const phX = 1000, phS = 1.08;
  const phY = lerp(1400, 545, rise);
  const phZ = prog(t, 6.9, 7.4, E.exit) * 800;
  const ry = lerp(-38, -16, rise) + prog(t, 4.6, 5.2, E.move) * 16 + prog(t, 5.9, 7.2, E.move) * 12;

  const s3 = win(t, 7.3, 11.3, 0.6);
  const fill = prog(t, 7.8, 9.2, E.move);
  const done = prog(t, 9.15, 9.9, E.enter);
  const tp = onPhone(phX, phY, phS, 195, 680);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} w={W} h={H} deep={deep} />
      <Space w={W} h={H} cam={{ s: lerp(1, 1.04, t / 12), ry: Math.sin(t * 0.35) * 1.2 }}>
        <Obj x={960} y={370} o={s1}>
          <Words t={t} at={0.3} out={2.2} parts={[['Left'], ['in', 'm'], ['the', 'm'], ['cart', 'a']]} size={80} />
        </Obj>
        <Obj x={lerp(960, 1560, away)} y={lerp(650, 560, away)} z={lerp(-200, 0, cartIn) - away * 900} rz={lerp(-8, 0, cartIn) + away * 14} s={lerp(0.6, 1, cartIn)} o={s1 * clamp(cartIn * 2)} mb={away * 10}>
          <div style={{ position: 'relative' }}>
            <GlassIcon icon={ShoppingCart01Icon} size={240} shine={prog(t, 1.5, 2.3)} />
            <div style={{ position: 'absolute', right: -20, top: -20, width: 70, height: 70, borderRadius: 99, background: '#fff', color: L.violet, fontFamily: DISPLAY, fontWeight: 700, fontSize: 36, display: 'grid', placeItems: 'center', boxShadow: '0 10px 24px -6px rgba(76,29,149,0.5)', transform: `scale(${badge})` }}>1</div>
          </div>
        </Obj>
        <Obj x={lerp(470, 960, drop)} y={lerp(760, 640, drop) - Math.sin(drop * Math.PI) * 120} z={lerp(80, -60, drop)} rz={lerp(-14, 8, drop)} ry={lerp(26, 0, drop)} s={lerp(1, 0.22, drop)} o={win(t, 0.2, 1.55, 0.3)}>
          <div style={{ width: 250, height: 300, borderRadius: 26, overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(76,29,149,0.45), inset 0 0 0 1.5px rgba(255,255,255,0.8)', background: '#fff' }}>
            <div style={{ height: 222 }}><KurtaShot /></div>
            <div style={{ padding: '12px 16px', fontWeight: 600, fontSize: 21, color: L.ink }}>Silk kurta<div style={{ fontSize: 18, color: L.mute, fontWeight: 500 }}>₹3,450</div></div>
          </div>
        </Obj>

        <Obj x={P ? 960 : 590} y={P ? 70 : 430} z={200} o={ph * prog(t, 4.5, 5.1)}>
          <Tag dark tone={L.wa}>Sent 30 min after exit</Tag>
        </Obj>
        <Obj x={P ? 960 : 1400} y={P ? 1015 : 720} z={200} o={ph * prog(t, 4.8, 5.4)}>
          <Tag dark tone="#F472B6">10% off for 1 hour</Tag>
        </Obj>
        <Phone3D x={phX} y={phY} z={phZ} rx={lerp(30, 6, rise)} ry={ry} rz={lerp(6, 0, rise)} s={phS} o={ph} mb={phZ * 0.01}>
          {t < 5.85 ? (
            <WaScreen>
              <WaHeader name="Rangrez Studio" letter="R" color="#7C3AED" />
              <div style={{ position: 'absolute', top: 128, left: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <DateChip />
                <div style={{ opacity: clamp(msg * 1.6), transform: `translateY(${(1 - msg) * 40}px) scale(${lerp(0.9, 1, msg)})`, transformOrigin: '0 0' }}>
                  <TemplateBubble media={<KurtaShot tag="10% off" />} title="Still thinking it over?" body="Your silk kurta is saved. Finish in the next hour and 10% comes off." time="7:42 pm" cta="Complete order" ctaPress={tapK(t, tapAt)} />
                </div>
              </div>
            </WaScreen>
          ) : (
            <SuccessPage t={t} at={5.9} order="Order #2204 · ₹3,105" chip="Paid by UPI" />
          )}
        </Phone3D>
        {t > 4.8 && t < 5.9 ? <TouchAt {...tp} o={win(t, 4.8, 5.9, 0.2)} press={tapK(t, tapAt)} ripple={prog(t, tapAt, tapAt + 0.5)} size={60} /> : null}

        <Obj x={960} y={470} z={lerp(-300, 0, prog(t, 7.3, 8.2, E.enter))} o={s3}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 * clamp(done * 3) }}>
            <div style={{ width: 150 * clamp(done * 2), display: 'grid', placeItems: 'center', transform: `scale(${spring(t, 9.15, 0.6, 0.3)})` }}>{done > 0 ? <DoneTick k={done} size={140} /> : null}</div>
            <Figure value={`₹${inr(Math.round(3105 * fill))}`} size={190} />
          </div>
        </Obj>
        <Obj x={960} y={650} o={s3} ms={0.9}><Ribbon k={fill} w={980} h={40} appear={prog(t, 7.4, 8.1, E.enter)} /></Obj>
        <Obj x={960} y={735} o={s3 * prog(t, 8.0, 8.6)}><Caption>Recovered on WhatsApp</Caption></Obj>
      </Space>
      <Confetti t={t} at={9.25} x={960} y={470} />
    </div>
  );
}

/* ============================================================= CAMPAIGNS */
const DIWALI = (tag?: string) => <KurtaShot tag={tag} />;
function CampaignPhone({ t, at, order }: { t: number; at: number; order: number }) {
  const m = spring(t, at, 0.7, 0.2);
  return (
    <WaScreen>
      <WaHeader name="Rangrez Studio" letter="R" color="#7C3AED" />
      <div style={{ position: 'absolute', top: 128, left: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <DateChip />
        <div style={{ opacity: clamp(m * 1.6), transform: `translateY(${(1 - m) * 40}px)` }}>
          <TemplateBubble media={DIWALI('Diwali')} title="The Diwali edit is here" body="Silk kurtas from ₹2,499. Early access for you till Sunday." time="6:00 pm" cta="Shop the edit" ctaPress={tapK(t, order)} />
        </div>
      </div>
    </WaScreen>
  );
}
export function LaunchCampaigns({ t }: { t: number }) {
  const deep = track(t, [[0, 1], [4.3, 1], [4.9, 0], [8.1, 0], [8.7, 1]]);
  // shot 1: the send button
  const s1 = win(t, 0.1, 2.9, 0.5);
  const press = 1.9;
  const hand = handAt(t, [[0.6, 1500, 980], [1.7, 990, 556], [2.4, 1060, 640]], [press]);
  const lit = prog(t, press, press + 0.3);
  // shot 2: messages burst towards the camera
  const s2 = win(t, 2.0, 4.8, 0.4);
  const sent = Math.round(2418 * prog(t, 2.3, 4.2, E.move));
  // shot 3: three phones
  const s3 = win(t, 4.5, 8.5, 0.6);
  const fan = spring(t, 4.5, 1.3, 0.08);
  // shot 4: revenue
  const s4 = win(t, 8.3, 11.4, 0.6);
  const rev = prog(t, 8.7, 10.0, E.move);

  const frag = (x: number, y: number, z: number, child: React.ReactNode, i: number) => (
    <Obj key={i} x={x + Math.sin(t * 0.5 + i) * 10} y={y + Math.cos(t * 0.4 + i) * 8} z={z} o={s1 * prog(t, 0.4 + i * 0.12, 1.0 + i * 0.12)} dof={0.004}>{child}</Obj>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} w={W} h={H} deep={deep} />
      <Space w={W} h={H} cam={{ s: lerp(1, 1.05, prog(t, 0, 2.6, E.move)) * lerp(1, 0.96, prog(t, 4.5, 8.5, E.linear)), rx: Math.sin(t * 0.3) * 1 }}>
        {/* shot 1 */}
        {frag(500, 300, -200, <Tag dark size={26} icon={UserGroupIcon}>8,904 shoppers</Tag>, 0)}
        {frag(1440, 320, -120, <Tag dark size={26} tone={L.wa} icon={CheckmarkCircle02Icon}>Template approved</Tag>, 1)}
        {frag(1420, 780, -260, <Tag dark size={26} icon={Clock01Icon}>Today, 6:00 pm</Tag>, 2)}
        {frag(540, 770, -160, <Tag dark size={26} tone="#F472B6">₹0.88 a message, no markup</Tag>, 3)}
        <Obj x={960} y={540} z={lerp(-400, 0, spring(t, 0.1, 1.0, 0.12)) + prog(t, 2.2, 2.9, E.exit) * 900} o={s1} mb={prog(t, 2.2, 2.9) * 8}>
          <GlassPill dark size={40} press={tapK(t, press)} glow={lit} solid={lit > 0.5} icon={<span style={{ display: 'grid', placeItems: 'center' }}><svg width="40" height="40" viewBox="0 0 24 24"><path d="M3 10v4h3l5 4V6L6 10H3zm13 2a4 4 0 00-2-3.5v7A4 4 0 0016 12z" fill={lit > 0.5 ? '#fff' : '#C4B5FD'} /></svg></span>}>Send Diwali campaign</GlassPill>
        </Obj>
        <Ping t={t} at={press} x={990} y={556} dark />
        {/* shot 2 */}
        {s2 > 0 ? Array.from({ length: 34 }, (_, i) => {
          const a = rnd(i, 1) * Math.PI * 2, r = 560 + rnd(i, 2) * 420;
          const st = 2.15 + rnd(i, 3) * 1.2;
          const k = prog(t, st, st + 1.6, E.linear);
          if (k <= 0 || k >= 1) return null;
          const z = lerp(-1500, 180, k);
          return (
            <Obj key={i} x={960 + Math.cos(a) * r * lerp(0.3, 1, k)} y={540 + Math.sin(a) * r * 0.62 * lerp(0.3, 1, k)} z={z} o={s2 * clamp(k * 5) * clamp((1 - k) * 4)} dof={0.008}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 18, background: 'rgba(255,255,255,0.95)', boxShadow: '0 16px 40px -10px rgba(0,0,0,0.5)', fontWeight: 600, fontSize: 22, color: L.ink, whiteSpace: 'nowrap' }}>
                <span style={{ width: 34, height: 34, borderRadius: 99, background: L.wa, display: 'grid', placeItems: 'center' }}><SiWhatsapp size={20} color="#fff" /></span>
                The Diwali edit is here
              </div>
            </Obj>
          );
        }) : null}
        <Obj x={960} y={520} z={300} o={s2 * prog(t, 2.5, 3.0)}>
          <div style={{ textAlign: 'center', padding: '30px 70px', borderRadius: 60, background: 'radial-gradient(closest-side, rgba(11,8,32,0.85), rgba(11,8,32,0))' }}><Figure value={inr(sent)} size={170} dark /><Caption dark>messages delivered</Caption></div>
        </Obj>
        {/* shot 3 */}
        {[-1, 0, 1].map((p, i) => {
          const tap = 6.0 + i * 0.55;
          return (
            <Phone3D key={p} x={960 + p * 470 * fan} y={lerp(1300, 560, spring(t, 4.5 + i * 0.12, 1.3, 0.08)) + Math.abs(p) * 40} z={-Math.abs(p) * 220} ry={-p * 28 * fan + Math.sin(t * 0.5) * 3} rx={6} rz={p * 4} s={0.84} o={s3}>
              {t < tap + 0.45 ? <CampaignPhone t={t} at={4.9 + i * 0.2} order={tap} /> : <SuccessPage t={t} at={tap + 0.5} order={`Order #${2211 + i * 7}`} chip={['₹2,499', '₹3,105', '₹4,950'][i]} title="Order placed" />}
            </Phone3D>
          );
        })}
        {[0, 1, 2].map((i) => (
          <Obj key={i} x={960 + (i - 1) * 470} y={170 + (i === 1 ? -20 : 30)} z={160} o={s3 * prog(t, 6.6 + i * 0.55, 7.0 + i * 0.55)} s={lerp(0.8, 1, spring(t, 6.6 + i * 0.55, 0.6, 0.3))}>
            <Tag tone={L.green} icon={ShoppingBag01Icon}>{['₹2,499', '₹3,105', '₹4,950'][i]} order</Tag>
          </Obj>
        ))}
        {/* shot 4 */}
        <Obj x={960} y={470} z={lerp(-400, 0, prog(t, 8.3, 9.2, E.enter))} o={s4}><Figure value={`₹${inr(Math.round(184200 * rev))}`} size={200} dark /></Obj>
        <Obj x={960} y={630} o={s4 * prog(t, 9.0, 9.5)}><Caption dark>revenue from one campaign, after Meta fees</Caption></Obj>
        <Obj x={960} y={730} o={s4 * prog(t, 9.8, 10.3)} s={lerp(0.85, 1, spring(t, 9.8, 0.6, 0.3))}><GlassPill dark size={26} glow={0.4}>88× return on message fees</GlassPill></Obj>
      </Space>
      {hand.x ? <Hand x={hand.x} y={hand.y} press={hand.press} o={win(t, 0.6, 2.6, 0.3)} /> : null}
    </div>
  );
}

/* =================================================================== COD */
export function LaunchCod({ t }: { t: number }) {
  const P = useLayout().portrait;
  const deep = track(t, [[0, 0], [3.5, 0], [4.1, 1], [7.7, 1], [8.3, 0]]);
  const s1 = win(t, 0.1, 3.9, 0.5);
  const boxIn = spring(t, 0.1, 1.2, 0.15);
  const s2 = win(t, 3.6, 8.0, 0.6);
  const rise = spring(t, 3.6, 1.4, 0.06);
  const m = spring(t, 4.4, 0.7, 0.2);
  const tapAt = 6.0;
  const phX = 960, phY = lerp(1350, 545, rise), phS = 1.06;
  const tp = onPhone(phX, phY, phS, 195, 562);
  const s3 = win(t, 7.8, 11.5, 0.6);
  const stampAt = 8.9;
  const stamp = prog(t, stampAt - 0.05, stampAt + 0.05);
  const shake = t > stampAt && t < stampAt + 0.4 ? Math.sin((t - stampAt) * 60) * (1 - (t - stampAt) / 0.4) * 8 : 0;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT }}>
      <Stage t={t} w={W} h={H} deep={deep} />
      <Space w={W} h={H}>
        <Obj x={960} y={250} o={s1}><Words t={t} at={0.4} out={3.1} parts={[['Cash'], ['on', 'm'], ['delivery?', 'a']]} size={78} /></Obj>
        <Obj x={960} y={lerp(700, 620, boxIn)} z={lerp(-300, 0, boxIn) + prog(t, 3.2, 3.9, E.exit) * 600} o={s1} mb={prog(t, 3.2, 3.9) * 8}>
          <Parcel size={300} rx={-16} ry={28 + t * 12} />
        </Obj>
        <Obj x={P ? 960 : 1430} y={P ? 900 : 800} z={120} o={s1 * prog(t, 1.4, 1.9)}><Tag tone="#F87171">1 in 4 COD orders comes back</Tag></Obj>

        <Obj x={P ? 960 : 560} y={P ? 70 : 420} z={200} o={s2 * prog(t, 5.0, 5.5)}><Tag dark tone={L.wa}>Sent the moment the order lands</Tag></Obj>
        <Obj x={P ? 960 : 1390} y={P ? 1015 : 700} z={200} o={s2 * prog(t, 5.3, 5.8)}><Tag dark tone="#FBBF24">₹50 off for paying now</Tag></Obj>
        <Phone3D x={phX} y={phY} rx={lerp(30, 5, rise)} ry={lerp(-36, -14, rise) + prog(t, 5.0, 5.8, E.move) * 14 + prog(t, 6.6, 7.8, E.move) * 10} rz={lerp(6, 0, rise)} s={phS} o={s2} mb={prog(t, 7.4, 8.0) * 6}>
          {t < 6.5 ? (
            <WaScreen>
              <WaHeader name="Rangrez Studio" letter="R" color="#7C3AED" />
              <div style={{ position: 'absolute', top: 128, left: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <DateChip />
                <div style={{ width: 300, background: '#fff', borderRadius: 14, borderTopLeftRadius: 4, boxShadow: '0 1px 1.5px rgba(0,0,0,0.1)', overflow: 'hidden', opacity: clamp(m * 1.6), transform: `translateY(${(1 - m) * 40}px)` }}>
                  <div style={{ padding: '10px 12px 6px', color: '#111B21' }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>Confirm order #2231</div>
                    <div style={{ fontSize: 15.5, lineHeight: 1.38, marginTop: 4 }}>Silk kurta set, ₹1,849 cash on delivery. Pay now by UPI and it's ₹1,799.</div>
                    <div style={{ textAlign: 'right', fontSize: 11.5, color: '#667781', marginTop: 3 }}>2:14 pm</div>
                  </div>
                  {['Pay ₹1,799 by UPI', 'Confirm cash on delivery'].map((b, i) => (
                    <div key={b} style={{ borderTop: '1px solid rgba(0,0,0,0.07)', height: 46, display: 'grid', placeItems: 'center', color: '#0A84C6', fontSize: 16, fontWeight: 500, background: i === 0 ? `rgba(10,132,198,${0.14 * tapK(t, tapAt)})` : undefined }}>{b}</div>
                  ))}
                </div>
              </div>
            </WaScreen>
          ) : (
            <SuccessPage t={t} at={6.55} order="₹1,799 paid · order #2231" chip="Prepaid, ₹50 saved" />
          )}
        </Phone3D>
        {t > 5.4 && t < 6.5 ? <TouchAt {...tp} o={win(t, 5.4, 6.5, 0.2)} press={tapK(t, tapAt)} ripple={prog(t, tapAt, tapAt + 0.5)} size={58} /> : null}

        <Obj x={960 + shake} y={500} z={lerp(-300, 0, prog(t, 7.8, 8.6, E.enter))} o={s3}>
          <Parcel size={300} rx={-14} ry={lerp(-30, -18, prog(t, 7.8, 11))} stamp={stamp} stampS={lerp(2.2, 1, prog(t, stampAt - 0.12, stampAt + 0.02, E.exit))} />
        </Obj>
        <Obj x={960} y={850} o={s3 * prog(t, 9.3, 9.8)}><Tag tone={L.violet} icon={CreditCardIcon} size={26}>Prepaid before it ships</Tag></Obj>
      </Space>
    </div>
  );
}

export const launch = {
  'L-cart': { w: W, h: H, duration: 12, Component: LaunchCart },
  'L-campaigns': { w: W, h: H, duration: 12, Component: LaunchCampaigns },
  'L-cod': { w: W, h: H, duration: 12, Component: LaunchCod },
};
