<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let nameClass = null;
  export let helpClass = null;

  export let name = null;
  export let help = null;
  export let id = null;

  if (id == null) {
    id = `form-field-${Math.random().toString().substring(2, 8)}`;
  }

  export let required = false;
  export let optional = false;
  export let errors = [];
</script>

<div class={classes('form-field', _class)}>
  <div class="description">
    {#if name != null}
      <label class={classes('name', nameClass)} for={id}>
        {name}&nbsp;{#if required}<span class="required">*</span>{/if}
      </label>
    {/if}
    {#if help != null}
      <div class={classes('help', helpClass)}>{help}</div>
    {/if}
    <slot name="description" />
  </div>
  <div class="field">
    <slot />
    {#each errors as error}
      {#if error}
        <div class="message error">{error}</div>
      {/if}
    {/each}
    {#if required}
      <div class="message info">* Required</div>
    {:else if optional}
      <div class="message info">Optional</div>
    {/if}
    <slot name="message" />
  </div>
</div>

<style src="./form-field.scss">
</style>
