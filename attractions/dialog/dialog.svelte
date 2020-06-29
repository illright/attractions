<script>
  import Button from '../button/button.svelte';
  import X from './x.svelte';
  import classes from '../utils/classes.js';

  let _class = null;
  export { _class as class };
  export let titleClass = null;

  export let danger = false;
  export let closeCallback = null;
  export let title = null;
  export let constrainWidth = false;
</script>

<div
  class={classes('dialog', _class)}
  class:danger
  class:constrain-width={constrainWidth}
>
  {#if closeCallback != null}
    <Button neutral round class="close" on:click={closeCallback}>
      <slot name="close-icon"><X /></slot>
    </Button>
  {/if}
  {#if title != null}
    <div class={classes('title', closeCallback != null && 'close-padded', titleClass)}>
      <slot name="title-icon" />
      {title}
    </div>
  {/if}
  <slot />
</div>

<style src="./dialog.scss"></style>
