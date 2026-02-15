/**
 * Leap year detection for Gregorian calendar
 * Same rules as Shire Reckoning per Appendix D:
 * - Every 4th year is a leap year
 * - Except centennial years (divisible by 100)
 * - Unless also divisible by 400
 */
export function isLeapYear(gregorianYear: number): boolean {
  if (gregorianYear % 400 === 0) return true;
  if (gregorianYear % 100 === 0) return false;
  if (gregorianYear % 4 === 0) return true;
  return false;
}

/**
 * The Shire year that starts on Dec 21 of (gregorianYear - 1)
 * has its Mid-year's Day in gregorianYear.
 * Leap year for Shire is determined by the Gregorian year
 * in which Mid-year's Day falls.
 */
export function isShireLeapYear(gregorianYearOfMidyear: number): boolean {
  return isLeapYear(gregorianYearOfMidyear);
}
