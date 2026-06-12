import { useState, useCallback, useRef } from 'react';
import { SectionHeader } from '@/shared/ui';
import { Icon } from '@/shared/ui';
import { PROJECTS } from '../portfolio.constants';

const CHROME_H = 34;

// Track layout: [clone-of-last, ...PROJECTS, clone-of-first]
// position 1..total = real; 0 = clone-last; total+1 = clone-first

export function Portfolio() {
  const total = PROJECTS.length;
  const slideCount = total + 2;
  const slides = [PROJECTS[total - 1], ...PROJECTS, PROJECTS[0]];

  const [position, setPosition] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);

  const active = ((position - 1) + total) % total;
  const project = PROJECTS[active];

  const next = useCallback(() => setPosition(p => p + 1), []);
  const prev = useCallback(() => setPosition(p => p - 1), []);
  const goTo = useCallback((i: number) => setPosition(i + 1), []);

  const handleTransitionEnd = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    if (position >= slideCount - 1) {
      el.style.transition = 'none';
      setPosition(1);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = '';
      }));
    } else if (position <= 0) {
      el.style.transition = 'none';
      setPosition(total);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = '';
      }));
    }
  }, [position, slideCount, total]);

  return (
    <section className="py-[clamp(4rem,8vw,8rem)]" id="portfolio">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <SectionHeader
          eyebrow={<><Icon name="monitor" size={14} /> Portfólio</>}
          title="O que já entregamos"
          sub="Projetos reais, clientes reais. Cada um com atenção ao detalhe e resultado."
        />

        <div className="reveal flex flex-col items-center">
          {/* ── Laptop + arrows ──────────────────────────────────────────── */}
          <div className="flex items-center gap-4 w-full justify-center">

            <button
              onClick={prev}
              aria-label="Projeto anterior"
              className="w-12 h-12 rounded-full border-2 border-pb-purple flex items-center justify-center text-pb-purple hover:bg-pb-purple hover:text-white transition-colors bg-white shadow-md cursor-pointer flex-shrink-0"
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

                {/* Screen */}
                <div style={{
                  background: '#0D0D0D',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  position: 'relative',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}>
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
                      ref={trackRef}
                      onTransitionEnd={handleTransitionEnd}
                      style={{
                        display: 'flex',
                        width: `${slideCount * 100}%`,
                        height: '100%',
                        transform: `translateX(-${(position * 100) / slideCount}%)`,
                        transition: 'transform 550ms cubic-bezier(0.16,1,0.3,1)',
                      }}
                    >
                      {slides.map((p, i) => (
                        <div
                          key={i}
                          style={{
                            width: `${100 / slideCount}%`,
                            flexShrink: 0,
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {Math.abs(i - position) <= 1 && (
                            <iframe
                              src={p.url}
                              title={p.title}
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
              </div>

            </div>

            <button
              onClick={next}
              aria-label="Próximo projeto"
              className="w-12 h-12 rounded-full border-2 border-pb-purple flex items-center justify-center text-pb-purple hover:bg-pb-purple hover:text-white transition-colors bg-white shadow-md cursor-pointer flex-shrink-0"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>

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
