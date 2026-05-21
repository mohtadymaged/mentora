/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { MENTORS, REVIEWS_FOR_LAYLA, PAPER_NOISE, Icon, Stars } from '../mentora-data';

export function ReviewsScreen({ V, dense, mentor, goBack }: any) {
  const m = mentor || MENTORS[0];
  const [filter, setFilter] = useState('all');
  const filters: any[] = [
    { id: 'all', label: 'All' },
    { id: 'friends', label: 'Friends', count: 2 },
    { id: '5', label: '5★ only' },
    { id: 'recent', label: 'Recent' },
  ];
  const distribution = [
    { s: 5, pct: 84 }, { s: 4, pct: 12 }, { s: 3, pct: 3 },
    { s: 2, pct: 1 }, { s: 1, pct: 0 },
  ];
  const list = useMemo(() => {
    let r: any[] = [...REVIEWS_FOR_LAYLA];
    if (filter === 'friends') r = r.filter(x => x.mutual);
    if (filter === '5') r = r.filter(x => x.rating === 5);
    if (filter === 'recent') r = r.slice(0,3);
    return r;
  }, [filter]);
  const pad = dense ? 14 : 18;

  return (
    <div className="m-fade" style={{ paddingBottom: 110, fontFamily: V.fontSans }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: `8px ${pad}px ${dense ? 8 : 12}px`,
      }}>
        <button onClick={goBack} className="m-tap" style={{
          width: 36, height: 36, borderRadius: '50%', background: V.surface,
          border: `1px solid ${V.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: V.ink,
        }}>{Icon.back(18)}</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
                        color: V.inkMute, fontWeight: 600 }}>Reviews for</div>
          <div className="m-serif" style={{ fontSize: 17, color: V.ink, lineHeight: 1 }}>{m.name}</div>
        </div>
      </div>

      <div style={{ padding: `0 ${pad}px ${dense ? 14 : 18}px` }}>
        <div style={{
          background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 20,
          padding: dense ? 16 : 20,
          backgroundImage: V.paper ? PAPER_NOISE : undefined,
          backgroundSize: V.paper ? '240px 240px' : undefined,
          display: 'flex', alignItems: 'center', gap: dense ? 14 : 18,
        }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div className="m-serif" style={{
              fontSize: dense ? 46 : 54, color: V.ink, lineHeight: 0.95, fontWeight: 500,
            }}>{m.rating.toFixed(1)}</div>
            <Stars rating={m.rating} size={12} color={V.accent} />
            <div style={{ fontSize: 10.5, color: V.inkMute, marginTop: 4 }}>{m.reviewCount} reviews</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {distribution.map(d => (
              <div key={d.s} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 10.5, color: V.inkMute, width: 12, textAlign: 'right' }}>{d.s}</span>
                <span style={{ color: V.accent, fontSize: 9 }}>★</span>
                <div style={{
                  flex: 1, height: 6, background: 'rgba(60,40,20,0.08)',
                  borderRadius: 100, overflow: 'hidden',
                }}>
                  <div style={{ width: `${d.pct}%`, height: '100%',
                                background: V.accent, borderRadius: 100,
                                transition: 'width .4s ease' }} />
                </div>
                <span style={{ fontSize: 10, color: V.inkMute, width: 22, textAlign: 'right' }}>{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 8, overflowX: 'auto',
        padding: `0 ${pad}px ${dense ? 12 : 16}px`,
        margin: '0 -2px',
      }}>
        {filters.map(f => {
          const active = filter === f.id;
          return (
            <button key={f.id} onClick={() => setFilter(f.id)} className="m-tap"
              style={{
                background: active ? V.ink : V.surface,
                color: active ? V.surface : V.ink,
                border: `1px solid ${active ? V.ink : V.rule}`,
                padding: '7px 14px', borderRadius: 100,
                fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
              {f.label}
              {f.count && <span style={{
                background: active ? V.accent : V.accentBg,
                color: active ? '#fffaf0' : V.accent,
                fontSize: 9, padding: '1px 6px', borderRadius: 100, fontWeight: 700,
              }}>{f.count}</span>}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: dense ? 10 : 12,
                    padding: `0 ${pad}px` }}>
        {list.map((r, idx) => (
          <div key={r.id} className="m-fade" style={{
            background: V.surface, border: `1px solid ${V.rule}`,
            borderRadius: 18, padding: dense ? 14 : 16,
            position: 'relative',
            backgroundImage: V.paper ? PAPER_NOISE : undefined,
            backgroundSize: V.paper ? '240px 240px' : undefined,
            animationDelay: `${idx * 60}ms`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: V.accentBg,
                color: V.accent, fontWeight: 700, fontSize: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: r.mutual ? `2px solid ${V.ribbon}` : 'none',
              }}>{r.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="m-serif" style={{ fontSize: 14, color: V.ink, lineHeight: 1.1 }}>{r.author}</div>
                <div style={{ fontSize: 10.5, color: V.inkMute, marginTop: 2 }}>
                  {r.course} · {r.when}
                </div>
              </div>
              <Stars rating={r.rating} size={12} color={V.accent} />
            </div>
            {r.mutual && (
              <div className="m-hand" style={{ color: V.ribbon, fontSize: 13, marginBottom: 6 }}>↳ {r.mutual}</div>
            )}
            <p className="m-serif" style={{
              fontSize: 13.5, lineHeight: 1.55, color: V.ink, margin: 0, fontStyle: 'italic',
            }}>&ldquo;{r.text}&rdquo;</p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14, marginTop: 12,
              paddingTop: 10, borderTop: `1px dashed ${V.rule}`,
            }}>
              <button className="m-tap" style={{
                background: 'transparent', border: 'none', color: V.inkSoft,
                fontSize: 11.5, display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500,
              }}>
                {Icon.heart(13, V.inkSoft, 'none')} Helpful · {r.helpful}
              </button>
              <button className="m-tap" style={{
                background: 'transparent', border: 'none', color: V.inkSoft,
                fontSize: 11.5, display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500,
              }}>
                {Icon.message(13, V.inkSoft)} Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="m-hand" style={{
        textAlign: 'center', marginTop: 20, color: V.inkMute, fontSize: 15,
      }}>— that&apos;s all for now —</div>
    </div>
  );
}
