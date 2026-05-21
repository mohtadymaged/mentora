'use client';

import React from 'react';

// ─────────────────────────────────────────────────────────
// Word-by-word reveal: fade + slide + un-blur, staggered.
// ─────────────────────────────────────────────────────────
export function WordReveal({
  text, delay = 0, perWord = 0.06, duration = 0.5,
  yOffset = 8, blur = '4px',
  className = '', style = {},
}: {
  text: string; delay?: number; perWord?: number; duration?: number;
  yOffset?: number; blur?: string;
  className?: string; style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [text]);

  const words = String(text).split(/(\s+)/);

  return (
    <span ref={ref} className={className} style={{
      display: 'inline-block', whiteSpace: 'normal', ...style,
    }}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i} aria-hidden> </span>;
        const wordIdx = words.slice(0, i).filter(t => !/^\s+$/.test(t)).length;
        const d = delay + wordIdx * perWord;
        return (
          <span key={i} style={{
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            filter: visible ? 'blur(0px)' : `blur(${blur})`,
            transform: visible ? 'translateY(0)' : `translateY(${yOffset}px)`,
            transition: `opacity ${duration}s cubic-bezier(.16,1,.3,1) ${d}s, filter ${duration}s cubic-bezier(.16,1,.3,1) ${d}s, transform ${duration}s cubic-bezier(.16,1,.3,1) ${d}s`,
            willChange: 'opacity, filter, transform',
          }}>{w}</span>
        );
      })}
    </span>
  );
}

// ─────────────────────────────────────────────────────────
// Blur fade — wrap children, fade in + slide up + un-blur.
// ─────────────────────────────────────────────────────────
export function BlurFade({
  children, delay = 0, duration = 0.4, yOffset = 6, blur = '6px',
  inView = false, inViewMargin = '-50px', style = {},
}: {
  children: React.ReactNode;
  delay?: number; duration?: number; yOffset?: number; blur?: string;
  inView?: boolean; inViewMargin?: string;
  style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(!inView);

  React.useEffect(() => {
    if (!inView || visible) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { rootMargin: inViewMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [inView, inViewMargin, visible]);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      filter: visible ? 'blur(0px)' : `blur(${blur})`,
      transform: visible ? 'translateY(0)' : `translateY(${yOffset}px)`,
      transition: `opacity ${duration}s ease ${delay}s, filter ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      willChange: 'opacity, filter, transform',
      ...style,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────
// Gooey text morphing — crossfade between words with blob feel.
// ─────────────────────────────────────────────────────────
export function GooeyTextMorph({
  texts = [], morphTime = 1.0, cooldownTime = 0.9,
  className = '', style = {}, color = 'currentColor',
}: {
  texts?: string[]; morphTime?: number; cooldownTime?: number;
  className?: string; style?: React.CSSProperties; color?: string;
}) {
  const aRef = React.useRef<HTMLSpanElement>(null);
  const bRef = React.useRef<HTMLSpanElement>(null);
  const reactId = React.useId();
  const fid = `${reactId}-gooey`;

  React.useEffect(() => {
    if (!texts.length) return;
    let raf: number;
    let textIndex = texts.length - 1;
    let time = Date.now();
    let morph = 0;
    let cooldown = cooldownTime;
    if (aRef.current) aRef.current.textContent = texts[textIndex % texts.length];
    if (bRef.current) bRef.current.textContent = texts[(textIndex + 1) % texts.length];

    const setMorph = (fraction: number) => {
      if (!aRef.current || !bRef.current) return;
      bRef.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      bRef.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const inv = 1 - fraction;
      aRef.current.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      aRef.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };
    const doCooldown = () => {
      morph = 0;
      if (bRef.current) { bRef.current.style.filter = ''; bRef.current.style.opacity = '100%'; }
      if (aRef.current) { aRef.current.style.filter = ''; aRef.current.style.opacity = '0%'; }
    };
    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) { cooldown = cooldownTime; fraction = 1; }
      setMorph(fraction);
    };
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const newTime = Date.now();
      const incremented = cooldown > 0;
      const dt = (newTime - time) / 1000;
      time = newTime;
      cooldown -= dt;
      morph += dt;
      if (cooldown <= 0) {
        if (incremented) {
          textIndex = (textIndex + 1) % texts.length;
          if (aRef.current) aRef.current.textContent = texts[textIndex % texts.length];
          if (bRef.current) bRef.current.textContent = texts[(textIndex + 1) % texts.length];
        }
        doMorph();
      } else {
        doCooldown();
      }
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={className} style={{
      position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      lineHeight: 1, ...style,
    }}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden focusable="false">
        <defs>
          <filter id={fid}>
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
      <div style={{
        position: 'relative', width: '100%', height: '1em',
        filter: `url(#${fid})`,
      }}>
        <span ref={aRef} style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color, userSelect: 'none', whiteSpace: 'nowrap',
        }} />
        <span ref={bRef} style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color, userSelect: 'none', whiteSpace: 'nowrap',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Animated radial gradient that breathes + drifts.
// ─────────────────────────────────────────────────────────
export function AnimatedGradientBackground({
  startingGap = 125,
  breathing = false,
  breathingRange = 5,
  animationSpeed = 0.02,
  driftRange = 0,
  driftSpeed = 0.005,
  gradientColors,
  gradientStops,
  topOffset = 0,
  style = {},
}: {
  startingGap?: number; breathing?: boolean; breathingRange?: number;
  animationSpeed?: number; driftRange?: number; driftSpeed?: number;
  gradientColors: string[]; gradientStops: number[];
  topOffset?: number; style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (gradientColors.length !== gradientStops.length) return;
    let raf: number;
    let width = startingGap;
    let dir = 1;
    let t = 0;
    const tick = () => {
      if (breathing) {
        if (width >= startingGap + breathingRange) dir = -1;
        if (width <= startingGap - breathingRange) dir = 1;
        width += dir * animationSpeed;
      }
      t += driftSpeed;
      const cx = 50 + (driftRange ? Math.sin(t) * driftRange : 0);
      const cy = 20 + (driftRange ? Math.cos(t * 0.7) * driftRange * 0.5 : 0);
      const stops = gradientStops
        .map((s, i) => `${gradientColors[i]} ${s}%`)
        .join(', ');
      const g = `radial-gradient(${width}% ${width + topOffset}% at ${cx.toFixed(1)}% ${cy.toFixed(1)}%, ${stops})`;
      if (ref.current) ref.current.style.background = g;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startingGap, breathing, breathingRange, animationSpeed, driftRange, driftSpeed,
      gradientColors, gradientStops, topOffset]);

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      animation: 'agb-enter 2s cubic-bezier(0.25,0.1,0.25,1) both',
      ...style,
    }}>
      <div ref={ref} style={{ position: 'absolute', inset: 0 }} />
      <style>{`@keyframes agb-enter {
        from { opacity: 0; transform: scale(1.5); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes btn-sweep {
        0%   { left: -30%; }
        100% { left: 130%; }
      }`}</style>
    </div>
  );
}
