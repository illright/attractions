<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';
  import Button from '../button/button.svelte';
  import TextField from '../text-field/text-field.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import DropdownShell from '../dropdown/dropdown-shell.svelte';
  import ChevronLeft from './chevron-left.svelte';
  import ChevronRight from './chevron-right.svelte';
  import Calendar from './calendar.svelte';
  import { parseDate, formatDate } from '../_utils/date-utils.js';

  let _class = null;
  export { _class as class };
  export let monthHeaderClass = null;
  export let weekdaysClass = null;
  export let weekClass = null;
  export let dayClass = null;

  export let range = false;
  export let locale = undefined;
  export let firstWeekday = 1;  // 1 corresponds to Monday
  export let top = false;
  export let right = false;
  export let value = null;
  export let format = '%D.%M.%Y';
  $: readableFormat = (
    format
      .replace('%d', 'd')
      .replace('%D', 'dd')
      .replace('%m', 'm')
      .replace('%M', 'mm')
      .replace('%y', 'yy')
      .replace('%Y', 'yyyy')
      .replace('%%', '%')
  );

  let datePicker = null;
  let startFocus = false;
  let endFocus = false;
  let startValue;
  let endValue;

  $: editedValue = (startFocus ? startValue : endValue);
  $: unpackValue(value);
  $: registerChange(startValue, endValue);

  let shownCalendar = new Date();

  function unpackValue(value) {
    startValue = (range ? value && value.start : value);
    endValue = (range ? value && value.end : null);
  }

  function clearFocus({ detail: open }) {
    if (!open) {
      startFocus = false;
      endFocus = false;
    }
  }

  function select({ detail: date }) {
    if (startFocus) {
      startValue = date;
      if (range && endValue == null) {
        startFocus = false;
        endFocus = true;
      }
    } else {
      endValue = date;
      if (range && startValue == null) {
        endFocus = false;
        startFocus = true;
      }
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
        if (start === value.start && end === value.end) {
          return;
        }
      } else {
        if (start === value) {
          return;
        }
      }
    }

    value = range ? { start, end } : start;
    if (!range || start != null && end != null) {
      dispatch('change', value);
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

  const headerFormatter = Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const dispatch = createEventDispatcher();
</script>

<div class={classes('date-picker', _class)} bind:this={datePicker}>
  <DropdownShell let:toggle open={startFocus || endFocus} on:change={clearFocus}>
    <div class="handle">
      <TextField
        placeholder={readableFormat}
        value={formatDate(startValue, format)}
        on:focus={() => { startFocus = true; endFocus = false; }}
        class={startFocus && 'in-focus'}
        on:change={({ detail }) => {
          startValue = parseDate(detail.value, format, startValue);
          fixRange();
          shiftShownCalendar(startValue);
        }}
      />
      {#if range}
        <span>to</span>
        <TextField
          placeholder={readableFormat}
          value={formatDate(endValue, format)}
          on:focus={() => { startFocus = false; endFocus = true; }}
          class={endFocus && 'in-focus'}
          on:change={({ detail }) => {
            endValue = parseDate(detail.value, format, endValue);
            fixRange();
            shiftShownCalendar(endValue);
          }}
        />
      {/if}
    </div>
    <Dropdown class={classes('calendar', _class)} {top} {right}>
      <div class="shown-on-focus">
        <Button noRipple on:click={clearFocus}>close the date picker</Button>
      </div>
      <div class={classes('month-header', monthHeaderClass)}>
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
        {weekdaysClass}
        {weekClass}
        {dayClass}
        on:day-select={select}
      />
    </Dropdown>
  </DropdownShell>
</div>

<style src="./date-picker.scss"></style>
