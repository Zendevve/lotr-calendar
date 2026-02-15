import { SpecialDay } from '@/lib/constants';

interface NamedDayBannerProps {
  days: SpecialDay[];
  isLeapYear: boolean;
  isTodayInBanner: boolean;
}

export function NamedDayBanner({ days, isLeapYear, isTodayInBanner }: NamedDayBannerProps) {
  const formatDay = (day: SpecialDay) => {
    switch (day) {
      case SpecialDay.YULE_2:
        return { short: '2 Yule', full: '2 Yule — New Year', color: 'border-shire-red bg-shire-red/5' };
      case SpecialDay.YULE_1:
        return { short: '1 Yule', full: '1 Yule — Year\'s End', color: 'border-shire-red bg-shire-red/5' };
      case SpecialDay.LITHE_1:
        return { short: '1 Lithe', full: '1 Lithe', color: 'border-shire-gold bg-shire-gold/5' };
      case SpecialDay.MIDYEARS_DAY:
        return { short: "Mid-year's Day", full: "Mid-year's Day", color: 'border-shire-gold bg-shire-gold/10' };
      case SpecialDay.OVERLITHE:
        return { short: 'Overlithe', full: 'Overlithe (Leap Year)', color: 'border-shire-green bg-shire-green/10' };
      case SpecialDay.LITHE_2:
        return { short: '2 Lithe', full: '2 Lithe', color: 'border-shire-gold bg-shire-gold/5' };
      default:
        return { short: day, full: day, color: 'border-shire-brown bg-shire-brown/5' };
    }
  };

  return (
    <div className={`
      w-full py-4 px-4 rounded-lg border-2 my-4
      ${isTodayInBanner ? 'ring-2 ring-shire-gold shadow-lg' : ''}
      ${days.some(d => d === SpecialDay.MIDYEARS_DAY) ? 'border-shire-gold bg-shire-gold/10' : 'border-shire-brown/30 bg-shire-parchment/50'}
    `}>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {days.map((day, index) => {
          const formatted = formatDay(day);
          return (
            <div key={day} className="flex items-center gap-4">
              <div className={`
                px-4 py-2 rounded-lg border font-heading text-center
                ${formatted.color}
              `}>
                <span className="text-shire-ink font-semibold">{formatted.short}</span>
              </div>
              {index < days.length - 1 && (
                <span className="text-shire-brown text-xl">•</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
