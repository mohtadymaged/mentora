/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import React, { useState } from 'react';
import { MENTORS, PAPER_NOISE, Icon } from '../mentora-data';

function SettingsGroupHead({ V, pad, children }: any) {
  return (
    <div style={{
      fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase',
      color: V.inkMute, fontWeight: 700,
      padding: `10px ${pad}px 4px`,
      background: V.surfaceAlt + '60',
      borderBottom: `1px dashed rgba(60,40,20,0.10)`,
    }}>{children}</div>
  );
}
function DividerRow({ V }: any) {
  return <div style={{ borderTop: `1px dashed ${V.rule}`, margin: '0 18px' }} />;
}

export function SettingsScreen({ V, dense, role, onSignOut }: any) {
  const pad = dense ? 14 : 18;
  const isTeacher = role === 'teacher';
  const me = MENTORS[0];

  const [notifs, setNotifs] = useState<Record<string, boolean>>({ purchases: true, reviews: true, messages: true, digest: false });

  const Row = ({ icon, label, value, onClick, danger }: any) => (
    <button onClick={onClick} className="m-tap" style={{
      width: '100%', textAlign: 'left',
      background: 'transparent', border: 'none',
      padding: dense ? '12px 16px' : '14px 18px',
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: danger ? 'rgba(180,70,40,0.12)' : V.accentBg,
        color: danger ? '#b5462e' : V.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0,
                    fontSize: 14, color: danger ? '#b5462e' : V.ink,
                    fontWeight: 500 }}>{label}</div>
      {value && <div style={{ fontSize: 12, color: V.inkMute }}>{value}</div>}
      {!danger && Icon.chevron(15, V.inkMute)}
    </button>
  );

  const Toggle = ({ on, onClick }: any) => (
    <button onClick={onClick} style={{
      width: 38, height: 22, borderRadius: 100,
      background: on ? V.accent : 'rgba(60,40,20,0.18)',
      border: 'none', position: 'relative', padding: 0, cursor: 'pointer',
      transition: 'background .2s ease',
    }}>
      <span style={{
        position: 'absolute', top: 2,
        left: on ? 18 : 2,
        width: 18, height: 18, borderRadius: '50%', background: '#fffaf0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'left .2s ease',
      }} />
    </button>
  );

  return (
    <div className="m-fade" style={{ paddingBottom: 100, padding: `4px 0 100px`, fontFamily: V.fontSans }}>
      <div style={{ padding: `${dense ? 6 : 12}px ${pad}px ${dense ? 14 : 18}px` }}>
        <div className="m-hand" style={{ fontSize: 16, color: V.ribbon, lineHeight: 1, marginBottom: 4 }}>
          your account —
        </div>
        <div className="m-serif" style={{
          fontSize: dense ? 26 : 30, color: V.ink, lineHeight: 1.05,
          letterSpacing: '-0.02em', fontWeight: V.polaroid ? 500 : 400,
        }}>Settings</div>
      </div>

      <div style={{ padding: `0 ${pad}px ${dense ? 18 : 24}px` }}>
        <div style={{
          background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 18,
          padding: dense ? 14 : 16,
          backgroundImage: V.paper ? PAPER_NOISE : undefined,
          backgroundSize: V.paper ? '240px 240px' : undefined,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          {V.polaroid ? (
            <div style={{
              background: '#fffaf0', padding: '4px 4px 10px',
              boxShadow: '0 6px 16px rgba(60,40,20,0.18)',
              transform: 'rotate(-3deg)', flexShrink: 0,
            }}>
              <img src={me.photo} alt={me.name} style={{
                display: 'block', width: 54, height: 54, objectFit: 'cover',
              }} />
            </div>
          ) : (
            <img src={me.photo} alt={me.name} style={{
              width: 58, height: 58, borderRadius: '50%', objectFit: 'cover',
              border: `3px solid ${V.surface}`,
              boxShadow: '0 6px 16px rgba(60,30,20,0.18)', flexShrink: 0,
            }} />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="m-serif" style={{ fontSize: 16, color: V.ink, lineHeight: 1.1 }}>{me.name}</div>
            <div style={{ fontSize: 11.5, color: V.inkMute, marginTop: 2 }}>
              {isTeacher ? me.craft : 'Learner'} · {me.city}
            </div>
            <button className="m-tap" style={{
              marginTop: 6, background: 'transparent', border: 'none',
              color: V.accent, fontSize: 12, fontWeight: 600, padding: 0,
            }}>Edit profile →</button>
          </div>
        </div>
      </div>

      <div style={{
        background: V.surface, border: `1px solid ${V.rule}`,
        borderRadius: 14, margin: `0 ${pad}px ${dense ? 14 : 18}px`,
        overflow: 'hidden',
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
      }}>
        <SettingsGroupHead V={V} pad={pad}>Account</SettingsGroupHead>
        <Row icon={Icon.user(15, V.accent)} label="Profile & bio" />
        <DividerRow V={V} />
        {isTeacher
          ? <Row icon={<span style={{ fontSize: 15 }}>💰</span>} label="Payouts & banking" value="May 15" />
          : <Row icon={<span style={{ fontSize: 15 }}>💳</span>} label="Payment method" value="•••• 4242" />
        }
        <DividerRow V={V} />
        {!isTeacher && (
          <>
            <Row icon={<span style={{ fontSize: 15 }}>🧾</span>} label="Purchase history" value="$216" />
            <DividerRow V={V} />
          </>
        )}
        <Row icon={<span style={{ fontSize: 15 }}>🔒</span>} label="Password & security" />
      </div>

      <div style={{
        background: V.surface, border: `1px solid ${V.rule}`,
        borderRadius: 14, margin: `0 ${pad}px ${dense ? 14 : 18}px`,
        overflow: 'hidden',
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
      }}>
        <SettingsGroupHead V={V} pad={pad}>Notifications</SettingsGroupHead>
        {([
          ['purchases', isTeacher ? 'New enrolments' : 'New courses from friends'],
          ['reviews',   'Reviews & ratings'],
          ['messages',  'Direct messages'],
          ['digest',    'Weekly community digest'],
        ] as const).map(([key, label], i, arr) => (
          <React.Fragment key={key}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: dense ? '12px 16px' : '14px 18px',
            }}>
              <div style={{ flex: 1, fontSize: 14, color: V.ink }}>{label}</div>
              <Toggle on={notifs[key]} onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))} />
            </div>
            {i < arr.length - 1 && <DividerRow V={V} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{
        background: V.surface, border: `1px solid ${V.rule}`,
        borderRadius: 14, margin: `0 ${pad}px`,
        overflow: 'hidden',
        backgroundImage: V.paper ? PAPER_NOISE : undefined,
        backgroundSize: V.paper ? '240px 240px' : undefined,
      }}>
        <SettingsGroupHead V={V} pad={pad}>Support</SettingsGroupHead>
        <Row icon={<span style={{ fontSize: 15 }}>💬</span>} label="Help & community guidelines" />
        <DividerRow V={V} />
        <Row icon={<span style={{ fontSize: 15 }}>📜</span>} label="Terms & privacy" />
        <DividerRow V={V} />
        <Row icon={Icon.logout(15, '#b5462e')} label="Sign out" danger onClick={onSignOut} />
      </div>

      <div className="m-hand" style={{
        textAlign: 'center', marginTop: 22, color: V.inkMute, fontSize: 15,
      }}>— v 1.0 · made with care —</div>
    </div>
  );
}
