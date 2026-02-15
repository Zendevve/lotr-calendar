'use client';

import { useShireDate } from '@/hooks/useShireDate';
import { SpecialDayBadge } from './SpecialDayBadge';
import { getFlavorText } from '@/lib/flavor-text';
import { formatShireDate } from '@/lib/shire-date';

export function TodayHero() {
  const shireDate = useShireDate();
  const flavor = getFlavorText(shireDate);

  // Format today's Gregorian date
  const today = new Date();
  const gregorianDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="w-full py-16 px-4 sm:py-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <p className="text-shire-brown font-heading text-lg tracking-widest mb-4">
          ✦ Today in the Shire ✦
        </p>

        {/* Special Day Badge */}
        {shireDate.specialDay && (
          <div className="mb-6">
            <SpecialDayBadge specialDay={shireDate.specialDay} />
          </div>
        )}

        {/* Main Date Display */}
        <div className="space-y-2 mb-8">
          {/* Weekday */}
          {shireDate.weekday && (
            <p className="font-heading text-2xl sm:text-3xl text-shire-brown">
              {shireDate.weekday.shire}
            </p>
          )}

          {/* Date */}
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-shire-ink leading-tight">
            {shireDate.specialDay ? (
              <span className="text-shire-green">{shireDate.specialDay}</span>
            ) : (
              <>
                <span className="text-shire-gold">{shireDate.day}</span>
                <span className="text-shire-ink"> {shireDate.month?.shire}</span>
              </>
            )}
          </h1>

          {/* Year */}
          <p className="font-heading text-xl sm:text-2xl text-shire-brown">
            S.R. {shireDate.shireYear}
          </p>
        </div>

        {/* Flavor Text */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-shire-brown/20">
            <p className="text-lg sm:text-xl text-shire-ink italic">
              {flavor.primary}
            </p>
            {flavor.secondary && (
              <p className="mt-2 text-shire-brown">
                {flavor.secondary}
              </p>
            )}
          </div>

          {/* Notable Date */}
          {flavor.notable && (
            <div className="bg-shire-gold/20 rounded-lg p-4 border border-shire-gold">
              <p className="text-shire-ink font-semibold">
                {flavor.notable}
              </p>
            </div>
          )}
        </div>

        {/* Gregorian Date (subtle) */}
        <p className="mt-8 text-sm text-shire-brown/60">
          Gregorian: {gregorianDate}
        </p>

        {/* Decorative Elements */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-shire-brown/30"></div>
          <span className="text-shire-gold text-2xl">🌿</span>
          <div className="h-px w-16 bg-shire-brown/30"></div>
        </div>
      </div>
    </section>
  );
}
