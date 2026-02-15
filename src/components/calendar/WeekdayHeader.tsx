import { SHIRE_WEEKDAYS } from '@/lib/constants';
import { NameStyle } from '@/lib/shire-date';

interface WeekdayHeaderProps {
  nameStyle: NameStyle;
}

export function WeekdayHeader({ nameStyle }: WeekdayHeaderProps) {
  return (
    <div className="grid grid-cols-7 gap-1 mb-2">
      {SHIRE_WEEKDAYS.map((weekday, index) => {
        const isHighday = index === 6; // Highday is the last day (holiday)
        const displayName = nameStyle === 'english' ? weekday.english : weekday.shire;
        
        return (
          <div
            key={weekday.shire}
            className={`text-center py-2 text-sm font-heading font-semibold rounded ${
              isHighday
                ? 'bg-shire-gold/30 text-shire-ink'
                : 'text-shire-brown'
            }`}
          >
            <span className="hidden sm:inline">{displayName}</span>
            <span className="sm:hidden">{displayName.slice(0, 3)}</span>
          </div>
        );
      })}
    </div>
  );
}
