import { ShireDate } from './shire-date';
import { 
  SHIRE_MONTHS, 
  SpecialDay, 
  DAY_OF_YEAR 
} from './constants';
import { isLeapYear } from './leap-year';

/**
 * Convert a ShireDate to a Gregorian Date
 * 
 * Reverse of gregorianToShire:
 * - Given month+day or specialDay + shireYear → Gregorian Date
 * 
 * Shire year Y starts on Dec 21 of Gregorian year (Y-1)
 * and ends on Dec 20 of Gregorian year Y
 */
export function shireToGregorian(
  shireDate: ShireDate
): Date {
  const { month, day, specialDay, shireYear } = shireDate;
  
  // Determine if leap year
  const isShireLeap = isLeapYear(shireYear);
  
  // Calculate day of Shire year
  let dayOfShireYear: number;
  
  if (specialDay) {
    dayOfShireYear = getSpecialDayOfYear(specialDay, isShireLeap);
  } else if (month && day) {
    dayOfShireYear = getRegularDayOfYear(month.index, day, isShireLeap);
  } else {
    throw new Error('Invalid ShireDate: must have either specialDay or month+day');
  }
  
  // Calculate Gregorian date
  // Shire year starts on Dec 21 of (shireYear - 1)
  const shireYearStartGregorian = new Date(shireYear - 1, 11, 21); // Dec 21
  
  // Add (dayOfShireYear - 1) days to get the Gregorian date
  const gregorianDate = new Date(shireYearStartGregorian);
  gregorianDate.setDate(gregorianDate.getDate() + (dayOfShireYear - 1));
  
  return gregorianDate;
}

/**
 * Convert Shire month/day directly to Gregorian Date
 * Convenience function when you don't have a full ShireDate object
 */
export function shireMonthDayToGregorian(
  monthIndex: number, // 1-12
  day: number, // 1-30
  shireYear: number
): Date {
  const isShireLeap = isLeapYear(shireYear);
  const dayOfShireYear = getRegularDayOfYear(monthIndex, day, isShireLeap);
  
  const shireYearStartGregorian = new Date(shireYear - 1, 11, 21); // Dec 21
  const gregorianDate = new Date(shireYearStartGregorian);
  gregorianDate.setDate(gregorianDate.getDate() + (dayOfShireYear - 1));
  
  return gregorianDate;
}

/**
 * Convert special day directly to Gregorian Date
 * Convenience function when you don't have a full ShireDate object
 */
export function shireSpecialDayToGregorian(
  specialDay: SpecialDay,
  shireYear: number
): Date {
  const isShireLeap = isLeapYear(shireYear);
  const dayOfShireYear = getSpecialDayOfYear(specialDay, isShireLeap);
  
  const shireYearStartGregorian = new Date(shireYear - 1, 11, 21); // Dec 21
  const gregorianDate = new Date(shireYearStartGregorian);
  gregorianDate.setDate(gregorianDate.getDate() + (dayOfShireYear - 1));
  
  return gregorianDate;
}

/**
 * Get the day of year for a special day
 */
function getSpecialDayOfYear(specialDay: SpecialDay, isLeapYear: boolean): number {
  switch (specialDay) {
    case SpecialDay.YULE_2:
      return DAY_OF_YEAR.YULE_2;
    case SpecialDay.LITHE_1:
      return DAY_OF_YEAR.LITHE_1;
    case SpecialDay.MIDYEARS_DAY:
      return DAY_OF_YEAR.MIDYEARS_DAY;
    case SpecialDay.OVERLITHE:
      if (!isLeapYear) {
        throw new Error('Overlithe only exists in leap years');
      }
      return DAY_OF_YEAR.OVERLITHE;
    case SpecialDay.LITHE_2:
      return isLeapYear ? DAY_OF_YEAR.LITHE_2_LEAP : DAY_OF_YEAR.LITHE_2_NONLEAP;
    case SpecialDay.YULE_1:
      return isLeapYear ? DAY_OF_YEAR.YULE_1_LEAP : DAY_OF_YEAR.YULE_1_NONLEAP;
    default:
      throw new Error(`Unknown special day: ${specialDay}`);
  }
}

/**
 * Get the day of year for a regular month day
 */
function getRegularDayOfYear(
  monthIndex: number, // 1-12
  day: number, // 1-30
  isLeapYear: boolean
): number {
  if (monthIndex < 1 || monthIndex > 12) {
    throw new Error(`Invalid month index: ${monthIndex}`);
  }
  
  if (day < 1 || day > 30) {
    throw new Error(`Invalid day: ${day}`);
  }
  
  const monthRanges = getMonthRanges(isLeapYear);
  const range = monthRanges[monthIndex - 1];
  
  return range.start + (day - 1);
}

/**
 * Get month ranges for a given year type
 */
function getMonthRanges(isLeapYear: boolean): Array<{
  month: (typeof SHIRE_MONTHS)[number];
  start: number;
  end: number;
}> {
  if (isLeapYear) {
    return [
      { month: SHIRE_MONTHS[0], start: DAY_OF_YEAR.AFTERYULE_START, end: DAY_OF_YEAR.AFTERYULE_END },
      { month: SHIRE_MONTHS[1], start: DAY_OF_YEAR.SOLMATH_START, end: DAY_OF_YEAR.SOLMATH_END },
      { month: SHIRE_MONTHS[2], start: DAY_OF_YEAR.RETHE_START, end: DAY_OF_YEAR.RETHE_END },
      { month: SHIRE_MONTHS[3], start: DAY_OF_YEAR.ASTRON_START, end: DAY_OF_YEAR.ASTRON_END },
      { month: SHIRE_MONTHS[4], start: DAY_OF_YEAR.THRIMIDGE_START, end: DAY_OF_YEAR.THRIMIDGE_END },
      { month: SHIRE_MONTHS[5], start: DAY_OF_YEAR.FORELITHE_START, end: DAY_OF_YEAR.FORELITHE_END },
      { month: SHIRE_MONTHS[6], start: DAY_OF_YEAR.AFTERLITHE_START_LEAP, end: DAY_OF_YEAR.AFTERLITHE_END_LEAP },
      { month: SHIRE_MONTHS[7], start: DAY_OF_YEAR.WEDMATH_START_LEAP, end: DAY_OF_YEAR.WEDMATH_END_LEAP },
      { month: SHIRE_MONTHS[8], start: DAY_OF_YEAR.HALIMATH_START_LEAP, end: DAY_OF_YEAR.HALIMATH_END_LEAP },
      { month: SHIRE_MONTHS[9], start: DAY_OF_YEAR.WINTERFILTH_START_LEAP, end: DAY_OF_YEAR.WINTERFILTH_END_LEAP },
      { month: SHIRE_MONTHS[10], start: DAY_OF_YEAR.BLOTMATH_START_LEAP, end: DAY_OF_YEAR.BLOTMATH_END_LEAP },
      { month: SHIRE_MONTHS[11], start: DAY_OF_YEAR.FOREYULE_START_LEAP, end: DAY_OF_YEAR.FOREYULE_END_LEAP },
    ];
  } else {
    return [
      { month: SHIRE_MONTHS[0], start: DAY_OF_YEAR.AFTERYULE_START, end: DAY_OF_YEAR.AFTERYULE_END },
      { month: SHIRE_MONTHS[1], start: DAY_OF_YEAR.SOLMATH_START, end: DAY_OF_YEAR.SOLMATH_END },
      { month: SHIRE_MONTHS[2], start: DAY_OF_YEAR.RETHE_START, end: DAY_OF_YEAR.RETHE_END },
      { month: SHIRE_MONTHS[3], start: DAY_OF_YEAR.ASTRON_START, end: DAY_OF_YEAR.ASTRON_END },
      { month: SHIRE_MONTHS[4], start: DAY_OF_YEAR.THRIMIDGE_START, end: DAY_OF_YEAR.THRIMIDGE_END },
      { month: SHIRE_MONTHS[5], start: DAY_OF_YEAR.FORELITHE_START, end: DAY_OF_YEAR.FORELITHE_END },
      { month: SHIRE_MONTHS[6], start: DAY_OF_YEAR.AFTERLITHE_START_NONLEAP, end: DAY_OF_YEAR.AFTERLITHE_END_NONLEAP },
      { month: SHIRE_MONTHS[7], start: DAY_OF_YEAR.WEDMATH_START_NONLEAP, end: DAY_OF_YEAR.WEDMATH_END_NONLEAP },
      { month: SHIRE_MONTHS[8], start: DAY_OF_YEAR.HALIMATH_START_NONLEAP, end: DAY_OF_YEAR.HALIMATH_END_NONLEAP },
      { month: SHIRE_MONTHS[9], start: DAY_OF_YEAR.WINTERFILTH_START_NONLEAP, end: DAY_OF_YEAR.WINTERFILTH_END_NONLEAP },
      { month: SHIRE_MONTHS[10], start: DAY_OF_YEAR.BLOTMATH_START_NONLEAP, end: DAY_OF_YEAR.BLOTMATH_END_NONLEAP },
      { month: SHIRE_MONTHS[11], start: DAY_OF_YEAR.FOREYULE_START_NONLEAP, end: DAY_OF_YEAR.FOREYULE_END_NONLEAP },
    ];
  }
}
