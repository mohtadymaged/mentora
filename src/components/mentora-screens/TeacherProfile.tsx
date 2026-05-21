/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import React, { useState } from 'react';
import { MENTORS, REVIEWS_FOR_LAYLA, TEACHER_BOOKINGS, PAPER_NOISE, Icon, Stars } from '../mentora-data';
import { SectionHead } from '../mentora-ui';

export function TeacherProfileScreen({ V, dense, openReviews }: any) {
  const me = MENTORS[0];
  const pad = dense ? 14 : 18;

  const MONTH = 'May';
  const YEAR = 2026;
  const DAYS_IN_MONTH = 31;
  const FIRST_WEEKDAY = 5;
  const TODAY = 19;
  const dayNames = ['S','M','T','W','T','F','S'];

  const [selectedDay, setSelectedDay] = useState(20);

  const cells: any[] = [];
  for (let i = 0; i < FIRST_WEEKDAY; i++) cells.push({ kind: 'empty' });
  for (let d = 1; d <= DAYS_IN_MONTH; d++) {
    const isPast = d < TODAY;
    const isToday = d === TODAY;
    const bookings = TEACHER_BOOKINGS[d];
    let kind = 'none';
    if (bookings) kind = 'booked';
    if (isPast) kind = 'past';
    cells.push({ kind, day: d, isToday, count: bookings ? bookings.length : 0 });
  }

  const totalUpcomingBookings = Object.entries(TEACHER_BOOKINGS)
    .filter(([d]) => +d >= TODAY)
    .reduce((sum, [, list]) => sum + (list as any[]).length, 0);
  const totalEnrolled = me.courses.reduce((s, c) => s + (c as any).students, 0);
  const selectedBookings = TEACHER_BOOKINGS[selectedDay] || [];

  return (
    <div className="m-fade" style={{ paddingBottom: 100, padding: `4px ${pad}px 100px`, fontFamily: V.fontSans }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: dense ? 12 : 14,
        padding: `${dense ? 8 : 12}px 2px ${dense ? 16 : 22}px`,
      }}>
        {V.polaroid ? (
          <div style={{
            background: '#fffaf0', padding: '4px 4px 10px',
            boxShadow: '0 6px 16px rgba(60,40,20,0.18)',
            transform: 'rotate(-3deg)', flexShrink: 0,
          }}>
            <img src={me.photo} alt={me.name} style={{
              display: 'block',
              width: dense ? 56 : 64, height: dense ? 56 : 64,
              objectFit: 'cover',
            }} />
          </div>
        ) : (
          <img src={me.photo} alt={me.name} style={{
            width: dense ? 60 : 68, height: dense ? 60 : 68,
            borderRadius: '50%', objectFit: 'cover',
            border: `3px solid ${V.surface}`,
            boxShadow: '0 6px 16px rgba(60,30,20,0.18)', flexShrink: 0,
          }} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="m-hand" style={{ fontSize: 16, color: V.ribbon, lineHeight: 1, marginBottom: 2 }}>
            your studio —
          </div>
          <div className="m-serif" style={{
            fontSize: dense ? 22 : 26, color: V.ink, lineHeight: 1.1,
            letterSpacing: '-0.02em', fontWeight: V.polaroid ? 500 : 400,
          }}>
            Hello, <em style={{ color: V.accent, fontStyle: 'italic' }}>{me.short}</em>.
          </div>
        </div>
        <button className="m-tap" style={{
          width: 38, height: 38, borderRadius: '50%', background: V.surface,
          border: `1px solid ${V.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: V.ink, position: 'relative', flexShrink: 0,
        }}>
          {Icon.bell(18)}
          <span style={{
            position: 'absolute', top: 6, right: 8, width: 8, height: 8,
            borderRadius: '50%', background: V.accent,
            border: `1.5px solid ${V.surface}`,
          }} />
        </button>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        marginBottom: dense ? 20 : 26,
        background: V.surface, border: `1px solid ${V.rule}`,
        borderRadius: 18,
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
      }}>
        {[
          { v: totalEnrolled, l: 'Students' },
          { v: me.courses.length, l: 'Courses' },
          { v: me.rating.toFixed(1) + '★', l: 'Rating', color: V.accent },
        ].map((s: any, i) => (
          <div key={i} style={{
            padding: dense ? '14px 8px' : '18px 8px', textAlign: 'center',
            borderLeft: i === 0 ? 'none' : `1px dashed ${V.rule}`,
          }}>
            <div className="m-serif" style={{
              fontSize: dense ? 22 : 26, color: s.color || V.ink, lineHeight: 1,
              fontWeight: V.polaroid ? 500 : 400,
            }}>{s.v}</div>
            <div style={{ fontSize: 10.5, color: V.inkMute, marginTop: 4,
                          textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <SectionHead V={V} eyebrow="What I teach" title="My courses" dense={dense}
        action={
          <button className="m-tap" style={{
            background: V.accent, color: '#fffaf0', border: 'none',
            fontSize: 11.5, fontWeight: 600, padding: '6px 12px', borderRadius: 100,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>+ New</button>
        } />
      <div style={{
        display: 'flex', flexDirection: 'column', gap: dense ? 10 : 12,
        marginBottom: dense ? 24 : 30,
      }}>
        {me.courses.map((c: any) => (
          <div key={c.id} className="m-tap" style={{
            background: V.surface, border: `1px solid ${V.rule}`,
            borderRadius: 16, padding: dense ? 14 : 16,
            display: 'flex', alignItems: 'center', gap: 14,
            backgroundImage: V.paper ? PAPER_NOISE : undefined,
            backgroundSize: V.paper ? '240px 240px' : undefined,
          }}>
            <div style={{
              width: dense ? 50 : 56, height: dense ? 50 : 56,
              borderRadius: 12, background: V.accentBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: dense ? 24 : 28, flexShrink: 0,
            }}>{c.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="m-serif" style={{
                fontSize: dense ? 15 : 16, color: V.ink, lineHeight: 1.2,
                fontWeight: V.polaroid ? 500 : 400,
              }}>{c.title}</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 11.5, color: V.inkMute, marginTop: 4,
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {Icon.user(11, V.inkMute)}
                  <strong style={{ color: V.ink }}>{c.students}</strong>
                  <span>enrolled</span>
                </span>
                <span style={{ width: 3, height: 3, background: V.inkMute, borderRadius: '50%' }} />
                <span><Stars rating={c.rating} size={10} color={V.accent} /> {c.rating}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="m-serif" style={{ fontSize: dense ? 16 : 18, color: V.accent, fontWeight: 600 }}>
                ${c.price}
              </div>
              <div style={{ fontSize: 9.5, color: V.inkMute, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {c.lessons} lessons
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionHead V={V} eyebrow="What's on" title="My calendar" dense={dense}
        action={
          <span style={{ fontSize: 11, color: V.inkMute }}>
            <strong style={{ color: V.accent }}>{totalUpcomingBookings}</strong> upcoming
          </span>
        } />
      <div style={{
        background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 18,
        padding: dense ? 14 : 16, marginBottom: dense ? 14 : 18,
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 10,
        }}>
          <button className="m-tap" style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'transparent', border: `1px solid ${V.rule}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: V.inkSoft,
          }}>{Icon.back(13)}</button>
          <div className="m-serif" style={{ fontSize: 16, color: V.ink, fontWeight: V.polaroid ? 500 : 400 }}>
            {MONTH} <span style={{ color: V.inkMute, fontWeight: 400 }}>{YEAR}</span>
          </div>
          <button className="m-tap" style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'transparent', border: `1px solid ${V.rule}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: V.inkSoft, transform: 'rotate(180deg)',
          }}>{Icon.back(13)}</button>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4,
        }}>
          {dayNames.map((d, i) => (
            <div key={i} style={{
              textAlign: 'center', fontSize: 9.5, letterSpacing: '0.1em',
              color: V.inkMute, fontWeight: 600, padding: '4px 0',
            }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {cells.map((c, i) => {
            if (c.kind === 'empty') return <div key={i} />;
            const isSelected = c.day === selectedDay && c.kind === 'booked';
            let bg = 'transparent';
            let color = V.ink;
            let border = '1px solid transparent';
            let dots: React.ReactNode = null;
            if (c.kind === 'past') color = 'rgba(60,40,20,0.25)';
            if (c.kind === 'booked') {
              bg = isSelected ? V.accent : V.accentBg;
              color = isSelected ? '#fffaf0' : V.accent;
              dots = (
                <span style={{
                  position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', gap: 2,
                }}>
                  {Array.from({ length: Math.min(c.count, 3) }).map((_, k) => (
                    <span key={k} style={{
                      width: 3, height: 3, borderRadius: '50%',
                      background: isSelected ? '#fffaf0' : V.accent,
                    }} />
                  ))}
                </span>
              );
            }
            if (c.isToday && c.kind !== 'booked') border = `1.5px solid ${V.accent}`;
            return (
              <button key={i}
                onClick={() => c.kind === 'booked' && setSelectedDay(c.day)}
                className={c.kind === 'booked' ? 'm-tap' : ''}
                style={{
                  aspectRatio: '1', background: bg, color, border,
                  borderRadius: 10, fontSize: 12.5, fontWeight: isSelected ? 700 : 500,
                  fontFamily: V.fontSans, padding: 0, position: 'relative',
                  cursor: c.kind === 'booked' ? 'pointer' : 'default',
                  boxShadow: isSelected ? `0 4px 12px ${V.accent}50` : 'none',
                  transition: 'background .15s ease',
                }}>
                {c.day}{dots}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: dense ? 24 : 30 }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: V.inkMute, fontWeight: 600, marginBottom: 8, padding: '0 4px',
        }}>
          {MONTH} {selectedDay} · {selectedBookings.length} session{selectedBookings.length === 1 ? '' : 's'}
        </div>
        {selectedBookings.length === 0 ? (
          <div className="m-hand" style={{
            textAlign: 'center', padding: '20px 16px', color: V.inkMute, fontSize: 16,
            background: V.surface, border: `1px dashed ${V.rule}`, borderRadius: 14,
          }}>— a quiet day —</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedBookings.map((b, i) => (
              <div key={i} className="m-tap" style={{
                background: V.surface, border: `1px solid ${V.rule}`,
                borderRadius: 14, padding: dense ? '10px 12px' : '12px 14px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div className="m-serif" style={{
                  fontSize: dense ? 15 : 17, color: V.accent, fontWeight: 600,
                  minWidth: 50, lineHeight: 1,
                }}>{b.time}</div>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: V.accentBg, color: V.accent, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, flexShrink: 0,
                }}>{b.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="m-serif" style={{ fontSize: 13.5, color: V.ink, lineHeight: 1.2 }}>{b.with}</div>
                  <div style={{ fontSize: 10.5, color: V.inkMute, marginTop: 1 }}>{b.course} · 30 min</div>
                </div>
                <button style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'transparent', border: `1px solid ${V.rule}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: V.inkSoft, flexShrink: 0,
                }}>{Icon.message(14)}</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <SectionHead V={V} eyebrow={`${me.reviewCount} reviews · ${me.rating.toFixed(1)}★`}
                   title="What learners say" dense={dense}
        action={
          <button onClick={openReviews} className="m-tap" style={{
            background: 'transparent', border: 'none', color: V.accent,
            fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3,
          }}>See all {Icon.arrow(13)}</button>
        } />
      <div style={{ display: 'flex', flexDirection: 'column', gap: dense ? 10 : 12 }}>
        {REVIEWS_FOR_LAYLA.slice(0, 3).map(r => (
          <div key={r.id} style={{
            background: V.surface, border: `1px solid ${V.rule}`,
            borderRadius: 16, padding: dense ? 14 : 16,
            backgroundImage: V.paper ? PAPER_NOISE : undefined,
            backgroundSize: V.paper ? '240px 240px' : undefined,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', background: V.accentBg,
                color: V.accent, fontWeight: 700, fontSize: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{r.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="m-serif" style={{ fontSize: 13.5, color: V.ink, lineHeight: 1.1 }}>{r.author}</div>
                <div style={{ fontSize: 10.5, color: V.inkMute, marginTop: 2 }}>
                  on <em className="m-serif" style={{ fontStyle: 'italic' }}>{r.course}</em> · {r.when}
                </div>
              </div>
              <Stars rating={r.rating} size={12} color={V.accent} />
            </div>
            <p className="m-serif" style={{
              fontSize: 13, lineHeight: 1.55, color: V.ink, margin: 0, fontStyle: 'italic',
            }}>&ldquo;{r.text}&rdquo;</p>
            <button className="m-tap" style={{
              marginTop: 10, background: 'transparent', border: 'none',
              color: V.accent, fontSize: 11.5, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 5, padding: 0,
            }}>
              {Icon.message(12, V.accent)} Reply
            </button>
          </div>
        ))}
      </div>

      <div className="m-hand" style={{
        textAlign: 'center', marginTop: 26, color: V.inkMute, fontSize: 17,
      }}>— thank you for showing up —</div>
    </div>
  );
}
