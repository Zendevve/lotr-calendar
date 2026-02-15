'use client';

import { useState } from 'react';
import { SHIRE_MONTHS, SpecialDay } from '@/lib/constants';
import { NameStyle } from '@/lib/shire-date';
import { isLeapYear } from '@/lib/leap-year';
import { MonthGrid } from './MonthGrid';
import { NamedDayBanner } from './NamedDayBanner';
import { gregorianToShire } from '@/lib/gregorian-to-shire';

export function YearCalendar() {
  // Get current Shire year
  const today = new Date();
  const currentShireDate = gregorianToShire(today);
  const [displayYear, setDisplayYear] = useState(currentShireDate.shireYear);
  const [nameStyle, setNameStyle] = useState<NameStyle>('shire');

  const isLeap = isLeapYear(displayYear);

  // Get today's info for highlighting
  const todayInfo = {
    month: currentShireDate.month,
    day: currentShireDate.day,
    shireYear: currentShireDate.shireYear,
    specialDay: currentShireDate.specialDay,
  };

  const isTodayInYear = todayInfo.shireYear === displayYear;

  const handlePrevYear = () => setDisplayYear(y => y - 1);
  const handleNextYear = () => setDisplayYear(y => y + 1);
  const handleCurrentYear = () => setDisplayYear(currentShireDate.shireYear);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Year Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevYear}
            className="p-2 rounded-lg bg-white border border-shire-brown/20 hover:bg-shire-parchment transition-colors"
            aria-label="Previous year"
          >
            <svg className="w-5 h-5 text-shire-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center">
            <h2 className="font-heading text-2xl sm:text-3xl text-shire-ink">
              S.R. {displayYear}
            </h2>
            {isLeap && (
              <span className="text-sm text-shire-green font-heading">
                ✦ Leap Year
              </span>
            )}
          </div>

          <button
            onClick={handleNextYear}
            className="p-2 rounded-lg bg-white border border-shire-brown/20 hover:bg-shire-parchment transition-colors"
            aria-label="Next year"
          >
            <svg className="w-5 h-5 text-shire-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Name Style Toggle */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-shire-brown/20">
          {(['shire', 'english', 'bree'] as NameStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => setNameStyle(style)}
              className={`
                px-3 py-1.5 rounded-md text-sm font-heading capitalize transition-colors
                ${nameStyle === style
                  ? 'bg-shire-green text-white'
                  : 'text-shire-brown hover:bg-shire-brown/10'
                }
              `}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Today Button */}
        {displayYear !== currentShireDate.shireYear && (
          <button
            onClick={handleCurrentYear}
            className="px-4 py-2 bg-shire-gold text-shire-ink rounded-lg font-heading text-sm hover:bg-shire-light-gold transition-colors"
          >
            Today
          </button>
        )}
      </div>

      {/* Calendar */}
      <div className="space-y-6">
        {/* 2 Yule */}
        <NamedDayBanner
          days={[SpecialDay.YULE_2]}
          isLeapYear={isLeap}
          isTodayInBanner={isTodayInYear && todayInfo.specialDay === SpecialDay.YULE_2}
        />

        {/* First 6 months */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SHIRE_MONTHS.slice(0, 6).map((month) => (
            <MonthGrid
              key={month.index}
              month={month}
              year={displayYear}
              nameStyle={nameStyle}
              todayShireDate={isTodayInYear ? todayInfo : null}
            />
          ))}
        </div>

        {/* Lithedays */}
        <NamedDayBanner
          days={isLeap
            ? [SpecialDay.LITHE_1, SpecialDay.MIDYEARS_DAY, SpecialDay.OVERLITHE, SpecialDay.LITHE_2]
            : [SpecialDay.LITHE_1, SpecialDay.MIDYEARS_DAY, SpecialDay.LITHE_2]
          }
          isLeapYear={isLeap}
          isTodayInBanner={isTodayInYear && (
            todayInfo.specialDay === SpecialDay.LITHE_1 ||
            todayInfo.specialDay === SpecialDay.MIDYEARS_DAY ||
            todayInfo.specialDay === SpecialDay.OVERLITHE ||
            todayInfo.specialDay === SpecialDay.LITHE_2
          )}
        />

        {/* Last 6 months */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SHIRE_MONTHS.slice(6).map((month) => (
            <MonthGrid
              key={month.index}
              month={month}
              year={displayYear}
              nameStyle={nameStyle}
              todayShireDate={isTodayInYear ? todayInfo : null}
            />
          ))}
        </div>

        {/* 1 Yule */}
        <NamedDayBanner
          days={[SpecialDay.YULE_1]}
          isLeapYear={isLeap}
          isTodayInBanner={isTodayInYear && todayInfo.specialDay === SpecialDay.YULE_1}
        />
      </div>
    </div>
  );
}
