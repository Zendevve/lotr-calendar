import { gregorianToShire } from './gregorian-to-shire';

// Test dates around Mid-year's Day
const testDates = [
  new Date(2024, 5, 19), // Jun 19, 2024
  new Date(2024, 5, 20), // Jun 20, 2024
  new Date(2024, 5, 21), // Jun 21, 2024
  new Date(2024, 5, 22), // Jun 22, 2024
  new Date(2023, 5, 20), // Jun 20, 2023 (non-leap)
  new Date(2023, 5, 21), // Jun 21, 2023 (non-leap)
  new Date(2023, 5, 22), // Jun 22, 2023 (non-leap)
];

console.log('Testing Mid-year dates:\n');

for (const date of testDates) {
  const shire = gregorianToShire(date);
  console.log(`${date.toDateString()}: Day ${shire.dayOfYear}, ${shire.month?.shire || shire.specialDay} ${shire.day || ''}`);
}
