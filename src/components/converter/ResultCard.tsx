import { ShireDate, formatShireDate } from '@/lib/shire-date';
import { getFlavorText } from '@/lib/flavor-text';
import { SpecialDay } from '@/lib/constants';

interface ResultCardProps {
  shireDate: ShireDate;
  gregorianDate: Date | null;
  isBirthday: boolean;
}

export function ResultCard({ shireDate, gregorianDate, isBirthday }: ResultCardProps) {
  const flavor = getFlavorText(shireDate);
  
  const gregorianString = gregorianDate?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const isSpecialDay = shireDate.specialDay !== null;

  return (
    <div className={`
      rounded-2xl p-6 sm:p-8 border-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-500
      ${isBirthday 
        ? 'bg-shire-gold/20 border-shire-gold' 
        : 'bg-white border-shire-brown/20'
      }
    `}>
      {/* Header */}
      {isBirthday && (
        <div className="mb-4">
          <span className="inline-block px-4 py-1 bg-shire-gold text-shire-ink rounded-full font-heading text-sm">
            🎉 Your Shire Birthday! 🎉
          </span>
        </div>
      )}

      {/* Main Result */}
      <div className="space-y-4 mb-6">
        {/* Shire Date */}
        <div>
          {shireDate.weekday && (
            <p className="font-heading text-xl text-shire-brown mb-2">
              {shireDate.weekday.shire}
            </p>
          )}
          
          <h3 className="font-heading text-4xl sm:text-5xl text-shire-ink">
            {isSpecialDay ? (
              <span className="text-shire-green">{shireDate.specialDay}</span>
            ) : (
              <>
                <span className="text-shire-gold">{shireDate.day}</span>
                <span> {shireDate.month?.shire}</span>
              </>
            )}
          </h3>
          
          <p className="font-heading text-xl text-shire-brown mt-2">
            S.R. {shireDate.shireYear}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-shire-brown/30"></div>
          <span className="text-shire-brown/50">is</span>
          <div className="h-px w-16 bg-shire-brown/30"></div>
        </div>

        {/* Gregorian Date */}
        <p className="text-lg text-shire-ink">
          {gregorianString}
        </p>
      </div>

      {/* Flavor Text */}
      <div className="bg-white/60 rounded-xl p-4 mb-4">
        <p className="text-shire-ink italic text-lg">
          &ldquo;{flavor.primary}&rdquo;
        </p>
        {flavor.notable && (
          <p className="mt-3 text-shire-gold font-semibold">
            {flavor.notable}
          </p>
        )}
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {shireDate.weekday && (
          <div className="bg-white/40 rounded-lg p-3">
            <span className="text-shire-brown">Named for: </span>
            <span className="text-shire-ink font-semibold">{shireDate.weekday.meaning}</span>
          </div>
        )}
        
        {shireDate.month && (
          <div className="bg-white/40 rounded-lg p-3">
            <span className="text-shire-brown">Season: </span>
            <span className="text-shire-ink">{shireDate.month.english}</span>
          </div>
        )}
        
        <div className="bg-white/40 rounded-lg p-3">
          <span className="text-shire-brown">Day of Year: </span>
          <span className="text-shire-ink font-semibold">{shireDate.dayOfYear}</span>
          {shireDate.isLeapYear && (
            <span className="text-shire-green ml-1">(Leap Year)</span>
          )}
        </div>
        
        {isSpecialDay && shireDate.holidayDescription && (
          <div className="bg-white/40 rounded-lg p-3 sm:col-span-2">
            <span className="text-shire-brown">About this day: </span>
            <span className="text-shire-ink">{shireDate.holidayDescription}</span>
          </div>
        )}
      </div>

      {/* Share Hint */}
      {isBirthday && (
        <p className="mt-6 text-sm text-shire-brown/60">
          Share your Shire birthday with friends! (Share card coming soon)
        </p>
      )}
    </div>
  );
}
