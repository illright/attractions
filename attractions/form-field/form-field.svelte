<script>
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the `<label>` containing the form field name.
   * @type {string | false | null}
   */
  export let nameClass = null;
  /**
   * A class string to add to the help text of the form field.
   * @type {string | false | null}
   */
  export let helpClass = null;

  /**
   * The name of the form field. Displayed prominently next to the actual field.
   * @type {string | null}
   */
  export let name = null;
  /**
   * The subtitle text under the name providing extra guidance.
   * @type {string | null}
   */
  export let help = null;
  /**
   * The ID to add the the `for` attribute of the `<label>` element containing the `name`.
   * Useful if you pass an ID to the actual field inside and want to connect it with the label.
   * @type {string | null}
   */
  export let id = null;

  /**
   * Marks the form field as required, adding an asterisk to the name and text under the field indicating that the field is mandatory.
   * @type {boolean}
   */
  export let required = false;
  /**
   * Marks the form field as optional, explicitly stating the optionality of the field in the text under the field.
   * @type {boolean}
   */
  export let optional = false;
  /**
   * An array of error messages to display under the field. False elements are not shown.
   * @type {Array<string | false>}
   */
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
