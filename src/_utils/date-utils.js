const digitRegex = /^[0-9]$/;
const formatSpecifierRegex = /%[dDmMyY%]/g;
const daysInWeek = 7;

export function parseDate(string, format, _default) {
  if (string === '') {
    return null;
  }

  let parts = format.split(formatSpecifierRegex);
  let stringIdx = 0;
  let formatIdx = 0;
  const result = new Date(0);

  for (let part of parts) {
    if (!string.startsWith(part, stringIdx)) {
      return _default;
    }

    stringIdx += part.length;
    if (stringIdx === string.length) {
      break;
    }

    formatIdx += part.length + 1;

    if (format[formatIdx] === '%') {
      if (string[stringIdx++] !== '%') {
        return _default;
      }
    } else {
      let numberLength = 0;
      while (digitRegex.test(string[stringIdx + numberLength])) {
        numberLength++;
      }
      if (numberLength === 0) {
        return _default;
      }

      switch (format[formatIdx]) {
      case 'd':
      case 'D':
        result.setDate(string.substr(stringIdx, numberLength));
        break;
      case 'm':
      case 'M':
        result.setMonth(string.substr(stringIdx, numberLength) - 1);
        break;
      case 'y':
      case 'Y':
        result.setYear(string.substr(stringIdx, numberLength));
        break;
      }
      stringIdx += numberLength;
    }
    formatIdx++;
  }

  if (isNaN(result.valueOf())) {
    return _default;
  }
  return result;
}

export function formatDate(date, format) {
  if (date == null) {
    return null;
  }

  return (
    format
      .replace('%Y', date.getFullYear())
      .replace('%y', date.getYear())
      .replace('%M', (date.getMonth() + 1).toString().padStart(2, '0'))
      .replace('%m', (date.getMonth() + 1))
      .replace('%D', date.getDate().toString().padStart(2, '0'))
      .replace('%d', date.getDate())
      .replace('%%', '%')
  );
}

export function getWeekdays(locale, firstWeekday) {
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const anchor = new Date(0);  // Initially set to the UNIX epoch – Thursday
  const mondayOffset = 5;  // How many days to add to the epoch to get a monday
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
  const dayCursor = new Date(year, month, 1);

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