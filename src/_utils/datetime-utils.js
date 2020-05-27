const numberRegex = /\d+/g;
const formatSpecifierRegex = /%[HMdmyYpP%]/g;
const daysInWeek = 7;

export function parseDateTime(string, format, defaultValue) {
  const century = Math.floor((new Date()).getUTCFullYear() / 100);
  let isPM = false;

  if (string === '') {
    return null;
  }

  let parts = format.split(formatSpecifierRegex);
  let stringIdx = 0;
  let formatIdx = 0;
  const result = new Date(0);

  for (let part of parts) {
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
      const hourFormat = string.substr(stringIdx, 2).toUpperCase();
      if (hourFormat === 'AM') {
        isPM = false;
        if (result.getUTCHours() >= 12) {
          result.setUTCHours(result.getUTCHours() - 12);
        }
      } else if (hourFormat === 'PM') {
        isPM = true;
        if (result.getUTCHours() < 12) {
          result.setUTCHours(result.getUTCHours() + 12);
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
        result.setUTCHours(parseInt(number[0]) + 12 * isPM);
        break;
      case 'M':
        result.setUTCMinutes(number[0]);
        break;
      case 'd':
        result.setUTCDate(number[0]);
        break;
      case 'm':
        result.setUTCMonth(number[0] - 1);
        break;
      case 'y':
        result.setUTCFullYear(century * 100 + parseInt(number[0]));
        break;
      case 'Y':
        result.setUTCFullYear(number[0]);
        break;
      }
      stringIdx += number[0].length;
    }
    formatIdx++;
  }

  if (isNaN(result.valueOf())) {
    return defaultValue;
  }
  return result;
}

export function formatDateTime(datetime, format) {
  if (datetime == null) {
    return null;
  }

  const hours = ((/%p/i).test(format) ? datetime.getUTCHours() % 12 : datetime.getUTCHours());

  return (
    format
      .replace('%Y', datetime.getUTCFullYear())
      .replace('%y', (datetime.getUTCFullYear() % 100).toString().padStart(2, '0'))
      .replace('%m', (datetime.getUTCMonth() + 1).toString().padStart(2, '0'))
      .replace('%d', datetime.getUTCDate().toString().padStart(2, '0'))
      .replace('%H', hours.toString().padStart(2, '0'))
      .replace('%M', datetime.getUTCMinutes().toString().padStart(2, '0'))
      .replace('%p', datetime.getUTCHours() < 12 ? 'am' : 'pm')
      .replace('%P', datetime.getUTCHours() < 12 ? 'AM' : 'PM')
      .replace('%%', '%')
  );
}

export function getWeekdays(locale, firstWeekday) {
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const anchor = new Date(0);  // Initially set to the UNIX epoch – Thursday
  const mondayOffset = 5;  // How many days to add to the epoch to get a Monday
  const weekdays = [];
  for (let i = 0; i < daysInWeek; ++i) {
    anchor.setUTCDate(mondayOffset + firstWeekday - 1 + i);
    weekdays.push(weekdayFormatter.format(anchor));
  }

  return weekdays;
}

export function datesEqual(date1, date2) {
  if (date1 == null || date2 == null) {
    return false;
  }

  return (
    date1.getUTCFullYear() === date2.getUTCFullYear()
    && date1.getUTCMonth() === date2.getUTCMonth()
    && date1.getUTCDate() === date2.getUTCDate()
  );
}

export function dateTimesEqual(dt1, dt2) {
  return (
    datesEqual(dt1, dt2)
    && dt1.getUTCHours() === dt2.getUTCHours()
    && dt1.getUTCMinutes() === dt2.getUTCMinutes()
  );
}

export function datesLessEqual(date1, date2) {
  if (date1 == null || date2 == null) {
    return false;
  }

  return (
    new Date(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate())
    <= new Date(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate())
  );
}

export function getCalendar(month, year, firstWeekday) {
  const calendar = [];
  const dayCursor = new Date(0);
  dayCursor.setUTCFullYear(year, month);

  // Offset the start of the month to the closest left `firstWeekday`
  dayCursor.setUTCDate(1 - (daysInWeek + dayCursor.getUTCDay() - firstWeekday) % daysInWeek);

  do {
    let week = [];
    for (let i = 0; i < daysInWeek; ++i) {
      week.push({
        value: new Date(dayCursor.valueOf()),
        outside: dayCursor.getUTCMonth() !== month,
      });
      dayCursor.setUTCDate(dayCursor.getUTCDate() + 1);
    }
    calendar.push(week);
  } while (dayCursor.getUTCMonth() === month);

  return calendar;
}
