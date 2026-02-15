import { WEEKDAY_FLAVOR, MONTH_FLAVOR, NOTABLE_DATES } from '@/lib/constants';
import { ShireDate, NameStyle } from '@/lib/shire-date';

export interface FlavorText {
  primary: string;
  secondary: string | null;
  notable: string | null;
}

export function getFlavorText(shireDate: ShireDate, nameStyle: NameStyle = 'shire'): FlavorText {
  const { weekday, month, day, specialDay, shireYear } = shireDate;
  
  // Check for notable dates first
  const today = new Date();
  const notableKey = `${today.getMonth() + 1}-${today.getDate()}`;
  const notable = NOTABLE_DATES[notableKey] || null;
  
  // Get primary flavor text
  let primary = '';
  
  if (specialDay) {
    // Special day descriptions
    switch (specialDay) {
      case "2 Yule":
        primary = "A new year begins! The Yuletide festivities continue.";
        break;
      case "1 Yule":
        primary = "The year's end approaches. Tonight, the Yuletide celebrations begin!";
        break;
      case "1 Lithe":
        primary = "The Lithedays are upon us — time for summer feasting!";
        break;
      case "Mid-year's Day":
        primary = "The middle of the year, standing alone. A day for reflection and merrymaking.";
        break;
      case "Overlithe":
        primary = "An extra day in this leap year! The Shire-reform grants us more time for celebration.";
        break;
      case "2 Lithe":
        primary = "The Lithedays draw to a close. Tomorrow, regular business resumes.";
        break;
      default:
        primary = "A special day in the Shire calendar.";
    }
  } else if (weekday && month) {
    const weekdayName = nameStyle === 'english' ? weekday.english : weekday.shire;
    const monthName = nameStyle === 'english' ? month.english : nameStyle === 'bree' ? month.bree : month.shire;
    
    // Weekday-based flavor
    const weekdayFlavor = WEEKDAY_FLAVOR[weekday.shire];
    
    // Month-based flavor
    const monthFlavor = MONTH_FLAVOR[month.shire];
    
    if (weekdayFlavor) {
      primary = weekdayFlavor;
    } else if (monthFlavor) {
      primary = monthFlavor;
    } else {
      primary = `A fine ${weekdayName} in ${monthName}.`;
    }
  } else {
    primary = "A day in the Shire.";
  }
  
  // Get secondary flavor text (seasonal/month context)
  let secondary: string | null = null;
  if (month) {
    const monthFlavor = MONTH_FLAVOR[month.shire];
    if (monthFlavor && monthFlavor !== primary) {
      secondary = monthFlavor;
    }
  }
  
  return {
    primary,
    secondary,
    notable: notable?.description || null,
  };
}
