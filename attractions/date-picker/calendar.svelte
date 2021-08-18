<script>
  /**
   * @event {Date} day-select
   */
  import Button from '../button/button.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import {
    getWeekdays,
    datesEqual,
    datesLessEqual,
    getCalendar,
  } from '../utils/datetime-utils.js';

  /**
   * A class string to add to the list of weekdays above the calendar.
   * @type {string | false | null}
   */
  export let weekdaysClass = null;
  /**
   * A class string to add to the element containing each row of days in the calendar.
   * @type {string | false | null}
   */
  export let weekClass = null;
  /**
   * A class string to add to each day in the calendar.
   * @type {string | false | null}
   */
  export let dayClass = null;

  /**
   * The language tag defining the desired locale (e.g., `en-US`). If left `undefined`, the user's locale will be used.
   * This will affect the weekdays and the day number representations.
   * @type {string | undefined}
   */
  export let locale = undefined;
  /**
   * The index of the weekday to start the week at.
   * 0 is for Sunday and 6 is for Saturday.
   * Defaults to 1 (Monday).
   * @type {0 | 1 | 2 | 3 | 4 | 5 | 6}
   */
  export let firstWeekday = 1; // 1 corresponds to Monday
  /**
   * An index of the desired month.
   * 0 is for January, 11 is for December.
   * @type {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11}
   */
  export let month;
  /**
   * The desired year.
   * @type {number}
   */
  export let year;
  /**
   * If a selection should be displayed, this should be a `Date` object signifying the start of the selection (can be outside the shown days).
   * @type {Date | null}
   */
  export let selectionStart = null;
  /**
   * If a selection should be displayed, this should be a `Date` object signifying the end of the selection (can be outside the shown days).
   * @type {Date | null}
   */
  export let selectionEnd = null;
  /**
   * A set of dates to disable.
   * @type {Array<Date | { start?: Date; end?: Date }>}
   */
  export let disabledDates = [];

  const weekdays = getWeekdays(locale, firstWeekday);
  const today = new Date();

  function computeTitle(day) {
    if (datesEqual(day.value, today)) {
      if (day.disabled) {
        return 'Today, not available';
      } else {
        return 'Today';
      }
    }

    if (day.disabled) {
      return 'Not available';
    }

    return null;
  }

  const dayNumberFormatter = Intl.DateTimeFormat(locale, { day: 'numeric' });
  const dispatch = createEventDispatcher();
</script>

<div class={classes('weekdays', weekdaysClass)}>
  {#each weekdays as dayName (dayName)}
    <span class="weekday">{dayName}</span>
  {/each}
</div>
{#each getCalendar(month, year, firstWeekday, disabledDates) as week}
  <div class={classes('week', weekClass)}>
    <!--
      The following .day elements may have one of the classes:
      * .disabled: day is not available for selection
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
        class:selected={datesEqual(day.value, selectionStart) ||
          datesEqual(day.value, selectionEnd)}
        class:start={datesEqual(day.value, selectionStart)}
        class:end={datesEqual(day.value, selectionEnd)}
        class:in-range={datesLessEqual(selectionStart, day.value) &&
          datesLessEqual(day.value, selectionEnd)}
        class:disabled={day.disabled}
      >
        <Button
          title={computeTitle(day)}
          on:click={e => {
            e.detail.nativeEvent.stopPropagation();
            dispatch('day-select', day.value);
          }}
          disabled={day.disabled}
        >
          {dayNumberFormatter.format(day.value)}
        </Button>
      </div>
    {/each}
  </div>
{/each}

<style src="./calendar.scss">
</style>
