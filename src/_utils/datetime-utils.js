const digitRegex = /^[0-9]$/;
const formatSpecifierRegex = /%[HMdmyY%]/g;
const daysInWeek = 7;

export function parseDateTime(string, format, _default) {
  const century = Math.floor((new Date()).getFullYear() / 100);

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
      case 'H':
        result.setHours(string.substr(stringIdx, numberLength));
        break;
      case 'M':
        result.setMinutes(string.substr(stringIdx, numberLength));
        break;
      case 'd':
        result.setDate(string.substr(stringIdx, numberLength));
        break;
      case 'm':
        result.setMonth(string.substr(stringIdx, numberLength) - 1);
        break;
      case 'y':
        result.setFullYear(century * 100 + +string.substr(stringIdx, numberLength));
        break;
      case 'Y':
        result.setFullYear(string.substr(stringIdx, numberLength));
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

export function formatDateTime(datetime, format) {
  if (datetime == null) {
    return null;
  }

  return (
    format
      .replace('%Y', datetime.getFullYear())
      .replace('%y', (datetime.getFullYear() % 100).toString().padStart(2, '0'))
      .replace('%m', (datetime.getMonth() + 1).toString().padStart(2, '0'))
      .replace('%d', datetime.getDate().toString().padStart(2, '0'))
      .replace('%H', datetime.getHours().toString().padStart(2, '0'))
      .replace('%M', datetime.getMinutes().toString().padStart(2, '0'))
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
