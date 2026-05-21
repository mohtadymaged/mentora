/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MENTORS, PAPER_NOISE, Icon, Stars } from '../mentora-data';
import { MentorPhoto, SectionHead, SessionDots } from '../mentora-ui';

export function MentorScreen({ V, dense, mentor, goBack, openReviews, openBooking }: any) {
  const m = mentor || MENTORS[0];
  const pad = dense ? 14 : 18;
  return (
    <div className="m-fade" style={{ paddingBottom: 110, fontFamily: V.fontSans }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `8px ${pad}px ${dense ? 10 : 14}px`,
      }}>
        <button onClick={goBack} className="m-tap" style={{
          width: 36, height: 36, borderRadius: '50%', background: V.surface,
          border: `1px solid ${V.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: V.ink,
        }}>{Icon.back(18)}</button>
        <button className="m-tap" style={{
          width: 36, height: 36, borderRadius: '50%', background: V.surface,
          border: `1px solid ${V.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: V.ink,
        }}>{Icon.more(18)}</button>
      </div>

      <div style={{
        padding: `0 ${pad}px`, position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      }}>
        <div style={{ position: 'relative', marginBottom: dense ? 14 : 18 }}>
          <MentorPhoto V={V} src={m.photo} alt={m.name}
                       size={dense ? 140 : 168} rotation={-2.5} frame={true} />
          {V.polaroid && (
            <div style={{
              position: 'absolute', top: -10, left: '50%',
              transform: 'translateX(-50%) rotate(-4deg)',
              width: 60, height: 20,
              background: 'rgba(247, 223, 161, 0.7)',
              boxShadow: 'inset 0 0 3px rgba(0,0,0,0.04)',
            }} />
          )}
        </div>
        <div className="m-serif" style={{ fontSize: dense ? 26 : 30, color: V.ink, lineHeight: 1.05 }}>{m.name}</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 5,
          color: V.inkSoft, fontSize: 13,
        }}>
          <span>{m.craft}</span>
          <span style={{ width: 3, height: 3, background: V.inkMute, borderRadius: '50%' }} />
          <span>{m.city}</span>
        </div>
        {m.accent && (
          <div className="m-hand" style={{
            color: V.accent, fontSize: 16, marginTop: 8, fontStyle: 'italic',
          }}>&ldquo;{m.accent}&rdquo;</div>
        )}

        <div style={{
          marginTop: dense ? 12 : 16, padding: '8px 14px',
          background: V.accentBg, borderRadius: 100,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          border: `1px solid ${V.accentSoft}`,
        }}>
          <div style={{ display: 'flex' }}>
            {m.mutuals.slice(0,3).map((name: string, i: number) => (
              <div key={name} style={{
                width: 22, height: 22, borderRadius: '50%',
                background: V.accent, color: '#fffaf0',
                fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1.5px solid ${V.accentBg}`,
                marginLeft: i === 0 ? 0 : -7,
              }}>{name[0]}</div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: V.ink, fontWeight: 500 }}>
            <strong>{m.mutualCount} friends</strong> learn here
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        margin: `${dense ? 18 : 22}px ${pad}px 0`,
        background: V.surface, border: `1px solid ${V.rule}`,
        borderRadius: 18,
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
      }}>
        {[
          { v: m.rating.toFixed(1), l: 'Rating', icon: '★', color: V.accent },
          { v: m.students, l: 'Students' },
          { v: m.yearsTeaching + 'y', l: 'Teaching' },
        ].map((s: any, i) => (
          <div key={i} style={{
            padding: dense ? '14px 8px' : '18px 8px', textAlign: 'center',
            borderLeft: i === 0 ? 'none' : `1px dashed ${V.rule}`,
          }}>
            <div className="m-serif" style={{ fontSize: dense ? 19 : 22, color: V.ink, lineHeight: 1 }}>
              {s.icon && <span style={{ color: s.color || V.accent, marginRight: 2 }}>{s.icon}</span>}
              {s.v}
            </div>
            <div style={{ fontSize: 10.5, color: V.inkMute, marginTop: 4,
                          textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', gap: 10, padding: `${dense ? 14 : 18}px ${pad}px 0`,
      }}>
        <button className="m-tap" style={{
          flex: 1, background: V.surface, color: V.ink, border: `1px solid ${V.rule}`,
          borderRadius: 14, padding: '13px 0',
          fontSize: 14, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          backgroundImage: V.paper ? PAPER_NOISE : undefined,
          backgroundSize: V.paper ? '240px 240px' : undefined,
        }}>{Icon.message(16, V.ink)} Message</button>
        <button className="m-tap" style={{
          background: V.surface, color: V.ink, border: `1px solid ${V.rule}`,
          borderRadius: 14, padding: '13px 16px',
          fontSize: 14, fontWeight: 600,
        }}>{Icon.heart(17, V.accent, 'none')}</button>
      </div>

      {m.bio && (
        <div style={{ padding: `${dense ? 18 : 22}px ${pad}px 0` }}>
          <div style={{
            fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: V.inkMute, fontWeight: 600, marginBottom: 6,
          }}>About</div>
          <p className="m-serif" style={{
            fontSize: 15, lineHeight: 1.55, color: V.ink, margin: 0, fontStyle: 'italic',
          }}>&ldquo;{m.bio}&rdquo;</p>
        </div>
      )}

      <div style={{ padding: `${dense ? 20 : 26}px ${pad}px 0` }}>
        <SectionHead V={V} eyebrow="What she teaches" title="Her courses" dense={dense} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: dense ? 12 : 14 }}>
          {m.courses.map((c: any) => {
            const remaining = (c.seats || 0) - c.students;
            const pctFull = Math.round((c.students / (c.seats || 1)) * 100);
            const nearlyFull = remaining > 0 && remaining <= 5;
            const full = remaining <= 0;
            return (
              <div key={c.id} style={{
                background: V.surface, border: `1px solid ${V.rule}`,
                borderRadius: 16, padding: dense ? 14 : 16,
                backgroundImage: V.paper ? PAPER_NOISE : undefined,
                backgroundSize: V.paper ? '240px 240px' : undefined,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: dense ? 46 : 52, height: dense ? 46 : 52,
                    borderRadius: 12, background: V.accentBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: dense ? 22 : 26, flexShrink: 0,
                  }}>{c.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="m-serif" style={{
                      fontSize: dense ? 15 : 16, color: V.ink, lineHeight: 1.2,
                      fontWeight: V.polaroid ? 500 : 400,
                    }}>{c.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4,
                                  fontSize: 11.5, color: V.inkMute }}>
                      <span><Stars rating={c.rating} size={11} color={V.accent}/> <span style={{ marginLeft: 2 }}>{c.rating}</span></span>
                      <span style={{ width: 3, height: 3, background: V.inkMute, borderRadius: '50%' }} />
                      <span>{c.lessons} lessons</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div className="m-serif" style={{
                      fontSize: dense ? 17 : 19, color: V.accent, fontWeight: 600,
                    }}>${c.price}</div>
                    <div style={{
                      fontSize: 9.5, color: V.inkMute, textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>per level</div>
                  </div>
                </div>

                {c.location && (
                  <div style={{
                    marginTop: dense ? 10 : 12, padding: '8px 12px',
                    background: V.surfaceAlt, borderRadius: 10,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <div style={{ color: V.accent, flexShrink: 0 }}>{Icon.pin(15)}</div>
                    <div style={{ flex: 1, minWidth: 0, fontSize: 11.5 }}>
                      <div className="m-serif" style={{ color: V.ink, fontStyle: 'italic', lineHeight: 1.2 }}>
                        {c.location.studio}
                      </div>
                      <div style={{ color: V.inkMute, marginTop: 1, fontSize: 10.5 }}>
                        {c.location.city} · {c.schedule}
                      </div>
                    </div>
                  </div>
                )}

                {c.levels && (
                  <div style={{ marginTop: dense ? 10 : 12 }}>
                    <div style={{
                      fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: V.inkMute, fontWeight: 600, marginBottom: 6,
                    }}>{c.levels.length} levels</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {c.levels.map((lv: any, i: number) => {
                        const done = lv.status === 'completed';
                        const live = lv.status === 'in-progress';
                        const locked = lv.status === 'locked';
                        const dotColor = done ? V.ribbon : V.accent;
                        return (
                          <div key={lv.id} style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '7px 10px', borderRadius: 10,
                            background: live ? V.accentBg
                                      : done ? V.ribbon + '15'
                                      : V.surfaceAlt,
                            border: live ? `1px solid ${V.accent}` : '1px solid transparent',
                          }}>
                            <div style={{
                              width: 22, height: 22, borderRadius: 6,
                              background: done ? V.ribbon
                                        : live ? V.accent
                                        : V.surface,
                              color: done || live ? '#fffaf0' : V.inkMute,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 10, fontWeight: 700, flexShrink: 0,
                            }}>
                              {done ? Icon.check(11, '#fffaf0')
                                    : locked ? Icon.lock(11, V.inkMute)
                                    : `L${i + 1}`}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="m-serif" style={{
                                fontSize: 12.5, color: locked ? V.inkMute : V.ink,
                                lineHeight: 1.1,
                              }}>
                                {lv.name}{' '}
                                <span style={{
                                  fontSize: 10, color: V.inkMute, fontWeight: 600,
                                }}>· {lv.done || 0}/{lv.sessions}</span>
                              </div>
                              <div style={{ marginTop: 4 }}>
                                <SessionDots V={V} sessions={lv.sessions} done={lv.done || 0}
                                  color={dotColor} size={8} gap={3} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: dense ? 12 : 14 }}>
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
                      color: full ? V.inkMute : nearlyFull ? '#b5462e' : V.ribbon,
                      fontWeight: 600,
                    }}>{full ? 'full' : `${remaining} left`}</span>
                  </div>
                  <div style={{
                    height: 5, background: 'rgba(60,40,20,0.10)',
                    borderRadius: 100, overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${Math.min(pctFull, 100)}%`, height: '100%',
                      background: full ? V.inkMute : nearlyFull ? '#b5462e' : V.accent,
                      borderRadius: 100, transition: 'width .3s ease',
                    }} />
                  </div>
                </div>

                <button onClick={() => openBooking(c.id)} disabled={full}
                  className="m-tap" style={{
                    width: '100%', marginTop: dense ? 12 : 14,
                    background: full ? V.surfaceAlt : V.accent,
                    color: full ? V.inkMute : '#fffaf0',
                    border: 'none', borderRadius: 12,
                    padding: dense ? '11px 0' : '12px 0',
                    fontSize: 14, fontWeight: 600, letterSpacing: '0.01em',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    boxShadow: full ? 'none' : `0 6px 14px ${V.accent}40`,
                    cursor: full ? 'default' : 'pointer',
                  }}>
                  {full ? 'Waitlist' : 'Enroll'}
                  {!full && Icon.arrow(15, '#fffaf0')}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: `${dense ? 22 : 28}px ${pad}px 0` }}>
        <SectionHead V={V} eyebrow="What learners say" title={`${m.rating.toFixed(1)}★ from ${m.reviewCount} reviews`} dense={dense}
          action={
            <button onClick={openReviews} className="m-tap" style={{
              background: 'transparent', border: 'none', color: V.accent,
              fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3,
            }}>See all {Icon.arrow(13)}</button>
          } />
        <div className="m-tap" onClick={openReviews} style={{
          background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 16,
          padding: dense ? 14 : 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: V.accentBg,
              color: V.accent, fontWeight: 700, fontSize: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>O</div>
            <div style={{ flex: 1 }}>
              <div className="m-serif" style={{ fontSize: 13.5, color: V.ink }}>Omar K.</div>
              <div style={{ fontSize: 10.5, color: V.inkMute }}>2 days ago · a friend of yours</div>
            </div>
            <Stars rating={5} size={13} color={V.accent} />
          </div>
          <p className="m-serif" style={{
            fontSize: 13.5, color: V.ink, lineHeight: 1.55, margin: '10px 0 0',
            fontStyle: 'italic',
          }}>&ldquo;Layla makes complex techniques feel approachable. Feels like learning from a friend.&rdquo;</p>
        </div>
      </div>
    </div>
  );
}
