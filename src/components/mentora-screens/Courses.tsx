/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import React, { useState } from 'react';
import { MENTORS, ENROLLED, PAPER_NOISE, Icon, Stars } from '../mentora-data';
import { SessionDots } from '../mentora-ui';

export function CoursesScreen({ V, dense, role, openMentor }: any) {
  const pad = dense ? 14 : 18;
  const isTeacher = role === 'teacher';
  const [filter, setFilter] = useState('all');

  if (isTeacher) {
    const me = MENTORS[0];
    const myCourses: any[] = [
      ...me.courses.map((c: any) => ({
        ...c, status: 'published',
        nextSession: c.id === 'c1' ? 'May 23, 09:30' : null,
      })),
      { id: 'draft1', title: 'Advanced Portraits', emoji: '🎭', students: 0,
        rating: null, lessons: 0, price: 99, status: 'draft', nextSession: null },
    ];
    const totalEnrolled = me.courses.reduce((s, c: any) => s + c.students, 0);
    const filters = [
      { id: 'all', label: 'All', count: myCourses.length },
      { id: 'published', label: 'Published', count: me.courses.length },
      { id: 'draft', label: 'Drafts', count: 1 },
    ];
    const list = myCourses.filter(c => filter === 'all' ? true : c.status === filter);

    return (
      <div className="m-fade" style={{ paddingBottom: 100, padding: `4px ${pad}px 100px`, fontFamily: V.fontSans }}>
        <div style={{ padding: `${dense ? 6 : 12}px 2px ${dense ? 14 : 18}px` }}>
          <div className="m-hand" style={{ fontSize: 16, color: V.ribbon, lineHeight: 1, marginBottom: 4 }}>
            your studio —
          </div>
          <div className="m-serif" style={{
            fontSize: dense ? 26 : 30, color: V.ink, lineHeight: 1.05,
            letterSpacing: '-0.02em', fontWeight: V.polaroid ? 500 : 400,
          }}>
            My <em style={{ color: V.accent, fontStyle: 'italic' }}>courses</em>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: dense ? 14 : 18 }}>
          <div style={{ flex: 1, background: V.surface, border: `1px solid ${V.rule}`,
                        borderRadius: 12, padding: dense ? '10px 12px' : '12px 14px',
                        backgroundImage: V.paper ? PAPER_NOISE : undefined,
                        backgroundSize: V.paper ? '240px 240px' : undefined }}>
            <div style={{ fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase',
                          color: V.inkMute, fontWeight: 600 }}>Students</div>
            <div className="m-serif" style={{ fontSize: dense ? 18 : 20, color: V.ink, marginTop: 2,
                                              fontWeight: V.polaroid ? 500 : 400 }}>{totalEnrolled}</div>
          </div>
          <div style={{ flex: 1, background: V.surface, border: `1px solid ${V.rule}`,
                        borderRadius: 12, padding: dense ? '10px 12px' : '12px 14px',
                        backgroundImage: V.paper ? PAPER_NOISE : undefined,
                        backgroundSize: V.paper ? '240px 240px' : undefined }}>
            <div style={{ fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase',
                          color: V.inkMute, fontWeight: 600 }}>This month</div>
            <div className="m-serif" style={{ fontSize: dense ? 18 : 20, color: V.accent, marginTop: 2,
                                              fontWeight: 600 }}>$1,840</div>
          </div>
          <button className="m-tap" style={{
            background: V.accent, color: '#fffaf0', border: 'none',
            borderRadius: 12, padding: '0 18px', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: `0 8px 18px ${V.accent}40`,
          }}>+ New</button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: dense ? 12 : 16, overflowX: 'auto' }}>
          {filters.map(f => {
            const on = filter === f.id;
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} className="m-tap" style={{
                background: on ? V.ink : V.surface,
                color: on ? V.surface : V.ink,
                border: `1px solid ${on ? V.ink : V.rule}`,
                padding: '7px 13px', borderRadius: 100,
                fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {f.label}
                <span style={{
                  background: on ? V.accent : V.accentBg,
                  color: on ? '#fffaf0' : V.accent,
                  fontSize: 9, padding: '1px 6px', borderRadius: 100, fontWeight: 700,
                }}>{f.count}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: dense ? 10 : 12 }}>
          {list.map((c: any) => {
            const isDraft = c.status === 'draft';
            return (
              <div key={c.id} className="m-tap" style={{
                background: V.surface, border: `1px solid ${V.rule}`,
                borderRadius: 16, padding: dense ? 14 : 16,
                backgroundImage: V.paper ? PAPER_NOISE : undefined,
                backgroundSize: V.paper ? '240px 240px' : undefined,
                opacity: isDraft ? 0.78 : 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 12,
                    background: isDraft ? V.surfaceAlt : V.accentBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, flexShrink: 0,
                  }}>{c.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div className="m-serif" style={{ fontSize: 15.5, color: V.ink, lineHeight: 1.2 }}>{c.title}</div>
                      {isDraft && (
                        <span style={{
                          background: V.surfaceAlt, color: V.inkSoft,
                          fontSize: 8.5, fontWeight: 700, letterSpacing: '0.1em',
                          textTransform: 'uppercase', padding: '2px 6px', borderRadius: 100,
                        }}>Draft</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8,
                                  fontSize: 11.5, color: V.inkMute, marginTop: 3 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {Icon.user(11, V.inkMute)}
                        <strong style={{ color: V.ink }}>{c.students}</strong> enrolled
                      </span>
                      {c.rating && (
                        <>
                          <span style={{ width: 3, height: 3, background: V.inkMute, borderRadius: '50%' }} />
                          <span><Stars rating={c.rating} size={10} color={V.accent} /> {c.rating}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="m-serif" style={{ fontSize: 17, color: V.accent, fontWeight: 600 }}>${c.price}</div>
                    <div style={{ fontSize: 9.5, color: V.inkMute, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {isDraft ? 'Not live' : `${c.lessons} lessons`}
                    </div>
                  </div>
                </div>
                {c.nextSession && (
                  <div style={{
                    marginTop: 10, paddingTop: 10,
                    borderTop: `1px dashed ${V.rule}`,
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 11.5, color: V.inkSoft,
                  }}>
                    {Icon.calendar(13, V.inkSoft)}
                    Next session: <strong style={{ color: V.ink }}>{c.nextSession}</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const filters = [
    { id: 'all', label: 'All', count: ENROLLED.length + 1 },
    { id: 'progress', label: 'In progress', count: ENROLLED.length },
    { id: 'completed', label: 'Completed', count: 1 },
  ];
  const completed: any = {
    id: 'done1', title: 'Sketching for Beginners', mentor: 'Layla M.',
    emoji: '✏️', completedOn: 'Apr 14', cert: true, accent: '#b4632a',
    cover: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=600&auto=format&fit=crop',
  };
  const allItems: any[] = filter === 'completed' ? [completed]
                 : filter === 'progress'  ? (ENROLLED as unknown as any[])
                 : [...(ENROLLED as unknown as any[]), completed];

  return (
    <div className="m-fade" style={{ paddingBottom: 100, padding: `4px ${pad}px 100px`, fontFamily: V.fontSans }}>
      <div style={{ padding: `${dense ? 6 : 12}px 2px ${dense ? 14 : 18}px` }}>
        <div className="m-hand" style={{ fontSize: 16, color: V.ribbon, lineHeight: 1, marginBottom: 4 }}>
          your shelf —
        </div>
        <div className="m-serif" style={{
          fontSize: dense ? 26 : 30, color: V.ink, lineHeight: 1.05,
          letterSpacing: '-0.02em', fontWeight: V.polaroid ? 500 : 400,
        }}>
          My <em style={{ color: V.accent, fontStyle: 'italic' }}>courses</em>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: dense ? 14 : 18, overflowX: 'auto' }}>
        {filters.map(f => {
          const on = filter === f.id;
          return (
            <button key={f.id} onClick={() => setFilter(f.id)} className="m-tap" style={{
              background: on ? V.ink : V.surface,
              color: on ? V.surface : V.ink,
              border: `1px solid ${on ? V.ink : V.rule}`,
              padding: '7px 13px', borderRadius: 100,
              fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {f.label}
              <span style={{
                background: on ? V.accent : V.accentBg,
                color: on ? '#fffaf0' : V.accent,
                fontSize: 9, padding: '1px 6px', borderRadius: 100, fontWeight: 700,
              }}>{f.count}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: dense ? 12 : 14 }}>
        {allItems.map((c: any) => {
          const isDone = c.cert;
          const pct = isDone ? 100 : Math.round((c.lessonDone / c.lessonTotal) * 100);
          return (
            <button key={c.id} onClick={openMentor} className="m-tap" style={{
              width: '100%', textAlign: 'left',
              background: V.surface, border: `1px solid ${V.rule}`,
              borderRadius: 18, padding: 0, overflow: 'hidden',
              backgroundImage: V.paper ? PAPER_NOISE : undefined,
              backgroundSize: V.paper ? '240px 240px' : undefined,
            }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div style={{
                  width: dense ? 100 : 112, flexShrink: 0,
                  position: 'relative', background: V.surfaceAlt,
                }}>
                  <img src={c.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {isDone && (
                    <div style={{
                      position: 'absolute', top: 8, left: 8,
                      background: V.ribbon, color: '#fffaf0',
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '3px 8px', borderRadius: 100,
                    }}>Completed</div>
                  )}
                </div>
                <div style={{ flex: 1, padding: dense ? 13 : 15, minWidth: 0 }}>
                  <div className="m-serif" style={{
                    fontSize: dense ? 15.5 : 17, color: V.ink, lineHeight: 1.2,
                    fontWeight: V.polaroid ? 500 : 400,
                  }}>{c.title}</div>
                  <div style={{ fontSize: 11.5, color: V.inkMute, marginTop: 3 }}>with {c.mentor}</div>
                  {c.location && !isDone && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      marginTop: 8, fontSize: 11, color: V.inkSoft,
                    }}>
                      <span style={{ color: V.accent }}>{Icon.pin(12)}</span>
                      <span><strong style={{ color: V.ink }}>{c.location.studio}</strong> · {c.location.city}</span>
                    </div>
                  )}
                  {c.nextSession && !isDone && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      marginTop: 4, fontSize: 11, color: V.accent, fontWeight: 600,
                    }}>
                      {Icon.calendar(12, V.accent)} {c.nextSession}
                    </div>
                  )}
                  {isDone && (
                    <div style={{ marginTop: 8, fontSize: 11.5, color: V.ribbon, fontWeight: 600 }}>
                      ✓ {c.completedOn}
                    </div>
                  )}
                </div>
              </div>

              {c.levels && !isDone && (
                <div style={{
                  padding: dense ? '10px 14px' : '12px 16px',
                  borderTop: `1px dashed ${V.rule}`,
                  background: V.surfaceAlt + '50',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 8,
                  }}>
                    <div style={{
                      fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: V.inkMute, fontWeight: 600,
                    }}>Levels</div>
                    <div style={{ fontSize: 11, color: V.inkMute }}>
                      Lvl {c.levels.findIndex((l: any) => l.status === 'in-progress') + 1} of {c.levels.length}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {c.levels.map((lv: any, i: number) => {
                      const done = lv.status === 'completed';
                      const live = lv.status === 'in-progress';
                      const locked = lv.status === 'locked';
                      return (
                        <div key={lv.id} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '6px 8px', borderRadius: 8,
                          background: live ? V.accentBg : 'transparent',
                          border: live ? `1px solid ${V.accent}` : '1px solid transparent',
                        }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: '50%',
                            background: done ? V.ribbon
                                      : live ? V.accent
                                      : V.surfaceAlt,
                            color: done || live ? '#fffaf0' : V.inkMute,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 10, fontWeight: 700, flexShrink: 0,
                          }}>
                            {done ? Icon.check(11, '#fffaf0')
                                  : locked ? Icon.lock(10, V.inkMute)
                                  : (i + 1)}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="m-serif" style={{
                              fontSize: 12.5, color: locked ? V.inkMute : V.ink,
                              lineHeight: 1.1,
                            }}>
                              {lv.name} <span style={{
                                color: V.inkMute, fontStyle: 'italic', fontSize: 11.5,
                              }}>· {lv.subtitle}</span>
                            </div>
                            <div style={{ fontSize: 10, color: V.inkMute, marginTop: 2 }}>
                              {lv.done || 0} of {lv.sessions} sessions{live && ' · ongoing'}
                            </div>
                            <div style={{ marginTop: 6 }}>
                              <SessionDots V={V} sessions={lv.sessions} done={lv.done || 0}
                                color={done ? V.ribbon : V.accent} size={9} gap={4} />
                            </div>
                          </div>
                          {live && Icon.play(13, V.accent)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {!c.levels && !isDone && (
                <div style={{
                  padding: dense ? '10px 14px 12px' : '12px 16px 14px',
                  borderTop: `1px dashed ${V.rule}`,
                }}>
                  <div style={{ height: 5, background: 'rgba(60,40,20,0.10)',
                                borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%',
                                  background: V.accent, borderRadius: 100 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between',
                                marginTop: 6, fontSize: 11, color: V.inkMute }}>
                    <span><em className="m-serif" style={{ fontStyle: 'italic' }}>Next: {c.nextLesson}</em></span>
                    <span style={{ color: V.accent, fontWeight: 600 }}>{pct}%</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
