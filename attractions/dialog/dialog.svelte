<script>
  import Button from '../button/button.svelte';
  import X from './x.svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * Adds a title to the dialog.
   * @type {string | false | null}
   */
  export let titleClass = null;

  /**
   * Applies the danger color to the title (including the icon slot if it is stylable with the CSS `color` property).
   * @type {boolean}
   */
  export let danger = false;
  /**
   * Adds a close button to the dialog and calls this function when it is clicked.
   * @type {((e: CustomEvent<{ nativeEvent: MouseEvent }>) => void) | null}
   */
  export let closeCallback = null;
  /**
   * Adds a title to the dialog.
   * @type {string | null}
   */
  export let title = null;
  /**
   * Gives the dialog a `max-width` of `30em`.
   * @type {boolean}
   */
  export let constrainWidth = false;
</script>

<div
  class={classes('dialog', _class)}
  class:danger
  class:constrain-width={constrainWidth}
>
  {#if closeCallback != null}
    <Button neutral round class="close" on:click={closeCallback}>
      <slot name="close-icon">
        <X />
      </slot>
    </Button>
  {/if}
  {#if title != null}
    <div
      class={classes(
        'title',
        closeCallback != null && 'close-padded',
        titleClass
      )}
    >
      <slot name="title-icon" />
      {title}
    </div>
  {/if}
  <slot />
</div>

<style src="./dialog.scss">
</style>
