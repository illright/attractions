const numberRegex = /\d+/g;
const formatSpecifierRegex = /%[HMSpPdmyY%]/g;
const daysInWeek = 7;

export function parseDateTime(string, format, defaultValue) {
  const century = Math.floor((new Date()).getFullYear() / 100);
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
        result.setHours(parseInt(number[0]) + 12 * isPM);
        break;
      case 'M':
        result.setMinutes(number[0]);
        break;
      case 'S':
        result.setSeconds(number[0]);
        break;
      case 'd':
        result.setDate(number[0]);
        break;
      case 'm':
        result.setMonth(number[0] - 1);
        break;
      case 'y':
        result.setFullYear(century * 100 + parseInt(number[0]));
        break;
      case 'Y':
        result.setFullYear(number[0]);
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

export function formatDateTime(datetime, format) {
  if (datetime == null) {
    return null;
  }

  let hours = datetime.getHours();
  if ((/%p/i).test(format)) {
    // If the AM/PM specifier is in the format string
    hours %= 12;
  }

  return (
    format
      .replace('%Y', datetime.getFullYear())
      .replace('%y', (datetime.getFullYear() % 100).toString().padStart(2, '0'))
      .replace('%m', (datetime.getMonth() + 1).toString().padStart(2, '0'))
      .replace('%d', datetime.getDate().toString().padStart(2, '0'))
      .replace('%H', hours.toString().padStart(2, '0'))
      .replace('%M', datetime.getMinutes().toString().padStart(2, '0'))
      .replace('%S', datetime.getSeconds().toString().padStart(2, '0'))
      .replace('%p', datetime.getHours() < 12 ? 'am' : 'pm')
      .replace('%P', datetime.getHours() < 12 ? 'AM' : 'PM')
      .replace('%%', '%')
  );
}

export function getWeekdays(locale, firstWeekday) {
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const anchor = new Date(0);  // Initially set to the UNIX epoch – Thursday
  const mondayOffset = 5;  // How many days to add to the epoch to get a Monday
  const weekdays = [];
  for (let i = 0; i < daysInWeek; ++i) {
    anchor.setDate(mondayOffset + firstWeekday - 1 + i);
    weekdays.push(weekdayFormatter.format(anchor));
  }

  return weekdays;
}

export function datesEqual(date1, date2) {
  if (date1 == null || date2 == null) {
    return false;
  }

  return (
    date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate()
  );
}

export function dateTimesEqual(dt1, dt2) {
  return (
    datesEqual(dt1, dt2)
    && dt1.getHours() === dt2.getHours()
    && dt1.getMinutes() === dt2.getMinutes()
    && dt1.getSeconds() === dt2.getSeconds()
  );
}

export function datesLessEqual(date1, date2) {
  if (date1 == null || date2 == null) {
    return false;
  }

  return (
    new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
    <= new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  );
}

export function getCalendar(month, year, firstWeekday) {
  const calendar = [];
  const dayCursor = new Date(0);
  dayCursor.setFullYear(year, month);

  // Offset the start of the month to the closest left `firstWeekday`
  dayCursor.setDate(1 - (daysInWeek + dayCursor.getDay() - firstWeekday) % daysInWeek);

  do {
    let week = [];
    for (let i = 0; i < daysInWeek; ++i) {
      week.push({
        value: new Date(dayCursor.valueOf()),
        outside: dayCursor.getMonth() !== month,
      });
      dayCursor.setDate(dayCursor.getDate() + 1);
    }
    calendar.push(week);
  } while (dayCursor.getMonth() === month);

  return calendar;
}

export function applyDate(source, destination) {
  if (destination == null) {
    return source;
  }
  destination.setFullYear(source.getFullYear(), source.getMonth(), source.getDate());
  return destination;
}

export function applyTime(source, destination) {
  if (destination == null) {
    return source;
  }
  destination.setHours(source.getHours(), source.getMinutes(), source.getSeconds());
  return destination;
}
