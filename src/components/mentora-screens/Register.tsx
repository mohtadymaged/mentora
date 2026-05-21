/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { PAPER_NOISE, Icon } from '../mentora-data';

export function RegisterScreen({ V, dense, role, onSubmit, goBack }: any) {
  const [form, setForm] = useState({
    name: role === 'teacher' ? 'Layla Marwan' : 'Omar Khalil',
    email: role === 'teacher' ? 'layla@example.com' : 'omar@example.com',
    password: '••••••••',
    craft: '', unit: '', zone: '', age: '',
  });
  const [focus, setFocus] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(true);
  const [residency, setResidency] = useState('owner');
  const [accountType, setAccountType] = useState('sole');
  const [kids, setKids] = useState([{ id: 'k1', name: 'Yara', age: 9 }]);
  const pad = dense ? 22 : 28;
  const isTeacher = role === 'teacher';

  const learnerInterests = ['Watercolor', 'Cooking', 'Code', 'Yoga', 'Speaking', 'Finance'];
  const teacherCrafts    = ['Art & craft', 'Cooking', 'Tech', 'Wellness', 'Speaking', 'Music'];
  const chips = isTeacher ? teacherCrafts : learnerInterests;
  const [picked, setPicked] = useState<string[]>([chips[0]]);
  const toggleChip = (c: string) => setPicked(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  const Field = ({ label, value, type = 'text', name, hint }: any) => {
    const isFocus = focus === name;
    return (
      <label style={{ display: 'block' }}>
        <div style={{
          fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: V.inkMute, fontWeight: 600, marginBottom: 6,
        }}>{label}</div>
        <div style={{
          background: V.surface, border: `1px solid ${isFocus ? V.accent : V.rule}`,
          borderRadius: 12, padding: '11px 14px',
          boxShadow: isFocus ? `0 0 0 3px ${V.accent}22` : 'none',
          transition: 'box-shadow .15s ease, border-color .15s ease',
          backgroundImage: V.paper ? PAPER_NOISE : undefined,
          backgroundSize: V.paper ? '240px 240px' : undefined,
        }}>
          <input type={type} value={value}
            onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
            onFocus={() => setFocus(name)} onBlur={() => setFocus(null)}
            style={{
              width: '100%', background: 'transparent', border: 'none', outline: 'none',
              fontSize: 15, color: V.ink, fontFamily: V.fontSans, padding: 0,
            }} />
        </div>
        {hint && <div style={{ fontSize: 11, color: V.inkMute, marginTop: 5 }}>{hint}</div>}
      </label>
    );
  };

  return (
    <div data-screen-label="02 Register" className="m-fade" style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: V.fontSans, color: V.ink, paddingBottom: 16,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `4px ${pad}px ${dense ? 6 : 10}px`,
      }}>
        <button onClick={goBack} className="m-tap" style={{
          width: 36, height: 36, borderRadius: '50%', background: V.surface,
          border: `1px solid ${V.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: V.ink,
        }}>{Icon.back(18)}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 22, height: 4, borderRadius: 2, background: V.accent }} />
          <div style={{ width: 22, height: 4, borderRadius: 2, background: V.accent }} />
          <div style={{ width: 22, height: 4, borderRadius: 2, background: 'rgba(60,40,20,0.18)' }} />
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ padding: `${dense ? 10 : 16}px ${pad}px ${dense ? 14 : 18}px` }}>
        <div className="m-hand" style={{ color: V.ribbon, fontSize: 17, marginBottom: 4 }}>
          {isTeacher ? "welcome, mentor" : "welcome, friend"}
        </div>
        <h1 className="m-serif" style={{
          fontSize: dense ? 26 : 30, color: V.ink, lineHeight: 1.05,
          letterSpacing: '-0.02em', margin: 0,
          fontWeight: V.polaroid ? 500 : 400,
        }}>
          {isTeacher ? (
            <>Let&apos;s set up your<br/><em style={{ fontStyle: 'italic', color: V.accent }}>studio</em>.</>
          ) : (
            <>Tell us a little<br/>about <em style={{ fontStyle: 'italic', color: V.accent }}>you</em>.</>
          )}
        </h1>
      </div>

      <div style={{ padding: `0 ${pad}px`, display: 'flex', flexDirection: 'column',
                    gap: dense ? 12 : 14, flex: 1 }}>
        <Field name="name" label="Your name" value={form.name} />
        <Field name="email" label="Email" type="email" value={form.email} />
        <Field name="password" label="Password" type="password" value={form.password}
               hint="At least 8 characters. Make it a sentence you'll remember." />

        <div style={{
          marginTop: dense ? 4 : 6,
          padding: `${dense ? 10 : 12}px 0 0`,
          borderTop: `1px dashed ${V.rule}`,
        }}>
          <div style={{
            fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: V.inkMute, fontWeight: 600, marginBottom: 3,
          }}>Your address in the community</div>
          <div className="m-hand" style={{ fontSize: 14, color: V.ribbon }}>
            confidential — town records only
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
          <Field name="unit" label="Unit number" value={form.unit} />
          <Field name="zone" label="Zone" value={form.zone} />
        </div>

        <div>
          <div style={{
            fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: V.inkMute, fontWeight: 600, marginBottom: 6,
          }}>I am a</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { id: 'owner',    label: 'Owner',    icon: '🔑' },
              { id: 'resident', label: 'Resident', icon: '🏡' },
            ].map(opt => {
              const on = residency === opt.id;
              return (
                <button key={opt.id} type="button"
                  onClick={() => setResidency(opt.id)}
                  className="m-tap"
                  style={{
                    flex: 1, padding: dense ? '11px 0' : '14px 0',
                    background: on ? V.accent : V.surface,
                    color: on ? '#fffaf0' : V.ink,
                    border: `1px solid ${on ? V.accent : V.rule}`,
                    borderRadius: 12,
                    fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    backgroundImage: !on && V.paper ? PAPER_NOISE : undefined,
                    backgroundSize: !on && V.paper ? '240px 240px' : undefined,
                    boxShadow: on ? `0 6px 14px ${V.accent}30` : 'none',
                    transition: 'background .15s ease, color .15s ease',
                  }}>
                  <span style={{ fontSize: 17 }}>{opt.icon}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <Field name="age" label="Age" type="number" value={form.age}
               hint="Some courses are age-restricted." />

        <div style={{
          marginTop: dense ? 6 : 10,
          padding: `${dense ? 10 : 12}px 0 0`,
          borderTop: `1px dashed ${V.rule}`,
        }}>
          <div style={{
            fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: V.inkMute, fontWeight: 600, marginBottom: 3,
          }}>Account type</div>
          <div className="m-hand" style={{ fontSize: 14, color: V.ribbon, marginBottom: 10 }}>
            pick what fits your household —
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { id: 'sole', icon: '🌱', title: 'Sole account',
                lede: 'Just me. One profile, one set of courses.' },
              { id: 'family', icon: '🪴', title: 'Family account',
                lede: 'Link my kids — see their progress, book for them.' },
            ].map(opt => {
              const on = accountType === opt.id;
              return (
                <button key={opt.id} type="button"
                  onClick={() => setAccountType(opt.id)}
                  className="m-tap"
                  style={{
                    flex: 1, padding: dense ? 12 : 14, textAlign: 'left',
                    background: on ? V.accent : V.surface,
                    color: on ? '#fffaf0' : V.ink,
                    border: `1.5px solid ${on ? V.accent : V.rule}`,
                    borderRadius: 14,
                    fontSize: 13,
                    backgroundImage: !on && V.paper ? PAPER_NOISE : undefined,
                    backgroundSize: !on && V.paper ? '240px 240px' : undefined,
                    boxShadow: on ? `0 8px 18px ${V.accent}40` : 'none',
                    transition: 'background .15s ease, color .15s ease',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>{opt.icon}</span>
                    <span className="m-serif" style={{
                      fontSize: 14.5, lineHeight: 1.1,
                      fontWeight: V.polaroid ? 500 : 400,
                    }}>{opt.title}</span>
                  </div>
                  <div style={{
                    fontSize: 11, lineHeight: 1.4,
                    color: on ? 'rgba(255,250,240,0.85)' : V.inkMute,
                  }}>{opt.lede}</div>
                </button>
              );
            })}
          </div>

          {accountType === 'family' && (
            <div className="m-fade" style={{
              marginTop: 12,
              background: V.accentBg, border: `1px solid ${V.accentSoft}`,
              borderRadius: 14, padding: dense ? 12 : 14,
            }}>
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: V.accent, color: '#fffaf0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, flexShrink: 0,
                }}>👨‍👧</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="m-serif" style={{
                    fontSize: 13.5, color: V.ink, lineHeight: 1.15,
                    fontWeight: V.polaroid ? 500 : 400,
                  }}>Connect your kids</div>
                  <div style={{ fontSize: 11, color: V.inkSoft, marginTop: 2, lineHeight: 1.45 }}>
                    Book classes for them, see their progress, approve enrolments. You stay in charge.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {kids.map(k => (
                  <div key={k.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 10px', background: V.surface,
                    border: `1px solid ${V.rule}`, borderRadius: 10,
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: V.surfaceAlt, color: V.accent,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, flexShrink: 0,
                    }}>{k.name[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="m-serif" style={{ fontSize: 13, color: V.ink, lineHeight: 1.1 }}>{k.name}</div>
                      <div style={{ fontSize: 10.5, color: V.inkMute, marginTop: 1 }}>
                        Age {k.age} · view & book for them
                      </div>
                    </div>
                    <button type="button"
                      onClick={() => setKids(ks => ks.filter(x => x.id !== k.id))}
                      style={{
                        background: 'transparent', border: 'none',
                        color: V.inkMute, fontSize: 16, cursor: 'pointer', padding: 0,
                      }}>×</button>
                  </div>
                ))}
                <button type="button" className="m-tap"
                  onClick={() => setKids(ks => [...ks,
                    { id: 'k' + (ks.length + 1), name: 'Child', age: 8 }])}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    padding: '9px 0',
                    background: 'transparent', color: V.accent,
                    border: `1.5px dashed ${V.accent}55`,
                    borderRadius: 10, fontSize: 12.5, fontWeight: 600,
                  }}>+ Add a child</button>
              </div>
              <div className="m-hand" style={{
                marginTop: 10, fontSize: 12.5, color: V.inkMute, textAlign: 'center',
              }}>— you can add or remove kids anytime —</div>
            </div>
          )}
        </div>

        <div>
          <div style={{
            fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: V.inkMute, fontWeight: 600, marginBottom: 8,
          }}>{isTeacher ? "What do you teach?" : "What sparks your curiosity?"}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {chips.map(c => {
              const on = picked.includes(c);
              return (
                <button key={c} onClick={() => toggleChip(c)} className="m-tap" style={{
                  background: on ? V.accent : V.surface,
                  color: on ? '#fffaf0' : V.ink,
                  border: `1px solid ${on ? V.accent : V.rule}`,
                  padding: '7px 13px', borderRadius: 100,
                  fontSize: 12.5, fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}>
                  {on && Icon.check(12, '#fffaf0')}
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <button onClick={() => setAgreed(a => !a)} className="m-tap" style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          background: 'transparent', border: 'none', padding: '6px 2px',
          textAlign: 'left',
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: 6, flexShrink: 0,
            background: agreed ? V.accent : V.surface,
            border: `1.5px solid ${agreed ? V.accent : V.rule}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 1,
          }}>
            {agreed && Icon.check(13, '#fffaf0')}
          </div>
          <div style={{ fontSize: 11.5, color: V.inkSoft, lineHeight: 1.5 }}>
            I agree to the <span style={{ color: V.accent, fontWeight: 600 }}>Community Guidelines</span> and{' '}
            <span style={{ color: V.accent, fontWeight: 600 }}>Terms</span>.
            We keep things human here.
          </div>
        </button>
      </div>

      <div style={{
        padding: `${dense ? 10 : 16}px ${pad}px 0`,
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <button onClick={() => onSubmit(role)} className="m-tap" disabled={!agreed}
          style={{
            background: V.accent, color: '#fffaf0',
            border: 'none', borderRadius: 16, padding: '15px 0',
            fontSize: 15, fontWeight: 600, letterSpacing: '0.01em',
            boxShadow: `0 10px 22px ${V.accent}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            opacity: agreed ? 1 : 0.4,
          }}>
          {isTeacher ? 'Open my studio' : 'Step inside'} {Icon.arrow(17, '#fffaf0')}
        </button>
        <div className="m-hand" style={{
          textAlign: 'center', color: V.inkMute, fontSize: 14,
        }}>— takes less than a minute —</div>
      </div>
    </div>
  );
}
