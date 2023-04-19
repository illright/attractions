<script lang="ts">
  import Button from '../button/button.svelte';
  import X from './x.svelte';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * Adds a title to the dialog.
   */
  export let titleClass: string | false | null = null;

  /**
   * Applies the danger color to the title (including the icon slot if it is stylable with the CSS `color` property).
   */
  export let danger = false;
  /**
   * Adds a close button to the dialog and calls this function when it is clicked.
   */
  export let closeCallback:
    | ((e: CustomEvent<{ nativeEvent: MouseEvent }>) => void)
    | null = null;
  /**
   * Adds a title to the dialog.
   */
  export let title: string | null = null;
  /**
   * Gives the dialog a `max-width` of `30em`.
   */
  export let constrainWidth = false;
</script>

<div
  class={classes('dialog', _class)}
  class:danger
  class:constrain-width={constrainWidth}
>
  {#if closeCallback != null}
    <Button
      color="neutral"
      shape="square"
      class="close"
      on:click={closeCallback}
    >
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

<style lang="scss">
  .dialog {
    background-color: #fff;
    border-radius: var(--a-dialog-radius);
    box-shadow: var(--a-shadow-raised);
    padding: 1.4em 2em;
    position: relative;

    .title {
      color: var(--a-primary);
      display: flex;
      font-size: 1.2em;
      font-weight: var(--a-bold-font-weight);
      margin-bottom: 0.7em;

      &.close-padded {
        padding-right: 1.5em;
      }

      :global svg {
        flex-shrink: 0;
        margin-right: 0.5em;
      }
    }

    > :global .btn.close {
      position: absolute;
      right: 0.7em;
      top: 0.7em;
    }

    &.constrain-width {
      max-width: 30em;
    }

    &.danger .title {
      color: var(--a-danger);
    }

    .content {
      max-height: calc(100vh - 10em);
      overflow-y: auto;
      overscroll-behavior: contain;
    }
  }
</style>
