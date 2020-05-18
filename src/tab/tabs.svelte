<script>
  import Tab from './tab.svelte';

  let _class = null;
  export { _class as class };
  export let tabClass = null;

  export let value;
  export let items;
  export let name;
</script>

<nav class={_class} role="group">
  {#each items as item (item)}
    <Tab class={tabClass} value={item} {name} bind:group={value} on:change />
  {/each}
</nav>

<style src="./tabs.scss"></style>
