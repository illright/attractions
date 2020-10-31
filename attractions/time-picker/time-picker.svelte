<svelte:options tag="a-time-picker" />

<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import Button from '../button/button.svelte';
  import Label from '../typography/label.svelte';
  import TextField from '../text-field/text-field.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import DropdownShell from '../dropdown/dropdown-shell.svelte';
  import Tab from '../tab/tab.svelte';
  import Clock from './clock.svelte';
  import { parseDateTime, formatDateTime, applyTime, copyDate } from '../utils/datetime-utils.js';
  import { default as rangeGenerator } from '../utils/range.js';

  let _class = null;
  export { _class as class };

  export let top = false;
  export let right = false;
  export let value = null;
  export let format = '%H:%M';
  export let amPmTabName = 'am-pm';
  $: readableFormat = (
    format
      .replace('%H', 'HH')
      .replace('%M', 'MM')
      .replace('%S', 'SS')
      .replace('%P', 'AM')
      .replace('%p', 'am')
      .replace('%%', '%')
  );

  const f12hours = /%p/i.test(format);
  const seconds = /%S/.test(format);
  let focus = false;
  $: currentAmPm = value && (value.getHours() < 12 ? 'AM' : 'PM');

  const hourValues = [...rangeGenerator(f12hours ? 1 : 0, f12hours ? 13 : 24)];
  const minuteValues = [...rangeGenerator(0, 60, 5), 59];

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

  const dispatch = createEventDispatcher();
</script>

<div class={classes('time-picker', _class, f12hours && 'f12hours', seconds && 'seconds')}>
  <DropdownShell bind:open={focus}>
    <div class="handle">
      <TextField
        placeholder={readableFormat}
        value={formatDateTime(value, format)}
        on:focus={() => focus = true}
        class={classes(focus && 'in-focus')}
        on:change={({ detail }) => {
          value = applyTime(parseDateTime(detail.value, format, value), value);
        }}
      />
    </div>
    <Dropdown class="barrel" {top} {right}>
      <div class="shown-on-focus">
        <Button noRipple on:click={() => focus = false}>close the time picker</Button>
      </div>
      <Label>Hours</Label>
      <div class="column">
        {#each hourValues as value}
        <Button on:click={() => setHours(value + 12 * (f12hours && currentAmPm === 'PM' ^ value === 12))}>
          {value.toString().padStart(2, '0')}
        </Button>
        {/each}
      </div>
      <Label>Minutes</Label>
      <div class="column">
        {#each minuteValues as value}
        <Button on:click={() => setMinutes(value)}>
          {value.toString().padStart(2, '0')}
        </Button>
        {/each}
      </div>
      {#if seconds}
        <Label>Seconds</Label>
        <div class="column">
          {#each minuteValues as value}
          <Button on:click={() => setSeconds(value)}>
            {value.toString().padStart(2, '0')}
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
      <Button on:click={setToNow}>
        <Clock />
        now
      </Button>
    </Dropdown>
  </DropdownShell>
</div>

<style src="./time-picker.scss"></style>
