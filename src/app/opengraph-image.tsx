import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const alt = '闇ココイチいし - トランプで選ぶ、運命のトッピング';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'radial-gradient(circle at 50% 50%, #1a5e20 0%, #0a3d1b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '20px solid #d4af37',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '100px',
              fontWeight: '900',
              color: '#d4af37',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontStyle: 'italic',
              textShadow: '0 10px 20px rgba(0,0,0,0.5)',
            }}
          >
            闇ココイチいし
          </div>
          <div
            style={{
              fontSize: '40px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            🃏 トランプで選ぶ、運命のトッピング 🍛
          </div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '60px',
            fontSize: '80px',
            transform: 'rotate(15deg)',
            display: 'flex',
          }}
        >
          ♠️
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '60px',
            fontSize: '80px',
            transform: 'rotate(-15deg)',
            display: 'flex',
          }}
        >
          ♥️
        </div>
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '60px',
            fontSize: '80px',
            transform: 'rotate(-15deg)',
            display: 'flex',
          }}
        >
          ♦️
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '80px',
            transform: 'rotate(15deg)',
            display: 'flex',
          }}
        >
          ♣️
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
