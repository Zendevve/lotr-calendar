import { ShireDate } from './shire-date';
import { 
  SHIRE_MONTHS, 
  SHIRE_WEEKDAYS, 
  SpecialDay, 
  DAY_OF_YEAR,
  HOLIDAY_DESCRIPTIONS 
} from './constants';
import { isLeapYear } from './leap-year';

/**
 * Convert a Gregorian Date to ShireDate
 * 
 * The Shire year starts on Dec 21 (2 Yule) and ends on Dec 20 (1 Yule).
 * Shire year = Gregorian year of its Mid-year's Day.
 * 
 * Key mapping:
 * - Dec 21 → 2 Yule (Day 1)
 * - Dec 22 → Afteryule 1 (Day 2)
 * - ...
 * - Jun 20/21 → Mid-year's Day (Day 183)
 * - Dec 20 → 1 Yule (Day 365/366)
 */
export function gregorianToShire(gregorianDate: Date): ShireDate {
  const gregorianYear = gregorianDate.getFullYear();
  const gregorianMonth = gregorianDate.getMonth(); // 0-11
  const gregorianDay = gregorianDate.getDate(); // 1-31
  
  // Determine which Shire year this date falls into
  // Shire year Y starts on Dec 21 of Gregorian year (Y-1)
  // Shire year Y ends on Dec 20 of Gregorian year Y
  // Shire year = Gregorian year of its Mid-year's Day (June)
  
  let shireYear: number;
  
  if (gregorianMonth > 11 || (gregorianMonth === 11 && gregorianDay >= 21)) {
    // Dec 21 onwards → next Shire year
    shireYear = gregorianYear + 1;
  } else {
    // Jan 1 to Dec 20 → current Shire year (which started previous Dec 21)
    shireYear = gregorianYear;
  }
  
  // Determine if this is a leap year in the Shire reckoning
  const isShireLeap = isLeapYear(shireYear);
  
  // Calculate day of Shire year (1-365 or 1-366)
  const dayOfShireYear = calculateDayOfShireYear(
    gregorianYear, 
    gregorianMonth, 
    gregorianDay,
    shireYear,
    isShireLeap
  );
  
  // Get weekday
  const weekday = calculateWeekday(dayOfShireYear, isShireLeap);
  
  // Determine month, day, and special day
  const { month, day, specialDay } = getMonthAndDay(dayOfShireYear, isShireLeap);
  
  // Check if holiday
  const isHoliday = specialDay !== null;
  const holidayDescription = specialDay ? HOLIDAY_DESCRIPTIONS[specialDay] || null : null;
  
  return {
    month,
    day,
    specialDay,
    weekday,
    shireYear,
    isHoliday,
    holidayDescription,
    dayOfYear: dayOfShireYear,
    isLeapYear: isShireLeap,
  };
}

/**
 * Calculate the day of the Shire year (1-365 or 1-366)
 */
function calculateDayOfShireYear(
  gregorianYear: number,
  gregorianMonth: number,
  gregorianDay: number,
  shireYear: number,
  isShireLeap: boolean
): number {
  // Shire year starts on Dec 21 of (shireYear - 1)
  const shireYearStart = new Date(shireYear - 1, 11, 21); // Dec 21
  const currentDate = new Date(gregorianYear, gregorianMonth, gregorianDay);
  
  // Calculate difference in days
  const diffTime = currentDate.getTime() - shireYearStart.getTime();
  const dayOfShireYear = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // Validate
  const maxDays = isShireLeap ? 366 : 365;
  if (dayOfShireYear < 1 || dayOfShireYear > maxDays) {
    throw new Error(`Invalid day of Shire year: ${dayOfShireYear}`);
  }
  
  return dayOfShireYear;
}

/**
 * Calculate the weekday for a given day of the Shire year
 * Returns null for Mid-year's Day and Overlithe
 */
function calculateWeekday(
  dayOfShireYear: number, 
  isLeapYear: boolean
): (typeof SHIRE_WEEKDAYS)[number] | null {
  // Mid-year's Day (day 183) and Overlithe (day 184 in leap years) have no weekday
  if (dayOfShireYear === DAY_OF_YEAR.MIDYEARS_DAY) {
    return null;
  }
  
  if (isLeapYear && dayOfShireYear === DAY_OF_YEAR.OVERLITHE) {
    return null;
  }
  
  // Calculate weekday index (0 = Sterday)
  // We have 364 weekday-bearing days total
  // These are: all days except day 183 (Mid-year's Day) and day 184 (Overlithe in leap years)
  
  // Count how many days with weekdays come before this day
  let daysWithWeekday = dayOfShireYear;
  
  // Subtract the gap days that come before this day
  if (dayOfShireYear > DAY_OF_YEAR.MIDYEARS_DAY) {
    daysWithWeekday--; // Skip Mid-year's Day
  }
  
  if (isLeapYear && dayOfShireYear > DAY_OF_YEAR.OVERLITHE) {
    daysWithWeekday--; // Skip Overlithe in leap years
  }
  
  // Calculate weekday: (daysWithWeekday - 1) % 7
  // Day 1 (2 Yule) = Sterday (index 0)
  // Day 2 (Afteryule 1) = Sunday (index 1)
  // etc.
  const weekdayIndex = (daysWithWeekday - 1) % 7;
  return SHIRE_WEEKDAYS[weekdayIndex];
}

/**
 * Get the month, day, and special day for a given day of the Shire year
 */
function getMonthAndDay(
  dayOfShireYear: number,
  isLeapYear: boolean
): { 
  month: (typeof SHIRE_MONTHS)[number] | null;
  day: number | null;
  specialDay: SpecialDay | null;
} {
  // Check for special days first
  if (dayOfShireYear === DAY_OF_YEAR.YULE_2) {
    return { month: null, day: null, specialDay: SpecialDay.YULE_2 };
  }
  
  if (dayOfShireYear === DAY_OF_YEAR.LITHE_1) {
    return { month: null, day: null, specialDay: SpecialDay.LITHE_1 };
  }
  
  if (dayOfShireYear === DAY_OF_YEAR.MIDYEARS_DAY) {
    return { month: null, day: null, specialDay: SpecialDay.MIDYEARS_DAY };
  }
  
  // Check for Overlithe (only in leap years)
  if (isLeapYear && dayOfShireYear === DAY_OF_YEAR.OVERLITHE) {
    return { month: null, day: null, specialDay: SpecialDay.OVERLITHE };
  }
  
  // Check for 2 Lithe
  const lithe2Day = isLeapYear ? DAY_OF_YEAR.LITHE_2_LEAP : DAY_OF_YEAR.LITHE_2_NONLEAP;
  if (dayOfShireYear === lithe2Day) {
    return { month: null, day: null, specialDay: SpecialDay.LITHE_2 };
  }
  
  // Check for 1 Yule
  const yule1Day = isLeapYear ? DAY_OF_YEAR.YULE_1_LEAP : DAY_OF_YEAR.YULE_1_NONLEAP;
  if (dayOfShireYear === yule1Day) {
    return { month: null, day: null, specialDay: SpecialDay.YULE_1 };
  }
  
  // Regular month day - find which month
  const monthRanges = getMonthRanges(isLeapYear);
  
  for (const range of monthRanges) {
    if (dayOfShireYear >= range.start && dayOfShireYear <= range.end) {
      return {
        month: range.month,
        day: dayOfShireYear - range.start + 1,
        specialDay: null,
      };
    }
  }
  
  // Should never reach here
  throw new Error(`Invalid day of Shire year: ${dayOfShireYear}`);
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
