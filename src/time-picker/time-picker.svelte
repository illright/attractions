<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';
  import Button from '../button/button.svelte';
  import Label from '../typography/label.svelte';
  import TextField from '../text-field/text-field.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import DropdownShell from '../dropdown/dropdown-shell.svelte';
  import Tab from '../tab/tab.svelte';
  import Clock from './clock.svelte';
  import { parseDateTime, formatDateTime } from '../_utils/datetime-utils.js';
  import { default as rangeGenerator } from '../_utils/range.js';

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
      .replace('%P', 'AM')
      .replace('%p', 'am')
      .replace('%%', '%')
  );

  let f12hours = (/%p/i).test(format);
  let focus = false;
  $: currentAmPm = value && (value.getUTCHours() < 12 ? 'AM' : 'PM');

  const hourValues = [...rangeGenerator(0, f12hours ? 12 : 24)];
  const minuteValues = [...rangeGenerator(0, 60, 5), 59];

  function setHours(hourValue, minuteValue = null) {
    if (value == null) {
      value = new Date(0);
    }

    if (minuteValue != null) {
      value.setUTCHours(hourValue, minuteValue);
    } else {
      value.setUTCHours(hourValue);
    }
    value = value;
    dispatch('change', { value });
  }

  function setMinutes(minuteValue) {
    if (value == null) {
      value = new Date(0);
    }

    value.setUTCMinutes(minuteValue);
    value = value;
    dispatch('change', { value });
  }

  function setToNow() {
    const now = new Date();
    setHours(now.getHours(), now.getMinutes());
  }

  function changeAmPm({ detail: newAmPm }) {
    if (value == null) {
      if (newAmPm.value === 'PM') {
        setHours(12);
      } else {
        setHours(0);
      }
    } else {
      if (newAmPm.value === 'PM' && value.getUTCHours() < 12) {
        setHours(value.getUTCHours() + 12);
      } else if (newAmPm.value === 'AM' && value.getUTCHours() >= 12) {
        setHours(value.getUTCHours() - 12);
      }
    }
  }

  const dispatch = createEventDispatcher();
</script>

<div class={classes('time-picker', _class, f12hours && 'f12hours')}>
  <DropdownShell bind:open={focus}>
    <div class="handle">
      <TextField
        placeholder={readableFormat}
        value={formatDateTime(value, format)}
        on:focus={() => focus = true}
        class={focus && 'in-focus'}
        on:change={({ detail }) => {
          value = parseDateTime(detail.value, format, value);
        }}
      />
    </div>
    <Dropdown class="barrel" {top} {right}>
      <Label>Hours</Label>
      <Label>Minutes</Label>
      <div class="column">
        {#each hourValues as value}
        <Button on:click={() => setHours(value + 12 * (f12hours && currentAmPm === 'PM'))}>
          {value.toString().padStart(2, '0')}
        </Button>
        {/each}
      </div>
      <div class="column">
        {#each minuteValues as value}
        <Button on:click={() => setMinutes(value)}>
          {value.toString().padStart(2, '0')}
        </Button>
        {/each}
      </div>
      {#if f12hours}
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
      {/if}
      <Button on:click={setToNow}>
        <Clock />
        now
      </Button>
    </Dropdown>
  </DropdownShell>
</div>

<style src="./time-picker.scss"></style>
