<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let nameClass = null;
  export let helpClass = null;

  export let name = null;
  export let help = null;
  export let id = null;

  export let required = false;
  export let optional = false;
  export let errors = null;
</script>

<div class={classes('form-field', _class)}>
  <slot name="description">
    <div class="description">
      {#if name != null}
        <label class={classes('name', nameClass)} for={id}>
          {name}&nbsp;{#if required}<span class="required">*</span>{/if}
        </label>
      {/if}
      {#if help != null}
        <div class={classes('help', helpClass)}>{help}</div>
      {/if}
    </div>
  </slot>
  <div class="field">
    <slot />
    {#if errors != null}
      {#each errors as error}
        {#if error}<div class="message error">{error}</div>{/if}
      {/each}
    {/if}
    {#if required}
      <div class="message info">* Required</div>
    {:else if optional}
      <div class="message info">Optional</div>
    {/if}
    <slot name="message" />
  </div>
</div>

<style src="./form-field.scss"></style>
