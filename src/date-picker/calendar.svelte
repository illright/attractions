<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';
  import Button from '../button/button.svelte';

  export let weekdaysClass = null;
  export let weekClass = null;
  export let dayClass = null;

  export let locale = undefined;
  export let firstWeekday = 1;  // 1 corresponds to Monday
  export let month;
  export let year;
  export let selectionStart = null;
  export let selectionEnd = null;

  const weekdays = getWeekdays();
  const today = new Date();
  const daysInWeek = 7;

  function getWeekdays() {
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

  function datesEqual(date1, date2) {
    if (date1 == null || date2 == null) {
      return false;
    }

    return (
      date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate()
    );
  }

  function datesLessEqual(date1, date2) {
    if (date1 == null || date2 == null) {
      return false;
    }

    return (
      new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
      <= new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
    );
  }

  function getCalendar(month, year) {
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

  const dayNumberFormatter = Intl.DateTimeFormat(locale, { day: 'numeric' });
  const dispatch = createEventDispatcher();
</script>

<div>
  <div class={classes('weekdays', weekdaysClass)}>
    {#each weekdays as dayName (dayName)}
      <span class="weekday">{dayName}</span>
    {/each}
  </div>
  {#each getCalendar(month, year) as week}
    <div class={classes('week', weekClass)}>
      <!--
        The following .day elements may have one of the classes:
        * .in-range: day is in range for range pickers
        * .selected: day is selected or is a range boundary
        * .outside:  day is not in this month
        * .today:    day is today
        * .start:    day is the beginning of a range
        * .end:      day is the end of a range
      -->
      {#each week as day}
        <div
          class={classes('day', dayClass)}
          class:today={datesEqual(day.value, today)}
          class:outside={day.outside}
          class:selected={
            datesEqual(day.value, selectionStart) || datesEqual(day.value, selectionEnd)
          }
          class:start={datesEqual(day.value, selectionStart)}
          class:end={datesEqual(day.value, selectionEnd)}
          class:in-range={
            datesLessEqual(selectionStart, day.value)
            && datesLessEqual(day.value, selectionEnd)
          }
        >
          <Button on:click={(e) => { e.stopPropagation(); dispatch('day-select', day.value); }}>
            {dayNumberFormatter.format(day.value)}
          </Button>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style src="./calendar.scss"></style>
