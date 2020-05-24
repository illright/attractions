<script>
  import Button from '../button/button.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';
  import {
    getWeekdays,
    datesEqual,
    datesLessEqual,
    getCalendar,
  } from '../_utils/datetime-utils.js';

  export let weekdaysClass = null;
  export let weekClass = null;
  export let dayClass = null;

  export let locale = undefined;
  export let firstWeekday = 1;  // 1 corresponds to Monday
  export let month;
  export let year;
  export let selectionStart = null;
  export let selectionEnd = null;

  const weekdays = getWeekdays(locale, firstWeekday);
  const today = new Date();

  const dayNumberFormatter = Intl.DateTimeFormat(locale, { day: 'numeric' });
  const dispatch = createEventDispatcher();
</script>

<div class={classes('weekdays', weekdaysClass)}>
  {#each weekdays as dayName (dayName)}
    <span class="weekday">{dayName}</span>
  {/each}
</div>
{#each getCalendar(month, year, firstWeekday) as week}
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
        <Button
          title={datesEqual(day.value, today) && 'Today' || null}
          on:click={(e) => { e.stopPropagation(); dispatch('day-select', day.value); }}
        >
          {dayNumberFormatter.format(day.value)}
        </Button>
      </div>
    {/each}
  </div>
{/each}

<style src="./calendar.scss"></style>
