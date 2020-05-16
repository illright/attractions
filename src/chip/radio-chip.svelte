<script>
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';
  import ripple from '../_utils/ripple.js';

  let _class = null;
  export { _class as class };
  export let inputClass = null;
  export let chipClass = null;

  export let value;
  export let disabled = false;
  export let group = null;
  export let title = null;

  export let small = false;
  export let outline = false;
  export let noPadding = false;

  const dispatch = createEventDispatcher();
</script>

<label class={classes('chip-wrapper', _class)}>
  <input
    bind:group
    {value}
    type="radio"
    class={inputClass}
    {disabled}
    on:change={() => dispatch('change', { value, nativeEvent: e })}
    {...$$restProps}
  />
  <div
    class:small
    class:outline
    class:no-padding={noPadding}
    {title}
    use:ripple={{ disabled }}
    class={classes('chip', chipClass)}
  >
    <slot>{value}</slot>
  </div>
</label>

<style src="./radio-chip.scss"></style>
