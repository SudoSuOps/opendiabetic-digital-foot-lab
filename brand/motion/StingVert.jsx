// OpenDiabetic — 9:16 intro/outro sting. Reads engine globals from window.
const { Stage, useTime, interpolate, Easing } = window;

function FootMarkV({ color = '#F2B441', size = 200 }) {
  return (
    <svg viewBox="0 0 120 150" width={size} height={size * 1.25} fill={color} style={{ display: 'block', margin: '0 auto' }}>
      <path d="M42,58 C38,44 40,34 52,32 C66,30 82,36 84,54 C86,68 80,80 74,92 C69,102 71,112 68,124 C65,138 54,142 45,138 C36,134 33,124 35,112 C37,102 44,96 44,86 C44,76 46,70 42,58 Z" />
      <ellipse cx="46" cy="22" rx="9" ry="11" />
      <ellipse cx="62" cy="16" rx="7.5" ry="9.5" />
      <ellipse cx="75" cy="19" rx="6.5" ry="8" />
      <ellipse cx="86" cy="26" rx="5.5" ry="7" />
      <ellipse cx="95" cy="35" rx="5" ry="6" />
    </svg>
  );
}

function SceneV() {
  const t = useTime();
  const markScale = interpolate([0.2, 1.0, 4.3, 5], [0.55, 1, 1, 1.06], Easing.easeOutCubic)(t);
  const markOp = interpolate([0.2, 0.7, 4.3, 5], [0, 1, 1, 0])(t);
  const wordY = interpolate([0.9, 1.7], [30, 0], Easing.easeOutCubic)(t);
  const wordOp = interpolate([0.9, 1.5, 4.3, 5], [0, 1, 1, 0])(t);
  const tagOp = interpolate([1.5, 2.1, 4.3, 5], [0, 1, 1, 0])(t);
  const glowOp = interpolate([0, 0.8, 4.3, 5], [0, 0.85, 0.85, 0.35])(t);
  const glowScale = 1 + 0.06 * Math.sin(t * 1.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Figtree', sans-serif", overflow: 'hidden', padding: '0 90px' }}>
      <div style={{ position: 'absolute', width: 900, height: 900, transform: `scale(${glowScale})`, opacity: glowOp, background: 'radial-gradient(circle at 50% 50%, rgba(242,180,65,0.34), transparent 62%)' }} />
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', transform: `scale(${markScale})`, opacity: markOp }}>
          <FootMarkV size={210} />
        </div>
        <div style={{ fontWeight: 800, fontSize: 84, lineHeight: 1.04, letterSpacing: '-0.03em', color: '#E8EEF5', marginTop: 24, transform: `translateY(${wordY}px)`, opacity: wordOp }}>Keep your feet.</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8DA0AE', marginTop: 20, opacity: tagOp }}>OpenDiabetic · Foot Lab</div>
      </div>
    </div>
  );
}

function StingVert() {
  return (
    <Stage width={1080} height={1920} duration={5} fps={30} background="#0B0F14">
      <SceneV />
    </Stage>
  );
}
window.StingVert = StingVert;
