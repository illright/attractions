<script>
  import Button from '../button/button.svelte';
  import { fly } from 'svelte/transition';
  import dynamic from '../_utils/dynamic-transition.js';
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
  export let textClass = null;
  export let buttonClass = null;

  export let text;
  export let action = null;
  export let closeOnAction = true;
  export let closeCallback;
  export let transition = fly;
  export let transitionOptions = { x: -20, duration: 150 };
</script>


<div
  class={classes('snackbar', _class)}
  transition:dynamic={{ transition, options: transitionOptions }}
>
  <span class={classes('text', textClass)}>{text}</span>
  {#if action != null}
    <Button
      class={buttonClass}
      on:click={() => {
        action.callback();
        if (closeOnAction) {
          closeCallback();
        }
      }}
    >
      {action.text}
    </Button>
  {/if}
</div>

<style src="./snackbar.scss"></style>
