// The animated visuals from React Bits' Magic Bento (graph, integration hub, security toggles and
// automation pipeline), taking the portfolio's own data as props instead of the demo's fixed content,
// and drawn with the site's Icon set instead of Hugeicons. They play when their bento card scrolls into
// view, replay on click, and the hub's packets and the pipeline run while the card is hovered.

import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { Icon, type IconName } from './Icon';
import './MagicBentoVisuals.css';

const vars = (values: Record<string, string | number>) => values as CSSProperties;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** A smooth curve through the values (monotone cubic, so it never overshoots between points). */
const curve = (values: readonly number[], width: number, height: number) => {
  const top = 6;
  const bottom = 2;
  const low = Math.min(...values) * 0.7;
  const high = Math.max(...values);
  const points: number[][] = values.map((value, index) => [
    (index / (values.length - 1)) * width,
    top + (1 - (value - low) / Math.max(1e-6, high - low)) * (height - top - bottom),
  ]);
  const count = points.length;
  const slopes: number[] = [];
  for (let i = 0; i < count - 1; i++) {
    slopes.push((points[i + 1][1] - points[i][1]) / (points[i + 1][0] - points[i][0]));
  }
  const tangents = points.map((_, i) => {
    if (i === 0) return slopes[0];
    if (i === count - 1) return slopes[count - 2];
    return slopes[i - 1] * slopes[i] > 0 ? (slopes[i - 1] + slopes[i]) / 2 : 0;
  });
  for (let i = 0; i < count - 1; i++) {
    if (slopes[i] === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i] / slopes[i];
    const b = tangents[i + 1] / slopes[i];
    const length = a * a + b * b;
    if (length > 9) {
      const scale = 3 / Math.sqrt(length);
      tangents[i] = scale * a * slopes[i];
      tangents[i + 1] = scale * b * slopes[i];
    }
  }
  let line = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
  const samples: number[][] = [];
  for (let i = 0; i < count - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const third = (x1 - x0) / 3;
    const c1 = [x0 + third, y0 + tangents[i] * third];
    const c2 = [x1 - third, y1 - tangents[i + 1] * third];
    line += ` C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`;
    for (let step = 0; step < 12; step++) {
      const t = step / 12;
      const u = 1 - t;
      samples.push([
        u * u * u * x0 + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * x1,
        u * u * u * y0 + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * y1,
      ]);
    }
  }
  samples.push(points[count - 1]);
  const area = `${line} L${width.toFixed(2)},${height.toFixed(2)} L0,${height.toFixed(2)} Z`;
  return { line, area, samples };
};

const sampleAt = (samples: number[][], x: number) => {
  let index = 1;
  while (index < samples.length - 1 && samples[index][0] < x) index++;
  const [x0, y0] = samples[index - 1];
  const [x1, y1] = samples[index];
  const t = x1 === x0 ? 0 : clamp((x - x0) / (x1 - x0), 0, 1);
  return y0 + (y1 - y0) * t;
};

interface BentoChartProps {
  values: readonly number[];
  /** One label per value, e.g. the year. */
  labels: readonly string[];
  /** How a value reads in the figure above the chart. */
  format: (value: number) => string;
  /** What the chart shows, for screen readers. */
  label: string;
}

/** A line chart that draws itself in; moving the pointer over it reads off each point. */
export function BentoChart({ values, labels, format, label }: BentoChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const last = values.length - 1;

  useLayoutEffect(() => {
    const plot = plotRef.current;
    if (!plot) return undefined;
    const update = () => {
      const next = { width: plot.clientWidth, height: plot.clientHeight };
      setSize((previous) =>
        previous && previous.width === next.width && previous.height === next.height ? previous : next,
      );
    };
    update();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(update);
    observer.observe(plot);
    return () => observer.disconnect();
  }, []);

  const shape = useMemo(
    () => (size && size.width > 4 && size.height > 4 && values.length > 1 ? curve(values, size.width, size.height) : null),
    [size, values],
  );

  const scrub = (event: PointerEvent<HTMLDivElement>) => {
    const plot = plotRef.current;
    const chart = chartRef.current;
    if (!shape || !plot || !chart || !scrubRef.current || !dotRef.current || !valueRef.current || !noteRef.current) return;
    const rect = plot.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = sampleAt(shape.samples, x);
    const index = Math.round((x / Math.max(1, rect.width)) * last);
    chart.dataset.scrub = '';
    scrubRef.current.style.transform = `translateX(${x.toFixed(1)}px)`;
    dotRef.current.style.transform = `translateY(${y.toFixed(1)}px)`;
    valueRef.current.textContent = format(values[index]);
    noteRef.current.textContent = labels[index];
  };

  const rest = () => {
    if (chartRef.current) delete chartRef.current.dataset.scrub;
    if (valueRef.current) valueRef.current.textContent = format(values[last]);
    if (noteRef.current) noteRef.current.textContent = labels[last];
  };

  return (
    <div
      ref={chartRef}
      className="magic-bento__chart"
      role="img"
      aria-label={`${label}: ${labels[0]} ${format(values[0])}, ${labels[last]} ${format(values[last])}`}
      onPointerMove={scrub}
      onPointerDown={scrub}
      onPointerLeave={rest}
    >
      <div className="magic-bento__figure" aria-hidden="true">
        <span ref={valueRef} className="magic-bento__figure-value">
          {format(values[last])}
        </span>
        <span ref={noteRef} className="magic-bento__figure-note">
          {labels[last]}
        </span>
      </div>
      <div ref={plotRef} className="magic-bento__plot" aria-hidden="true">
        {shape && size && (
          <svg viewBox={`0 0 ${size.width} ${size.height}`}>
            <path className="magic-bento__chart-area" d={shape.area} />
            <path className="magic-bento__chart-line" d={shape.line} pathLength="1" />
          </svg>
        )}
        <span ref={scrubRef} className="magic-bento__scrub">
          <span ref={dotRef} className="magic-bento__scrub-dot" />
        </span>
      </div>
    </div>
  );
}

/** A small dashboard: a headline over a week of bars that grow in, the tallest one highlighted. */
export function BentoBars({ value, note, bars }: { value: string; note: string; bars: readonly number[] }) {
  const peak = Math.max(...bars);
  return (
    <div className="magic-bento__bars" aria-hidden="true">
      <div className="magic-bento__figure">
        <span className="magic-bento__figure-value">{value}</span>
        <span className="magic-bento__figure-note">{note}</span>
      </div>
      <div className="magic-bento__bars-plot">
        {bars.map((height, index) => (
          <span
            key={index}
            className="magic-bento__bar"
            data-peak={height === peak ? '' : undefined}
            style={vars({ '--h': height / 100, '--i': index })}
          />
        ))}
      </div>
    </div>
  );
}

export interface HubNode {
  label: string;
  /** Position inside the hub, in % of its width and height. */
  x: number;
  y: number;
}

/** Technologies wired to a central one; while the card is hovered, packets travel along the links. */
export function BentoHub({ center, nodes }: { center: string; nodes: readonly HubNode[] }) {
  return (
    <div className="magic-bento__hub" aria-hidden="true">
      <svg className="magic-bento__hub-links" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((node) => (
          <line key={node.label} x1={node.x} y1={node.y} x2="50" y2="50" pathLength="1" />
        ))}
      </svg>
      {nodes.map((node, index) => (
        <span
          key={`packet-${node.label}`}
          className="magic-bento__packet"
          style={vars({ '--x': `${node.x}%`, '--y': `${node.y}%`, '--i': index })}
        />
      ))}
      {nodes.map((node, index) => (
        <span
          key={node.label}
          className="magic-bento__hub-node magic-bento__tile"
          style={vars({ '--x': `${node.x}%`, '--y': `${node.y}%`, '--i': index + 1 })}
        >
          {node.label}
        </span>
      ))}
      <span
        className="magic-bento__hub-node magic-bento__hub-node--center magic-bento__tile"
        style={vars({ '--x': '50%', '--y': '50%', '--i': 0 })}
      >
        {center}
      </span>
    </div>
  );
}

export interface ToggleSetting {
  icon: IconName;
  label: string;
}

/** Settings whose switches flip on one after another. */
export function BentoToggles({ settings }: { settings: readonly ToggleSetting[] }) {
  return (
    <div className="magic-bento__shield" aria-hidden="true">
      {settings.map((setting, index) => (
        <div key={setting.label} className="magic-bento__setting magic-bento__tile">
          <Icon name={setting.icon} size={14} />
          <span className="magic-bento__setting-label">{setting.label}</span>
          <span className="magic-bento__switch" style={vars({ '--i': index })} />
        </div>
      ))}
    </div>
  );
}

export type PipelineStatus = 'pending' | 'running' | 'done';

interface BentoPipelineProps {
  trigger: string;
  meta: string;
  steps: readonly string[];
  /**
   * Drives the steps from outside (one status per step) instead of playing the timed animation,
   * e.g. to follow a terminal as it runs each command.
   */
  status?: readonly PipelineStatus[];
}

/** A CI run: a push starts the steps, which complete one by one along a rail. */
export function BentoPipeline({ trigger, meta, steps, status }: BentoPipelineProps) {
  const controlled = status !== undefined;
  // How far the rail is filled: up to the step that is running, or to the end once all are done
  const reached = controlled ? status.lastIndexOf('done') + (status.includes('running') ? 1 : 0) : 0;
  const fill = controlled ? Math.min(1, reached / Math.max(1, steps.length - 1)) : 0;

  return (
    <div
      className="magic-bento__flow"
      data-controlled={controlled ? '' : undefined}
      style={vars({ '--n': steps.length, '--fill': fill })}
      aria-hidden="true"
    >
      <div className="magic-bento__flow-trigger magic-bento__tile">
        <span className="magic-bento__flow-glyph">
          <Icon name="branch" size={15} />
        </span>
        <span className="magic-bento__flow-copy">
          <span className="magic-bento__flow-name">{trigger}</span>
          <span className="magic-bento__flow-meta magic-bento__flow-hash">{meta}</span>
        </span>
      </div>
      <div className="magic-bento__steps magic-bento__well">
        <span className="magic-bento__rail">
          <span className="magic-bento__rail-fill" />
        </span>
        {steps.map((step, index) => (
          <div
            key={step}
            className="magic-bento__step"
            data-status={status?.[index]}
            style={vars({ '--i': index })}
          >
            <span className="magic-bento__status">
              <span className="magic-bento__pending" />
              <span className="magic-bento__spinner" />
              <span className="magic-bento__done">
                <Icon name="check" size={11} />
              </span>
            </span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
