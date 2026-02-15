import { describe, it, expect } from 'vitest';
import { gregorianToShire } from './gregorian-to-shire';
import { SpecialDay } from './constants';

describe('Gregorian to Shire Conversion', () => {
  describe('Year Boundaries', () => {
    it('should map Dec 21 to 2 Yule (first day of Shire year)', () => {
      const date = new Date(2024, 11, 21); // Dec 21, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.YULE_2);
      expect(shire.shireYear).toBe(2025);
      expect(shire.dayOfYear).toBe(1);
    });

    it('should map Dec 20 to 1 Yule (last day of Shire year)', () => {
      const date = new Date(2024, 11, 20); // Dec 20, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.YULE_1);
      expect(shire.shireYear).toBe(2024);
      expect(shire.dayOfYear).toBe(366); // 2024 is a leap year
      expect(shire.isLeapYear).toBe(true);
    });

    it('should map Dec 20 in non-leap year to 1 Yule (day 365)', () => {
      const date = new Date(2023, 11, 20); // Dec 20, 2023
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.YULE_1);
      expect(shire.shireYear).toBe(2023);
      expect(shire.dayOfYear).toBe(365);
      expect(shire.isLeapYear).toBe(false);
    });

    it('should map Dec 20 in leap year to 1 Yule (day 366)', () => {
      const date = new Date(2024, 11, 20); // Dec 20, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.YULE_1);
      expect(shire.shireYear).toBe(2024);
      expect(shire.dayOfYear).toBe(366);
      expect(shire.isLeapYear).toBe(true);
    });
  });

  describe('Month Boundaries', () => {
    it('should map Dec 22 to Afteryule 1', () => {
      const date = new Date(2024, 11, 22); // Dec 22
      const shire = gregorianToShire(date);
      
      expect(shire.month?.shire).toBe("Afteryule");
      expect(shire.day).toBe(1);
      expect(shire.dayOfYear).toBe(2);
    });

    it('should map Jan 20 to Afteryule 30', () => {
      const date = new Date(2025, 0, 20); // Jan 20
      const shire = gregorianToShire(date);
      
      expect(shire.month?.shire).toBe("Afteryule");
      expect(shire.day).toBe(30);
      expect(shire.dayOfYear).toBe(31);
    });

    it('should map Jan 21 to Solmath 1', () => {
      const date = new Date(2025, 0, 21); // Jan 21
      const shire = gregorianToShire(date);
      
      expect(shire.month?.shire).toBe("Solmath");
      expect(shire.day).toBe(1);
      expect(shire.dayOfYear).toBe(32);
    });
  });

  describe('Mid-year and Lithedays', () => {
    it('should map Jun 21 (non-leap) to Mid-year\'s Day', () => {
      const date = new Date(2023, 5, 21); // Jun 21, 2023 (non-leap)
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.MIDYEARS_DAY);
      expect(shire.dayOfYear).toBe(183);
      expect(shire.weekday).toBeNull();
      expect(shire.isLeapYear).toBe(false);
    });

    it('should map Jun 20 (leap) to Mid-year\'s Day', () => {
      const date = new Date(2024, 5, 20); // Jun 20, 2024 (leap)
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.MIDYEARS_DAY);
      expect(shire.dayOfYear).toBe(183);
      expect(shire.weekday).toBeNull();
      expect(shire.isLeapYear).toBe(true);
    });

    it('should map Jun 21 (leap) to Overlithe', () => {
      const date = new Date(2024, 5, 21); // Jun 21, 2024 (leap)
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.OVERLITHE);
      expect(shire.dayOfYear).toBe(184);
      expect(shire.weekday).toBeNull();
      expect(shire.isLeapYear).toBe(true);
    });

    it('should map Jun 19 (leap) to Forelithe 30', () => {
      const date = new Date(2024, 5, 19); // Jun 19, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.month?.shire).toBe("Forelithe");
      expect(shire.day).toBe(30);
      expect(shire.dayOfYear).toBe(181);
    });

    it('should map Jun 20 (non-leap) to Forelithe 30', () => {
      const date = new Date(2023, 5, 20); // Jun 20, 2023
      const shire = gregorianToShire(date);
      
      expect(shire.month?.shire).toBe("Forelithe");
      expect(shire.day).toBe(30);
      expect(shire.dayOfYear).toBe(181);
    });

    it('should map Jun 22 (leap) to Afterlithe 1', () => {
      const date = new Date(2024, 5, 22); // Jun 22, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.month?.shire).toBe("Afterlithe");
      expect(shire.day).toBe(1);
      expect(shire.dayOfYear).toBe(186); // 185 (2 Lithe) + 1
    });

    it('should map Jun 22 (non-leap) to Afterlithe 1', () => {
      const date = new Date(2023, 5, 22); // Jun 22, 2023
      const shire = gregorianToShire(date);
      
      expect(shire.month?.shire).toBe("Afterlithe");
      expect(shire.day).toBe(1);
      expect(shire.dayOfYear).toBe(185); // 184 (2 Lithe) + 1
    });
  });

  describe('Weekday Assignment', () => {
    it('should have 2 Yule always on Sterday', () => {
      const date = new Date(2024, 11, 21); // Dec 21, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.YULE_2);
      expect(shire.weekday?.shire).toBe("Sterday");
    });

    it('should have 1 Yule always on Highday', () => {
      const date = new Date(2024, 11, 20); // Dec 20, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.YULE_1);
      expect(shire.weekday?.shire).toBe("Highday");
    });

    it('should have Mid-year\'s Day with no weekday', () => {
      const date = new Date(2023, 5, 21); // Jun 21, 2023
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.MIDYEARS_DAY);
      expect(shire.weekday).toBeNull();
    });

    it('should have Overlithe with no weekday', () => {
      const date = new Date(2024, 5, 21); // Jun 21, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.specialDay).toBe(SpecialDay.OVERLITHE);
      expect(shire.weekday).toBeNull();
    });

    it('should have consistent weekday across years', () => {
      // Same day in different years should have same weekday
      const date1 = new Date(2023, 2, 25); // Mar 25, 2023
      const date2 = new Date(2024, 2, 25); // Mar 25, 2024
      
      const shire1 = gregorianToShire(date1);
      const shire2 = gregorianToShire(date2);
      
      // Both should be Rethe 25
      expect(shire1.month?.shire).toBe("Rethe");
      expect(shire1.day).toBe(25);
      expect(shire2.month?.shire).toBe("Rethe");
      expect(shire2.day).toBe(25);
      
      // Weekdays should be identical (Shire-reform)
      expect(shire1.weekday?.shire).toBe(shire2.weekday?.shire);
    });
  });

  describe('Holiday Detection', () => {
    it('should mark special days as holidays', () => {
      const yule2 = gregorianToShire(new Date(2024, 11, 21));
      expect(yule2.isHoliday).toBe(true);
      expect(yule2.holidayDescription).toBeDefined();
      
      const midyears = gregorianToShire(new Date(2023, 5, 21));
      expect(midyears.isHoliday).toBe(true);
      expect(midyears.holidayDescription).toBeDefined();
    });

    it('should not mark regular days as holidays', () => {
      const regular = gregorianToShire(new Date(2025, 0, 15)); // Jan 15
      expect(regular.isHoliday).toBe(false);
      expect(regular.holidayDescription).toBeNull();
    });
  });

  describe('Notable Dates', () => {
    it('should correctly map Bilbo and Frodo\'s birthday (Sep 22)', () => {
      const date = new Date(2024, 8, 22); // Sep 22, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.month?.shire).toBe("Halimath");
      expect(shire.day).toBe(3); // Sep 22 is Halimath 3 in SR 2024
    });

    it('should correctly map Fall of Barad-dûr (Mar 25)', () => {
      const date = new Date(2024, 2, 25); // Mar 25, 2024
      const shire = gregorianToShire(date);
      
      expect(shire.month?.shire).toBe("Rethe");
      expect(shire.day).toBe(25);
    });
  });
});
