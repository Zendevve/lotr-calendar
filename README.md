# Shire Calendar

A beautiful web app for exploring the Shire Calendar from J.R.R. Tolkien's *The Lord of the Rings*. See today's date as a Hobbit would, browse the full calendar, and convert dates between Gregorian and Shire reckoning.

## Features

✨ **Today in the Shire** — See the current date converted to Shire Reckoning with weekday, month, and year

📅 **Full Year Calendar** — Browse all 12 months plus special days (Yuledays, Lithedays, Overlithe)

🔄 **Date Converter** — Find your Shire birthday or convert any date between Gregorian and Shire reckoning

🎨 **Beautiful Design** — Warm, earthy Shire aesthetic with parchment textures and custom typography

🌍 **Responsive** — Works beautifully on mobile, tablet, and desktop

## The Shire Calendar

Based on **Appendix D** of *The Lord of the Rings*:

- **12 months** of 30 days each
- **Special days** outside the months: 2 Yule, 1 Lithe, Mid-year's Day, 2 Lithe, 1 Yule
- **Overlithe** — An extra day in leap years
- **Shire-reform** — Weekdays never shift; Mid-year's Day and Overlithe have no weekday
- **7 weekdays**: Sterday, Sunday, Monday, Trewsday, Hevensday, Mersday, Highday

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **Deployment**: Vercel

## Development

```bash
# Clone the repository
git clone https://github.com/Zendevve/lotr-calendar.git
cd shire-calendar

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Date Conversion

The Shire year starts on **December 21** (2 Yule) and ends on **December 20** (1 Yule). The Shire year number equals the Gregorian year in which Mid-year's Day falls.

### Example Conversions

| Gregorian | Shire |
|-----------|-------|
| December 21 | 2 Yule |
| December 22 | Afteryule 1 |
| June 20 (non-leap) | Mid-year's Day |
| June 20 (leap) | Overlithe |
| December 20 | 1 Yule |

## Attribution

Based on *The Lord of the Rings* by J.R.R. Tolkien, specifically **Appendix D: Calendars**.

This is a fan-made project for educational and entertainment purposes. All rights to Middle-earth and The Lord of the Rings belong to the Tolkien Estate and respective rights holders.

## License

MIT License — Feel free to use and modify!

---

*"If more of us valued food and cheer and song above hoarded gold, it would be a merrier world."* — Thorin Oakenshield
