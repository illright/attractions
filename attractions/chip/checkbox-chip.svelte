<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let inputClass = null;
  export let chipClass = null;

  export let checked = false;
  export let value;
  export let name;
  export let disabled = false;
  export let title = null;

  export let small = false;
  export let outline = false;
  export let noPadding = false;

  const dispatch = createEventDispatcher();
</script>

<label class={classes('input-chip checkbox-chip', _class)}>
  <input
    bind:checked
    {value}
    {name}
    type="checkbox"
    class={inputClass}
    {disabled}
    on:change={(e) => dispatch('change', {
      value: e.target.value,
      checked: e.target.checked,
      nativeEvent: e,
    })}
    {...$$restProps}
  />
  <div
    class:small
    class:outline
    class:no-padding={noPadding}
    {title}
    class={classes('chip', chipClass)}
  >
    <slot>{value}</slot>
  </div>
</label>

<style src="./checkbox-chip.scss"></style>
