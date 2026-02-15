import { ShireDate, formatShireDate } from '@/lib/shire-date';
import { SpecialDay } from '@/lib/constants';

interface SpecialDayBadgeProps {
  specialDay: SpecialDay;
}

export function SpecialDayBadge({ specialDay }: SpecialDayBadgeProps) {
  const getBadgeStyle = () => {
    switch (specialDay) {
      case SpecialDay.YULE_2:
      case SpecialDay.YULE_1:
        return 'bg-shire-red text-white border-shire-red';
      case SpecialDay.MIDYEARS_DAY:
        return 'bg-shire-gold text-shire-ink border-shire-gold';
      case SpecialDay.OVERLITHE:
        return 'bg-shire-green text-white border-shire-green animate-pulse';
      case SpecialDay.LITHE_1:
      case SpecialDay.LITHE_2:
        return 'bg-shire-light-gold text-shire-ink border-shire-gold';
      default:
        return 'bg-shire-brown text-white border-shire-brown';
    }
  };

  const getLabel = () => {
    switch (specialDay) {
      case SpecialDay.YULE_2:
        return '✦ New Year ✦';
      case SpecialDay.YULE_1:
        return '✦ Year\'s End ✦';
      case SpecialDay.MIDYEARS_DAY:
        return '✦ Mid-year\'s Day ✦';
      case SpecialDay.OVERLITHE:
        return '✦ Overlithe ✦';
      case SpecialDay.LITHE_1:
        return '✦ Summerfeast Begins ✦';
      case SpecialDay.LITHE_2:
        return '✦ Summerfeast Ends ✦';
      default:
        return `✦ ${specialDay} ✦`;
    }
  };

  return (
    <div className={`inline-block px-4 py-2 rounded-full border-2 font-heading text-sm tracking-wider ${getBadgeStyle()}`}>
      {getLabel()}
    </div>
  );
}
