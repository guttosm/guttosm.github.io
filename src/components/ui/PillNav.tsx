// Pill Nav from React Bits (https://reactbits.dev/components/pill-nav), MIT + Commons Clause license.
// Local changes: links are React Router links, so ?lang= and client-side navigation keep working;
// colours come from the site's theme tokens (PillNav.css); the bar turns into the menu button at the
// site's own breakpoint in CSS instead of by measuring, so the links are always in the page; the logo,
// joined layout, sizes, surfaces and theme props are left out; the current page is passed as an index;
// the menu button's labels are translated; the root is a <div>, because the header is already the <nav>.

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Link, type To } from 'react-router';
import './PillNav.css';

export interface PillNavItem {
  key: string;
  label: string;
  to: To;
}

export interface PillNavProps {
  items: PillNavItem[];
  /** The item for the current page, or -1 when none matches. */
  activeIndex?: number;
  /** Labels for the menu button on small screens. */
  openMenuLabel: string;
  closeMenuLabel: string;
  /** Hover: 'fill' rolls a pill up into the item, 'glide' slides one pill between items. */
  hoverEffect?: 'fill' | 'glide' | 'none';
  /** How the current page is marked. */
  indicator?: 'dot' | 'pill' | 'none';
  /** Springiness of the moving pill and dot (0 to 1). */
  bounce?: number;
  /** How much the pill stretches while it moves (0 to 1). */
  stretch?: number;
  /** Plays the entrance animation on first load. */
  intro?: boolean;
  className?: string;
}

interface Engine {
  enter: (index: number, event?: ReactPointerEvent) => void;
  leave: () => void;
  focus: (index: number, event?: ReactFocusEvent) => void;
  blur: () => void;
  press: (event?: ReactPointerEvent) => void;
  release: () => void;
  refresh: () => void;
}

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
const DESKTOP = '(min-width: 921px)';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/** Element.animate, skipped where it isn't available (older browsers, tests). */
const run = (element: Element | null | undefined, keyframes: Keyframe[], options: KeyframeAnimationOptions) =>
  element && typeof element.animate === 'function' ? element.animate(keyframes, options) : undefined;

export function PillNav({
  items,
  activeIndex = -1,
  openMenuLabel,
  closeMenuLabel,
  hoverEffect = 'fill',
  indicator = 'dot',
  bounce = 0.3,
  stretch = 0.5,
  intro = true,
  className,
}: PillNavProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const glideRef = useRef<HTMLSpanElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLLIElement | null)[]>([]);
  const engineRef = useRef<Engine | null>(null);
  const slideRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [panelShown, setPanelShown] = useState(false);

  const fill = hoverEffect === 'fill';
  const glide = !fill && (hoverEffect === 'glide' || indicator === 'pill');

  const settings = {
    hoverEffect,
    indicator,
    activeIndex,
    bounce: clamp(bounce, 0, 1),
    stretch: clamp(stretch, 0, 1),
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  // The entrance: the bar opens from the left and the items slide in. Runs before the engine starts,
  // so the engine knows to hold the pill until the bar has opened.
  useLayoutEffect(() => {
    if (!intro || prefersReducedMotion()) return;
    slideRef.current = true;
    const bar = barRef.current;
    if (bar) {
      const width = bar.offsetWidth;
      const height = bar.offsetHeight;
      run(
        bar,
        [
          { clipPath: `inset(0px ${Math.max(0, width - height)}px 0px 0px round ${height / 2}px)` },
          { clipPath: `inset(0px 0px 0px 0px round ${height / 2}px)` },
        ],
        { duration: 760, delay: 90, easing: EASE_OUT, fill: 'backwards' },
      );
    }
    slotRefs.current.forEach((slot, index) => {
      run(
        slot,
        [
          { opacity: 0, transform: 'translateX(-10px)' },
          { opacity: 1, transform: 'translateX(0)' },
        ],
        { duration: 560, delay: 200 + index * 50, easing: EASE_OUT, fill: 'backwards' },
      );
    });
    run(
      toggleRef.current,
      [
        { opacity: 0, transform: 'scale(0.6)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 700, delay: 120, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'backwards' },
    );
    // Only on first load: the header stays mounted while visitors move between pages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The spring engine behind the gliding pill, the press squash and the dot
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = prefersReducedMotion();
    const state = {
      x0: 0,
      x1: 0,
      v0: 0,
      v1: 0,
      alpha: 0,
      pop: 1,
      press: 1,
      pressVelocity: 0,
      dotX: 0,
      dotVelocity: 0,
      dotAlpha: 0,
      hover: -1,
      focus: false,
      sliding: false,
      pressing: false,
      waiting: slideRef.current && !reduce,
    };
    slideRef.current = false;
    const rects: { left: number; width: number }[] = [];
    let trackWidth = 0;
    let trackHeight = 0;
    let raf = 0;
    let last = 0;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      trackWidth = track.offsetWidth;
      trackHeight = track.offsetHeight;
      slotRefs.current.forEach((slot, index) => {
        if (!slot) return;
        rects[index] = { left: slot.offsetLeft, width: slot.offsetWidth };
        const reach = Math.ceil(2 * Math.sqrt((slot.offsetWidth / 2) ** 2 + slot.offsetHeight ** 2)) + 2;
        slot.style.setProperty('--pn-fill', `${reach}px`);
      });
    };

    const glideIndex = () => {
      const s = settingsRef.current;
      if (s.hoverEffect === 'fill') return -1;
      if (s.hoverEffect === 'glide' && state.hover >= 0) return state.hover;
      return s.indicator === 'pill' ? s.activeIndex : -1;
    };

    const sync = () => {
      const s = settingsRef.current;
      slotRefs.current.forEach((slot, index) => {
        if (!slot) return;
        const hovered = state.hover === index;
        slot.toggleAttribute('data-lit', hovered);
        slot.toggleAttribute('data-hover', hovered && s.hoverEffect === 'fill');
      });
      root.toggleAttribute('data-focus', state.focus && state.hover >= 0);
      root.toggleAttribute('data-dot-lit', s.hoverEffect === 'fill' && state.hover >= 0 && state.hover === s.activeIndex);
    };

    const render = () => {
      const glideEl = glideRef.current;
      const ink = inkRef.current;
      const dot = dotRef.current;
      const width = Math.max(0, state.x1 - state.x0);
      const scale = state.press * state.pop;
      const target = rects[glideIndex()];
      const squash = target ? 1 - clamp((width / Math.max(target.width, 1) - 1) * 0.3, 0, 0.14) : 1;
      if (glideEl) {
        glideEl.style.width = `${width}px`;
        glideEl.style.transform = `translate3d(${state.x0}px, 0, 0) scale(${scale}, ${scale * squash})`;
        glideEl.style.opacity = `${state.alpha}`;
      }
      if (ink) {
        const half = (width * scale) / 2;
        const center = (state.x0 + state.x1) / 2;
        const inset = (trackHeight * (1 - scale * squash)) / 2;
        ink.style.clipPath = `inset(${inset}px ${trackWidth - center - half}px ${inset}px ${center - half}px round ${trackHeight / 2}px)`;
        ink.style.opacity = `${state.alpha}`;
      }
      if (dot) {
        const pull = clamp(Math.abs(state.dotVelocity) / 700, 0, 2.2);
        dot.style.transform = `translate3d(${state.dotX}px, 0, 0) scaleX(${1 + pull})`;
        dot.style.opacity = `${state.dotAlpha}`;
      }
    };

    const tick = (now: number) => {
      raf = 0;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const index = glideIndex();
      const target = rects[index];
      const zeta = 1 - 0.55 * s.bounce;
      const base = 520;
      let busy = false;

      if (target && !state.waiting) {
        const t0 = target.left;
        const t1 = target.left + target.width;
        if (state.alpha < 0.02 && !state.sliding) {
          state.x0 = t0;
          state.x1 = t1;
          state.v0 = 0;
          state.v1 = 0;
          state.pop = 0.9;
        }
        if (reduce) {
          state.x0 = t0;
          state.x1 = t1;
          state.v0 = 0;
          state.v1 = 0;
        } else {
          const direction = Math.sign((t0 + t1) / 2 - (state.x0 + state.x1) / 2);
          const lead = base * (1 + 0.9 * s.stretch);
          const trail = base * (1 - 0.5 * s.stretch);
          const k0 = direction < 0 ? lead : direction > 0 ? trail : base;
          const k1 = direction > 0 ? lead : direction < 0 ? trail : base;
          const steps = Math.ceil(dt / (1 / 240));
          const h = dt / steps;
          for (let i = 0; i < steps; i++) {
            state.v0 += (-k0 * (state.x0 - t0) - 2 * zeta * Math.sqrt(k0) * state.v0) * h;
            state.x0 += state.v0 * h;
            state.v1 += (-k1 * (state.x1 - t1) - 2 * zeta * Math.sqrt(k1) * state.v1) * h;
            state.x1 += state.v1 * h;
          }
        }
        state.alpha += (1 - state.alpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.06));
        busy =
          Math.abs(state.x0 - t0) > 0.05 ||
          Math.abs(state.x1 - t1) > 0.05 ||
          Math.abs(state.v0) > 0.5 ||
          Math.abs(state.v1) > 0.5 ||
          state.alpha < 0.999;
        if (!busy) state.sliding = false;
      } else {
        state.alpha += (0 - state.alpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.07));
        if (state.alpha > 0.002) busy = true;
        else state.alpha = 0;
      }

      state.pop += (1 - state.pop) * (reduce ? 1 : 1 - Math.exp(-dt / 0.09));
      if (Math.abs(1 - state.pop) > 0.001) busy = true;

      const pressTarget = state.pressing ? 0.95 : 1;
      if (reduce) {
        state.press = pressTarget;
        state.pressVelocity = 0;
      } else {
        state.pressVelocity += (-700 * (state.press - pressTarget) - 30 * state.pressVelocity) * dt;
        state.press += state.pressVelocity * dt;
      }
      if (Math.abs(state.press - pressTarget) > 0.0005 || Math.abs(state.pressVelocity) > 0.01) busy = true;

      const dotTarget = s.indicator === 'dot' ? rects[s.activeIndex] : null;
      if (dotTarget && !state.waiting) {
        const center = dotTarget.left + dotTarget.width / 2;
        if (state.dotAlpha < 0.02) {
          state.dotX = center;
          state.dotVelocity = 0;
        }
        if (reduce) {
          state.dotX = center;
          state.dotVelocity = 0;
        } else {
          const k = 360;
          const steps = Math.ceil(dt / (1 / 240));
          const h = dt / steps;
          for (let i = 0; i < steps; i++) {
            state.dotVelocity +=
              (-k * (state.dotX - center) - 2 * (1 - 0.5 * s.bounce) * Math.sqrt(k) * state.dotVelocity) * h;
            state.dotX += state.dotVelocity * h;
          }
        }
        state.dotAlpha += (1 - state.dotAlpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.1));
        if (Math.abs(state.dotX - center) > 0.05 || Math.abs(state.dotVelocity) > 0.5 || state.dotAlpha < 0.999)
          busy = true;
      } else {
        state.dotAlpha += (0 - state.dotAlpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.1));
        if (state.dotAlpha > 0.002) busy = true;
        else state.dotAlpha = 0;
      }

      render();
      if (busy) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const engine: Engine = {
      enter: (index, event) => {
        if (event?.pointerType === 'touch') return;
        state.hover = index;
        state.focus = false;
        sync();
        wake();
      },
      leave: () => {
        if (state.focus) return;
        state.hover = -1;
        sync();
        wake();
      },
      focus: (index, event) => {
        const target = event?.target;
        const visible = target instanceof Element && target.matches(':focus-visible');
        state.focus = visible;
        state.hover = visible ? index : state.hover;
        sync();
        wake();
      },
      blur: () => {
        if (!state.focus) return;
        state.focus = false;
        state.hover = -1;
        sync();
        wake();
      },
      press: (event) => {
        if (event && event.button > 0) return;
        state.pressing = true;
        wake();
      },
      release: () => {
        if (!state.pressing) return;
        state.pressing = false;
        wake();
      },
      refresh: () => {
        measure();
        sync();
        wake();
      },
    };
    engineRef.current = engine;

    measure();
    sync();
    render();
    wake();

    let timer = 0;
    if (state.waiting) {
      state.x0 = 0;
      state.x1 = 0;
      timer = window.setTimeout(() => {
        state.waiting = false;
        if (glideIndex() >= 0) {
          state.alpha = 1;
          state.sliding = true;
        }
        wake();
      }, 420);
    }

    // Labels change width with the language and when the bar reappears after a resize
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            measure();
            render();
            wake();
          });
    if (trackRef.current) resizeObserver?.observe(trackRef.current);
    document.fonts?.ready?.then(() => engine.refresh()).catch(() => {});
    window.addEventListener('pointerup', engine.release);
    window.addEventListener('pointercancel', engine.release);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      resizeObserver?.disconnect();
      window.removeEventListener('pointerup', engine.release);
      window.removeEventListener('pointercancel', engine.release);
      engineRef.current = null;
    };
  }, [items.length]);

  useEffect(() => {
    engineRef.current?.refresh();
  });

  // The menu panel grows out of the menu button, and shrinks back into it when closed
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const reduce = prefersReducedMotion();
    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const header = toggleRef.current?.offsetHeight ?? 44;
    const start = `inset(0px 0px ${Math.max(0, height - header)}px ${Math.max(0, width - header)}px round ${header / 2}px)`;
    const end = 'inset(0px 0px 0px 0px round 18px)';
    const rows = panel.querySelectorAll('li');
    const running: Animation[] = [];
    const keep = (animation: Animation | undefined) => {
      if (animation) running.push(animation);
      return animation;
    };
    if (open) {
      if (reduce) return undefined;
      keep(run(panel, [{ clipPath: start }, { clipPath: end }], { duration: 560, easing: EASE_OUT }));
      rows.forEach((row, index) => {
        keep(
          run(
            row,
            [
              { opacity: 0, transform: 'translateY(-8px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 420, delay: 90 + index * 40, easing: EASE_OUT, fill: 'backwards' },
          ),
        );
      });
    } else {
      const morph = reduce
        ? undefined
        : keep(
            run(panel, [{ clipPath: end }, { clipPath: start }], {
              duration: 380,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              fill: 'forwards',
            }),
          );
      if (!morph) {
        setPanelShown(false);
        return undefined;
      }
      morph.onfinish = () => setPanelShown(false);
      rows.forEach((row) => {
        keep(run(row, [{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' }));
      });
    }
    return () => {
      running.forEach((animation) => {
        animation.onfinish = null;
        animation.cancel();
      });
    };
  }, [open, panelShown]);

  // An open menu closes on a click outside, on Escape, and when the window grows to show the bar
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia?.(DESKTOP);
    const onWiden = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    desktop?.addEventListener?.('change', onWiden);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      desktop?.removeEventListener?.('change', onWiden);
    };
  }, [open]);

  const toggle = () => {
    const next = !open;
    if (next) setPanelShown(true);
    setOpen(next);
  };

  return (
    <div
      ref={rootRef}
      className={['pill-nav', className].filter(Boolean).join(' ')}
      data-open={open ? '' : undefined}
      data-panel={panelShown ? '' : undefined}
    >
      <div ref={barRef} className="pill-nav__bar pill-nav__surface">
        <div ref={trackRef} className="pill-nav__track" onPointerLeave={() => engineRef.current?.leave()}>
          <ul className="pill-nav__list">
            {items.map((item, index) => (
              <li
                key={item.key}
                ref={(element) => {
                  slotRefs.current[index] = element;
                }}
                className="pill-nav__slot"
                data-on={fill && indicator === 'pill' && index === activeIndex ? '' : undefined}
                onPointerEnter={(event) => engineRef.current?.enter(index, event)}
                onPointerDown={(event) => engineRef.current?.press(event)}
                onFocus={(event) => engineRef.current?.focus(index, event)}
                onBlur={() => engineRef.current?.blur()}
              >
                <Link
                  to={item.to}
                  className="pill-nav__item"
                  aria-current={index === activeIndex ? 'page' : undefined}
                >
                  {fill && <span className="pill-nav__fill" aria-hidden="true" />}
                  <span className="pill-nav__face">{item.label}</span>
                  {fill && (
                    <span className="pill-nav__face-alt" aria-hidden="true">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          {glide && <span ref={glideRef} className="pill-nav__glide" aria-hidden="true" />}
          {glide && (
            <div ref={inkRef} className="pill-nav__ink" aria-hidden="true">
              {items.map((item) => (
                <span key={item.key} className="pill-nav__ink-item">
                  {item.label}
                </span>
              ))}
            </div>
          )}
          {indicator === 'dot' && <span ref={dotRef} className="pill-nav__dot" aria-hidden="true" />}
        </div>
        <span className="pill-nav__rim" />
      </div>

      <button
        ref={toggleRef}
        type="button"
        className="pill-nav__toggle pill-nav__surface"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeMenuLabel : openMenuLabel}
        onClick={toggle}
      >
        <span className="pill-nav__burger" aria-hidden="true">
          <span className="pill-nav__line pill-nav__line--top" />
          <span className="pill-nav__line pill-nav__line--bottom" />
        </span>
        <span className="pill-nav__rim" />
      </button>

      {panelShown && (
        <div ref={panelRef} id={panelId} className="pill-nav__panel pill-nav__surface">
          <ul className="pill-nav__menu">
            {items.map((item, index) => (
              <li key={item.key}>
                <Link
                  to={item.to}
                  className="pill-nav__row"
                  aria-current={index === activeIndex ? 'page' : undefined}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="pill-nav__rim" />
        </div>
      )}
    </div>
  );
}
