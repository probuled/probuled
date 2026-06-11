import { useState, useCallback } from 'react';
import { SectionHeader } from '@/shared/ui';
import { Icon } from '@/shared/ui';
import { PROJECTS } from '../portfolio.constants';

const CHROME_H = 34;

export function Portfolio() {
  const [active, setActive] = useState(0);
  const total = PROJECTS.length;

  const prev = useCallback(() => setActive(a => (a - 1 + total) % total), [total]);
  const next = useCallback(() => setActive(a => (a + 1) % total), [total]);

  const project = PROJECTS[active];

  return (
    <section className="py-[clamp(4rem,8vw,8rem)]" id="portfolio">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <SectionHeader
          eyebrow={<><Icon name="monitor" size={14} /> Portfólio</>}
          title="O que já entregamos"
          sub="Projetos reais, clientes reais. Cada um com atenção ao detalhe e resultado."
        />

        <div className="reveal flex flex-col items-center">
          {/* ── Laptop ───────────────────────────────────────────────────── */}
          <div style={{ width: '100%', maxWidth: '740px' }}>

            {/* Lid */}
            <div style={{
              background: 'linear-gradient(160deg, #2E2E2E 0%, #1A1A1A 100%)',
              borderRadius: '14px 14px 3px 3px',
              padding: '10px 10px 22px',
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
                  flexShrink: 0,
                }}>
                  {/* Traffic lights */}
                  <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FF5F57' }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FFBD2E' }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28CA41' }} />
                  </div>

                  {/* URL bar */}
                  <div style={{
                    flex: 1, height: '18px',
                    background: '#2A2A2A', borderRadius: '4px',
                    border: '1px solid #383838',
                    display: 'flex', alignItems: 'center',
                    padding: '0 8px', gap: '5px',
                    transition: 'all 300ms ease',
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#28CA41', flexShrink: 0 }} />
                    <span style={{
                      fontSize: '10px', color: '#888', lineHeight: 1,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      transition: 'color 300ms ease',
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
                  <div style={{
                    display: 'flex',
                    width: `${total * 100}%`,
                    height: '100%',
                    transform: `translateX(-${(active * 100) / total}%)`,
                    transition: 'transform 550ms cubic-bezier(0.16,1,0.3,1)',
                  }}>
                    {PROJECTS.map((p, i) => (
                      <div
                        key={p.id}
                        style={{
                          width: `${100 / total}%`,
                          flexShrink: 0,
                          height: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Load only active + adjacent slides */}
                        {Math.abs(i - active) <= 1 && (
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

                          {/* Tags */}
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

            {/* Base / hinge */}
            <div style={{
              background: 'linear-gradient(180deg, #1C1C1C 0%, #252525 50%, #1E1E1E 100%)',
              borderRadius: '0 0 8px 8px',
              height: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
            }}>
              <div style={{
                width: '90px', height: '12px',
                background: '#191919',
                borderRadius: '0 0 6px 6px',
                boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.5)',
              }} />
            </div>

            {/* Shadow foot */}
            <div style={{
              height: '5px',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 100%)',
              borderRadius: '0 0 12px 12px',
              marginInline: '7%',
            }} />
          </div>

          {/* ── Controls ─────────────────────────────────────────────────── */}
          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={prev}
              aria-label="Projeto anterior"
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-pb-purple hover:text-pb-purple transition-colors bg-transparent cursor-pointer"
            >
              <Icon name="chevron-left" size={18} />
            </button>

            <div className="flex items-center gap-2">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
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

            <button
              onClick={next}
              aria-label="Próximo projeto"
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-pb-purple hover:text-pb-purple transition-colors bg-transparent cursor-pointer"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>

          <p className="mt-3 text-[0.8125rem] text-neutral-500">
            {active + 1} / {total}
          </p>
        </div>
      </div>
    </section>
  );
}
