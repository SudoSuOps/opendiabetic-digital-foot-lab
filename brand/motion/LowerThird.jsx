// OpenDiabetic — animated lower-third. Transparent stage → exports as alpha overlay (WebM/ProRes).
const { Stage, useTime, interpolate, Easing } = window;

function FootMarkLt({ color, size }) {
  return (
    <svg viewBox="0 0 120 150" width={size} height={size * 1.25} fill={color} style={{ display: 'block' }}>
      <path d="M42,58 C38,44 40,34 52,32 C66,30 82,36 84,54 C86,68 80,80 74,92 C69,102 71,112 68,124 C65,138 54,142 45,138 C36,134 33,124 35,112 C37,102 44,96 44,86 C44,76 46,70 42,58 Z" />
      <ellipse cx="46" cy="22" rx="9" ry="11" />
      <ellipse cx="62" cy="16" rx="7.5" ry="9.5" />
      <ellipse cx="75" cy="19" rx="6.5" ry="8" />
      <ellipse cx="86" cy="26" rx="5.5" ry="7" />
      <ellipse cx="95" cy="35" rx="5" ry="6" />
    </svg>
  );
}

function LtScene() {
  const t = useTime();
  const barScale = interpolate([0.2, 0.9, 5.4, 6], [0, 1, 1, 0], Easing.easeOutCubic)(t);
  const panelX = interpolate([0.3, 1.0, 5.4, 6], [-60, 0, 0, -30], Easing.easeOutCubic)(t);
  const panelOp = interpolate([0.3, 0.9, 5.5, 6], [0, 1, 1, 0])(t);
  const bugOp = interpolate([0.1, 0.7, 5.6, 6], [0, 1, 1, 0])(t);
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: "'Figtree', sans-serif", overflow: 'hidden' }}>
      {/* lower-third */}
      <div style={{ position: 'absolute', left: 90, bottom: 110, display: 'flex', alignItems: 'stretch', transform: `translateX(${panelX}px)`, opacity: panelOp }}>
        <div style={{ width: 12, background: '#F2B441', borderRadius: '6px 0 0 6px', transform: `scaleX(${barScale})`, transformOrigin: 'left' }} />
        <div style={{ background: 'rgba(11,15,20,0.86)', backdropFilter: 'blur(8px)', border: '1px solid #1F2A36', borderLeft: 'none', borderRadius: '0 14px 14px 0', padding: '26px 42px 26px 30px', display: 'flex', alignItems: 'center', gap: 26 }}>
          <div style={{ width: 78, height: 78, borderRadius: 16, background: '#F2B441', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <FootMarkLt color="#2B2118" size={40} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 44, color: '#E8EEF5', letterSpacing: '-0.02em' }}>Daily Foot Check</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F2B441', marginTop: 8 }}>Step 1 of 6 · see it every day</div>
          </div>
        </div>
      </div>
      {/* persistent corner bug */}
      <div style={{ position: 'absolute', right: 70, top: 60, display: 'flex', alignItems: 'center', gap: 12, opacity: bugOp }}>
        <FootMarkLt color="#F2B441" size={30} />
        <span style={{ fontWeight: 800, fontSize: 26, color: '#E8EEF5', letterSpacing: '-0.02em' }}>OpenDiabetic</span>
      </div>
    </div>
  );
}

function LowerThird() {
  return (
    <Stage width={1920} height={1080} duration={6} fps={30} background="transparent">
      <LtScene />
    </Stage>
  );
}
window.LowerThird = LowerThird;
