import { useState, useCallback, useRef, type PointerEvent } from 'react';
import { SectionHeader } from '@/shared/ui';
import { Icon } from '@/shared/ui';
import { useMediaQuery } from '@/shared/hooks';
import { PROJECTS } from '../portfolio.constants';

const CHROME_H = 34;
const SWIPE_THRESHOLD = 50;

export function Portfolio() {
  const total = PROJECTS.length;
  const isMobile = useMediaQuery('(max-width: 639px)');

  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const next = useCallback(() => setActive(i => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setActive(i => Math.max(i - 1, 0)), []);
  const goTo = useCallback((i: number) => setActive(i), []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    let dx = e.clientX - startX.current;
    // Resistance when dragging past the first/last slide.
    if ((active === 0 && dx > 0) || (active === total - 1 && dx < 0)) dx *= 0.3;
    setDragX(dx);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX <= -SWIPE_THRESHOLD) next();
    else if (dragX >= SWIPE_THRESHOLD) prev();
    setDragX(0);
  };

  // ── Screen: browser chrome + swipeable slides (shared mobile/desktop) ──
  const screen = (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        background: '#0D0D0D',
        borderRadius: isMobile ? '14px' : '6px',
        overflow: 'hidden',
        aspectRatio: isMobile ? '3/4' : '16/10',
        position: 'relative',
        boxShadow: isMobile
          ? '0 0 0 1px rgba(255,255,255,0.06), 0 24px 56px -20px rgba(0,0,0,0.5)'
          : 'inset 0 0 0 1px rgba(255,255,255,0.04)',
        touchAction: 'pan-y',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Browser chrome */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: `${CHROME_H}px`,
        background: 'linear-gradient(180deg, #252525 0%, #1E1E1E 100%)',
        borderBottom: '1px solid #2E2E2E',
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '0 10px',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28CA41' }} />
        </div>
        <div style={{
          flex: 1, height: '18px',
          background: '#2A2A2A', borderRadius: '4px',
          border: '1px solid #383838',
          display: 'flex', alignItems: 'center',
          padding: '0 8px', gap: '5px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#28CA41', flexShrink: 0 }} />
          <span style={{
            fontSize: '10px', color: '#888', lineHeight: 1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            {project.url.replace(/^https?:\/\//, '')}
          </span>
        </div>
      </div>

      {/* Slides track */}
      <div style={{
        position: 'absolute',
        top: `${CHROME_H}px`, left: 0, right: 0, bottom: 0,
        overflow: 'hidden',
      }}>
        <div
          style={{
            display: 'flex',
            width: `${total * 100}%`,
            height: '100%',
            transform: `translateX(calc(${-(active * 100) / total}% + ${dragX}px))`,
            transition: dragging ? 'none' : 'transform 550ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              style={{
                width: `${100 / total}%`,
                flexShrink: 0,
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {Math.abs(i - active) <= 1 && (
                <iframe
                  src={p.url}
                  title={p.title}
                  scrolling="no"
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '200%', height: '200%',
                    transform: 'scale(0.5)',
                    transformOrigin: 'top left',
                    border: 'none',
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Touch shield: blocks compositor-thread iframe scroll on mobile.
                  Events bubble to container → swipe + page pan-y still work. */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

              {/* Bottom info overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                padding: '3rem 1.125rem 0.875rem',
                pointerEvents: 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, margin: 0 }}>
                      {p.title}
                    </p>
                    <p style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.62)', margin: '2px 0 0' }}>
                      {p.description}
                    </p>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(255,255,255,0.14)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#fff',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'all',
                      flexShrink: 0,
                    }}
                  >
                    ↗ Abrir
                  </a>
                </div>
                <div style={{ display: 'flex', gap: '5px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(83,74,183,0.75)',
                      borderRadius: '4px',
                      padding: '2px 7px',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#fff',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-[clamp(4rem,8vw,8rem)]" id="portfolio">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <SectionHeader
          eyebrow={<><Icon name="monitor" size={14} /> Portfólio</>}
          title="O que já entregamos"
          sub="Projetos reais, clientes reais. Cada um com atenção ao detalhe e resultado."
        />

        <div className="reveal flex flex-col items-center">
          {isMobile ? (
            /* ── Mobile: bare screen, swipe to navigate ──────────────────── */
            <div className="w-full max-w-[460px] select-none">
              {screen}
              <p className="mt-4 text-center text-[0.75rem] text-neutral-400">
                Arraste para ver outros projetos
              </p>
            </div>
          ) : (
            /* ── Desktop: laptop + arrows ─────────────────────────────────── */
            <div className="flex items-center gap-2 sm:gap-4 w-full justify-center select-none">
              <button
                onClick={prev}
                disabled={active === 0}
                aria-label="Projeto anterior"
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-pb-purple flex items-center justify-center text-pb-purple hover:bg-pb-purple hover:text-white transition-colors bg-white shadow-md cursor-pointer flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-pb-purple"
              >
                <Icon name="chevron-left" size={18} />
              </button>

              {/* Laptop */}
              <div style={{ width: '100%', maxWidth: '740px' }}>
                <div style={{
                  background: 'linear-gradient(160deg, #2E2E2E 0%, #1A1A1A 100%)',
                  borderRadius: '14px',
                  padding: '10px',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 48px 96px -24px rgba(0,0,0,0.65)',
                }}>
                  {/* Camera */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                    <div style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: '#242424', border: '1px solid #383838',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)',
                    }} />
                  </div>

                  {screen}
                </div>
              </div>

              <button
                onClick={next}
                disabled={active === total - 1}
                aria-label="Próximo projeto"
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-pb-purple flex items-center justify-center text-pb-purple hover:bg-pb-purple hover:text-white transition-colors bg-white shadow-md cursor-pointer flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-pb-purple"
              >
                <Icon name="chevron-right" size={18} />
              </button>
            </div>
          )}

          {/* ── Dots ─────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 mt-6">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir para projeto ${i + 1}`}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === active ? '#534AB7' : '#CFCBBE',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 350ms cubic-bezier(0.16,1,0.3,1)',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <p className="mt-3 text-[0.8125rem] text-neutral-500">
            {active + 1} / {total}
          </p>
        </div>
      </div>
    </section>
  );
}
