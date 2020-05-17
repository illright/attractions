<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import eventsAction from '../_utils/events.js';
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
  export let inputClass = null;
  export let labelClass = null;
  export let errorClass = null;

  export let outline = false;
  export let withItem = false;
  export let itemRight = false;

  export let id = null;
  export let spinner = true;
  export let label = null;
  export let error = null;
  export let multiline = null;
  export let autofocus = false;

  if (!outline && label != null) {
    console.error('Labels are only available for outlined text fields');
  }

  export let value = null;
  export let events = null;

  let inputElement;
  onMount(() => autofocus && inputElement.focus());

  const dispatch = createEventDispatcher();
</script>

<div
  class={classes('text-field', _class)}
  class:outline
  class:with-item={withItem}
  class:left={withItem && !itemRight}
  class:right={withItem && itemRight}
  class:no-spinner={!spinner}
>
  {#if multiline}
    <textarea
      {id}
      bind:value={value}
      class={inputClass}
      bind:this={inputElement}
      on:input={(e) => dispatch('input', { value: e.target.value, nativeEvent: e })}
      on:change={(e) => dispatch('change', { value: e.target.value, nativeEvent: e })}
      use:eventsAction={events}
      {...$$restProps}
    />
  {:else}
    <input
      {id}
      bind:value={value}
      class={inputClass}
      bind:this={inputElement}
      on:input={(e) => dispatch('input', { value: e.target.value, nativeEvent: e })}
      on:change={(e) => dispatch('change', { value: e.target.value, nativeEvent: e })}
      use:eventsAction={events}
      {...$$restProps}
    />
    {#if outline && label != null}
      <label for={id} class={labelClass}>
        {label}
      </label>
    {/if}

    {#if withItem}
      <slot />
    {/if}

    {#if error != null}
      <span class={classes('error', errorClass)}>
        <slot name="error">{error}</slot>
      </span>
    {/if}
  {/if}
</div>

<style src="./text-field.scss"></style>
