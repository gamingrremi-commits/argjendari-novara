import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const size = {
  width: 1200,
  height: 630,
};

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') === 'en' ? 'EN' : 'SQ';
  const eyebrow = truncate(
    searchParams.get('eyebrow') || 'ARGJENDARI NOVARA • DURRES',
    48
  );
  const title = truncate(searchParams.get('title') || 'NOVARA', 64);
  const description = truncate(
    searchParams.get('description') ||
      'Handcrafted jewelry, bespoke atelier work, and premium care.',
    140
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle at top right, rgba(229,201,137,0.18), transparent 35%), linear-gradient(135deg, #0A0A0A 0%, #1B1712 55%, #2B241A 100%)',
          color: '#F8F6F0',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 32,
            border: '1px solid rgba(201,169,97,0.35)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 64px',
            width: '100%',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 22,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 54,
                  height: 1,
                  background: '#C9A961',
                }}
              />
              <span style={{ color: '#C9A961' }}>{eyebrow}</span>
            </div>
            <span
              style={{
                color: '#F8F6F0',
                border: '1px solid rgba(201,169,97,0.45)',
                padding: '10px 18px',
                fontSize: 18,
              }}
            >
              {locale}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              maxWidth: 860,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 98,
                lineHeight: 1,
                letterSpacing: '0.12em',
                color: '#F8F6F0',
              }}
            >
              NOVARA
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 58,
                lineHeight: 1.08,
                color: '#F8F6F0',
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                lineHeight: 1.45,
                color: 'rgba(248,246,240,0.82)',
                maxWidth: 900,
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#C9A961',
                }}
              >
                Handcrafted Jewelry • Since 2014
              </span>
              <span
                style={{
                  fontSize: 24,
                  color: 'rgba(248,246,240,0.8)',
                }}
              >
                Sheshi Demokracia • Durrës
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                width: 146,
                height: 146,
                borderRadius: 9999,
                border: '1px solid rgba(229,201,137,0.55)',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E5C989',
                fontSize: 34,
              }}
            >
              â—‡
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
