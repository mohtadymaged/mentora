'use client';

import React, { useEffect } from 'react';
import { VARIANTS, PAPER_NOISE, HandUnderline, Icon } from './mentora-data';
import type { Variant } from './mentora-data';

export type Role = 'learner' | 'teacher';
export type Screen =
  | 'welcome' | 'landing' | 'role' | 'register'
  | 'home' | 'courses' | 'explore' | 'settings'
  | 'mentor' | 'reviews' | 'booking';

export function VariantCSS({ variantKey, scope }: { variantKey: keyof typeof VARIANTS; scope: string }) {
  const id = `mvar-styles-${scope}`;
  useEffect(() => {
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    const V = VARIANTS[variantKey];
    s.textContent = `
      [data-mvar="${scope}"] { color: ${V.ink}; font-family: ${V.fontSans}; }
      [data-mvar="${scope}"] .m-serif { font-family: ${V.fontSerif}; font-weight: 400; letter-spacing: -0.012em; }
      [data-mvar="${scope}"] .m-hand   { font-family: ${V.fontHand}; font-weight: 500; }
      [data-mvar="${scope}"] *::-webkit-scrollbar { display:none; }
      [data-mvar="${scope}"] * { scrollbar-width: none; }
      [data-mvar="${scope}"] button { font-family: inherit; cursor: pointer; }
      [data-mvar="${scope}"] .m-fade { animation: m-fade 0.32s cubic-bezier(.2,.7,.2,1); }
      @keyframes m-fade {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      [data-mvar="${scope}"] .m-tap { transition: transform .12s ease, background .15s ease; }
      [data-mvar="${scope}"] .m-tap:active { transform: scale(0.97); }
      [data-mvar="${scope}"] .m-float { animation: m-float-${scope} 7s ease-in-out infinite; }
      @keyframes m-float-${scope} {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-6px); }
      }
    `;
    document.head.appendChild(s);
  }, [variantKey, scope, id]);
  return null;
}

export function PaperBg({ V, children, style = {} }: { V: Variant; children?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: V.bg,
      backgroundImage: V.paper ? PAPER_NOISE : undefined,
      backgroundSize: V.paper ? '240px 240px' : undefined,
      ...style,
    }}>{children}</div>
  );
}

export function MentorPhoto({ V, src, alt, size = 64, rotation = -2, frame = true }:
  { V: Variant; src: string; alt: string; size?: number; rotation?: number; frame?: boolean }) {
  if (V.polaroid && frame) {
    return (
      <div style={{
        background: '#fffaf0', padding: 6, paddingBottom: size > 100 ? 18 : 10,
        boxShadow: '0 6px 18px rgba(60,40,20,0.18), 0 1px 0 rgba(0,0,0,0.04)',
        transform: `rotate(${rotation}deg)`,
        display: 'inline-block',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={{
          display: 'block', width: size, height: size, objectFit: 'cover', background: '#eee',
        }} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} style={{
      width: size, height: size, objectFit: 'cover',
      borderRadius: V.polaroid ? 4 : 14,
      boxShadow: '0 4px 14px rgba(60,30,20,0.15)',
      display: 'block',
    }} />
  );
}

export function SectionHead({ V, eyebrow, title, action, dense }:
  { V: Variant; eyebrow?: string; title: React.ReactNode; action?: React.ReactNode; dense?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      marginBottom: dense ? 8 : 14, padding: '0 4px',
    }}>
      <div>
        {eyebrow && (
          <div style={{
            fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: V.inkMute, fontWeight: 600, marginBottom: 4,
          }}>{eyebrow}</div>
        )}
        <div className="m-serif" style={{ fontSize: 20, color: V.ink, lineHeight: 1.1 }}>
          {title}
        </div>
        <HandUnderline color={V.accent} width={48} height={8} strokeWidth={1.8}
                       style={{ marginTop: 2, marginLeft: -2 }} />
      </div>
      {action}
    </div>
  );
}

export function TabBar({ V, active, onChange, os }: { V: Variant; active: string; onChange: (s: Screen) => void; os: 'ios' | 'android' }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Icon.home },
    { id: 'courses', label: 'Courses', icon: Icon.book },
    { id: 'explore', label: 'Explore', icon: Icon.compass },
    { id: 'settings', label: 'Settings', icon: Icon.gear },
  ] as const;
  const safeBottom = os === 'ios' ? 28 : 22;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 30,
      paddingBottom: safeBottom, paddingTop: 6,
      background: V.surface,
      borderTop: `1px solid ${V.rule}`,
      backgroundImage: V.paper ? PAPER_NOISE : undefined,
      backgroundSize: V.paper ? '240px 240px' : undefined,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '4px 12px' }}>
        {tabs.map(t => {
          const isActive = active === t.id;
          return (
            <button key={t.id} onClick={() => onChange(t.id as Screen)} className="m-tap"
              style={{
                background: 'transparent', border: 'none', padding: '8px 12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 3, color: isActive ? V.accent : V.inkMute, position: 'relative',
              }}>
              {t.icon(22, 'currentColor')}
              <span style={{ fontSize: 10.5, fontWeight: isActive ? 600 : 500, letterSpacing: '0.02em' }}>{t.label}</span>
              {isActive && (
                <HandUnderline color={V.accent} width={26} height={5} strokeWidth={1.6}
                  style={{ position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%)' }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SessionDots({ V, sessions, done = 0, size = 10, color, gap = 4, max = 12 }:
  { V: Variant; sessions: number; done?: number; size?: number; color?: string; gap?: number; max?: number }) {
  const c = color || V.accent;
  const cap = Math.min(sessions, max);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      {Array.from({ length: cap }).map((_, i) => {
        const isDone = i < done;
        return (
          <span key={i} style={{
            width: size, height: size, borderRadius: '50%',
            background: isDone ? c : 'transparent',
            border: `1.5px solid ${isDone ? c : 'rgba(60,40,20,0.28)'}`,
            display: 'inline-block',
          }} />
        );
      })}
      {sessions > max && (
        <span style={{ fontSize: 10, color: V.inkMute, marginLeft: 2 }}>+{sessions - max}</span>
      )}
    </div>
  );
}

// Phone-frame wrappers omitted — the design canvas was just for display.
// In the real app each screen fills the viewport (max-width 440px column).
export function PhoneShell({ V, children }: { V: Variant; children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', justifyContent: 'center',
      background: V.bg,
      backgroundImage: V.paper ? PAPER_NOISE : undefined,
      backgroundSize: V.paper ? '240px 240px' : undefined,
    }}>
      <div style={{
        width: '100%', maxWidth: 440, position: 'relative',
        minHeight: '100vh', height: '100vh',
        display: 'flex', flexDirection: 'column',
        background: V.bg,
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
        boxShadow: '0 0 40px rgba(60,30,20,0.06)',
      }}>
        {children}
      </div>
    </div>
  );
}
