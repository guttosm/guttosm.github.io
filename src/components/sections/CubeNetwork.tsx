import './CubeNetwork.css';

// The hero visual from the CV: a 3D cube floating over a hexagon network.

const hexagons = [
  '80,140 132,170 132,230 80,260 28,230 28,170',
  '184,140 236,170 236,230 184,260 132,230 132,170',
  '132,230 184,260 184,320 132,350 80,320 80,260',
  '400,280 452,310 452,370 400,400 348,370 348,310',
  '348,370 400,400 400,440 348,440 296,440 296,400',
];

const links = [
  [108, 124, 220, 24],
  [108, 124, 280, 116],
  [184, 208, 320, 220],
  [320, 220, 260, 364],
  [380, 80, 444, 36],
  [364, 296, 428, 324],
];

const nodes: { cx: number; cy: number; r: number; tone: 'purple' | 'cyan' | 'magenta'; ring?: boolean }[] = [
  { cx: 220, cy: 24, r: 7, tone: 'purple' },
  { cx: 108, cy: 124, r: 9, tone: 'purple' },
  { cx: 80, cy: 200, r: 6, tone: 'cyan' },
  { cx: 184, cy: 208, r: 7, tone: 'purple' },
  { cx: 320, cy: 220, r: 7, tone: 'cyan' },
  { cx: 260, cy: 364, r: 7, tone: 'cyan', ring: true },
  { cx: 444, cy: 36, r: 7, tone: 'magenta', ring: true },
  { cx: 428, cy: 324, r: 7, tone: 'cyan' },
];

const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];

export function CubeNetwork() {
  return (
    <div className="cube-network" aria-hidden="true">
      <svg viewBox="0 0 460 440" preserveAspectRatio="xMidYMid meet">
        <g className="hexes">
          {hexagons.map((points) => (
            <polygon key={points} points={points} />
          ))}
        </g>
        <g className="links">
          {links.map(([x1, y1, x2, y2]) => (
            <line key={`${x1}-${y1}-${x2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>
        {nodes.map((n, i) => (
          <g key={i} className={`node node-${n.tone}`} style={{ animationDelay: `${i * 0.4}s` }}>
            <circle cx={n.cx} cy={n.cy} r={n.r} />
            {n.ring && <circle className="ring" cx={n.cx} cy={n.cy} r={n.r + 9} />}
          </g>
        ))}
      </svg>
      <div className="cube-float">
        <div className="cube">
          {faces.map((face) => (
            <div key={face} className={`face face-${face}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
