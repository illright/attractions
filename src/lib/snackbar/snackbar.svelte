<script lang="ts">
  import Button from '../button/button.svelte';
  import { fly } from 'svelte/transition';
  import dynamic from '../utils/dynamic-transition.js';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
  /**
   * A class string to add to the label of the snackbar.
   */
  export let textClass: string | false | null = null;
  /**
   * A class string to add to the action button of the snackbar.
   */
  export let buttonClass: string | false | null = null;

  /**
   * The text to show on the snackbar.
   */
  export let text: string;
  /**
   * The action for the button on the snackbar. If this is null, the button is not rendered. Otherwise it has text as a label and calls callback on click.
   */
  export let action: { text: string; callback: () => void } | null = null;
  /**
   * Whether to call the `closeCallback` when an action button is pressed, after its callback.
   */
  export let closeOnAction = true;
  /**
   * The callback to call to close the snackbar in the `SnackbarContainer`.
   * Passed internally by the `SnackbarContainer` when using the `showSnackbar` function.
   */
  export let closeCallback: () => void;

  // Until `$$Generic` is supported by svelte2tsx - https://github.com/sveltejs/rfcs/pull/38
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type T = any;
  /**
   * The transition to use to animate the in and out of the snackbar.
   */
  export let transition: (
    ...args: T[]
  ) => import('svelte/transition').TransitionConfig = fly;
  /**
   * The options to use with the given transition.
   */
  export let transitionOptions: T = { x: -20, duration: 150 };
</script>

<div
  class={classes('snackbar', _class)}
  transition:dynamic={{ transition, options: transitionOptions }}
>
  <span class={classes('text', textClass)}>{text}</span>
  {#if action != null}
    <Button
      class={classes(buttonClass)}
      on:click={() => {
        if (action != null && typeof action.callback === 'function') {
          action.callback();
        }

        if (closeOnAction) {
          closeCallback();
        }
      }}
    >
      {action.text}
    </Button>
  {/if}
</div>

<style src="./snackbar.scss">
</style>
