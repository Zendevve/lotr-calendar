'use client';

import { useState } from 'react';
import { SHIRE_MONTHS, SpecialDay } from '@/lib/constants';
import { NameStyle } from '@/lib/shire-date';
import { gregorianToShire } from '@/lib/gregorian-to-shire';
import { shireMonthDayToGregorian, shireSpecialDayToGregorian } from '@/lib/shire-to-gregorian';
import { isLeapYear } from '@/lib/leap-year';
import { getFlavorText } from '@/lib/flavor-text';
import { ResultCard } from './ResultCard';

export function DateConverter() {
  const [activeTab, setActiveTab] = useState<'birthday' | 'gregorian' | 'shire'>('birthday');
  const [result, setResult] = useState<{
    shireDate: ReturnType<typeof gregorianToShire> | null;
    gregorianDate: Date | null;
    isBirthday: boolean;
  } | null>(null);

  // Gregorian to Shire state
  const [gregorianDate, setGregorianDate] = useState('');

  // Shire to Gregorian state
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedSpecialDay, setSelectedSpecialDay] = useState<SpecialDay | ''>('');
  const [shireYear, setShireYear] = useState<number>(new Date().getFullYear());
  const [dateType, setDateType] = useState<'regular' | 'special'>('regular');

  const handleGregorianToShire = () => {
    if (!gregorianDate) return;
    
    const date = new Date(gregorianDate);
    const shireDate = gregorianToShire(date);
    
    setResult({
      shireDate,
      gregorianDate: date,
      isBirthday: activeTab === 'birthday',
    });
  };

  const handleShireToGregorian = () => {
    let gregorianDate: Date;
    
    if (dateType === 'special' && selectedSpecialDay) {
      gregorianDate = shireSpecialDayToGregorian(selectedSpecialDay, shireYear);
    } else {
      gregorianDate = shireMonthDayToGregorian(selectedMonth, selectedDay, shireYear);
    }
    
    const shireDate = gregorianToShire(gregorianDate);
    
    setResult({
      shireDate,
      gregorianDate,
      isBirthday: false,
    });
  };

  const today = new Date();
  const currentYear = today.getFullYear();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { id: 'birthday', label: "What's My Shire Birthday?" },
          { id: 'gregorian', label: 'Gregorian → Shire' },
          { id: 'shire', label: 'Shire → Gregorian' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              setResult(null);
            }}
            className={`
              px-4 py-2 rounded-lg font-heading text-sm transition-colors
              ${activeTab === tab.id
                ? 'bg-shire-green text-white'
                : 'bg-white text-shire-brown hover:bg-shire-brown/10'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-shire-brown/20 mb-8">
        {activeTab === 'birthday' && (
          <div className="text-center space-y-6">
            <div>
              <label className="block text-shire-brown font-heading mb-2">
                Enter your birthday (Gregorian)
              </label>
              <input
                type="date"
                value={gregorianDate}
                onChange={(e) => setGregorianDate(e.target.value)}
                className="w-full max-w-xs mx-auto block px-4 py-3 rounded-lg border border-shire-brown/30 bg-white text-shire-ink focus:outline-none focus:ring-2 focus:ring-shire-green"
              />
            </div>
            <button
              onClick={handleGregorianToShire}
              disabled={!gregorianDate}
              className="px-8 py-3 bg-shire-gold text-shire-ink rounded-lg font-heading hover:bg-shire-light-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Find My Shire Birthday!
            </button>
          </div>
        )}

        {activeTab === 'gregorian' && (
          <div className="text-center space-y-6">
            <div>
              <label className="block text-shire-brown font-heading mb-2">
                Select a Gregorian date
              </label>
              <input
                type="date"
                value={gregorianDate}
                onChange={(e) => setGregorianDate(e.target.value)}
                className="w-full max-w-xs mx-auto block px-4 py-3 rounded-lg border border-shire-brown/30 bg-white text-shire-ink focus:outline-none focus:ring-2 focus:ring-shire-green"
              />
            </div>
            <button
              onClick={handleGregorianToShire}
              disabled={!gregorianDate}
              className="px-8 py-3 bg-shire-green text-white rounded-lg font-heading hover:bg-shire-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Convert to Shire
            </button>
          </div>
        )}

        {activeTab === 'shire' && (
          <div className="space-y-6">
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setDateType('regular')}
                className={`px-4 py-2 rounded-lg font-heading text-sm transition-colors ${
                  dateType === 'regular' ? 'bg-shire-green text-white' : 'bg-white text-shire-brown'
                }`}
              >
                Regular Day
              </button>
              <button
                onClick={() => setDateType('special')}
                className={`px-4 py-2 rounded-lg font-heading text-sm transition-colors ${
                  dateType === 'special' ? 'bg-shire-green text-white' : 'bg-white text-shire-brown'
                }`}
              >
                Special Day
              </button>
            </div>

            {dateType === 'regular' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-shire-brown font-heading text-sm mb-2">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-shire-brown/30 bg-white text-shire-ink focus:outline-none focus:ring-2 focus:ring-shire-green"
                  >
                    {SHIRE_MONTHS.map((month) => (
                      <option key={month.index} value={month.index}>
                        {month.shire}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-shire-brown font-heading text-sm mb-2">Day</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-shire-brown/30 bg-white text-shire-ink focus:outline-none focus:ring-2 focus:ring-shire-green"
                  >
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-shire-brown font-heading text-sm mb-2">Year</label>
                  <input
                    type="number"
                    value={shireYear}
                    onChange={(e) => setShireYear(Number(e.target.value))}
                    min={1}
                    max={9999}
                    className="w-full px-4 py-3 rounded-lg border border-shire-brown/30 bg-white text-shire-ink focus:outline-none focus:ring-2 focus:ring-shire-green"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-shire-brown font-heading text-sm mb-2">Special Day</label>
                  <select
                    value={selectedSpecialDay}
                    onChange={(e) => setSelectedSpecialDay(e.target.value as SpecialDay)}
                    className="w-full px-4 py-3 rounded-lg border border-shire-brown/30 bg-white text-shire-ink focus:outline-none focus:ring-2 focus:ring-shire-green"
                  >
                    <option value="">Select a day...</option>
                    {Object.values(SpecialDay).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-shire-brown font-heading text-sm mb-2">Year</label>
                  <input
                    type="number"
                    value={shireYear}
                    onChange={(e) => setShireYear(Number(e.target.value))}
                    min={1}
                    max={9999}
                    className="w-full px-4 py-3 rounded-lg border border-shire-brown/30 bg-white text-shire-ink focus:outline-none focus:ring-2 focus:ring-shire-green"
                  />
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleShireToGregorian}
                disabled={dateType === 'special' && !selectedSpecialDay}
                className="px-8 py-3 bg-shire-green text-white rounded-lg font-heading hover:bg-shire-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Convert to Gregorian
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {result?.shireDate && (
        <ResultCard
          shireDate={result.shireDate}
          gregorianDate={result.gregorianDate}
          isBirthday={result.isBirthday}
        />
      )}
    </div>
  );
}
