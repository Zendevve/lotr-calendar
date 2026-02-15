import { ImageResponse } from 'next/og';
import { gregorianToShire } from '@/lib/gregorian-to-shire';

export const alt = 'Shire Calendar - Today in Middle-earth';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Force static generation for static export
export const dynamic = 'force-static';

export default async function Image() {
  // Get today's Shire date
  const today = new Date();
  const shireDate = gregorianToShire(today);
  
  const weekdayText = shireDate.weekday?.shire || '';
  const dateText = shireDate.specialDay 
    ? shireDate.specialDay 
    : `${shireDate.day} ${shireDate.month?.shire}`;
  const yearText = `S.R. ${shireDate.shireYear}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f0e1 0%, #ede3cc 100%)',
          fontFamily: 'serif',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '4px solid #8b6f47',
            borderRadius: 12,
          }}
        />
        
        {/* Header */}
        <div
          style={{
            fontSize: 32,
            color: '#8b6f47',
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          ✦ Today in the Shire ✦
        </div>
        
        {/* Weekday */}
        {weekdayText && (
          <div
            style={{
              fontSize: 48,
              color: '#8b6f47',
              marginBottom: 10,
            }}
          >
            {weekdayText}
          </div>
        )}
        
        {/* Date */}
        <div
          style={{
            fontSize: 80,
            color: '#2c1810',
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          {dateText}
        </div>
        
        {/* Year */}
        <div
          style={{
            fontSize: 48,
            color: '#4a7c59',
            fontWeight: 600,
          }}
        >
          {yearText}
        </div>
        
        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            fontSize: 24,
            color: '#8b6f47',
          }}
        >
          shire-calendar.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
