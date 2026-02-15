import { SHIRE_MONTHS, SHIRE_WEEKDAYS, SpecialDay } from './constants';

export interface ShireDate {
  // If in a regular month:
  month: (typeof SHIRE_MONTHS)[number] | null;
  day: number | null;  // 1–30

  // If a special/named day:
  specialDay: SpecialDay | null;

  // Weekday (null for Mid-year's Day and Overlithe)
  weekday: (typeof SHIRE_WEEKDAYS)[number] | null;

  // Year
  shireYear: number;

  // Is this a holiday/feast day?
  isHoliday: boolean;
  holidayDescription: string | null;

  // Day-of-year (1–366)
  dayOfYear: number;
  
  // Is this a leap year?
  isLeapYear: boolean;
}

export type NameStyle = 'shire' | 'english' | 'bree';

/**
 * Format a ShireDate as a string
 */
export function formatShireDate(
  shireDate: ShireDate, 
  nameStyle: NameStyle = 'shire',
  includeYear: boolean = true
): string {
  const { weekday, month, day, specialDay, shireYear } = shireDate;
  
  let result = '';
  
  // Add weekday if present
  if (weekday) {
    const weekdayName = nameStyle === 'english' 
      ? weekday.english 
      : weekday.shire;
    result += weekdayName + ', ';
  }
  
  // Add date
  if (specialDay) {
    result += specialDay;
  } else if (month && day) {
    const monthName = nameStyle === 'english' 
      ? month.english 
      : nameStyle === 'bree' 
        ? month.bree 
        : month.shire;
    result += `${day} ${monthName}`;
  }
  
  // Add year
  if (includeYear) {
    result += `, S.R. ${shireYear}`;
  }
  
  return result;
}

/**
 * Get a short display string (e.g., "14 Afterlithe" or "Mid-year's Day")
 */
export function formatShireDateShort(
  shireDate: ShireDate,
  nameStyle: NameStyle = 'shire'
): string {
  const { month, day, specialDay } = shireDate;
  
  if (specialDay) {
    return specialDay;
  }
  
  if (month && day) {
    const monthName = nameStyle === 'english' 
      ? month.english 
      : nameStyle === 'bree' 
        ? month.bree 
        : month.shire;
    return `${day} ${monthName}`;
  }
  
  return 'Unknown Date';
}
