const numberRegex = /\d+/g;
const formatSpecifierRegex = /%[HMSpPdmyY%]/g;
const daysInWeek = 7;

export type MonthNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Week = [string, string, string, string, string, string, string];
export type Day = {
  value: Date;
  outside: boolean;
  disabled: boolean;
};

/**
 * Parses a string representing a timestamp using the given format into a `Date` object.
 * @param string The date-time string to be parsed
 * @param format The format against which to parse the date-time string
 * @param defaultValue If the string cannot be properly parsed against the format string, this is returned
 * @returns The date object representing the given string
 */
export function parseDateTime(
  string: string,
  format: string,
  defaultValue: Date | null = null
) {
  const century = Math.floor(new Date().getFullYear() / 100);
  let isPM = false;

  if (string === '') {
    return null;
  }

  const parts = format.split(formatSpecifierRegex);
  let stringIdx = 0;
  let formatIdx = 0;
  const result = new Date(0);

  for (const part of parts) {
    if (!string.startsWith(part, stringIdx)) {
      return defaultValue;
    }

    stringIdx += part.length;
    if (stringIdx === string.length) {
      if (formatIdx !== format.length) {
        return defaultValue;
      }
      break;
    }

    if (format[formatIdx + part.length] !== '%') {
      break;
    }

    formatIdx += part.length + 1;

    if (format[formatIdx] === '%') {
      if (string[stringIdx] !== '%') {
        return defaultValue;
      }
      stringIdx++;
    } else if (format[formatIdx].toLowerCase() === 'p') {
      const hourFormat = string
        .substring(stringIdx, stringIdx + 2)
        .toUpperCase();
      if (hourFormat === 'AM') {
        isPM = false;
        if (result.getHours() >= 12) {
          result.setHours(result.getHours() - 12);
        }
      } else if (hourFormat === 'PM') {
        isPM = true;
        if (result.getHours() < 12) {
          result.setHours(result.getHours() + 12);
        }
      } else {
        return defaultValue;
      }
    } else {
      numberRegex.lastIndex = stringIdx;
      const number = numberRegex.exec(string);
      if (number == null) {
        return defaultValue;
      }

      switch (format[formatIdx]) {
        case 'H':
          result.setHours(parseInt(number[0]) + 12 * Number(isPM));
          break;
        case 'M':
          result.setMinutes(+number[0]);
          break;
        case 'S':
          result.setSeconds(+number[0]);
          break;
        case 'd':
          result.setDate(+number[0]);
          break;
        case 'm':
          result.setMonth(+number[0] - 1);
          break;
        case 'y':
          result.setFullYear(century * 100 + parseInt(number[0]));
          break;
        case 'Y':
          result.setFullYear(+number[0]);
          break;
      }
      stringIdx += number[0].length;
    }
    formatIdx++;
  }

  if (isNaN(result.valueOf())) {
    // If the resulting date is invalid
    return defaultValue;
  }
  return result;
}

/**
 * Formats a given `Date` object into a string representation.
 * @param datetime The timestamp to be formatted
 * @param format The format to which the given timestamp will be formatted
 */
export function formatDateTime(datetime: Date | null, format: string) {
  if (datetime == null) {
    return null;
  }

  let hours = datetime.getHours();
  if (/%p/i.test(format)) {
    // If the AM/PM specifier is in the format string
    hours %= 12;
    if (hours === 0) {
      hours = 12;
    }
  }

  return format
    .replace('%Y', datetime.getFullYear().toString())
    .replace('%y', (datetime.getFullYear() % 100).toString().padStart(2, '0'))
    .replace('%m', (datetime.getMonth() + 1).toString().padStart(2, '0'))
    .replace('%d', datetime.getDate().toString().padStart(2, '0'))
    .replace('%H', hours.toString().padStart(2, '0'))
    .replace('%M', datetime.getMinutes().toString().padStart(2, '0'))
    .replace('%S', datetime.getSeconds().toString().padStart(2, '0'))
    .replace('%p', datetime.getHours() < 12 ? 'am' : 'pm')
    .replace('%P', datetime.getHours() < 12 ? 'AM' : 'PM')
    .replace('%%', '%');
}

/**
 * Generates an array with the names of the days of the week for the given locale.
 * @param locale The locale(s) in which the day names should be output. Pass an empty array to use the default locale. Read more on the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)
 * @param firstWeekday First day of the week. 1 = Monday.
 */
export function getWeekdays(
  locale: string | string[] | undefined,
  firstWeekday: Weekday
): Week {
  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  });
  const anchor = new Date(1970, 0, 1); // Initially set to the UNIX epoch – Thursday
  const mondayOffset = 5; // How many days to add to the epoch to get a Monday
  const weekdays: string[] = [];
  for (let i = 0; i < daysInWeek; ++i) {
    anchor.setDate(mondayOffset + firstWeekday - 1 + i);
    weekdays.push(weekdayFormatter.format(anchor));
  }

  return weekdays as Week;
}

/**
 * Check if the given object is a date.
 * @param date The object to check
 * @returns `true` if the given object is a valid `Date`, `false` otherwise
 */
export function isDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.valueOf());
}

/**
 * Check for equality between 2 `Date` objects, disregarding the time.
 */
export function datesEqual(date1: Date | null, date2: Date | null) {
  if (date1 == null || date2 == null) {
    return false;
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check for equality between 2 `Date` objects, including the time (hours, minutes, and seconds only).
 */
export function dateTimesEqual(dt1: Date | null, dt2: Date | null) {
  if (dt1 == null || dt2 == null) {
    return false;
  }
  return (
    datesEqual(dt1, dt2) &&
    dt1.getHours() === dt2.getHours() &&
    dt1.getMinutes() === dt2.getMinutes() &&
    dt1.getSeconds() === dt2.getSeconds()
  );
}

/**
 * Checks if the date of the first `Date` object came before the date of the second (disregards time).
 */
export function datesLessEqual(date1: Date | null, date2: Date | null) {
  if (date1 == null || date2 == null) {
    return false;
  }

  return (
    new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) <=
    new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  );
}

type DateRange = { start?: Date; end?: Date };
/**
 * Checks if the date is included in the given array of dates or ranges.
 * @param date The date object whose inclusion is to be checked
 * @param dateRanges The set of dates
 */
export function dateIncluded(date: Date, dateRanges: Array<Date | DateRange>) {
  return dateRanges.some(dateOrRange => {
    if (isDate(dateOrRange)) {
      return datesEqual(dateOrRange, date);
    }

    return (
      (dateOrRange.start == null || datesLessEqual(dateOrRange.start, date)) &&
      (dateOrRange.end == null || datesLessEqual(date, dateOrRange.end))
    );
  });
}

/**
 * Generates a calendar view of a given month.
 * @param month Zero-based numeric value for month. 0 = January
 * @param firstWeekday First day of the week. 1 = Monday
 */
export function getCalendar(
  month: MonthNumber,
  year: number,
  firstWeekday: Weekday,
  disabledDates: Array<Date | DateRange> = []
) {
  const calendar: Day[][] = [];
  const dayCursor = new Date(year, month, 1);

  // Offset the start of the month to the closest left `firstWeekday`
  dayCursor.setDate(
    1 - ((daysInWeek + dayCursor.getDay() - firstWeekday) % daysInWeek)
  );

  do {
    const week: Day[] = [];
    for (let i = 0; i < daysInWeek; ++i) {
      week.push({
        value: new Date(dayCursor.valueOf()),
        outside: dayCursor.getMonth() !== month,
        disabled: dateIncluded(dayCursor, disabledDates),
      });
      dayCursor.setDate(dayCursor.getDate() + 1);
    }
    calendar.push(week);
  } while (dayCursor.getMonth() === month);

  return calendar;
}

/**
 * Copies the date (day, month, and year) from the first `Date` object to the second.
 * @param source The object to copy the date from
 * @param destination The object to which the date will be copied, modified in-place
 * @returns The modified object
 */
export function applyDate(source: Date, destination: Date): Date;
export function applyDate(source: null, destination: Date | null): null;
export function applyDate(
  source: Date | null,
  destination: Date | null
): Date | null;
export function applyDate(source: Date | null, destination: Date | null) {
  if (source == null || destination == null) {
    return source;
  }
  destination.setFullYear(
    source.getFullYear(),
    source.getMonth(),
    source.getDate()
  );
  return destination;
}

/**
 * Copies the time (hour, minute, and second) from the first `Date` object to the second.
 * @param source The object to copy the time from
 * @param destination The object to which the time will be copied, modified in-place
 * @returns The modified object
 */
export function applyTime(source: Date, destination: Date): Date;
export function applyTime(source: null, destination: Date | null): null;
export function applyTime(
  source: Date | null,
  destination: Date | null
): Date | null;
export function applyTime(source: Date | null, destination: Date | null) {
  if (source == null || destination == null) {
    return source;
  }
  destination.setHours(
    source.getHours(),
    source.getMinutes(),
    source.getSeconds()
  );
  return destination;
}

/**
 * Copy a Date object, respecting null values.
 * @param date The object from which a copy should be made
 * @returns The clone of the given object
 */
export function copyDate(date: null): null;
export function copyDate(date: Date): Date;
export function copyDate(date: Date | null): Date | null;
export function copyDate(date: Date | null) {
  if (date == null) {
    return null;
  }
  return new Date(date.valueOf());
}
