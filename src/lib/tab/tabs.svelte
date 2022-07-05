<script lang="ts">
  /**
   * @event {{ value: string; nativeEvent: Event }} change
   */
  import classes from '../utils/classes.js';
  import Tab from './tab.svelte';

  let _class = null;
  /** @type {string | false | null} */
  export { _class as class };
  /**
   * A class string to pass to each `<Tab>` component.
   * @type {string | false | null}
   */
  export let tabClass = null;

  /**
   * The currently selected tab.
   * @type {string | null}
   */
  export let value = null;
  /**
   * An array of strings that act as the labels of the tabs.
   */
  export let items: string[];
  /**
   * The name passed to each of the underlying `<Tab>`s, which in turn becomes assigned to the `<input type="radio">`s' [name attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  export let name: string;
</script>

<nav class={classes(_class)} role="group">
  {#each items as item (item)}
    <Tab
      class={classes(tabClass)}
      value={item}
      {name}
      bind:group={value}
      on:change
    />
  {/each}
</nav>

<style src="./tabs.scss">
</style>
