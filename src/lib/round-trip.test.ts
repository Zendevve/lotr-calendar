import { describe, it, expect } from 'vitest';
import { gregorianToShire } from './gregorian-to-shire';
import { shireToGregorian } from './shire-to-gregorian';

/**
 * Helper to compare dates ignoring time
 */
function datesEqual(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Helper to create a date at midnight
 */
function createDate(year: number, month: number, day: number): Date {
  return new Date(year, month, day, 0, 0, 0, 0);
}

describe('Round-trip Conversion', () => {
  describe('Gregorian → Shire → Gregorian', () => {
    it('should round-trip Dec 21 (2 Yule)', () => {
      const original = createDate(2024, 11, 21);
      const shire = gregorianToShire(original);
      const backToGregorian = shireToGregorian(shire);
      
      expect(datesEqual(original, backToGregorian)).toBe(true);
    });

    it('should round-trip Dec 20 (1 Yule)', () => {
      const original = createDate(2024, 11, 20);
      const shire = gregorianToShire(original);
      const backToGregorian = shireToGregorian(shire);
      
      expect(datesEqual(original, backToGregorian)).toBe(true);
    });

    it('should round-trip Mid-year\'s Day', () => {
      const original = createDate(2023, 5, 20);
      const shire = gregorianToShire(original);
      const backToGregorian = shireToGregorian(shire);
      
      expect(datesEqual(original, backToGregorian)).toBe(true);
    });

    it('should round-trip Overlithe in leap year', () => {
      const original = createDate(2024, 5, 20);
      const shire = gregorianToShire(original);
      const backToGregorian = shireToGregorian(shire);
      
      expect(datesEqual(original, backToGregorian)).toBe(true);
    });

    it('should round-trip various regular dates', () => {
      const testDates = [
        createDate(2024, 0, 1),   // Jan 1
        createDate(2024, 0, 15),  // Jan 15
        createDate(2024, 2, 15),  // Mar 15
        createDate(2024, 5, 1),   // Jun 1
        createDate(2024, 6, 15),  // Jul 15
        createDate(2024, 8, 22),  // Sep 22 (Bilbo's birthday)
        createDate(2024, 11, 1),  // Dec 1
      ];

      testDates.forEach(original => {
        const shire = gregorianToShire(original);
        const backToGregorian = shireToGregorian(shire);
        
        expect(datesEqual(original, backToGregorian)).toBe(true);
      });
    });

    it('should round-trip across leap and non-leap years', () => {
      const testDates = [
        // Non-leap year 2023
        createDate(2023, 0, 1),
        createDate(2023, 5, 20),  // Mid-year's Day
        createDate(2023, 11, 20),
        
        // Leap year 2024
        createDate(2024, 0, 1),
        createDate(2024, 5, 19),  // Mid-year's Day
        createDate(2024, 5, 20),  // Overlithe
        createDate(2024, 11, 20),
        
        // Non-leap year 2025
        createDate(2025, 0, 1),
        createDate(2025, 5, 20),  // Mid-year's Day
        createDate(2025, 11, 20),
      ];

      testDates.forEach(original => {
        const shire = gregorianToShire(original);
        const backToGregorian = shireToGregorian(shire);
        
        expect(datesEqual(original, backToGregorian)).toBe(true);
      });
    });
  });

  describe('100 Random Dates Round-trip', () => {
    it('should correctly round-trip 100 random dates', () => {
      const startYear = 1900;
      const endYear = 2100;
      
      for (let i = 0; i < 100; i++) {
        // Generate random date
        const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
        const month = Math.floor(Math.random() * 12);
        const maxDay = new Date(year, month + 1, 0).getDate();
        const day = Math.floor(Math.random() * maxDay) + 1;
        
        const original = createDate(year, month, day);
        const shire = gregorianToShire(original);
        const backToGregorian = shireToGregorian(shire);
        
        expect(datesEqual(original, backToGregorian)).toBe(true);
      }
    });
  });

  describe('Weekday Consistency', () => {
    it('should have the same weekday for the same Shire date across years', () => {
      // Rethe 24 in different years
      const date2023 = createDate(2023, 2, 24);
      const date2024 = createDate(2024, 2, 24);
      const date2025 = createDate(2025, 2, 24);
      
      const shire2023 = gregorianToShire(date2023);
      const shire2024 = gregorianToShire(date2024);
      const shire2025 = gregorianToShire(date2025);
      
      // All should be Rethe 24
      expect(shire2023.month?.shire).toBe("Rethe");
      expect(shire2023.day).toBe(24);
      expect(shire2024.month?.shire).toBe("Rethe");
      expect(shire2024.day).toBe(24);
      expect(shire2025.month?.shire).toBe("Rethe");
      expect(shire2025.day).toBe(24);
      
      // All should have the same weekday (Shire-reform)
      expect(shire2023.weekday?.shire).toBe(shire2024.weekday?.shire);
      expect(shire2024.weekday?.shire).toBe(shire2025.weekday?.shire);
    });
  });
});
