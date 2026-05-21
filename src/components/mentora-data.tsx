'use client';

import React from 'react';

export const MENTORS = [
  {
    id: 'layla', name: 'Layla Marwan', short: 'Layla', initial: 'L',
    craft: 'Watercolor artist', city: 'Beirut',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
    bio: 'I paint mornings on my balcony with mountain coffee. Ten years in — still chasing the way water finds its own shape on paper.',
    yearsTeaching: 10, students: 84, rating: 4.9, reviewCount: 131,
    accent: 'Sketches every Sunday at the corniche.',
    courses: [
      { id: 'c1', title: 'Modern Watercolor', lessons: 12, price: 49, emoji: '🎨',
        students: 84, seats: 100, rating: 4.9,
        location: { studio: 'Hamra Atelier', city: 'Beirut', address: '12 Sadat St., 2nd floor' },
        schedule: 'Tue & Thu · 6 – 8pm',
        levels: [
          { id: 'L1', name: 'Beginner',     subtitle: 'Washes & color',          sessions: 4, done: 4, status: 'completed' },
          { id: 'L2', name: 'Intermediate', subtitle: 'Wet-on-wet & layering',   sessions: 4, done: 2, status: 'in-progress' },
          { id: 'L3', name: 'Advanced',     subtitle: 'Portraits & light',       sessions: 4, done: 0, status: 'locked' },
        ],
      },
      { id: 'c2', title: 'Sketching for Beginners', lessons: 8,  price: 39, emoji: '✏️',
        students: 47, seats: 60,  rating: 4.8,
        location: { studio: 'Achrafieh Studio', city: 'Beirut', address: 'Sassine Square' },
        schedule: 'Sat · 10am – 12pm' },
      { id: 'c3', title: 'Color Theory Deep Dive', lessons: 14, price: 69, emoji: '🌈',
        students: 11, seats: 25,  rating: 5.0,
        location: { studio: 'Mar Mikhael Workshop', city: 'Beirut', address: 'Armenia St.' },
        schedule: 'Sun · 4 – 6pm' },
    ],
    mutuals: ['Omar', 'Sarah', 'Hassan'],
    mutualCount: 7,
  },
  {
    id: 'karim', name: 'Karim Said', short: 'Karim', initial: 'K',
    craft: 'Software engineer', city: 'Amman',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    bio: 'I build things on the side, mostly at night. Teaching what I learned the hard way so you don\'t have to.',
    yearsTeaching: 3, students: 162, rating: 4.8, reviewCount: 88,
    accent: 'Open-sources every course project.',
    courses: [
      { id: 'c4', title: 'Build Your First Web App', lessons: 20, price: 89, emoji: '💻',
        students: 162, rating: 4.8, seats: 200,
        location: { studio: 'King Hussein Hub', city: 'Amman', address: 'Abdoun' },
        schedule: 'Mon & Wed · 7 – 9pm' },
    ],
    mutuals: ['Maya'], mutualCount: 4,
  },
  {
    id: 'nadia', name: 'Nadia Rashed', short: 'Nadia', initial: 'N',
    craft: 'Home chef', city: 'Damascus',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop',
    bio: 'Three generations of recipes. The youngest cooks pull up a stool, the oldest pulls up a memory.',
    yearsTeaching: 6, students: 47, rating: 5.0, reviewCount: 31,
    accent: 'Her grandmother\'s maamoul mold is in every lesson.',
    courses: [
      { id: 'c5', title: 'Levantine Home Cooking', lessons: 8, price: 39, emoji: '🍳',
        students: 47, rating: 5.0, seats: 50,
        location: { studio: 'Bab Touma Kitchen', city: 'Damascus', address: 'Old city' },
        schedule: 'Fri · 11am – 2pm' },
    ],
    mutuals: ['Omar', 'Aisha'], mutualCount: 12,
  },
  {
    id: 'tarek', name: 'Tarek Hammoud', short: 'Tarek', initial: 'T',
    craft: 'Public speaker', city: 'Cairo',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    bio: '', yearsTeaching: 4, students: 56, rating: 5.0, reviewCount: 28,
    accent: '',
    courses: [{ id: 'c6', title: 'Public Speaking Mastery', lessons: 10, price: 79, emoji: '🎤',
        students: 56, rating: 5.0, seats: 75,
        location: { studio: 'Zamalek Hall', city: 'Cairo', address: '26 July Corridor' },
        schedule: 'Wed · 6 – 8pm' }],
    mutuals: [], mutualCount: 3,
  },
  {
    id: 'aisha', name: 'Aisha Bakir', short: 'Aisha', initial: 'A',
    craft: 'Yoga teacher', city: 'Tunis',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop',
    bio: '', yearsTeaching: 7, students: 95, rating: 4.8, reviewCount: 64,
    accent: '',
    courses: [{ id: 'c7', title: 'Yoga for Mornings', lessons: 16, price: 39, emoji: '🧘',
        students: 95, rating: 4.8, seats: 120,
        location: { studio: 'La Marsa Garden Studio', city: 'Tunis', address: 'Avenue Habib Bourguiba' },
        schedule: 'Mon–Fri · 7 – 8am' }],
    mutuals: [], mutualCount: 5,
  },
  {
    id: 'yousef', name: 'Yousef Darwish', short: 'Yousef', initial: 'Y',
    craft: 'Financial coach', city: 'Dubai',
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=600&auto=format&fit=crop',
    bio: '', yearsTeaching: 5, students: 220, rating: 4.9, reviewCount: 142,
    accent: '',
    courses: [{ id: 'c8', title: 'Financial Literacy 101', lessons: 12, price: 59, emoji: '💰',
        students: 220, rating: 4.9, seats: 250,
        location: { studio: 'DIFC Learning Loft', city: 'Dubai', address: 'Gate Avenue' },
        schedule: 'Thu · 7 – 9pm' }],
    mutuals: [], mutualCount: 9,
  },
] as const;

export const REVIEWS_FOR_LAYLA = [
  { id: 'r1', author: 'Omar K.', avatar: 'O', course: 'Modern Watercolor',
    rating: 5, when: '2 days ago', mutual: 'a friend of yours',
    text: 'Layla makes complex techniques feel approachable. The pace is just right for beginners, and her live Q&A turned the whole thing into a conversation. Feels like learning from a friend.',
    helpful: 23 },
  { id: 'r2', author: 'Sarah P.', avatar: 'S', course: 'Sketching for Beginners',
    rating: 5, when: '1 week ago', mutual: '',
    text: 'Best $39 I\'ve spent in a year. The community sketching prompt every Sunday is the part I look forward to most.',
    helpful: 17 },
  { id: 'r3', author: 'Hassan A.', avatar: 'H', course: 'Modern Watercolor',
    rating: 4, when: '2 weeks ago', mutual: 'a friend of yours',
    text: 'Great content. Would love more advanced lessons. Layla replies within a day to every question — that alone is worth it.',
    helpful: 9 },
  { id: 'r4', author: 'Maya R.', avatar: 'M', course: 'Color Theory Deep Dive',
    rating: 5, when: '3 weeks ago', mutual: '',
    text: 'Felt like a workshop in her studio. The lesson on warm vs cool greys is something I think about every day at my desk now.',
    helpful: 14 },
  { id: 'r5', author: 'Yara T.', avatar: 'Y', course: 'Sketching for Beginners',
    rating: 5, when: 'a month ago', mutual: '',
    text: 'I bought it for my daughter. We do it together every weekend. Thank you, Layla.',
    helpful: 31 },
];

export const ENROLLED = [
  { id: 'e1', title: 'Modern Watercolor', mentor: 'Layla M.',
    emoji: '🎨', lessonDone: 8, lessonTotal: 12, accent: '#b4632a',
    nextLesson: 'Wet-on-wet washes',
    location: { studio: 'Hamra Atelier', city: 'Beirut' },
    nextSession: 'Tue, May 21 · 6pm',
    levels: [
      { id: 'L1', name: 'Beginner',     subtitle: 'Washes & color',          sessions: 4, status: 'completed', done: 4 },
      { id: 'L2', name: 'Intermediate', subtitle: 'Wet-on-wet & layering',   sessions: 4, status: 'in-progress', done: 2 },
      { id: 'L3', name: 'Advanced',     subtitle: 'Portraits & light',       sessions: 4, status: 'locked', done: 0 },
    ],
    cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=600&auto=format&fit=crop' },
  { id: 'e2', title: 'Levantine Home Cooking', mentor: 'Nadia R.',
    emoji: '🍳', lessonDone: 3, lessonTotal: 8, accent: '#b5462e',
    nextLesson: 'Maamoul, three ways',
    location: { studio: 'Bab Touma Kitchen', city: 'Damascus' },
    nextSession: 'Fri, May 24 · 11am',
    cover: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop' },
  { id: 'e3', title: 'Yoga for Mornings', mentor: 'Aisha B.',
    emoji: '🧘', lessonDone: 11, lessonTotal: 16, accent: '#7c8c5e',
    nextLesson: 'Sun salutations II',
    location: { studio: 'La Marsa Garden Studio', city: 'Tunis' },
    nextSession: 'Mon, May 20 · 7am',
    cover: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=600&auto=format&fit=crop' },
] as const;

export const RECOMMENDED = [
  { id: 'r1', title: 'Build Your First Web App', mentor: 'Karim S.',
    emoji: '💻', price: 89, rating: 4.8, students: 162,
    why: 'because Sarah is taking it',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
    tag: 'Tech' },
  { id: 'r2', title: 'Public Speaking Mastery', mentor: 'Tarek H.',
    emoji: '🎤', price: 79, rating: 5.0, students: 56,
    why: '3 friends finished this',
    cover: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop',
    tag: 'Speaking' },
  { id: 'r3', title: 'Financial Literacy 101', mentor: 'Yousef D.',
    emoji: '💰', price: 59, rating: 4.9, students: 220,
    why: 'trending in your city',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop',
    tag: 'Business' },
] as const;

export const TEACHER_BOOKINGS: Record<number, { time: string; with: string; course: string; avatar: string }[]> = {
  20: [
    { time: '10:00', with: 'Omar K.', course: 'Watercolor', avatar: 'O' },
    { time: '14:30', with: 'Sarah P.', course: 'Sketching', avatar: 'S' },
  ],
  22: [{ time: '15:00', with: 'Hassan A.', course: 'Watercolor', avatar: 'H' }],
  23: [
    { time: '09:30', with: 'Maya R.',  course: 'Color Theory', avatar: 'M' },
    { time: '14:00', with: 'Yara T.',  course: 'Sketching', avatar: 'Y' },
    { time: '16:30', with: 'Omar K.',  course: 'Watercolor', avatar: 'O' },
  ],
  26: [{ time: '11:00', with: 'Sarah P.', course: 'Sketching', avatar: 'S' }],
  27: [
    { time: '13:00', with: 'Hassan A.', course: 'Watercolor', avatar: 'H' },
    { time: '15:30', with: 'Maya R.',   course: 'Color Theory', avatar: 'M' },
  ],
  30: [{ time: '10:00', with: 'Omar K.', course: 'Watercolor', avatar: 'O' }],
};

export const VARIANTS = {
  atelier: {
    label: 'Atelier', blurb: 'Cream paper, ink, and a soft amber.',
    bg: '#f4ece0', surface: '#fbf5ea', surfaceAlt: '#efe3d0',
    ink: '#2c2218', inkSoft: '#6a5742', inkMute: '#9b8669',
    accent: '#b4632a', accentSoft: '#e9cba6', accentBg: '#f4dfbf',
    ribbon: '#7c8c5e', rule: 'rgba(60, 40, 20, 0.14)',
    fontSerif: '"Source Serif 4", "Source Serif Pro", Georgia, serif',
    fontSans:  '"Inter", -apple-system, system-ui, sans-serif',
    fontHand:  '"Caveat", "Bradley Hand", cursive',
    paper: true, polaroid: true,
  },
  hearth: {
    label: 'Hearth', blurb: 'Terracotta, clay, and embers.',
    bg: '#efe1d1', surface: '#f6ecdc', surfaceAlt: '#e6d2b9',
    ink: '#3a2128', inkSoft: '#6b4a4a', inkMute: '#a18078',
    accent: '#b5462e', accentSoft: '#e8a989', accentBg: '#f1c8a5',
    ribbon: '#7b4d3a', rule: 'rgba(60, 30, 30, 0.16)',
    fontSerif: '"Instrument Serif", "Cormorant Garamond", "DM Serif Display", Georgia, serif',
    fontSans:  '"Inter", -apple-system, system-ui, sans-serif',
    fontHand:  '"Caveat", "Bradley Hand", cursive',
    paper: false, polaroid: false,
  },
} as const;

export type Variant = typeof VARIANTS[keyof typeof VARIANTS];

export const PAPER_NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.26  0 0 0 0 0.18  0 0 0 0.22 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>")`;

export function HandUnderline({ color = '#c98a3a', width = 60, height = 10, strokeWidth = 2.4, style = {} }:
  { color?: string; width?: number | string; height?: number; strokeWidth?: number; style?: React.CSSProperties }) {
  return (
    <svg width={width} height={height} viewBox="0 0 60 10" fill="none" style={style}>
      <path d="M2 6 C 12 2, 22 9, 32 5 S 52 3, 58 6"
            stroke={color} strokeWidth={strokeWidth}
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WavyDivider({ color = 'rgba(60,40,20,0.18)', width = '100%' as number | string }) {
  return (
    <svg width={width} height="6" viewBox="0 0 200 6" preserveAspectRatio="none" style={{ display: 'block' }}>
      <path d="M0 3 Q 12.5 0, 25 3 T 50 3 T 75 3 T 100 3 T 125 3 T 150 3 T 175 3 T 200 3"
            stroke={color} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function Stars({ rating = 5, size = 12, color = '#c98a3a', spacing = 1 }:
  { rating?: number; size?: number; color?: string; spacing?: number }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const filled = i < Math.round(rating);
    stars.push(
      <svg key={i} width={size} height={size} viewBox="0 0 20 20"
           fill={filled ? color : 'none'} stroke={color} strokeWidth="1.4"
           style={{ marginRight: i < 4 ? spacing : 0 }}>
        <path d="M10 1.5l2.6 5.6 6.2.8-4.6 4.1 1.3 6.1L10 14.9 4.5 18.1l1.3-6.1L1.2 7.9l6.2-.8L10 1.5z" strokeLinejoin="round"/>
      </svg>
    );
  }
  return <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>{stars}</span>;
}

type IconFn = (s?: number, c?: string, f?: string) => React.ReactElement;

export const Icon: Record<string, IconFn> = {
  home:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 001 1h4v-7h4v7h4a1 1 0 001-1V10"/></svg>,
  user:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
  star:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6.5 7 1-5 5 1.5 7L12 18l-6.5 3.5L7 14.5l-5-5 7-1L12 2z"/></svg>,
  back:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
  more:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>,
  search:  (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  bell:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 004 0"/></svg>,
  heart:   (s=20, c='currentColor', f='none') => <svg width={s} height={s} viewBox="0 0 24 24" fill={f} stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.35-9.5-9C1 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 5 23 8.5 21.5 12 19 16.65 12 21 12 21z"/></svg>,
  message: (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 11-3.5-6.6L21 4l-1.3 3.4A8 8 0 0121 12z"/></svg>,
  calendar:(s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  arrow:   (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  check:   (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 12 10 18 20 6"/></svg>,
  book:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4V4z"/><path d="M4 4v12a4 4 0 014-4h12"/></svg>,
  compass: (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>,
  gear:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1.5v3M12 19.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1.5 12h3M19.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>,
  filter:  (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 4 21 4 14 13 14 19 10 21 10 13 3 4"/></svg>,
  chevron: (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
  logout:  (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  pin:     (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7.58 7-13a7 7 0 10-14 0c0 5.42 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  lock:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>,
  play:    (s=20, c='currentColor') => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M8 5v14l11-7z"/></svg>,
};
