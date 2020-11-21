<script>
  import classes from '../utils/classes.js';
  import Tab from './tab.svelte';

  let _class = null;
  export { _class as class };
  export let tabClass = null;

  export let value = null;
  export let items;
  export let name;
</script>

<nav class={classes(_class)} role="group">
  {#each items as item (item)}
    <Tab class={classes(tabClass)} value={item} {name} bind:group={value} on:change />
  {/each}
</nav>

<style src="./tabs.scss"></style>
