<script>
  import Button from '../button/button.svelte';
  import { fly } from 'svelte/transition';
  import dynamic from '../utils/dynamic-transition.js';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  /**
   * A class string to add to the label of the snackbar.
   * @type {string | false | null}
   */
  export let textClass = null;
  /**
   * A class string to add to the action button of the snackbar.
   * @type {string | false | null}
   */
  export let buttonClass = null;

  /**
   * The text to show on the snackbar.
   * @type {string}
   */
  export let text;
  /**
   * The action for the button on the snackbar. If this is null, the button is not rendered. Otherwise it has text as a label and calls callback on click.
   * @type {{ text: string; callback: () => void } | null}
   */
  export let action = null;
  /**
   * Whether to call the `closeCallback` when an action button is pressed, after its callback.
   * @type {boolean}
   */
  export let closeOnAction = true;
  /**
   * The callback to call to close the snackbar in the `SnackbarContainer`.
   * Passed internally by the `SnackbarContainer` when using the `showSnackbar` function.
   * @type {() => void}
   */
  export let closeCallback;
  /**
   * The transition to use to animate the in and out of the snackbar.
   * @type {(...args: any[]) => import('svelte/transition').TransitionConfig}
   */
  export let transition = fly;
  /**
   * The options to use with the given transition.
   * @type {any}
   */
  export let transitionOptions = { x: -20, duration: 150 };
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
        if (typeof action.callback === 'function') {
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
