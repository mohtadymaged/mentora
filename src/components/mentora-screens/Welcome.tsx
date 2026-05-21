/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Icon } from '../mentora-data';
import { WordReveal, BlurFade, GooeyTextMorph, AnimatedGradientBackground } from '../mentora-fx';

export function WelcomeScreen({ V, dense, onEnter, onSignIn }: any) {
  const pad = dense ? 22 : 28;

  return (
    <div data-screen-label="00 Welcome" className="m-fade" style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: V.fontSans, color: V.ink, position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        src="/welcome-bg.mp4"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      {/* White veil */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'rgba(255, 252, 244, 0.62)',
      }} />
      {/* Warm wash */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `linear-gradient(180deg, ${V.bg}33 0%, transparent 25%, transparent 65%, ${V.bg}aa 100%), ${V.accent}11`,
        mixBlendMode: 'multiply',
      }} />
      {/* Bottom cream wash for CTA legibility */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `linear-gradient(180deg, rgba(255,250,240,0) 30%, ${V.bg}cc 75%, ${V.bg} 100%)`,
      }} />

      {/* Animated radial-gradient, very subtle on top */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25, mixBlendMode: 'soft-light', pointerEvents: 'none' }}>
        <AnimatedGradientBackground
          startingGap={110}
          breathing
          breathingRange={35}
          animationSpeed={0.35}
          driftRange={25}
          driftSpeed={0.008}
          topOffset={-10}
          gradientColors={[
            V.bg, '#f4dfbf', V.accentBg, V.accentSoft, V.accent, V.ribbon, V.ink,
          ]}
          gradientStops={[20, 40, 55, 70, 82, 92, 100]}
        />
      </div>

      {/* Centered logo + headline */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1,
        padding: `${dense ? 30 : 50}px ${pad}px ${dense ? 14 : 22}px`,
      }}>
        <BlurFade delay={0.15} duration={0.7} yOffset={12} blur="10px">
          <div style={{
            width: 96, height: 96, borderRadius: 24,
            background: V.surface, color: V.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: V.fontSerif, fontStyle: 'italic',
            fontSize: 60, fontWeight: 500, lineHeight: 1,
            boxShadow: '0 14px 32px rgba(60,40,20,0.18), 0 0 0 1px rgba(60,40,20,0.06)',
            marginBottom: dense ? 18 : 26,
            position: 'relative',
          }}>
            M
            <span aria-hidden style={{
              position: 'absolute', inset: -8, borderRadius: 30,
              border: `1.5px dashed ${V.accent}40`,
            }} />
          </div>
        </BlurFade>

        <BlurFade delay={0.35} duration={0.4} yOffset={6}>
          <div className="m-hand" style={{
            fontSize: 24, color: V.ribbon, lineHeight: 1, marginBottom: 8,
            fontWeight: 700,
          }}>
            <WordReveal text="welcome —" delay={0.4} perWord={0.08} />
          </div>
        </BlurFade>

        <BlurFade delay={0.5} duration={0.4} yOffset={6} blur="6px">
          <h1 className="m-serif" style={{
            fontSize: dense ? 42 : 52, color: V.ink, lineHeight: 1.0,
            letterSpacing: '-0.03em', margin: 0, textAlign: 'center',
            fontWeight: 700,
            textShadow: '0 1px 2px rgba(255,250,240,0.4)',
          }}>
            <WordReveal text="Mentora" delay={0.55} perWord={0.08} blur="8px" />
          </h1>
        </BlurFade>

        <BlurFade delay={0.7} duration={0.6} yOffset={8}>
          <GooeyTextMorph
            texts={['Learn.', 'Give.', 'Share.', 'Earn.', 'Community.']}
            morphTime={1.0}
            cooldownTime={1.1}
            color={V.accent}
            style={{
              width: 260, height: '1.15em', marginTop: 8,
              fontFamily: V.fontSerif,
              fontStyle: 'italic', fontWeight: 500,
              fontSize: dense ? 24 : 30,
            }}
          />
        </BlurFade>

        <div style={{
          marginTop: 18, textAlign: 'center',
          letterSpacing: '0.06em',
          fontFamily: '"Cormorant Garamond", "Instrument Serif", Georgia, serif',
          fontStyle: 'italic', fontWeight: 700,
          color: V.ink,
          fontSize: dense ? 19 : 22,
          opacity: 0.95,
        }}>
          <WordReveal
            text="for our community · since 2026"
            delay={0.85} perWord={0.07} duration={0.55} yOffset={10} blur="6px"
          />
        </div>

        <div style={{
          marginTop: dense ? 22 : 30,
          textAlign: 'center',
          maxWidth: 340,
          fontFamily: '"Cormorant Garamond", "Instrument Serif", Georgia, serif',
          fontStyle: 'italic', fontWeight: 700,
          lineHeight: 1.35,
          color: V.ink,
          fontSize: dense ? 24 : 30,
        }}>
          <WordReveal
            text={'"A village where everyone teaches, and everyone learns."'}
            delay={1.15} perWord={0.07} duration={0.6} yOffset={12} blur="8px"
          />
        </div>
      </div>

      {/* CTAs */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: `${dense ? 12 : 16}px ${pad}px ${dense ? 18 : 26}px`,
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <BlurFade delay={1.4} duration={0.6} yOffset={14} blur="8px">
          <button onClick={onEnter} className="m-tap" style={{
            position: 'relative', overflow: 'hidden',
            width: '100%', background: V.accent, color: '#fffaf0',
            border: 'none', borderRadius: 16, padding: '15px 0',
            fontSize: 15, fontWeight: 600, letterSpacing: '0.01em',
            boxShadow: `0 12px 26px ${V.accent}45`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span aria-hidden style={{
              position: 'absolute', top: 0, left: '-30%', width: '40%', height: '100%',
              background: 'linear-gradient(110deg, transparent 30%, rgba(255,250,240,0.4) 50%, transparent 70%)',
              animation: 'btn-sweep 2.8s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Step inside {Icon.arrow(17, '#fffaf0')}
            </span>
          </button>
        </BlurFade>
        <BlurFade delay={1.6} duration={0.55} yOffset={8}>
          <button onClick={onSignIn} className="m-tap" style={{
            width: '100%', background: 'transparent', color: V.ink,
            border: 'none', padding: '10px 0',
            fontSize: 13.5, fontWeight: 500,
          }}>
            I already have an account
          </button>
        </BlurFade>
      </div>
    </div>
  );
}
