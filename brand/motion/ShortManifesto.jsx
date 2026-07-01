// OpenDiabetic — manifesto short (9:16, ~52s). Reads engine globals from window.
const { Stage, useTime, interpolate, Easing } = window;

const HONEY = '#F2B441', INK50 = '#E8EEF5', MUTE = '#6E7C8A', SUB = '#AEB9C5';

function FootMark({ color = HONEY, size = 200 }) {
  return (
    <svg viewBox="0 0 120 150" width={size} height={size * 1.25} fill={color} style={{ display: 'block', flex: 'none' }}>
      <path d="M42,58 C38,44 40,34 52,32 C66,30 82,36 84,54 C86,68 80,80 74,92 C69,102 71,112 68,124 C65,138 54,142 45,138 C36,134 33,124 35,112 C37,102 44,96 44,86 C44,76 46,70 42,58 Z" />
      <ellipse cx="46" cy="22" rx="9" ry="11" />
      <ellipse cx="62" cy="16" rx="7.5" ry="9.5" />
      <ellipse cx="75" cy="19" rx="6.5" ry="8" />
      <ellipse cx="86" cy="26" rx="5.5" ry="7" />
      <ellipse cx="95" cy="35" rx="5" ry="6" />
    </svg>
  );
}

// fade+rise IN only (card wrapper owns the fade-OUT)
function inStyle(t, s, dur = 0.6) {
  const o = interpolate([s, s + dur], [0, 1], Easing.easeOutCubic)(t);
  const y = interpolate([s, s + dur], [20, 0], Easing.easeOutCubic)(t);
  return { opacity: o, transform: `translateY(${y}px)` };
}

function Card({ t, in0, out1, children }) {
  const o = interpolate([in0, in0 + 0.55, out1 - 0.55, out1], [0, 1, 1, 0], Easing.easeInOutQuad)(t);
  const on = t >= in0 - 0.1 && t <= out1 + 0.1;
  if (!on) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 96px', textAlign: 'center', opacity: o }}>
      {children}
    </div>
  );
}

const H = { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.04, color: INK50, margin: 0 };
const KICK = { fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.22em', textTransform: 'uppercase', color: HONEY, margin: 0 };

function pillar(t, s, label) {
  return (
    <div style={{ ...inStyle(t, s), display: 'flex', alignItems: 'center', gap: 18, justifyContent: 'center', margin: '0 0 20px' }}>
      <span style={{ width: 12, height: 12, borderRadius: '50%', background: HONEY, flex: 'none' }} />
      <span style={{ fontWeight: 700, fontSize: 46, color: INK50, letterSpacing: '-0.01em' }}>{label}</span>
    </div>
  );
}

function Manifesto() {
  const t = useTime();
  const glow = interpolate([0, 3, 26, 52], [0.4, 0.85, 0.85, 0.7])(t) * (1 + 0.06 * Math.sin(t * 0.9));
  const drift = interpolate([0, 52], [-30, 30])(t);
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: "'Figtree', sans-serif", overflow: 'hidden' }}>
      {/* breathing glow */}
      <div style={{ position: 'absolute', left: '50%', top: '38%', width: 1200, height: 1200, transform: `translate(-50%,-50%) translateY(${drift}px)`, opacity: Math.max(0, glow), background: 'radial-gradient(circle at 50% 50%, rgba(242,180,65,0.22), transparent 60%)', pointerEvents: 'none' }} />

      {/* corner brand bug — appears after intro, stays */}
      <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', opacity: interpolate([7, 8, 49, 50.5], [0, 0.9, 0.9, 0], Easing.linear)(t) }}>
        <FootMark size={26} />
        <span style={{ fontWeight: 800, fontSize: 30, color: INK50, letterSpacing: '-0.02em' }}>OpenDiabetic Lab</span>
      </div>

      {/* A — mission (0–7) */}
      <Card t={t} in0={0} out1={7}>
        <div style={{ ...inStyle(t, 0.2, 0.9), transform: `scale(${interpolate([0.2, 1.2], [0.6, 1], Easing.easeOutCubic)(t)})` }}>
          <FootMark size={220} />
        </div>
        <div style={{ ...KICK, ...inStyle(t, 1.5), fontSize: 26, marginTop: 34 }}>One mission</div>
        <h1 style={{ ...H, ...inStyle(t, 2.4), fontSize: 82, marginTop: 26 }}>Protect the diabetic foot <span style={{ color: HONEY }}>before</span> it becomes a crisis.</h1>
      </Card>

      {/* B — reactive past, calm & dim (7–15.5) */}
      <Card t={t} in0={7} out1={15.5}>
        <div style={{ ...H, ...inStyle(t, 7.4), fontSize: 60 }}>For too long, foot care has been <span style={{ color: SUB }}>reactive</span>.</div>
        <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...inStyle(t, 8.9), fontSize: 40, fontWeight: 600, color: MUTE }}>A sore spot.</div>
          <div style={{ ...inStyle(t, 9.7), fontSize: 40, fontWeight: 600, color: MUTE }}>A wound.</div>
          <div style={{ ...inStyle(t, 10.5), fontSize: 40, fontWeight: 600, color: MUTE }}>An infection.</div>
          <div style={{ ...inStyle(t, 11.3), fontSize: 40, fontWeight: 600, color: MUTE }}>A hospital visit.</div>
        </div>
      </Card>

      {/* C — the belief (15.3–21.8) */}
      <Card t={t} in0={15.3} out1={21.8}>
        <div style={{ ...inStyle(t, 15.9), fontSize: 46, fontWeight: 600, color: SUB }}>We believe diabetic foot care should happen</div>
        <div style={{ ...H, ...inStyle(t, 16.7), fontSize: 128, color: HONEY, marginTop: 18 }}>every day.</div>
        <div style={{ ...inStyle(t, 17.6), fontSize: 42, fontWeight: 600, color: MUTE, marginTop: 22 }}>— not someday.</div>
      </Card>

      {/* D — what it is (21.6–29.5) */}
      <Card t={t} in0={21.6} out1={29.5}>
        <div style={{ ...KICK, ...inStyle(t, 22.0), fontSize: 26, marginBottom: 40 }}>A digital foot lab</div>
        {pillar(t, 22.7, 'Daily monitoring')}
        {pillar(t, 23.4, 'Personalized offloading')}
        {pillar(t, 24.1, 'Rapid manufacturing')}
        {pillar(t, 24.8, 'Clinician-guided care')}
      </Card>

      {/* E — the how (29.3–38) */}
      <Card t={t} in0={29.3} out1={38}>
        <div style={{ ...KICK, ...inStyle(t, 29.6), fontSize: 24, marginBottom: 44 }}>Every day, simple</div>
        <div style={{ ...H, ...inStyle(t, 30.2), fontSize: 58, marginBottom: 26 }}>Take a daily foot <span style={{ color: HONEY }}>photo</span>.</div>
        <div style={{ ...H, ...inStyle(t, 31.2), fontSize: 58, marginBottom: 26 }}>Track pressure and changes.</div>
        <div style={{ ...H, ...inStyle(t, 32.2), fontSize: 58, marginBottom: 26 }}>Build a history.</div>
        <div style={{ ...inStyle(t, 33.2), fontSize: 46, fontWeight: 600, color: SUB, lineHeight: 1.3 }}>The right support — for the <span style={{ color: HONEY }}>person</span>, not the shelf.</div>
      </Card>

      {/* F — the why (37.8–43) */}
      <Card t={t} in0={37.8} out1={43}>
        <div style={{ ...H, ...inStyle(t, 38.3), fontSize: 68 }}>When your feet are <span style={{ color: HONEY }}>healthy</span>,</div>
        <div style={{ ...inStyle(t, 39.3), fontSize: 48, fontWeight: 600, color: SUB, marginTop: 24, lineHeight: 1.35 }}>everything else has a better chance to fall into place.</div>
      </Card>

      {/* G1 — triads (42.8–48) */}
      <Card t={t} in0={42.8} out1={48}>
        <div style={{ ...H, ...inStyle(t, 43.1), fontSize: 64, color: HONEY }}>Daily foot care.</div>
        <div style={{ ...H, ...inStyle(t, 43.8), fontSize: 64, marginTop: 16 }}>Early warning.</div>
        <div style={{ ...H, ...inStyle(t, 44.5), fontSize: 64, marginTop: 16 }}>Personalized protection.</div>
        <div style={{ ...inStyle(t, 45.6), fontSize: 40, fontWeight: 700, color: HONEY, marginTop: 44, letterSpacing: '-0.01em' }}>Built to defend the foot.</div>
      </Card>

      {/* G2 — close card (47.8–52) */}
      <Card t={t} in0={47.8} out1={52}>
        <div style={{ ...inStyle(t, 48.1, 0.8) }}><FootMark size={180} /></div>
        <div style={{ ...H, ...inStyle(t, 48.7), fontSize: 76, marginTop: 26 }}>OpenDiabetic Lab</div>
        <div style={{ ...KICK, ...inStyle(t, 49.2), fontSize: 24, marginTop: 20 }}>The Digital Foot Lab</div>
      </Card>
    </div>
  );
}

function ShortManifesto() {
  return (
    <Stage width={1080} height={1920} duration={52} fps={30} background="#0B0F14">
      <Manifesto />
    </Stage>
  );
}
window.ShortManifesto = ShortManifesto;
