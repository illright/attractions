<script>
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };
  export let imgSrc = '';
  export let imgAlt = '';
  export let title = '';
  export let subtitle = '';

  const withImage = !!imgSrc;
</script>

<div class={classes('card', _class, withImage && 'with-image')} {...$$restProps}>
  {#if withImage}
    <img src={imgSrc} alt={imgAlt} class="image" />
  {/if}
  <div class="content">
    {#if title || subtitle}
      <p class="title">{title}</p>
      <p class="subtitle">{subtitle}</p>
    {/if}
    <slot />
  </div>
</div>

<style src="./card.scss"></style>
