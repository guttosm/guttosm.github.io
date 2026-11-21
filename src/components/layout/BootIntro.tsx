import { useEffect, useState, type CSSProperties } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { BentoPipeline, type PipelineStatus } from '../ui/MagicBentoVisuals';
import './BootIntro.css';

/*
 * The intro that plays over the site on the first visit of a session: a terminal builds and tests a Go
 * service, builds and pushes its Docker image, and deploys it with Helm to a Kubernetes cluster. The page
 * is already rendered underneath, so search engines and screen readers get the content straight away.
 * Skipped for visitors who prefer reduced motion; Skip, Esc, Enter or a click ends it early.
 */

type Tone = 'plain' | 'dim' | 'ok' | 'success';
type StageId = 'build' | 'test' | 'image' | 'push' | 'helm' | 'rollout';

type Step = { kind: 'cmd'; text: string; stage: StageId } | { kind: 'out'; text: string; tone?: Tone; delay?: number };

interface Line {
  kind: 'cmd' | 'out';
  text: string;
  tone: Tone;
}

const IMAGE = 'ghcr.io/guttosm/portfolio:1.0.0';

const SCRIPT: readonly Step[] = [
  { kind: 'cmd', stage: 'build', text: 'go build -o bin/portfolio ./cmd/portfolio' },
  { kind: 'cmd', stage: 'test', text: 'go test -race ./...' },
  { kind: 'out', tone: 'ok', text: 'ok   portfolio/internal/api        0.412s' },
  { kind: 'out', tone: 'ok', text: 'ok   portfolio/internal/events     0.287s' },
  { kind: 'out', tone: 'ok', text: 'ok   portfolio/internal/identity   0.358s' },
  { kind: 'cmd', stage: 'image', text: `docker build -t ${IMAGE} .` },
  { kind: 'out', tone: 'dim', text: '[+] Building 18.2s (12/12) FINISHED' },
  { kind: 'out', tone: 'dim', text: ' => [build 3/4] RUN go mod download' },
  { kind: 'out', tone: 'dim', text: ' => [build 4/4] RUN CGO_ENABLED=0 go build -o /portfolio ./cmd/portfolio' },
  { kind: 'out', tone: 'dim', text: ` => naming to ${IMAGE}` },
  { kind: 'cmd', stage: 'push', text: `docker push ${IMAGE}` },
  { kind: 'out', tone: 'dim', text: '1.0.0: digest: sha256:7c41e9a0…b2f0 size: 1158' },
  { kind: 'cmd', stage: 'helm', text: 'helm upgrade --install portfolio ./chart -n web' },
  { kind: 'out', text: 'Release "portfolio" has been upgraded. Happy Helming!' },
  { kind: 'out', tone: 'dim', text: 'STATUS: deployed   REVISION: 12' },
  { kind: 'cmd', stage: 'rollout', text: 'kubectl rollout status deploy/portfolio -n web' },
  {
    kind: 'out',
    tone: 'dim',
    text: 'Waiting for rollout to finish: 2 of 3 updated replicas are available...',
    delay: 420,
  },
  { kind: 'out', text: 'deployment "portfolio" successfully rolled out', delay: 520 },
  { kind: 'out', tone: 'success', text: '✓ portfolio is live', delay: 260 },
];

// The steps of the pipeline card beside the terminal (the DevOps bento's "git push" visual)
const STAGES: readonly { id: StageId; label: string }[] = [
  { id: 'build', label: 'Go build' },
  { id: 'test', label: 'Go test' },
  { id: 'image', label: 'Docker build' },
  { id: 'push', label: 'Docker push' },
  { id: 'helm', label: 'Helm upgrade' },
  { id: 'rollout', label: 'Rollout' },
];

const STEP_LABELS = STAGES.map((item) => item.label);

// The pipeline card reads its colours from the bento tokens; the intro has no bento grid to set them
const PIPELINE_ACCENT = { '--mb-accent-rgb': '167, 139, 250', '--mb-accent-ink': '#ffffff' } as CSSProperties;

const SEEN_KEY = 'intro-seen';
const TYPE_MS = 14;
const AFTER_COMMAND_MS = 240;
const OUTPUT_MS = 130;
const HOLD_MS = 800;
const LEAVE_MS = 550;

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function shouldPlay() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) === null;
  } catch {
    // Storage can be blocked (private mode); play it, it can always be skipped
    return true;
  }
}

function remember() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Without storage the intro plays again on the next load, which is fine
  }
}

export function BootIntro() {
  const { messages } = useI18n();
  const [phase, setPhase] = useState<'playing' | 'leaving' | 'done'>(() => (shouldPlay() ? 'playing' : 'done'));
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [stage, setStage] = useState<StageId | null>(null);
  const [finished, setFinished] = useState(false);

  // Play the script once
  useEffect(() => {
    if (phase === 'done') return undefined;
    let cancelled = false;
    const run = async () => {
      for (const step of SCRIPT) {
        if (cancelled) return;
        if (step.kind === 'cmd') {
          setStage(step.stage);
          for (let length = 1; length <= step.text.length; length++) {
            if (cancelled) return;
            setTyping(step.text.slice(0, length));
            await wait(TYPE_MS);
          }
          await wait(AFTER_COMMAND_MS);
          if (cancelled) return;
          setTyping(null);
          setLines((current) => [...current, { kind: 'cmd', text: step.text, tone: 'plain' }]);
        } else {
          await wait(step.delay ?? OUTPUT_MS);
          if (cancelled) return;
          setLines((current) => [...current, { kind: 'out', text: step.text, tone: step.tone ?? 'plain' }]);
        }
      }
      setFinished(true);
      await wait(HOLD_MS);
      if (!cancelled) setPhase('leaving');
    };
    void run();
    return () => {
      cancelled = true;
    };
    // Runs once: later phase changes only end the intro
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fade out, then get out of the way for good
  useEffect(() => {
    if (phase !== 'leaving') return undefined;
    remember();
    const timer = window.setTimeout(() => setPhase('done'), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // While it plays: no scrolling underneath, and Esc or Enter skips
  useEffect(() => {
    if (phase !== 'playing') return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') setPhase('leaving');
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [phase]);

  if (phase === 'done') return null;

  const reached = STAGES.findIndex((item) => item.id === stage);
  // Steps before the current command are done, the current one runs, the rest wait
  const status: PipelineStatus[] = STAGES.map((_, index) =>
    finished || index < reached ? 'done' : index === reached ? 'running' : 'pending',
  );

  return (
    <div className="boot-intro" data-leaving={phase === 'leaving' ? '' : undefined} onClick={() => setPhase('leaving')}>
      <div className="boot-stage-area">
        <div className="boot-terminal" aria-hidden="true">
          <div className="boot-titlebar">
            <span className="boot-dot boot-dot-red" />
            <span className="boot-dot boot-dot-yellow" />
            <span className="boot-dot boot-dot-green" />
            <span className="boot-title">gsm@portfolio: ~/portfolio</span>
          </div>
          <div className="boot-screen">
            {lines.map((line, index) => (
              <p key={index} className={`boot-line boot-${line.kind} boot-tone-${line.tone}`}>
                {line.kind === 'cmd' && <span className="boot-prompt">$ </span>}
                {line.tone === 'ok' ? (
                  <>
                    <span className="boot-ok">ok</span>
                    {line.text.slice(2)}
                  </>
                ) : (
                  line.text
                )}
              </p>
            ))}
            {!finished && (
              <p className="boot-line boot-cmd">
                <span className="boot-prompt">$ </span>
                {typing}
                <span className="boot-cursor" />
              </p>
            )}
          </div>
        </div>

        <div className="magic-bento boot-pipeline" style={PIPELINE_ACCENT}>
          <BentoPipeline trigger="git push" meta="main · deploy to k8s" steps={STEP_LABELS} status={status} />
        </div>
      </div>

      <button
        type="button"
        className="boot-skip"
        onClick={(event) => {
          event.stopPropagation();
          setPhase('leaving');
        }}
      >
        {messages.intro.skip} <kbd>Esc</kbd>
      </button>
    </div>
  );
}
