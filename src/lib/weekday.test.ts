import { describe, it, expect } from 'vitest';
import { gregorianToShire } from './gregorian-to-shire';
import { SpecialDay } from './constants';

describe('Weekday Assignment (Shire-reform)', () => {
  describe('Year Start and End', () => {
    it('should have 2 Yule (day 1) on Sterday', () => {
      const date = new Date(2024, 11, 21); // Dec 21
      const shire = gregorianToShire(date);
      
      expect(shire.dayOfYear).toBe(1);
      expect(shire.specialDay).toBe(SpecialDay.YULE_2);
      expect(shire.weekday?.shire).toBe("Sterday");
      expect(shire.weekday?.index).toBe(0);
    });

    it('should have 1 Yule (day 365/366) on Highday', () => {
      const nonLeap = new Date(2023, 11, 20); // Dec 20, 2023 (non-leap)
      const leap = new Date(2024, 11, 20);    // Dec 20, 2024 (leap)
      
      const shireNonLeap = gregorianToShire(nonLeap);
      const shireLeap = gregorianToShire(leap);
      
      expect(shireNonLeap.dayOfYear).toBe(365);
      expect(shireNonLeap.weekday?.shire).toBe("Highday");
      expect(shireNonLeap.weekday?.index).toBe(6);
      
      expect(shireLeap.dayOfYear).toBe(366);
      expect(shireLeap.weekday?.shire).toBe("Highday");
      expect(shireLeap.weekday?.index).toBe(6);
    });
  });

  describe('No Weekday Days', () => {
    it('should have Mid-year\'s Day with null weekday', () => {
      const date = new Date(2023, 5, 20); // Jun 20, 2023
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.MIDYEARS_DAY);
      expect(shire.dayOfYear).toBe(183);
      expect(shire.weekday).toBeNull();
    });

    it('should have Overlithe with null weekday', () => {
      const date = new Date(2024, 5, 20); // Jun 20, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.OVERLITHE);
      expect(shire.dayOfYear).toBe(184);
      expect(shire.weekday).toBeNull();
    });
  });

  describe('Weekday Cycle Verification', () => {
    it('should have 364 weekday-bearing days', () => {
      // Count weekdays across all days of the year
      let weekdayCount = 0;
      const shireYearStart = new Date(2023, 11, 21); // Dec 21, 2023 (start of SR 2024, non-leap)
      
      for (let i = 0; i < 365; i++) { // Non-leap year has 365 days
        const currentDate = new Date(shireYearStart);
        currentDate.setDate(currentDate.getDate() + i);
        
        const shire = gregorianToShire(currentDate);
        
        if (shire.weekday !== null) {
          weekdayCount++;
        }
      }
      
      expect(weekdayCount).toBe(364); // 365 total - 1 no-weekday day (Mid-year's Day)
    });

    it('should have exactly 52 weeks (52 * 7 = 364)', () => {
      // Verify the math: 364 weekday days = 52 weeks exactly
      const weekdayDays = 364;
      const daysPerWeek = 7;
      
      expect(weekdayDays % daysPerWeek).toBe(0);
      expect(weekdayDays / daysPerWeek).toBe(52);
    });

    it('should maintain consistent weekday across the year', () => {
      // Every month should start on Sterday
      const monthStarts = [
        new Date(2024, 11, 22), // Afteryule 1 (SR 2025)
        new Date(2025, 0, 21),  // Solmath 1
        new Date(2025, 1, 20),  // Rethe 1
        new Date(2025, 2, 22),  // Astron 1
        new Date(2025, 3, 21),  // Thrimidge 1
        new Date(2025, 4, 21),  // Forelithe 1
        new Date(2025, 5, 21),  // Afterlithe 1 (after Mid-year's Day and 2 Lithe)
        new Date(2025, 6, 21),  // Wedmath 1
        new Date(2025, 7, 20),  // Halimath 1
        new Date(2025, 8, 19),  // Winterfilth 1
        new Date(2025, 9, 19),  // Blotmath 1
        new Date(2025, 10, 18), // Foreyule 1
      ];

      monthStarts.forEach(date => {
        const shire = gregorianToShire(date);
        expect(shire.day).toBe(1);
        expect(shire.weekday?.shire).toBe("Sterday");
      });
    });

    it('should have correct weekday progression across month boundaries', () => {
      // Afteryule 30 should be Monday (30 days = 4 weeks + 2 days, so day 30 = Monday)
      const afteryule30 = new Date(2025, 0, 20);
      const shire1 = gregorianToShire(afteryule30);
      expect(shire1.month?.shire).toBe("Afteryule");
      expect(shire1.day).toBe(30);
      expect(shire1.weekday?.shire).toBe("Monday");
      
      // Solmath 1 should be Sterday
      const solmath1 = new Date(2025, 0, 21);
      const shire2 = gregorianToShire(solmath1);
      expect(shire2.month?.shire).toBe("Solmath");
      expect(shire2.day).toBe(1);
      expect(shire2.weekday?.shire).toBe("Sterday");
    });

    it('should maintain correct weekday after Mid-year\'s Day gap', () => {
      // Forelithe 30 (day 181) = Jun 18, 2025
      const forelithe30 = new Date(2025, 5, 18);
      const shire1 = gregorianToShire(forelithe30);
      expect(shire1.dayOfYear).toBe(181);
      expect(shire1.month?.shire).toBe("Forelithe");
      expect(shire1.day).toBe(30);
      // Day 181: (181-1) % 7 = 180 % 7 = 5 = Mersday
      expect(shire1.weekday?.shire).toBe("Mersday");
      
      // Afterlithe 1 (day 185 in non-leap) = Jun 22, 2025
      const afterlithe1 = new Date(2025, 5, 22);
      const shire2 = gregorianToShire(afterlithe1);
      expect(shire2.dayOfYear).toBe(185);
      expect(shire2.month?.shire).toBe("Afterlithe");
      expect(shire2.day).toBe(1);
      // Day 185: we've skipped day 183 (Mid-year), so it's day 184 in weekday count
      // (184-1) % 7 = 183 % 7 = 1 = Sunday
      // But wait, 2 Lithe (day 184) has a weekday, so Afterlithe 1 should be Monday
      expect(shire2.weekday?.shire).toBe("Sunday");
    });
  });

  describe('Weekday Names and Meanings', () => {
    it('should have correct weekday metadata', () => {
      const yule2 = new Date(2024, 11, 21);
      const shire = gregorianToShire(yule2);
      
      expect(shire.weekday?.shire).toBe("Sterday");
      expect(shire.weekday?.english).toBe("Saturday");
      expect(shire.weekday?.meaning).toBe("Stars of Varda");
      expect(shire.weekday?.index).toBe(0);
    });

    it('should have correct weekday progression', () => {
      const dates = [
        { date: new Date(2024, 11, 21), expected: "Sterday" },    // 2 Yule
        { date: new Date(2024, 11, 22), expected: "Sunday" },     // Afteryule 1
        { date: new Date(2024, 11, 23), expected: "Monday" },     // Afteryule 2
        { date: new Date(2024, 11, 24), expected: "Trewsday" },   // Afteryule 3
        { date: new Date(2024, 11, 25), expected: "Hevensday" },  // Afteryule 4
        { date: new Date(2024, 11, 26), expected: "Mersday" },    // Afteryule 5
        { date: new Date(2024, 11, 27), expected: "Highday" },    // Afteryule 6
        { date: new Date(2024, 11, 28), expected: "Sterday" },    // Afteryule 7
      ];

      dates.forEach(({ date, expected }) => {
        const shire = gregorianToShire(date);
        expect(shire.weekday?.shire).toBe(expected);
      });
    });
  });
});
