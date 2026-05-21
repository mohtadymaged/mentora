/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import React from 'react';
import { ENROLLED, RECOMMENDED, PAPER_NOISE, Icon, Stars } from '../mentora-data';
import { SectionHead } from '../mentora-ui';

export function HomeScreen({ V, dense, openMentor }: any) {
  const pad = dense ? 14 : 18;

  const USER = {
    name: 'Layla', fullName: 'Layla Marwan',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  };

  const hour = new Date().getHours();
  let timeGreeting = 'Hello';
  if (hour < 12)      timeGreeting = 'Good morning';
  else if (hour < 18) timeGreeting = 'Good afternoon';
  else                timeGreeting = 'Good evening';
  const handGreeting = hour < 12 ? 'welcome back —' : hour < 18 ? 'glad you\'re back —' : 'evening, friend —';

  return (
    <div className="m-fade" style={{ paddingBottom: 100, padding: `4px ${pad}px 100px`, fontFamily: V.fontSans }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: dense ? 12 : 14,
        padding: `${dense ? 8 : 12}px 2px ${dense ? 14 : 18}px`,
      }}>
        <button onClick={() => openMentor && openMentor()} className="m-tap" style={{
          background: 'transparent', border: 'none', padding: 0, position: 'relative', flexShrink: 0,
        }}>
          {V.polaroid ? (
            <div style={{
              background: '#fffaf0', padding: '4px 4px 10px',
              boxShadow: '0 6px 16px rgba(60,40,20,0.18)',
              transform: 'rotate(-3deg)',
            }}>
              <img src={USER.photo} alt={USER.name} style={{
                display: 'block',
                width: dense ? 54 : 62, height: dense ? 54 : 62,
                objectFit: 'cover',
              }} />
            </div>
          ) : (
            <img src={USER.photo} alt={USER.name} style={{
              width: dense ? 58 : 66, height: dense ? 58 : 66,
              borderRadius: '50%', objectFit: 'cover',
              border: `3px solid ${V.surface}`,
              boxShadow: '0 6px 16px rgba(60,30,20,0.18)',
            }} />
          )}
          <span style={{
            position: 'absolute', bottom: V.polaroid ? 4 : 2, right: V.polaroid ? 2 : 2,
            width: 13, height: 13, borderRadius: '50%',
            background: '#7c8c5e', border: `2.5px solid ${V.bg}`,
          }} />
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="m-hand" style={{ fontSize: 16, color: V.ribbon, lineHeight: 1, marginBottom: 2 }}>
            {handGreeting}
          </div>
          <div className="m-serif" style={{
            fontSize: dense ? 22 : 26, color: V.ink, lineHeight: 1.1,
            letterSpacing: '-0.02em', fontWeight: V.polaroid ? 500 : 400,
          }}>
            {timeGreeting},{' '}
            <em style={{ color: V.accent, fontStyle: 'italic' }}>{USER.name}</em>.
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
        background: V.accentBg, borderRadius: 14,
        padding: dense ? '10px 14px' : '12px 16px',
        marginBottom: dense ? 18 : 24,
        display: 'flex', alignItems: 'center', gap: 10,
        border: `1px solid ${V.accentSoft}`,
      }}>
        <span style={{ fontSize: 18 }}>☕</span>
        <div style={{ flex: 1, fontSize: 12.5, color: V.ink, lineHeight: 1.4 }}>
          You&apos;re on a <strong style={{ color: V.accent }}>4-day streak</strong>.
          One short lesson keeps it going.
        </div>
      </div>

      <SectionHead V={V} eyebrow="Pick up where you left off" title="Continue learning" dense={dense}
        action={
          <button style={{
            background: 'transparent', border: 'none', color: V.accent,
            fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3,
          }}>All courses {Icon.arrow(13)}</button>
        } />

      <button onClick={openMentor} style={{
        width: '100%', textAlign: 'left', background: V.surface,
        border: `1px solid ${V.rule}`, borderRadius: 22, padding: 0,
        boxShadow: '0 6px 24px rgba(60,40,20,0.07)',
        overflow: 'hidden', position: 'relative',
        marginBottom: dense ? 12 : 14,
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
      }} className="m-tap">
        <div style={{ height: dense ? 130 : 150, overflow: 'hidden', position: 'relative' }}>
          <img src={ENROLLED[0].cover} alt=""
               style={{ width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'saturate(0.95) contrast(0.98)' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(180deg, rgba(0,0,0,0) 30%, ${V.surface} 100%)`,
          }} />
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: V.surface, color: V.accent,
            fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: 100,
            border: `1px solid ${V.rule}`,
          }}>Up next · Session {ENROLLED[0].lessonDone + 1}</div>
          <div style={{
            position: 'absolute', bottom: 18, right: 16,
            width: 46, height: 46, borderRadius: '50%',
            background: V.accent, color: '#fffaf0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 18px ${V.accent}50`,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fffaf0">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div style={{ padding: `${dense ? 12 : 16}px 18px ${dense ? 14 : 18}px`,
                      marginTop: -8, position: 'relative' }}>
          <div className="m-serif" style={{
            fontSize: dense ? 18 : 20, color: V.ink, lineHeight: 1.15,
            fontWeight: V.polaroid ? 500 : 400,
          }}>{ENROLLED[0].title}</div>
          <div style={{ fontSize: 12.5, color: V.inkSoft, marginTop: 3 }}>
            <em className="m-serif" style={{ fontStyle: 'italic' }}>{ENROLLED[0].nextLesson}</em>
            {' · '}by {ENROLLED[0].mentor}
          </div>
          <div style={{
            marginTop: 12, height: 5, background: 'rgba(60,40,20,0.10)',
            borderRadius: 100, overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              width: `${(ENROLLED[0].lessonDone / ENROLLED[0].lessonTotal) * 100}%`,
              height: '100%', background: V.accent, borderRadius: 100,
            }} />
          </div>
          <div style={{ fontSize: 11, color: V.inkMute, marginTop: 6 }}>
            {ENROLLED[0].lessonDone} of {ENROLLED[0].lessonTotal} lessons
          </div>
        </div>
      </button>

      <div style={{
        display: 'flex', gap: dense ? 10 : 12, overflowX: 'auto',
        margin: '0 -18px', padding: `2px 18px ${dense ? 22 : 28}px`,
      }}>
        {ENROLLED.slice(1).map(c => {
          const pct = Math.round((c.lessonDone / c.lessonTotal) * 100);
          return (
            <button key={c.id} onClick={openMentor} className="m-tap"
              style={{
                width: dense ? 200 : 220, flexShrink: 0,
                background: V.surface, border: `1px solid ${V.rule}`,
                borderRadius: 16, padding: dense ? 12 : 14, textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 10,
                backgroundImage: V.paper ? PAPER_NOISE : undefined,
                backgroundSize: V.paper ? '240px 240px' : undefined,
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, background: V.accentBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>{c.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="m-serif" style={{ fontSize: 14, color: V.ink,
                                                    lineHeight: 1.2,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap' }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: 11, color: V.inkMute, marginTop: 2 }}>
                    by {c.mentor}
                  </div>
                </div>
              </div>
              <div>
                <div style={{
                  height: 4, background: 'rgba(60,40,20,0.10)',
                  borderRadius: 100, overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${pct}%`, height: '100%',
                    background: V.accent, borderRadius: 100,
                  }} />
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: 5, fontSize: 10.5, color: V.inkMute,
                }}>
                  <span>{c.lessonDone}/{c.lessonTotal} lessons</span>
                  <span style={{ color: V.accent, fontWeight: 600 }}>{pct}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <SectionHead V={V} eyebrow="Picked for you" title="You might also like" dense={dense}
        action={
          <button style={{
            background: 'transparent', border: 'none', color: V.accent,
            fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3,
          }}>Explore {Icon.arrow(13)}</button>
        } />

      <div style={{ display: 'flex', flexDirection: 'column', gap: dense ? 10 : 12, marginBottom: dense ? 22 : 28 }}>
        {RECOMMENDED.map(c => (
          <button key={c.id} onClick={() => openMentor()} className="m-tap" style={{
            width: '100%', textAlign: 'left',
            background: V.surface, border: `1px solid ${V.rule}`,
            borderRadius: 18, padding: 0, overflow: 'hidden',
            display: 'flex', alignItems: 'stretch',
            backgroundImage: V.paper ? PAPER_NOISE : undefined,
            backgroundSize: V.paper ? '240px 240px' : undefined,
          }}>
            <div style={{
              width: dense ? 92 : 104, flexShrink: 0,
              position: 'relative', background: V.surfaceAlt,
            }}>
              <img src={c.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', top: 8, left: 8,
                background: 'rgba(0,0,0,0.55)', color: '#fffaf0',
                fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '2px 7px', borderRadius: 100,
                backdropFilter: 'blur(4px)',
              }}>{c.tag}</div>
            </div>
            <div style={{ flex: 1, padding: dense ? 12 : 14, minWidth: 0 }}>
              <div className="m-hand" style={{ fontSize: 13, color: V.ribbon, lineHeight: 1, marginBottom: 4 }}>
                {c.why}
              </div>
              <div className="m-serif" style={{
                fontSize: dense ? 15 : 16, color: V.ink, lineHeight: 1.2,
                fontWeight: V.polaroid ? 500 : 400,
              }}>{c.title}</div>
              <div style={{ fontSize: 11.5, color: V.inkMute, marginTop: 3 }}>by {c.mentor}</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginTop: dense ? 6 : 8,
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11.5, color: V.ink }}>
                  <Stars rating={c.rating} size={11} color={V.accent} />
                  <span style={{ marginLeft: 2, fontWeight: 600 }}>{c.rating}</span>
                </span>
                <span style={{ width: 3, height: 3, background: V.inkMute, borderRadius: '50%' }} />
                <span style={{ fontSize: 11.5, color: V.inkMute }}>{c.students} students</span>
                <span className="m-serif" style={{
                  marginLeft: 'auto', fontSize: dense ? 15 : 16,
                  color: V.accent, fontWeight: 600,
                }}>${c.price}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="m-hand" style={{
        textAlign: 'center', marginTop: 12, color: V.inkMute, fontSize: 17,
        letterSpacing: '0.01em',
      }}>— small steps, every day —</div>
    </div>
  );
}
