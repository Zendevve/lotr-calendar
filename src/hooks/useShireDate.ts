'use client';

import { useState, useEffect } from 'react';
import { ShireDate } from '@/lib/shire-date';
import { gregorianToShire } from '@/lib/gregorian-to-shire';

export function useShireDate(): ShireDate {
  const [shireDate, setShireDate] = useState<ShireDate>(() => {
    return gregorianToShire(new Date());
  });

  useEffect(() => {
    // Update at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timeoutId = setTimeout(() => {
      setShireDate(gregorianToShire(new Date()));
    }, msUntilMidnight);

    // Also update when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setShireDate(gregorianToShire(new Date()));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return shireDate;
}
