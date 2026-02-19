"use client";

const requirements = [
  'Active in War Tycoon',
  'Decent game knowledge',
  'Willingness to listen and improve',
  'Seasoned player',
  'Complete daily challenges',
];

export default function RequirementItem() {
  return (
    <>
      {requirements.map((req, i) => (
        <div
          key={i}
          className="anim-up"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-dim)',
            transition: 'border-color 0.25s, background 0.25s',
            animationDelay: `${i * 0.06}s`,
            cursor: 'default',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--border-hi)';
            el.style.background = 'rgba(37,99,235,0.06)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--border-dim)';
            el.style.background = 'var(--bg-surface)';
          }}
        >
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--blue-bright)',
            flexShrink: 0,
            animation: `dotPulse 2s ${i * 0.3}s infinite`,
          }} />
          <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{req}</span>
        </div>
      ))}
    </>
  );
}
