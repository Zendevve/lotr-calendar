import { describe, it, expect } from 'vitest';
import { isLeapYear, isShireLeapYear } from './leap-year';

describe('Leap Year Logic', () => {
  describe('isLeapYear', () => {
    it('should return true for years divisible by 400', () => {
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(1600)).toBe(true);
      expect(isLeapYear(2400)).toBe(true);
    });

    it('should return false for years divisible by 100 but not 400', () => {
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
      expect(isLeapYear(1800)).toBe(false);
    });

    it('should return true for years divisible by 4 but not 100', () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2016)).toBe(true);
      expect(isLeapYear(2004)).toBe(true);
    });

    it('should return false for years not divisible by 4', () => {
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(2022)).toBe(false);
      expect(isLeapYear(2021)).toBe(false);
      expect(isLeapYear(2019)).toBe(false);
    });
  });

  describe('isShireLeapYear', () => {
    it('should use same rules as Gregorian leap year', () => {
      expect(isShireLeapYear(2024)).toBe(true);
      expect(isShireLeapYear(2023)).toBe(false);
      expect(isShireLeapYear(1900)).toBe(false);
      expect(isShireLeapYear(2000)).toBe(true);
    });
  });
});
