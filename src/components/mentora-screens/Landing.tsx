/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MENTORS, PAPER_NOISE, HandUnderline, Icon } from '../mentora-data';
import { MentorPhoto } from '../mentora-ui';

export function LandingScreen({ V, dense, onEnter, onTeach, onSignIn }: any) {
  const collageAtelier = [
    { id: 'layla',  size: 138, top: 6,  left: 30, rot: -5 },
    { id: 'karim',  size: 96,  top: 30, left: -4, rot: 6  },
    { id: 'nadia',  size: 110, top: 50, left: 60, rot: 4  },
    { id: 'aisha',  size: 80,  top: 78, left: 12, rot: -7 },
    { id: 'yousef', size: 86,  top: 82, left: 64, rot: 5  },
    { id: 'tarek',  size: 70,  top: 0,  left: 0,  rot: -8 },
  ];
  const collageHearth = [
    { id: 'layla',  size: 152, top: 8,  left: 28, rot: 0, shape: 'arch' },
    { id: 'karim',  size: 96,  top: 38, left: -2, rot: 0, shape: 'circle' },
    { id: 'nadia',  size: 110, top: 56, left: 60, rot: 0, shape: 'soft' },
    { id: 'aisha',  size: 84,  top: 80, left: 18, rot: 0, shape: 'circle' },
    { id: 'yousef', size: 86,  top: 78, left: 68, rot: 0, shape: 'soft' },
    { id: 'tarek',  size: 70,  top: 4,  left: 4,  rot: 0, shape: 'circle' },
  ];
  const collage: any[] = V.polaroid ? collageAtelier : collageHearth;
  const pad = dense ? 22 : 28;

  return (
    <div data-screen-label="00 Landing" className="m-fade" style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: V.fontSans, color: V.ink,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `4px ${pad}px 0`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: V.accent, color: V.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: V.fontSerif, fontStyle: 'italic',
            fontSize: 19, fontWeight: 600, lineHeight: 1,
            boxShadow: `0 3px 8px ${V.accent}40`,
          }}>M</div>
          <span className="m-serif" style={{ fontSize: 17, color: V.ink, letterSpacing: '-0.01em' }}>Mentora</span>
        </div>
        <button onClick={onSignIn} className="m-tap" style={{
          background: 'transparent', border: 'none',
          color: V.inkSoft, fontSize: 13, fontWeight: 500, padding: '8px 4px',
        }}>Sign in</button>
      </div>

      <div style={{
        position: 'relative', height: dense ? 320 : 360,
        margin: `${dense ? 10 : 14}px ${pad - 6}px`,
      }}>
        {!V.polaroid && (
          <>
            <div style={{
              position: 'absolute', inset: '8% 4% 14% 6%',
              background: V.accentBg, borderRadius: '46% 54% 60% 40% / 50% 46% 54% 50%',
              opacity: 0.65,
            }} />
            <div style={{
              position: 'absolute', top: '12%', right: '4%', width: 70, height: 70,
              background: V.ribbon, opacity: 0.18, borderRadius: '50%',
            }} />
          </>
        )}
        {collage.map((c, i) => {
          const m = MENTORS.find(x => x.id === c.id);
          if (!m) return null;
          return (
            <div key={c.id} className="m-float" style={{
              position: 'absolute',
              top: `${c.top}%`, left: `${c.left}%`,
              width: c.size, height: V.polaroid ? 'auto' : c.size,
              animationDelay: `${i * -1.3}s`,
              zIndex: c.size > 100 ? 3 : 2,
            }}>
              {V.polaroid ? (
                <MentorPhoto V={V} src={m.photo} alt={m.name} size={c.size} rotation={c.rot} frame={true} />
              ) : (
                <div style={{
                  width: c.size, height: c.size,
                  borderRadius: c.shape === 'arch' ? '50% 50% 50% 50% / 60% 60% 40% 40%'
                              : c.shape === 'soft' ? '38% 62% 56% 44% / 50% 42% 58% 50%'
                              : '50%',
                  overflow: 'hidden',
                  boxShadow: '0 12px 26px rgba(60,30,20,0.18)',
                  border: `3px solid ${V.surface}`,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              {c.size > 100 && i === 0 && V.polaroid && (
                <div className="m-hand" style={{
                  position: 'absolute', bottom: -10, left: -8,
                  fontSize: 17, color: V.ink, transform: 'rotate(-7deg)',
                  background: 'rgba(255,250,230,0.95)', padding: '2px 7px',
                  borderRadius: 3, boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}>Layla, watercolor</div>
              )}
            </div>
          );
        })}
        {V.polaroid && (
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"
               style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <path d="M 30 30 Q 50 18, 72 38" stroke={V.accent} strokeWidth="0.4"
                  fill="none" strokeDasharray="1.4 1.4" strokeLinecap="round" />
            <path d="M 18 62 Q 38 78, 70 70" stroke={V.ribbon} strokeWidth="0.4"
                  fill="none" strokeDasharray="1.4 1.4" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <div style={{ padding: `0 ${pad}px`, textAlign: 'left' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: V.accentBg, color: V.accent,
          padding: '4px 11px', borderRadius: 100,
          fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
          marginBottom: dense ? 10 : 14,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: V.accent }} />
          2,400 of your kind of people
        </div>
        <h1 className="m-serif" style={{
          fontSize: dense ? 34 : 40, color: V.ink, lineHeight: 1.02,
          letterSpacing: '-0.02em', margin: 0,
          fontWeight: V.polaroid ? 500 : 400,
        }}>
          Learn from people<br/>
          you{' '}
          <span style={{ fontStyle: 'italic', color: V.accent, position: 'relative', display: 'inline-block' }}>
            actually
            <HandUnderline color={V.accent} width={84} height={9} strokeWidth={2.2}
              style={{ position: 'absolute', left: 0, bottom: -7 }} />
          </span>{' '}
          know.
        </h1>
        <p style={{
          fontSize: 14.5, color: V.inkSoft, lineHeight: 1.55,
          margin: `${dense ? 16 : 22}px 0 0`, maxWidth: 320,
        }}>
          Mentora is a community of friends teaching what they love —
          watercolor, code, cooking, calm mornings. <em className="m-serif" style={{ color: V.ink, fontStyle: 'italic' }}>Pull up a chair.</em>
        </p>
      </div>

      <div style={{
        marginTop: 'auto', padding: `${dense ? 20 : 28}px ${pad}px 12px`,
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <button onClick={onEnter} className="m-tap" style={{
          background: V.accent, color: '#fffaf0',
          border: 'none', borderRadius: 16, padding: '15px 0',
          fontSize: 15, fontWeight: 600, letterSpacing: '0.01em',
          boxShadow: `0 10px 22px ${V.accent}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Start learning {Icon.arrow(17, '#fffaf0')}
        </button>
        <button onClick={onTeach} className="m-tap" style={{
          background: V.surface, color: V.ink,
          border: `1px solid ${V.rule}`, borderRadius: 16, padding: '14px 0',
          fontSize: 15, fontWeight: 500,
          backgroundImage: V.paper ? PAPER_NOISE : undefined,
          backgroundSize: V.paper ? '240px 240px' : undefined,
        }}>I want to teach instead</button>
        <div className="m-hand" style={{
          textAlign: 'center', marginTop: 8, color: V.inkMute, fontSize: 15,
        }}>— free to join, always —</div>
      </div>
    </div>
  );
}
