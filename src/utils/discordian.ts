/**
 * Discordian Calendar Utility
 *
 * Converts Gregorian dates to Discordian (Erisian) calendar dates.
 * Based on the calendar system from "Principia Discordia".
 *
 * The Discordian calendar has:
 * - 5 seasons of 73 days each
 * - 5 weekdays (repeating)
 * - Special holidays and St. Tib's Day (leap day)
 * - YOLD (Year of Our Lady of Discord) = Gregorian Year + 1166
 */

export interface DiscordianDate {
  weekday: string;
  season: string;
  dayOfSeason: number;
  yold: number;
  isStTibsDay: boolean;
  apostleDay?: string;
}

const SEASONS = ['Chaos', 'Discord', 'Confusion', 'Bureaucracy', 'The Aftermath'];
const WEEKDAYS = ['Sweetmorn', 'Boomtime', 'Pungenday', 'Prickle-Prickle', 'Setting Orange'];
const APOSTLE_DAYS = ['Mungday', 'Mojoday', 'Syadday', 'Zaraday', 'Malbowday'];

const DAYS_IN_SEASON = 73;
const YOLD_OFFSET = 1166;

/**
 * Checks if a year is a leap year in the Gregorian calendar.
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Gets the day of year (1-366) for a given Gregorian date.
 */
function getDayOfYear(year: number, month: number, day: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Add leap day if applicable
  if (isLeapYear(year)) {
    daysInMonth[1] = 29;
  }

  let dayOfYear = day;
  for (let i = 0; i < month - 1; i++) {
    dayOfYear += daysInMonth[i];
  }

  return dayOfYear;
}

/**
 * Converts a Gregorian date to a Discordian date.
 *
 * @param date JavaScript Date object to convert
 * @returns DiscordianDate object with Discordian calendar information
 */
export function toDiscordian(date: Date): DiscordianDate {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JS months are 0-indexed
  const day = date.getDate();

  const yold = year + YOLD_OFFSET;
  const dayOfYear = getDayOfYear(year, month, day);

  // Check for St. Tib's Day (Feb 29 in leap years)
  if (isLeapYear(year) && month === 2 && day === 29) {
    return {
      weekday: '',
      season: '',
      dayOfSeason: 0,
      yold,
      isStTibsDay: true
    };
  }

  // Adjust day of year for leap years (St. Tib's Day is outside the normal calendar)
  let adjustedDay = dayOfYear;
  if (isLeapYear(year) && dayOfYear > 60) {
    adjustedDay = dayOfYear - 1;
  }

  // Calculate season (0-4)
  const seasonIndex = Math.floor((adjustedDay - 1) / DAYS_IN_SEASON);
  const season = SEASONS[seasonIndex];

  // Calculate day within season (1-73)
  const dayOfSeason = ((adjustedDay - 1) % DAYS_IN_SEASON) + 1;

  // Calculate weekday (0-4)
  const weekdayIndex = (adjustedDay - 1) % 5;
  const weekday = WEEKDAYS[weekdayIndex];

  // Check for Apostle Day (day 5 of each season)
  const apostleDay = dayOfSeason === 5 ? APOSTLE_DAYS[seasonIndex] : undefined;

  return {
    weekday,
    season,
    dayOfSeason,
    yold,
    isStTibsDay: false,
    apostleDay
  };
}

/**
 * Formats a Discordian date as a human-readable string.
 *
 * @param ddate DiscordianDate object
 * @returns Formatted string representation
 */
export function formatDiscordian(ddate: DiscordianDate): string {
  if (ddate.isStTibsDay) {
    return `St. Tib's Day, ${ddate.yold} YOLD`;
  }

  if (ddate.apostleDay) {
    return `${ddate.weekday}, ${ddate.apostleDay}, day ${ddate.dayOfSeason} of ${ddate.season}, ${ddate.yold} YOLD`;
  }

  return `${ddate.weekday}, ${ddate.season} ${ddate.dayOfSeason}, ${ddate.yold} YOLD`;
}

/**
 * Parses a date string and returns a Date object.
 * Supports formats: "YYYY-MM-DD", "MM/DD/YYYY", or numeric day month year
 *
 * @param dateStr Date string to parse
 * @returns Date object or null if invalid
 */
export function parseDate(dateStr: string): Date | null {
  // Try ISO format (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // Try MM/DD/YYYY format
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
}

/**
 * Parses numeric date arguments (day, month, year).
 *
 * @param day Day of month (1-31)
 * @param month Month (1-12)
 * @param year Full year
 * @returns Date object or null if invalid
 */
export function parseDateNumeric(day: number, month: number, year: number): Date | null {
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}
