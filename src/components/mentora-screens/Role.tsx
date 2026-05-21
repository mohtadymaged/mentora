/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { MENTORS, PAPER_NOISE, HandUnderline, Icon } from '../mentora-data';
import { MentorPhoto } from '../mentora-ui';

export function RoleScreen({ V, dense, onPick, goBack }: any) {
  const [hover, setHover] = useState<string | null>(null);
  const pad = dense ? 22 : 28;

  const Card = ({ role, title, lede, illo, side }: any) => {
    const isLearner = role === 'learner';
    return (
      <button onClick={() => onPick(role)}
        onMouseEnter={() => setHover(role)} onMouseLeave={() => setHover(null)}
        className="m-tap" style={{
          width: '100%', textAlign: 'left',
          background: V.surface, border: `1px solid ${hover === role ? V.accent : V.rule}`,
          borderRadius: 22, padding: 0,
          overflow: 'hidden', position: 'relative',
          boxShadow: hover === role
            ? `0 14px 30px rgba(60,40,20,0.16), 0 0 0 2px ${V.accent}30`
            : '0 4px 16px rgba(60,40,20,0.06)',
          backgroundImage: V.paper ? PAPER_NOISE : undefined,
          backgroundSize: V.paper ? '240px 240px' : undefined,
          transition: 'box-shadow .22s ease, border-color .22s ease, transform .22s ease',
          transform: hover === role ? 'translateY(-2px)' : 'none',
        }}>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flex: 1, padding: dense ? '18px 18px' : '22px 20px' }}>
            <div style={{
              fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: V.inkMute, fontWeight: 600, marginBottom: 6,
            }}>{"I'm here to"}</div>
            <div className="m-serif" style={{
              fontSize: dense ? 26 : 30, color: V.ink, lineHeight: 1.0,
              letterSpacing: '-0.02em', position: 'relative', display: 'inline-block',
              fontWeight: V.polaroid ? 500 : 400,
            }}>
              <em style={{ fontStyle: 'italic', color: V.accent }}>{title}</em>
              <HandUnderline color={V.accent} width={56} height={8} strokeWidth={2.0}
                style={{ position: 'absolute', left: 0, bottom: -6 }} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: V.inkSoft,
                        margin: `${dense ? 14 : 16}px 0 0`, maxWidth: 200 }}>{lede}</p>
            <div style={{
              marginTop: dense ? 14 : 18,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: V.accent, fontSize: 12.5, fontWeight: 600,
            }}>
              {isLearner ? 'Find my mentor' : 'Share my craft'} {Icon.arrow(14)}
            </div>
          </div>
          <div style={{
            width: dense ? 92 : 108, position: 'relative',
            background: side, borderLeft: `1px dashed ${V.rule}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{illo}</div>
        </div>
      </button>
    );
  };

  const learnerFaces = [MENTORS[0], MENTORS[2], MENTORS[4]];
  const teacherFaces = [MENTORS[1], MENTORS[3], MENTORS[5]];

  const collageLearner = (
    <div style={{ position: 'relative', width: '85%', height: '70%' }}>
      {learnerFaces.map((m, i) => {
        const pos = [
          { top: 0,   left: 6,  size: 46, rot: -6 },
          { top: 30,  left: 44, size: 50, rot: 5  },
          { top: 60,  left: 8,  size: 42, rot: -2 },
        ][i];
        return (
          <div key={m.id} style={{ position: 'absolute', top: `${pos.top}%`, left: `${pos.left}%` }}>
            <MentorPhoto V={V} src={m.photo} alt={m.short}
                         size={pos.size} rotation={pos.rot} frame={V.polaroid} />
          </div>
        );
      })}
    </div>
  );
  const collageTeacher = (
    <div style={{ position: 'relative', width: '85%', height: '70%' }}>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
        <g transform="rotate(-32 50 50)">
          <rect x="20" y="44" width="48" height="11" rx="1" fill={V.accent} />
          <polygon points="68,44 80,49.5 68,55" fill={V.inkSoft} />
          <polygon points="78,48 80,49.5 78,51" fill={V.ink} />
          <rect x="14" y="44" width="6" height="11" fill={V.ribbon} />
          <line x1="32" y1="44" x2="32" y2="55" stroke="rgba(0,0,0,0.12)" strokeWidth="0.6" />
        </g>
        <g fill={V.accent}>
          <path d="M 80 20 l 1 4 l 4 1 l -4 1 l -1 4 l -1 -4 l -4 -1 l 4 -1 z" />
          <path d="M 16 76 l 0.7 2.5 l 2.5 0.7 l -2.5 0.7 l -0.7 2.5 l -0.7 -2.5 l -2.5 -0.7 l 2.5 -0.7 z" />
          <path d="M 86 70 l 0.5 1.8 l 1.8 0.5 l -1.8 0.5 l -0.5 1.8 l -0.5 -1.8 l -1.8 -0.5 l 1.8 -0.5 z" />
        </g>
      </svg>
      <div style={{ position: 'absolute', bottom: '6%', right: '4%' }}>
        <div style={{ display: 'flex', marginLeft: -8 }}>
          {teacherFaces.map((m, i) => (
            <div key={m.id} style={{
              width: 22, height: 22, borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${V.surface}`, marginLeft: i === 0 ? 0 : -7,
              boxShadow: '0 2px 5px rgba(0,0,0,0.12)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div data-screen-label="01 Role" className="m-fade" style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: V.fontSans, color: V.ink, paddingBottom: 18,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `4px ${pad}px ${dense ? 8 : 14}px`,
      }}>
        <button onClick={goBack} className="m-tap" style={{
          width: 36, height: 36, borderRadius: '50%', background: V.surface,
          border: `1px solid ${V.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: V.ink,
        }}>{Icon.back(18)}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 22, height: 4, borderRadius: 2, background: V.accent }} />
          <div style={{ width: 22, height: 4, borderRadius: 2, background: 'rgba(60,40,20,0.18)' }} />
          <div style={{ width: 22, height: 4, borderRadius: 2, background: 'rgba(60,40,20,0.18)' }} />
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ padding: `${dense ? 14 : 22}px ${pad}px ${dense ? 18 : 26}px` }}>
        <div className="m-hand" style={{ color: V.ribbon, fontSize: 18, marginBottom: 6 }}>
          one quick question
        </div>
        <h1 className="m-serif" style={{
          fontSize: dense ? 30 : 34, color: V.ink, lineHeight: 1.05,
          letterSpacing: '-0.02em', margin: 0,
          fontWeight: V.polaroid ? 500 : 400,
        }}>What brings you<br/>to Mentora?</h1>
        <p style={{ fontSize: 13.5, color: V.inkSoft, lineHeight: 1.55,
                    margin: '10px 0 0', maxWidth: 280 }}>
          You can switch later — most of us do a bit of both.
        </p>
      </div>

      <div style={{ padding: `0 ${pad}px`, display: 'flex', flexDirection: 'column',
                    gap: dense ? 12 : 14, flex: 1 }}>
        <Card role="learner" title="Learn something"
          lede="Pick up watercolor, code, or cooking from friends-of-friends."
          illo={collageLearner} side={V.accentBg} />
        <Card role="teacher" title="Teach what I know"
          lede="Turn your craft into a course. Free to list, paid when you sell."
          illo={collageTeacher} side={V.surfaceAlt} />
      </div>

      <div className="m-hand" style={{
        textAlign: 'center', marginTop: 'auto', paddingTop: 16,
        color: V.inkMute, fontSize: 15,
      }}>— pick one to keep going —</div>
    </div>
  );
}
