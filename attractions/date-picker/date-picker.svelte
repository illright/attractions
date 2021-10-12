<script>
  /**
   * @typedef {{ start: Date; end: Date }} DateRange
   * @event {{ value: Date | DateRange }} change
   */
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import Button from '../button/button.svelte';
  import TextField from '../text-field/text-field.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
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

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the list of weekdays above the calendar.
   * @type {string | false | null}
   */
  export let weekdaysClass = null;
  /**
   * A class string to add to each element containing a row of days in the calendar.
   * @type {string | false | null}
   */
  export let weekClass = null;
  /**
   * A class string to add to each day in the calendar.
   * @type {string | false | null}
   */
  export let dayClass = null;
  /**
   * A class string to pass down to the `TextField`(s).
   * @type {string | false | null}
   */
  export let inputClass = null;

  /**
   * If this is set to `true`, the date picker will have two fields – for the start and the end of the date range.
   * @type {boolean}
   */
  export let range = false;
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
   * Whether to hide the calendar dropdown and only keep the text input.
   * @type {boolean}
   */
  export let noCalendar = false;
  /**
   * Whether to show the calendar dropdown above or below the text field.
   * @type {boolean}
   */
  export let top = false;
  /**
   * Whether to align the calendar dropdown to the right or the left side of the text field.
   * @type {boolean}
   */
  export let right = false;
  /**
   * Depending on the value of the range prop, this is either a `Date` object or an object with two fields, `start` and `end`, containing Date objects.
   * @type {Date | DateRange | null}
   */
  export let value = null;
  /**
   * A set of dates to disable.
   * @type {Array<Date | { start?: Date; end?: Date }>}
   */
  export let disabledDates = [];
  /**
   * If `true`, the dropdown will be automatically closed after a date is selected.
   * @type {boolean}
   */
  export let closeOnSelection = false;
  /**
   * The format string for the text input and representation. The `%`-specifiers are a subset of [C date format specifiers](http://www.cplusplus.com/reference/ctime/strftime/), with only `%d`, `%m`, `%y` and `%Y` allowed.
   * @type {string}
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
  let startValue;
  let endValue;

  $: unpackValue(value);
  $: registerChange(startValue, endValue);

  let shownCalendar =
    (range && value != null ? value.start : value) || new Date();

  function unpackValue(value) {
    startValue = copyDate(range ? value && value.start : value);
    endValue = copyDate(range ? value && value.end : null);
  }

  function clearFocus({ detail: open }) {
    if (!open.value) {
      startFocus = false;
      endFocus = false;
    }
  }

  function select({ detail: date }) {
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

  function shiftShownCalendar(date) {
    if (date == null) {
      return;
    }

    shownCalendar.setFullYear(date.getFullYear());
    shownCalendar.setMonth(date.getMonth());
    shownCalendar = shownCalendar;
  }

  function registerChange(start, end) {
    if (value == null) {
      if (start == null && end == null) {
        return;
      }
    } else {
      if (range) {
        if (datesEqual(start, value.start) && datesEqual(end, value.end)) {
          return;
        }
      } else {
        if (datesEqual(start, value)) {
          return;
        }
      }
    }

    value = range
      ? { start: copyDate(start), end: copyDate(end) }
      : copyDate(start);
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
  const dispatch = createEventDispatcher();
</script>

<div class={classes('date-picker', _class)}>
  <DropdownShell open={startFocus || endFocus} on:change={clearFocus}>
    <div class="handle">
      <TextField
        placeholder={readableFormat}
        value={formatDateTime(startValue, format)}
        on:focus={() => {
          startFocus = true;
          endFocus = false;
        }}
        class={classes(startFocus && 'in-focus')}
        {inputClass}
        on:change={({ detail }) => {
          startValue = applyDate(
            parseDateTime(detail.value, format, startValue),
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
          value={formatDateTime(endValue, format)}
          on:focus={() => {
            startFocus = false;
            endFocus = true;
          }}
          class={classes(endFocus && 'in-focus')}
          {inputClass}
          on:change={({ detail }) => {
            endValue = applyDate(
              parseDateTime(detail.value, format, endValue),
              endValue
            );
            fixRange();
            shiftShownCalendar(endValue);
          }}
        />
      {/if}
    </div>
    {#if !noCalendar}
      <Dropdown class="calendar" {top} {right}>
        <div class="shown-on-focus">
          <Button noRipple on:click={clearFocus}>close the date picker</Button>
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
