'use client';

import { SHIRE_MONTHS } from '@/lib/constants';
import { NameStyle } from '@/lib/shire-date';
import { WeekdayHeader } from './WeekdayHeader';
import { DayCell } from './DayCell';

interface MonthGridProps {
  month: (typeof SHIRE_MONTHS)[number];
  year: number;
  nameStyle: NameStyle;
  todayShireDate: { month: typeof SHIRE_MONTHS[number] | null; day: number | null; shireYear: number } | null;
}

export function MonthGrid({ month, year, nameStyle, todayShireDate }: MonthGridProps) {
  const displayName = nameStyle === 'english' 
    ? month.english 
    : nameStyle === 'bree' 
      ? month.bree 
      : month.shire;

  // Generate 30 days
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  // Check if today is in this month
  const isTodayInThisMonth = todayShireDate?.month?.index === month.index && todayShireDate?.shireYear === year;

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-shire-brown/10">
      {/* Month Header */}
      <h3 className="font-heading text-xl text-shire-ink mb-4 text-center border-b border-shire-brown/20 pb-2">
        {displayName}
      </h3>

      {/* Weekday Headers */}
      <WeekdayHeader nameStyle={nameStyle} />

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <DayCell
            key={day}
            day={day}
            month={month}
            shireYear={year}
            nameStyle={nameStyle}
            isToday={isTodayInThisMonth && todayShireDate?.day === day}
          />
        ))}
      </div>
    </div>
  );
}
