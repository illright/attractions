<script lang="ts">
  import Button from '../button/button.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import {
    getWeekdays,
    datesEqual,
    datesLessEqual,
    getCalendar,
    type Day,
    type MonthNumber,
    type Weekday,
  } from '../utils/datetime-utils.js';

  /**
   * A class string to add to the list of weekdays above the calendar.
   */
  export let weekdaysClass: string | false | null = null;
  /**
   * A class string to add to the element containing each row of days in the calendar.
   */
  export let weekClass: string | false | null = null;
  /**
   * A class string to add to each day in the calendar.
   */
  export let dayClass: string | false | null = null;

  /**
   * The language tag defining the desired locale (e.g., `en-US`). If left `undefined`, the user's locale will be used.
   * This will affect the weekdays and the day number representations.
   */
  export let locale: string | undefined = undefined;
  /**
   * The index of the weekday to start the week at.
   * 0 is for Sunday and 6 is for Saturday.
   * Defaults to 1 (Monday).
   */
  export let firstWeekday: Weekday = 1; // 1 corresponds to Monday
  /**
   * An index of the desired month.
   * 0 is for January, 11 is for December.
   */
  export let month: MonthNumber;
  /**
   * The desired year.
   */
  export let year: number;
  /**
   * If a selection should be displayed, this should be a `Date` object signifying the start of the selection (can be outside the shown days).
   */
  export let selectionStart: Date | null = null;
  /**
   * If a selection should be displayed, this should be a `Date` object signifying the end of the selection (can be outside the shown days).
   */
  export let selectionEnd: Date | null = null;
  /**
   * A set of dates to disable.
   */
  export let disabledDates: Array<Date | { start?: Date; end?: Date }> = [];
  /**
   * Messages translation for "today not available".
   */
  export let titleTodayNotAvailableMessage = 'Today, not available';
  /**
   * Messages translation for "today".
   */
  export let titleTodayMessage = 'Today';
  /**
   * Messages translation for "not available".
   */
  export let titleNotAvailableMessage = 'Not available';

  const weekdays = getWeekdays(locale, firstWeekday);
  const today = new Date();

  function computeTitle(day: Day) {
    if (datesEqual(day.value, today)) {
      if (day.disabled) {
        return titleTodayNotAvailableMessage;
      } else {
        return titleTodayMessage;
      }
    }

    if (day.disabled) {
      return titleNotAvailableMessage;
    }

    return null;
  }

  const dayNumberFormatter = Intl.DateTimeFormat(locale, { day: 'numeric' });
  const dispatch = createEventDispatcher<{ 'day-select': Date }>();
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
