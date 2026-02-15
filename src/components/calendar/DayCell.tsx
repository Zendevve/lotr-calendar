import { ShireDate, NameStyle } from '@/lib/shire-date';
import { SHIRE_MONTHS, SHIRE_WEEKDAYS } from '@/lib/constants';

interface DayCellProps {
  day: number;
  month: (typeof SHIRE_MONTHS)[number];
  shireYear: number;
  nameStyle: NameStyle;
  isToday: boolean;
  onClick?: () => void;
}

export function DayCell({
  day,
  month,
  shireYear,
  nameStyle,
  isToday,
  onClick,
}: DayCellProps) {
  // Calculate weekday for this day
  // All months start on Sterday (day 1 = weekday index 0)
  // Day 30 = weekday index (30-1) % 7 = 29 % 7 = 1 = Sunday
  const weekdayIndex = (day - 1) % 7;
  const weekday = SHIRE_WEEKDAYS[weekdayIndex];
  const isHighday = weekdayIndex === 6;

  const displayMonth = nameStyle === 'english' 
    ? month.english 
    : nameStyle === 'bree' 
      ? month.bree 
      : month.shire;

  return (
    <button
      onClick={onClick}
      className={`
        relative aspect-square flex flex-col items-center justify-center
        rounded-lg border transition-all duration-200
        hover:scale-105 hover:shadow-md
        ${isToday 
          ? 'bg-shire-gold text-shire-ink border-shire-gold ring-2 ring-shire-gold/50' 
          : isHighday
            ? 'bg-shire-gold/10 border-shire-gold/30 hover:bg-shire-gold/20'
            : 'bg-white/50 border-shire-brown/20 hover:bg-white/80'
        }
      `}
    >
      <span className={`
        text-lg font-heading font-semibold
        ${isToday ? 'text-shire-ink' : 'text-shire-ink'}
      `}>
        {day}
      </span>
      
      {/* Tooltip on hover */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-shire-ink text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {weekday.shire} {day} {displayMonth}
      </div>
    </button>
  );
}
