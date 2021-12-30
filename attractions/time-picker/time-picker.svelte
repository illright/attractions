<script>
  /**
   * @event {{ value: Date }} change
   */
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import Button from '../button/button.svelte';
  import Label from '../typography/label.svelte';
  import TextField from '../text-field/text-field.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import DropdownShell from '../dropdown/dropdown-shell.svelte';
  import Tab from '../tab/tab.svelte';
  import Clock from './clock.svelte';
  import {
    parseDateTime,
    formatDateTime,
    applyTime,
    copyDate,
  } from '../utils/datetime-utils.js';
  import { default as rangeGenerator } from '../utils/range.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to pass down to the `TextField`.
   * @type {string | false | null}
   */
  export let inputClass = null;

  /**
   * Hides the `now` button from the component.
   * @type {boolean}
   */
  export let hideNow = false;
  /**
   * Aligns the dropdown content such that it opens to the top of the text field, extending up.
   * @type {boolean}
   */
  export let top = false;
  /**
   * Aligns the dropdown with the right edge of the text field.
   * @type {boolean}
   */
  export let right = false;
  /**
   * The currently selected time value. Even though a whole `Date` object is needed, only the time part will be considered.
   * @type {Date | null}
   */
  export let value = null;
  /**
   * The format used to display time and consume input.
   * The `%`-specifiers are a subset of [C date format specifiers](http://www.cplusplus.com/reference/ctime/strftime/), with only `%H`, `%M`, `%S`, `%P` and `%p` allowed. `%P` stands for AM/PM, while `%p` stands for am/pm.
   * @type {string}
   */
  export let format = '%H:%M';
  /**
   * If the `%P` or `%p` modifier is used in the format, the dropdown will contain tabs to switch between AM and PM.
   * You may change the name of the radio group for these tabs to avoid collisions.
   * @type {string}
   */
  export let amPmTabName = 'am-pm';
  $: readableFormat = format
    .replace('%H', 'HH')
    .replace('%M', 'MM')
    .replace('%S', 'SS')
    .replace('%P', 'AM')
    .replace('%p', 'am')
    .replace('%%', '%');

  const f12hours = /%p/i.test(format);
  const hasSeconds = /%S/.test(format);
  let focus = false;
  $: currentAmPm = value && (value.getHours() < 12 ? 'AM' : 'PM');

  /**
   * The list of possible hours to choose from.
   * Defaults to `[1..12]` in 12 hours mode, or `[0..23]` in 24 hours mode.
   * Hint: use `range` from utils to generate a range of numbers.
   * @type {Array<number>}
   */
  export let hours = [...rangeGenerator(f12hours ? 1 : 0, f12hours ? 13 : 24)];
  /**
   * The list of possible minutes to choose from.
   * Defaults to `[0, 5, ..., 55]`.
   * Hint: use `range` from utils to generate a range of numbers.
   * @type {Array<number>}
   */
  export let minutes = [...rangeGenerator(0, 60, 5)];
  /**
   * The list of possible seconds to choose from.
   * Defaults to `[0, 5, ..., 55]` if seconds are included in the format, or `[]` otherwise.
   * Hint: use `range` from utils to generate a range of numbers.
   * @type {Array<number>}
   */
  export let seconds = hasSeconds ? [...rangeGenerator(0, 60, 5)] : [];

  function setHours(hourValue, minuteValue = null, secondValue = null) {
    hourValue %= 24;
    if (value == null) {
      value = new Date(0);
    } else {
      value = copyDate(value);
    }

    if (minuteValue != null && secondValue != null) {
      value.setHours(hourValue, minuteValue, secondValue);
    } else {
      value.setHours(hourValue);
    }
    value = value;
    dispatch('change', { value });
  }

  function setMinutes(minuteValue) {
    if (value == null) {
      value = new Date(0);
    } else {
      value = copyDate(value);
    }

    value.setMinutes(minuteValue);
    value = value;
    dispatch('change', { value });
  }

  function setSeconds(secondValue) {
    if (value == null) {
      value = new Date(0);
    } else {
      value = copyDate(value);
    }

    value.setSeconds(secondValue);
    value = value;
    dispatch('change', { value });
  }

  function setToNow() {
    const now = new Date();
    setHours(now.getHours(), now.getMinutes(), now.getSeconds());
  }

  function changeAmPm({ detail: newAmPm }) {
    if (value == null) {
      if (newAmPm.value === 'PM') {
        setHours(12);
      } else {
        setHours(0);
      }
    } else {
      if (newAmPm.value === 'PM' && value.getHours() < 12) {
        setHours(value.getHours() + 12);
      } else if (newAmPm.value === 'AM' && value.getHours() >= 12) {
        setHours(value.getHours() - 12);
      }
    }
  }

  function matchesCurrentHour(hour, selected) {
    if (!value) {
      return false;
    }
    const currentHour = f12hours
      ? ((selected.getHours() + 11) % 12) + 1
      : selected.getHours();
    return hour === currentHour;
  }

  function handleKeyPress(evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      focus = !focus;
    }
  }

  function toggleKeyboardListener({ detail }) {
    if (detail.value) {
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }

  const dispatch = createEventDispatcher();
</script>

<div
  class={classes(
    'time-picker',
    _class,
    f12hours && 'f12hours',
    hasSeconds && 'seconds'
  )}
>
  <DropdownShell bind:open={focus} on:change={toggleKeyboardListener}>
    <div class="handle">
      <TextField
        placeholder={readableFormat}
        value={formatDateTime(value, format)}
        on:focus={() => (focus = true)}
        class={classes(focus && 'in-focus')}
        {inputClass}
        on:change={({ detail }) => {
          value = applyTime(parseDateTime(detail.value, format, value), value);
        }}
      />
    </div>
    <Dropdown class="barrel" {top} {right}>
      <div class="shown-on-focus">
        <Button noRipple on:click={() => (focus = false)}>
          close the time picker
        </Button>
      </div>
      <slot name="hours-label">
        <Label>Hours</Label>
      </slot>
      <div class="column">
        {#each hours as hour}
          <Button
            on:click={() =>
              setHours(
                hour +
                  12 * (f12hours && (currentAmPm === 'PM') ^ (value === 12))
              )}
            selected={matchesCurrentHour(hour, value)}
          >
            {hour.toString().padStart(2, '0')}
          </Button>
        {/each}
      </div>
      <slot name="minutes-label">
        <Label>Minutes</Label>
      </slot>
      <div class="column">
        {#each minutes as mins}
          <Button
            on:click={() => setMinutes(mins)}
            selected={value && mins === value.getMinutes()}
          >
            {mins.toString().padStart(2, '0')}
          </Button>
        {/each}
      </div>
      {#if hasSeconds}
        <slot name="seconds-label">
          <Label>Seconds</Label>
        </slot>
        <div class="column">
          {#each seconds as secs}
            <Button
              on:click={() => setSeconds(secs)}
              selected={value && secs === value.getSeconds()}
            >
              {secs.toString().padStart(2, '0')}
            </Button>
          {/each}
        </div>
      {/if}
      {#if f12hours}
        <div class="am-pm-tabs">
          <Tab
            value="AM"
            name={amPmTabName}
            on:change={changeAmPm}
            bind:group={currentAmPm}
          />
          <Tab
            value="PM"
            name={amPmTabName}
            on:change={changeAmPm}
            bind:group={currentAmPm}
          />
        </div>
      {/if}
      {#if !hideNow}
        <Button on:click={setToNow}>
          <slot name="now-icon">
            <Clock />
          </slot>
          <slot name="now-label">now</slot>
        </Button>
      {/if}
    </Dropdown>
  </DropdownShell>
</div>

<style src="./time-picker.scss">
</style>
