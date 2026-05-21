'use client';

import React, { useState } from 'react';
import { MENTORS, VARIANTS } from './mentora-data';
import { VariantCSS, PaperBg, TabBar, PhoneShell, type Role, type Screen } from './mentora-ui';
import { WelcomeScreen } from './mentora-screens/Welcome';
import { LandingScreen } from './mentora-screens/Landing';
import { RoleScreen } from './mentora-screens/Role';
import { RegisterScreen } from './mentora-screens/Register';
import { HomeScreen } from './mentora-screens/Home';
import { TeacherProfileScreen } from './mentora-screens/TeacherProfile';
import { CoursesScreen } from './mentora-screens/Courses';
import { ExploreScreen } from './mentora-screens/Explore';
import { SettingsScreen } from './mentora-screens/Settings';
import { MentorScreen } from './mentora-screens/Mentor';
import { ReviewsScreen } from './mentora-screens/Reviews';
import { BookingScreen } from './mentora-screens/Booking';

export type MentoraAppProps = {
  variant?: keyof typeof VARIANTS;
  density?: 'cozy' | 'compact';
  scope?: string;
  initialScreen?: Screen;
  initialRole?: Role;
  initialBookingState?: { day?: number; slot?: string; confirmed?: boolean };
};

export function MentoraApp({
  variant = 'hearth',
  density = 'cozy',
  scope = 'app',
  initialScreen = 'welcome',
  initialRole = 'learner',
  initialBookingState,
}: MentoraAppProps) {
  const V = VARIANTS[variant];
  const dense = density === 'compact';
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [role, setRole] = useState<Role>(initialRole);
  const [activeMentorId, setActiveMentorId] = useState<string>('layla');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const mentor = MENTORS.find(m => m.id === activeMentorId) || MENTORS[0];
  const activeCourse =
    mentor.courses?.find(c => c.id === activeCourseId) || mentor.courses?.[0];

  const openMentor = (id?: string) => {
    if (id) setActiveMentorId(id);
    setScreen('mentor');
  };
  const openReviews = () => setScreen('reviews');
  const openBooking = (courseId?: string) => {
    if (courseId) setActiveCourseId(courseId);
    setScreen('booking');
  };
  const goBack = () => {
    if (screen === 'reviews')  return setScreen('mentor');
    if (screen === 'booking')  return setScreen('mentor');
    if (screen === 'mentor')   return setScreen('home');
    if (screen === 'register') return setScreen('role');
    if (screen === 'role')     return setScreen('landing');
    if (screen === 'landing')  return setScreen('welcome');
    return setScreen('home');
  };

  const isPreAuth = screen === 'welcome' || screen === 'landing' || screen === 'role' || screen === 'register';
  const hideTabBar = isPreAuth || screen === 'booking';

  return (
    <PhoneShell V={V}>
      <div data-mvar={scope} style={{
        minHeight: '100%', height: '100%',
        position: 'relative', fontFamily: V.fontSans,
        paddingTop: screen === 'welcome' ? 0 : 8,
        display: 'flex', flexDirection: 'column',
      }}>
        <VariantCSS variantKey={variant} scope={scope} />
        <PaperBg V={V} style={{ flex: 1, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          {screen === 'welcome' && (
            <WelcomeScreen V={V} dense={dense}
              onEnter={() => setScreen('landing')}
              onSignIn={() => setScreen('home')} />
          )}
          {screen === 'landing' && (
            <LandingScreen V={V} dense={dense}
              onEnter={() => setScreen('role')}
              onTeach={() => { setRole('teacher'); setScreen('register'); }}
              onSignIn={() => setScreen('home')} />
          )}
          {screen === 'role' && (
            <RoleScreen V={V} dense={dense}
              onPick={(r: Role) => { setRole(r); setScreen('register'); }}
              goBack={goBack} />
          )}
          {screen === 'register' && (
            <RegisterScreen V={V} dense={dense} role={role}
              onSubmit={() => setScreen('home')} goBack={goBack} />
          )}
          {screen === 'home' && (role === 'teacher' ? (
            <TeacherProfileScreen V={V} dense={dense} openReviews={openReviews} />
          ) : (
            <HomeScreen V={V} dense={dense} openMentor={openMentor} openReviews={openReviews}
              onBackToLanding={() => setScreen('landing')} />
          ))}
          {screen === 'mentor' && (
            <MentorScreen V={V} dense={dense} mentor={mentor}
              goBack={goBack} openReviews={openReviews} openBooking={openBooking} />
          )}
          {screen === 'reviews' && (
            <ReviewsScreen V={V} dense={dense} mentor={mentor} goBack={goBack} />
          )}
          {screen === 'courses' && (
            <CoursesScreen V={V} dense={dense} role={role} openMentor={openMentor} />
          )}
          {screen === 'explore' && (
            <ExploreScreen V={V} dense={dense} openMentor={openMentor} />
          )}
          {screen === 'settings' && (
            <SettingsScreen V={V} dense={dense} role={role}
              onSignOut={() => setScreen('landing')} />
          )}
          {screen === 'booking' && (
            <BookingScreen V={V} dense={dense} mentor={mentor}
              course={activeCourse} goBack={goBack}
              initialBookingState={initialBookingState}
              onConfirmed={() => setScreen('courses')} />
          )}
        </PaperBg>
        {!hideTabBar && (
          <TabBar V={V} active={screen} onChange={setScreen} os="ios" />
        )}
      </div>
    </PhoneShell>
  );
}
