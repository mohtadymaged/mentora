/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { MENTORS, PAPER_NOISE, Icon, Stars } from '../mentora-data';
import { SectionHead, MentorPhoto } from '../mentora-ui';

export function ExploreScreen({ V, dense, openMentor }: any) {
  const pad = dense ? 14 : 18;
  const [cat, setCat] = useState('All');
  const categories = ['All', 'Art', 'Cooking', 'Tech', 'Wellness', 'Speaking', 'Business'];

  const allCourses = MENTORS.flatMap(m => m.courses.map((c: any) => ({ ...c, mentor: m })));

  return (
    <div className="m-fade" style={{ paddingBottom: 100, padding: `4px ${pad}px 100px`, fontFamily: V.fontSans }}>
      <div style={{ padding: `${dense ? 6 : 12}px 2px ${dense ? 14 : 18}px` }}>
        <div className="m-hand" style={{ fontSize: 16, color: V.ribbon, lineHeight: 1, marginBottom: 4 }}>discover —</div>
        <div className="m-serif" style={{
          fontSize: dense ? 26 : 30, color: V.ink, lineHeight: 1.05,
          letterSpacing: '-0.02em', fontWeight: V.polaroid ? 500 : 400,
        }}>
          Find your next <em style={{ color: V.accent, fontStyle: 'italic' }}>craft</em>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 14,
        padding: '11px 14px', marginBottom: dense ? 14 : 18,
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
      }}>
        {Icon.search(17, V.inkMute)}
        <span style={{ flex: 1, color: V.inkMute, fontSize: 14 }}>
          Search mentors, crafts, topics…
        </span>
        <button style={{
          background: 'transparent', border: 'none', color: V.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Icon.filter(16, V.inkSoft)}</button>
      </div>

      <div style={{
        display: 'flex', gap: 8, overflowX: 'auto',
        margin: `0 -${pad}px ${dense ? 18 : 22}px`,
        padding: `0 ${pad}px`,
      }}>
        {categories.map(c => {
          const on = cat === c;
          return (
            <button key={c} onClick={() => setCat(c)} className="m-tap" style={{
              background: on ? V.accent : V.surface,
              color: on ? '#fffaf0' : V.ink,
              border: `1px solid ${on ? V.accent : V.rule}`,
              padding: '7px 14px', borderRadius: 100,
              fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>{c}</button>
          );
        })}
      </div>

      <SectionHead V={V} eyebrow="In your circle" title="Friends teaching" dense={dense} />
      <div style={{
        display: 'flex', gap: dense ? 10 : 14, overflowX: 'auto',
        margin: `0 -${pad}px ${dense ? 22 : 28}px`, padding: `4px ${pad}px`,
      }}>
        {MENTORS.map((m, i) => (
          <button key={m.id} onClick={() => openMentor(m.id)} className="m-tap"
            style={{
              background: 'transparent', border: 'none', padding: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 6, flexShrink: 0, width: dense ? 64 : 72,
            }}>
            <MentorPhoto V={V} src={m.photo} alt={m.name} size={dense ? 56 : 64}
                         rotation={i % 2 === 0 ? -3 : 2} frame={V.polaroid} />
            <div className="m-serif" style={{ fontSize: 12.5, color: V.ink, marginTop: V.polaroid ? 2 : 0 }}>
              {m.short}
            </div>
            <div style={{ fontSize: 10, color: V.inkMute, lineHeight: 1.1, textAlign: 'center' }}>
              {m.craft.split(' ').slice(-1)[0]}
            </div>
          </button>
        ))}
      </div>

      <SectionHead V={V} eyebrow="Trending this week" title="Popular courses" dense={dense} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: dense ? 10 : 12 }}>
        {allCourses.slice(0, 5).map((c: any) => (
          <button key={c.id} onClick={() => openMentor(c.mentor.id)} className="m-tap" style={{
            width: '100%', textAlign: 'left',
            background: V.surface, border: `1px solid ${V.rule}`,
            borderRadius: 16, padding: dense ? 12 : 14,
            display: 'flex', alignItems: 'center', gap: 12,
            backgroundImage: V.paper ? PAPER_NOISE : undefined,
            backgroundSize: V.paper ? '240px 240px' : undefined,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: V.accentBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, flexShrink: 0,
            }}>{c.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="m-serif" style={{ fontSize: 14.5, color: V.ink, lineHeight: 1.2 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: V.inkMute, marginTop: 2 }}>
                by {c.mentor.short} · {c.students} students
              </div>
              <div style={{
                marginTop: 5, display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 11, color: V.ink,
              }}>
                <Stars rating={c.rating} size={10} color={V.accent} />
                <span style={{ fontWeight: 600 }}>{c.rating}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div className="m-serif" style={{ fontSize: 17, color: V.accent, fontWeight: 600 }}>${c.price}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
