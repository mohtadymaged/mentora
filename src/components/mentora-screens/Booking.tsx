/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { MENTORS, PAPER_NOISE, Icon, Stars } from '../mentora-data';
import { SessionDots } from '../mentora-ui';

export function BookingScreen({ V, dense, mentor, course, goBack, onConfirmed, initialBookingState }: any) {
  const m = mentor || MENTORS[0];
  const c = course || (m.courses && m.courses[0]) || { title: 'Course', price: 0, lessons: 0, seats: 0, students: 0, emoji: '📘' };
  const pad = dense ? 14 : 18;

  const [agreed, setAgreed]       = useState(true);
  const [confirmed, setConfirmed] = useState(initialBookingState?.confirmed ?? false);
  const defaultLevel = c.levels && (c.levels.find((l: any) => l.status !== 'locked') || c.levels[0]);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(defaultLevel ? defaultLevel.id : null);

  const remaining = (c.seats || 0) - (c.students || 0);
  const pctFull = Math.round(((c.students || 0) / (c.seats || 1)) * 100);
  const nearlyFull = remaining > 0 && remaining <= 5;

  const subtotal = c.price;
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;

  if (confirmed) {
    return (
      <div className="m-fade" style={{
        minHeight: '100%', display: 'flex', flexDirection: 'column',
        fontFamily: V.fontSans, color: V.ink,
        paddingBottom: c.levels ? 110 : 24,
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', padding: `${dense ? 18 : 28}px ${pad + 8}px ${dense ? 14 : 18}px`,
        }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <div style={{
              width: dense ? 84 : 94, height: dense ? 84 : 94,
              borderRadius: 20, background: V.accentBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: dense ? 44 : 50, boxShadow: '0 10px 24px rgba(60,40,20,0.12)',
            }}>{c.emoji}</div>
            <div style={{
              position: 'absolute', bottom: -6, right: -6,
              width: 32, height: 32, borderRadius: '50%',
              background: V.accent, color: '#fffaf0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 6px 14px ${V.accent}50`,
            }}>{Icon.check(17, '#fffaf0')}</div>
          </div>
          <div className="m-hand" style={{ color: V.ribbon, fontSize: 17, marginBottom: 4 }}>
            you&apos;re in —
          </div>
          <h1 className="m-serif" style={{
            fontSize: dense ? 22 : 26, color: V.ink, lineHeight: 1.1,
            letterSpacing: '-0.02em', margin: 0,
            fontWeight: V.polaroid ? 500 : 400,
          }}>
            Welcome to <em style={{ fontStyle: 'italic', color: V.accent }}>{c.title}</em>.
          </h1>
          <p style={{ fontSize: 13.5, color: V.inkSoft, lineHeight: 1.5, margin: '10px 0 0', maxWidth: 300 }}>
            {c.location ? (
              <>First session at <strong style={{ color: V.ink }}>{c.location.studio}</strong>{c.schedule && <> · <strong style={{ color: V.ink }}>{c.schedule}</strong></>}.</>
            ) : (
              <>You&apos;ve reserved a seat with {m.short}.</>
            )}
          </p>
        </div>

        {c.levels ? (
          <div style={{ padding: `${dense ? 4 : 8}px ${pad}px 0` }}>
            <div style={{
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              marginBottom: 10, padding: '0 4px',
            }}>
              <div>
                <div className="m-hand" style={{ fontSize: 16, color: V.ribbon, lineHeight: 1, marginBottom: 4 }}>
                  one more thing —
                </div>
                <div className="m-serif" style={{ fontSize: 19, color: V.ink, lineHeight: 1.1,
                                                  fontWeight: V.polaroid ? 500 : 400 }}>
                  Pick your level
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {c.levels.map((lv: any, i: number) => {
                const locked = lv.status === 'locked';
                const sel = selectedLevel === lv.id;
                return (
                  <button key={lv.id}
                    onClick={() => !locked && setSelectedLevel(lv.id)}
                    disabled={locked}
                    className={locked ? '' : 'm-tap'}
                    style={{
                      width: '100%', textAlign: 'left',
                      background: sel ? V.accent : V.surface,
                      color: sel ? '#fffaf0' : V.ink,
                      border: `1px solid ${sel ? V.accent : V.rule}`,
                      borderRadius: 14, padding: dense ? '11px 14px' : '13px 16px',
                      display: 'flex', alignItems: 'center', gap: 12,
                      backgroundImage: !sel && V.paper ? PAPER_NOISE : undefined,
                      backgroundSize: !sel && V.paper ? '240px 240px' : undefined,
                      boxShadow: sel ? `0 8px 18px ${V.accent}40` : 'none',
                      opacity: locked ? 0.5 : 1,
                      cursor: locked ? 'default' : 'pointer',
                      transition: 'background .15s ease, color .15s ease',
                    }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: sel ? 'rgba(255,255,255,0.18)'
                                : locked ? V.surfaceAlt
                                : V.accentBg,
                      color: sel ? '#fffaf0' : locked ? V.inkMute : V.accent,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, flexShrink: 0,
                    }}>{locked ? Icon.lock(13) : `L${i + 1}`}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="m-serif" style={{
                        fontSize: 14, lineHeight: 1.15,
                        fontWeight: V.polaroid ? 500 : 400,
                      }}>{lv.name}</div>
                      <div style={{
                        fontSize: 10.5, marginTop: 2,
                        color: sel ? 'rgba(255,250,240,0.85)' : V.inkMute,
                      }}>{lv.subtitle} · {lv.done || 0} of {lv.sessions} sessions</div>
                      <div style={{ marginTop: 6 }}>
                        <SessionDots V={V} sessions={lv.sessions} done={lv.done || 0}
                          color={sel ? '#fffaf0' : lv.status === 'completed' ? V.ribbon : V.accent}
                          size={9} gap={4} />
                      </div>
                    </div>
                    {lv.status === 'completed' && !sel && (
                      <span style={{
                        fontSize: 9.5, color: V.ribbon, fontWeight: 700,
                        letterSpacing: '0.1em',
                      }}>✓ DONE</span>
                    )}
                    {sel && (
                      <span style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: '#fffaf0', color: V.accent,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{Icon.check(13, V.accent)}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="m-hand" style={{
              textAlign: 'center', marginTop: 14, color: V.inkMute, fontSize: 13,
            }}>— you can change this anytime —</div>
          </div>
        ) : (
          <div style={{ padding: `${dense ? 6 : 10}px ${pad + 8}px 0`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 320 }}>
              <button onClick={onConfirmed} className="m-tap" style={{
                flex: 1, background: V.surface, color: V.ink,
                border: `1px solid ${V.rule}`, borderRadius: 14, padding: '13px 0',
                fontSize: 14, fontWeight: 600,
              }}>Add to calendar</button>
              <button onClick={onConfirmed} className="m-tap" style={{
                flex: 1, background: V.accent, color: '#fffaf0',
                border: 'none', borderRadius: 14, padding: '13px 0',
                fontSize: 14, fontWeight: 600,
                boxShadow: `0 8px 18px ${V.accent}40`,
              }}>View schedule</button>
            </div>
            <div className="m-hand" style={{
              marginTop: 22, color: V.inkMute, fontSize: 15,
            }}>— see you at the studio —</div>
          </div>
        )}

        {c.levels && (
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: V.surface, borderTop: `1px solid ${V.rule}`,
            padding: `14px ${pad}px 28px`,
            backgroundImage: V.paper ? PAPER_NOISE : undefined,
            backgroundSize: V.paper ? '240px 240px' : undefined,
          }}>
            <button onClick={onConfirmed} className="m-tap" style={{
              width: '100%', background: V.accent, color: '#fffaf0',
              border: 'none', borderRadius: 14, padding: '14px 0',
              fontSize: 15, fontWeight: 600, letterSpacing: '0.01em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: `0 10px 22px ${V.accent}40`,
            }}>
              {(() => {
                const lv = c.levels.find((x: any) => x.id === selectedLevel);
                return lv ? <>Start with {lv.name} {Icon.arrow(16, '#fffaf0')}</> : 'View schedule';
              })()}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="m-fade" style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: V.fontSans, color: V.ink, paddingBottom: 110,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: `8px ${pad}px ${dense ? 8 : 12}px`,
      }}>
        <button onClick={goBack} className="m-tap" style={{
          width: 36, height: 36, borderRadius: '50%', background: V.surface,
          border: `1px solid ${V.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: V.ink, flexShrink: 0,
        }}>{Icon.back(18)}</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
                        color: V.inkMute, fontWeight: 600 }}>Enrolling in</div>
          <div className="m-serif" style={{ fontSize: 16, color: V.ink, lineHeight: 1.1,
                                            overflow: 'hidden', textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap' }}>{c.title}</div>
        </div>
      </div>

      <div style={{ padding: `0 ${pad}px ${dense ? 14 : 18}px` }}>
        <div style={{
          background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 20,
          padding: dense ? 16 : 20,
          backgroundImage: V.paper ? PAPER_NOISE : undefined,
          backgroundSize: V.paper ? '240px 240px' : undefined,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, background: V.accentBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, flexShrink: 0,
            }}>{c.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="m-serif" style={{
                fontSize: 17, color: V.ink, lineHeight: 1.2,
                fontWeight: V.polaroid ? 500 : 400,
              }}>{c.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4,
                            fontSize: 11.5, color: V.inkMute }}>
                <span>with <strong style={{ color: V.ink }}>{m.short}</strong></span>
                <span style={{ width: 3, height: 3, background: V.inkMute, borderRadius: '50%' }} />
                <span><Stars rating={c.rating || 5} size={11} color={V.accent}/> {c.rating}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 5,
            }}>
              <span style={{ fontSize: 11.5, color: V.inkSoft }}>
                <strong style={{ color: V.ink }}>{c.students}</strong>
                <span style={{ color: V.inkMute }}> of {c.seats}</span> seats taken
              </span>
              <span className="m-serif" style={{
                fontSize: 12, fontStyle: 'italic',
                color: nearlyFull ? '#b5462e' : V.ribbon, fontWeight: 600,
              }}>{remaining} left</span>
            </div>
            <div style={{
              height: 6, background: 'rgba(60,40,20,0.10)',
              borderRadius: 100, overflow: 'hidden',
            }}>
              <div style={{
                width: `${Math.min(pctFull, 100)}%`, height: '100%',
                background: nearlyFull ? '#b5462e' : V.accent,
                borderRadius: 100,
              }} />
            </div>
          </div>
        </div>
      </div>

      {c.location && (
        <div style={{ padding: `0 ${pad}px ${dense ? 14 : 18}px` }}>
          <div style={{
            fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: V.inkMute, fontWeight: 600, marginBottom: 10, padding: '0 4px',
          }}>Where & when</div>
          <div style={{
            background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 16,
            padding: dense ? 14 : 16,
            backgroundImage: V.paper ? PAPER_NOISE : undefined,
            backgroundSize: V.paper ? '240px 240px' : undefined,
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 12, flexShrink: 0,
              background: V.accentBg, position: 'relative', overflow: 'hidden',
              border: `1px solid ${V.accentSoft}`,
            }}>
              <svg viewBox="0 0 64 64" style={{ position: 'absolute', inset: 0 }}>
                <path d="M0 22 H64 M0 44 H64 M22 0 V64 M44 0 V64"
                      stroke={V.accent + '30'} strokeWidth="2" />
              </svg>
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -55%)',
                color: V.accent,
              }}>{Icon.pin(28)}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="m-serif" style={{ fontSize: 15, color: V.ink, lineHeight: 1.2,
                                                fontWeight: V.polaroid ? 500 : 400 }}>
                {c.location.studio}
              </div>
              <div style={{ fontSize: 11.5, color: V.inkMute, marginTop: 2 }}>
                {c.location.address} · {c.location.city}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8,
                            color: V.accent, fontSize: 12, fontWeight: 600 }}>
                {Icon.calendar(13, V.accent)} {c.schedule}
              </div>
              <button className="m-tap" style={{
                marginTop: 8, background: 'transparent', border: 'none',
                color: V.accent, fontSize: 11.5, fontWeight: 600, padding: 0,
              }}>Get directions →</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: `0 ${pad}px ${dense ? 16 : 22}px` }}>
        <div style={{
          fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: V.inkMute, fontWeight: 600, marginBottom: 10, padding: '0 4px',
        }}>What you get</div>
        <div style={{
          background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 16,
          overflow: 'hidden',
          backgroundImage: V.paper ? PAPER_NOISE : undefined,
          backgroundSize: V.paper ? '240px 240px' : undefined,
        }}>
          {[
            { icon: '🏛️', l: `${c.levels ? c.levels.find((x: any) =>x.id===selectedLevel)?.sessions || c.lessons : c.lessons} in-person sessions`, s: 'small group · max 12 students' },
            { icon: '📅', l: 'Set weekly schedule', s: c.schedule || 'meet weekly with your group' },
            { icon: '🛠️', l: 'All materials provided', s: 'just bring yourself' },
            { icon: '💬', l: 'Direct line to your mentor', s: `message ${m.short} between sessions` },
          ].map((b, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: dense ? '11px 16px' : '13px 18px',
              borderTop: i === 0 ? 'none' : `1px dashed ${V.rule}`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, background: V.accentBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }}>{b.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="m-serif" style={{ fontSize: 13.5, color: V.ink, lineHeight: 1.2 }}>{b.l}</div>
                <div style={{ fontSize: 11, color: V.inkMute, marginTop: 2 }}>{b.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: `0 ${pad}px ${dense ? 16 : 22}px` }}>
        <div style={{
          fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: V.inkMute, fontWeight: 600, marginBottom: 10, padding: '0 4px',
        }}>Payment</div>
        <div style={{
          background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 16,
          padding: dense ? 14 : 16,
          backgroundImage: V.paper ? PAPER_NOISE : undefined,
          backgroundSize: V.paper ? '240px 240px' : undefined,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            paddingBottom: 12,
            borderBottom: `1px dashed ${V.rule}`,
          }}>
            <div style={{
              width: 38, height: 26, borderRadius: 5,
              background: V.ink, color: '#fffaf0', fontSize: 10, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              letterSpacing: '0.04em',
            }}>VISA</div>
            <div style={{ flex: 1, fontSize: 13, color: V.ink }}>•••• 4242</div>
            <button style={{
              background: 'transparent', border: 'none', color: V.accent,
              fontSize: 12, fontWeight: 600,
            }}>Change</button>
          </div>
          <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6,
                        fontSize: 13, color: V.inkSoft }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Course price</span><span style={{ color: V.ink }}>${subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Platform fee</span><span style={{ color: V.ink }}>${fee}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginTop: 8, paddingTop: 8, borderTop: `1px solid ${V.rule}`,
              fontSize: 14, color: V.ink,
            }}>
              <strong>Total today</strong>
              <span className="m-serif" style={{ fontSize: 18, color: V.accent, fontWeight: 600 }}>
                ${total}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: `0 ${pad}px` }}>
        <button onClick={() => setAgreed(a => !a)} className="m-tap" style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          background: 'transparent', border: 'none', padding: '4px 4px',
          textAlign: 'left', width: '100%',
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: 6, flexShrink: 0,
            background: agreed ? V.accent : V.surface,
            border: `1.5px solid ${agreed ? V.accent : V.rule}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 1,
          }}>
            {agreed && Icon.check(13, '#fffaf0')}
          </div>
          <div style={{ fontSize: 11.5, color: V.inkSoft, lineHeight: 1.5 }}>
            I understand this is a one-time charge of <strong style={{ color: V.ink }}>${total}</strong>{' '}
            for the in-person course. Cancellation up to 48 hours before the first session.
          </div>
        </button>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: V.surface, borderTop: `1px solid ${V.rule}`,
        padding: `14px ${pad}px 28px`,
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
      }}>
        <button
          disabled={!agreed}
          onClick={() => setConfirmed(true)}
          className="m-tap" style={{
            width: '100%', background: V.accent, color: '#fffaf0',
            border: 'none', borderRadius: 14, padding: '15px 0',
            fontSize: 15, fontWeight: 600, letterSpacing: '0.01em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: agreed ? `0 10px 22px ${V.accent}40` : 'none',
            opacity: agreed ? 1 : 0.4,
            transition: 'opacity .15s ease, box-shadow .15s ease',
          }}>
          Enroll for ${total} {Icon.arrow(16, '#fffaf0')}
        </button>
      </div>
    </div>
  );
}
