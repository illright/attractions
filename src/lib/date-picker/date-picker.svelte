<script lang="ts" context="module">
  type DateRange = { start: Date | null; end: Date | null };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import Button from '../button/button.svelte';
  import TextField from '../text-field/text-field.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import {
    HorizontalAlignment,
    VerticalAlignment,
  } from '../dropdown/dropdown-alignment';
  import DropdownShell from '../dropdown/dropdown-shell.svelte';
  import ChevronLeft from './chevron-left.svelte';
  import ChevronRight from './chevron-right.svelte';
  import Calendar from './calendar.svelte';
  import {
    applyDate,
    copyDate,
    datesEqual,
    formatDateTime,
    parseDateTime,
  } from '../utils/datetime-utils.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to add to the list of weekdays above the calendar.
   */
  export let weekdaysClass: string | false | null = null;
  /**
   * A class string to add to each element containing a row of days in the calendar.
   */
  export let weekClass: string | false | null = null;
  /**
   * A class string to add to each day in the calendar.
   */
  export let dayClass: string | false | null = null;
  /**
   * A class string to pass down to the `TextField`(s).
   */
  export let inputClass: string | false | null = null;

  /**
   * If this is set to `true`, the date picker will have two fields – for the start and the end of the date range.
   */
  export let range = false;
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
  export let firstWeekday: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1; // 1 corresponds to Monday
  /**
   * Whether to hide the calendar dropdown and only keep the text input.
   */
  export let noCalendar = false;
  /**
   * Whether to show the calendar dropdown above or below the text field.
   */
  export let top = false;
  /**
   * Whether to align the calendar dropdown to the right or the left side of the text field.
   */
  export let right = false;
  /**
   * Depending on the value of the range prop, this is either a `Date` object or an object with two fields, `start` and `end`, containing Date objects.
   */
  export let value: Date | DateRange | null = null;
  /**
   * A set of dates to disable.
   */
  export let disabledDates: Array<Date | { start?: Date; end?: Date }> = [];
  /**
   * If `true`, the dropdown will be automatically closed after a date is selected.
   */
  export let closeOnSelection = false;
  /**
   * The format string for the text input and representation. The `%`-specifiers are a subset of [C date format specifiers](http://www.cplusplus.com/reference/ctime/strftime/), with only `%d`, `%m`, `%y` and `%Y` allowed.
   */
  export let format = '%d.%m.%Y';
  $: readableFormat = format
    .replace('%d', 'dd')
    .replace('%m', 'mm')
    .replace('%y', 'yy')
    .replace('%Y', 'yyyy')
    .replace('%%', '%');

  let startFocus = false;
  let endFocus = false;
  let startValue: Date | null;
  let endValue: Date | null;

  $: unpackValue(value);
  $: registerChange(startValue, endValue);

  let shownCalendar =
    (range && value != null ? (value as DateRange).start : (value as Date)) ||
    new Date();

  function unpackValue(value: Date | DateRange | null) {
    startValue = copyDate(
      range ? value && (value as DateRange).start : (value as Date | null)
    );
    endValue = copyDate(range ? value && (value as DateRange).end : null);
  }

  function clearFocus(e?: CustomEvent<{ value: boolean }>) {
    const open = e?.detail;
    if (!open?.value) {
      startFocus = false;
      endFocus = false;
    }
  }

  function select({ detail: date }: CustomEvent<Date>) {
    if (startFocus) {
      startValue = applyDate(date, startValue);
      if (range && endValue == null) {
        startFocus = false;
        endFocus = true;
      }
    } else {
      endValue = applyDate(date, endValue);
      if (range && startValue == null) {
        endFocus = false;
        startFocus = true;
      }
    }

    if (
      closeOnSelection &&
      startValue != null &&
      (!range || endValue != null)
    ) {
      startFocus = endFocus = false;
    }

    range && fixRange();
    shiftShownCalendar(date);
  }

  function fixRange() {
    if (startValue != null && endValue != null && startValue > endValue) {
      const temp = startValue;
      startValue = endValue;
      endValue = temp;
    }
  }

  function shiftShownCalendar(date: Date | null) {
    if (date == null) {
      return;
    }

    shownCalendar.setFullYear(date.getFullYear());
    shownCalendar.setMonth(date.getMonth());
    shownCalendar = shownCalendar;
  }

  function registerChange(start: Date | null, end: Date | null) {
    if (value == null) {
      if (start == null && end == null) {
        return;
      }
    } else {
      if (range) {
        const dateRange = value as DateRange;
        if (
          datesEqual(start, dateRange.start) &&
          datesEqual(end, dateRange.end)
        ) {
          return;
        }
      } else {
        if (datesEqual(start, value as Date)) {
          return;
        }
      }
    }

    value = range
      ? { start: copyDate(start), end: copyDate(end) }
      : copyDate(start);
    if (value == null) return;
    if (!range || (start != null && end != null)) {
      dispatch('change', { value });
    }
  }

  function showPrevMonth() {
    shownCalendar.setMonth(shownCalendar.getMonth() - 1);
    shownCalendar = shownCalendar;
  }

  function showNextMonth() {
    shownCalendar.setMonth(shownCalendar.getMonth() + 1);
    shownCalendar = shownCalendar;
  }

  const headerFormatter = Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  });
  const dispatch = createEventDispatcher<{
    change: { value: Date | DateRange };
  }>();
</script>

<div class={classes('date-picker', _class)}>
  <DropdownShell open={startFocus || endFocus} on:change={clearFocus}>
    <div class="handle">
      <TextField
        placeholder={readableFormat}
        value={formatDateTime(startValue, format) || undefined}
        on:focus={() => {
          startFocus = true;
          endFocus = false;
        }}
        class={classes(startFocus && 'in-focus')}
        {inputClass}
        on:change={({ detail }) => {
          startValue = applyDate(
            parseDateTime(detail.value.toString(), format, startValue),
            startValue
          );
          fixRange();
          shiftShownCalendar(startValue);
        }}
      />
      {#if range}
        <slot name="between-inputs"><span>to</span></slot>
        <TextField
          placeholder={readableFormat}
          value={formatDateTime(endValue, format) || undefined}
          on:focus={() => {
            startFocus = false;
            endFocus = true;
          }}
          class={classes(endFocus && 'in-focus')}
          {inputClass}
          on:change={({ detail }) => {
            endValue = applyDate(
              parseDateTime(detail.value.toString(), format, endValue),
              endValue
            );
            fixRange();
            shiftShownCalendar(endValue);
          }}
        />
      {/if}
    </div>
    {#if !noCalendar}
      <Dropdown
        class="calendar"
        verticalAlignment={top
          ? VerticalAlignment.AUTO_TOP
          : VerticalAlignment.AUTO_BOTTOM}
        horizontalAlignment={right
          ? HorizontalAlignment.AUTO_END
          : HorizontalAlignment.AUTO_START}
      >
        <div class="shown-on-focus">
          <Button noRipple on:click={() => clearFocus()}>
            close the date picker
          </Button>
        </div>
        <div class="month-header">
          <Button round small on:click={showPrevMonth} title="Previous month">
            <slot name="chevron-left">
              <ChevronLeft />
            </slot>
          </Button>
          <div class="month-display">
            {headerFormatter.format(shownCalendar)}
          </div>
          <Button round small on:click={showNextMonth} title="Next month">
            <slot name="chevron-right">
              <ChevronRight />
            </slot>
          </Button>
        </div>
        <Calendar
          {locale}
          {firstWeekday}
          month={shownCalendar.getMonth()}
          year={shownCalendar.getFullYear()}
          selectionStart={startValue}
          selectionEnd={endValue}
          {disabledDates}
          {weekdaysClass}
          {weekClass}
          {dayClass}
          on:day-select={select}
        />
      </Dropdown>
    {/if}
  </DropdownShell>
</div>

<style src="./date-picker.scss">
</style>
