export const SHIRE_MONTHS = [
  { index: 1,  shire: "Afteryule",   bree: "Frery",       english: "January",   days: 30 },
  { index: 2,  shire: "Solmath",     bree: "Solmath",     english: "February",  days: 30 },
  { index: 3,  shire: "Rethe",       bree: "Rethe",       english: "March",     days: 30 },
  { index: 4,  shire: "Astron",      bree: "Chithing",    english: "April",     days: 30 },
  { index: 5,  shire: "Thrimidge",   bree: "Thrimidge",   english: "May",       days: 30 },
  { index: 6,  shire: "Forelithe",   bree: "Lithe",       english: "June",      days: 30 },
  // --- Lithedays go here (between months 6 and 7) ---
  { index: 7,  shire: "Afterlithe",  bree: "Mede",        english: "July",      days: 30 },
  { index: 8,  shire: "Wedmath",     bree: "Wedmath",     english: "August",    days: 30 },
  { index: 9,  shire: "Halimath",    bree: "Harvestmath", english: "September", days: 30 },
  { index: 10, shire: "Winterfilth", bree: "Wintring",    english: "October",   days: 30 },
  { index: 11, shire: "Blotmath",    bree: "Blooting",    english: "November",  days: 30 },
  { index: 12, shire: "Foreyule",    bree: "Yulemath",    english: "December",  days: 30 },
] as const;

export const SHIRE_WEEKDAYS = [
  { shire: "Sterday",    english: "Saturday",  meaning: "Stars of Varda", index: 0 },
  { shire: "Sunday",     english: "Sunday",    meaning: "Sun", index: 1 },
  { shire: "Monday",     english: "Monday",    meaning: "Moon", index: 2 },
  { shire: "Trewsday",   english: "Tuesday",   meaning: "Two Trees of Valinor", index: 3 },
  { shire: "Hevensday",  english: "Wednesday", meaning: "Heavens", index: 4 },
  { shire: "Mersday",    english: "Thursday",  meaning: "Sea", index: 5 },
  { shire: "Highday",    english: "Friday",    meaning: "Valar", index: 6 },
] as const;

export enum SpecialDay {
  YULE_2 = "2 Yule",          // First day of year
  LITHE_1 = "1 Lithe",
  MIDYEARS_DAY = "Mid-year's Day",
  OVERLITHE = "Overlithe",
  LITHE_2 = "2 Lithe",
  YULE_1 = "1 Yule",          // Last day of year
}

// Days that have NO weekday assignment (Shire-reform)
export const NO_WEEKDAY_DAYS = [
  SpecialDay.MIDYEARS_DAY,
  SpecialDay.OVERLITHE,
] as const;

// Day of year positions - calculated correctly
// Structure: 1 special day, 6 months (180 days), 3-4 special days, 6 months (180 days), 1 special day
// Non-leap: 1 + 180 + 3 + 180 + 1 = 365 days
// Leap: 1 + 180 + 4 + 180 + 1 = 366 days
// Weekday-bearing: 365 - 1 (Mid-year) = 364 OR 366 - 2 (Mid-year + Overlithe) = 364

// First half of year (before Mid-year's Day):
// Day 1: 2 Yule
// Days 2-31: Afteryule (30 days) 
// Days 32-61: Solmath (30 days)
// Days 62-91: Rethe (30 days)
// Days 92-121: Astron (30 days)
// Days 122-151: Thrimidge (30 days)
// Days 152-181: Forelithe (30 days)
// Day 182: 1 Lithe
// Day 183: Mid-year's Day

// Second half of year (after Mid-year's Day):
// Non-leap: Day 184: 2 Lithe, Day 185: Afterlithe 1
// Leap: Day 184: Overlithe, Day 185: 2 Lithe, Day 186: Afterlithe 1

// So for non-leap:
// Days 185-214: Afterlithe (30 days)
// Days 215-244: Wedmath (30 days)
// Days 245-274: Halimath (30 days)
// Days 275-304: Winterfilth (30 days)
// Days 305-334: Blotmath (30 days)
// Days 335-364: Foreyule (30 days)
// Day 365: 1 Yule

// For leap year, add 1 to everything after Overlithe:
// Days 186-215: Afterlithe
// Days 216-245: Wedmath
// Days 246-275: Halimath
// Days 276-305: Winterfilth
// Days 306-335: Blotmath
// Days 336-365: Foreyule
// Day 366: 1 Yule

export const DAY_OF_YEAR = {
  // First half
  YULE_2: 1,
  AFTERYULE_START: 2,
  AFTERYULE_END: 31,
  SOLMATH_START: 32,
  SOLMATH_END: 61,
  RETHE_START: 62,
  RETHE_END: 91,
  ASTRON_START: 92,
  ASTRON_END: 121,
  THRIMIDGE_START: 122,
  THRIMIDGE_END: 151,
  FORELITHE_START: 152,
  FORELITHE_END: 181,
  LITHE_1: 182,
  MIDYEARS_DAY: 183,
  
  // Variable days
  OVERLITHE: 184,  // Leap year only
  LITHE_2_NONLEAP: 184,
  LITHE_2_LEAP: 185,
  
  // Second half - non-leap year
  AFTERLITHE_START_NONLEAP: 185,
  AFTERLITHE_END_NONLEAP: 214,
  WEDMATH_START_NONLEAP: 215,
  WEDMATH_END_NONLEAP: 244,
  HALIMATH_START_NONLEAP: 245,
  HALIMATH_END_NONLEAP: 274,
  WINTERFILTH_START_NONLEAP: 275,
  WINTERFILTH_END_NONLEAP: 304,
  BLOTMATH_START_NONLEAP: 305,
  BLOTMATH_END_NONLEAP: 334,
  FOREYULE_START_NONLEAP: 335,
  FOREYULE_END_NONLEAP: 364,
  YULE_1_NONLEAP: 365,
  
  // Second half - leap year
  AFTERLITHE_START_LEAP: 186,
  AFTERLITHE_END_LEAP: 215,
  WEDMATH_START_LEAP: 216,
  WEDMATH_END_LEAP: 245,
  HALIMATH_START_LEAP: 246,
  HALIMATH_END_LEAP: 275,
  WINTERFILTH_START_LEAP: 276,
  WINTERFILTH_END_LEAP: 305,
  BLOTMATH_START_LEAP: 306,
  BLOTMATH_END_LEAP: 335,
  FOREYULE_START_LEAP: 336,
  FOREYULE_END_LEAP: 365,
  YULE_1_LEAP: 366,
} as const;

// Holiday descriptions
export const HOLIDAY_DESCRIPTIONS: Record<string, string> = {
  [SpecialDay.YULE_2]: "The first day of the year, marking the end of Yuletide festivities.",
  [SpecialDay.YULE_1]: "The last day of the year, beginning the six-day Yuletide celebration.",
  [SpecialDay.LITHE_1]: "The first of the Lithedays, a time of summer feasting.",
  [SpecialDay.MIDYEARS_DAY]: "The middle of the year — a day without a weekday, standing alone.",
  [SpecialDay.OVERLITHE]: "An extra day in leap years, also without a weekday.",
  [SpecialDay.LITHE_2]: "The last of the Lithedays, returning to regular reckoning.",
};

// Weekday flavor texts
export const WEEKDAY_FLAVOR: Record<string, string> = {
  "Sterday": "A day for new beginnings under the stars.",
  "Sunday": "A bright day, named for the Sun herself.",
  "Monday": "A day of reflection under the Moon's gentle light.",
  "Trewsday": "A day to remember the Two Trees of Valinor.",
  "Hevensday": "A day to look to the heavens above.",
  "Mersday": "A day for the Sea, though far from the Shire it may be.",
  "Highday": "The week's end — a time for feasting and rest!",
};

// Month flavor texts
export const MONTH_FLAVOR: Record<string, string> = {
  "Afteryule": "The quiet days after Yuletide, when winter still holds the land.",
  "Solmath": "The month of sun-math, when days begin to grow longer.",
  "Rethe": "The month of reckoning, when winter's grip begins to loosen.",
  "Astron": "The month of stars, when the heavens shine bright.",
  "Thrimidge": "The month of thriving, when all things begin to grow.",
  "Forelithe": "The days before Lithe, when summer is in full bloom.",
  "Afterlithe": "The days after Lithe, when harvest time approaches.",
  "Wedmath": "The month of weeding and tending the fields.",
  "Halimath": "The holy month, when the harvest is gathered in.",
  "Winterfilth": "The month when winter's filth begins to settle.",
  "Blotmath": "The month of blood, when animals are slaughtered for winter.",
  "Foreyule": "The days before Yule, preparing for the year's end.",
};

// Notable dates (Gregorian month-day as key)
export const NOTABLE_DATES: Record<string, { shireDate: string; description: string }> = {
  "9-22": { shireDate: "Halimath 22", description: "Bilbo and Frodo's Birthday! 🎂🧙" },
  "3-25": { shireDate: "Rethe 25", description: "The Fall of Barad-dûr and defeat of Sauron." },
};
