<script>
  /**
   * @event {{ value: number }} change
   */
  import { createEventDispatcher } from 'svelte';
  import Button from '../button/button.svelte';
  import TextField from '../text-field/text-field.svelte';
  import { classes } from '../utils';

  let _class = null;
  export { _class as class };
  /**
   * The amount of pages to allow for navigation.
   * @type {number}
   */
  export let pages;
  /**
   * The currently selected page (starting from 1).
   * @type {number}
   */
  export let currentPage = 1;
  /**
   * Whether the pagination component should be displayed when there's only one page.
   * @type {boolean}
   */
  export let showLonePage = true;

  // clamp currentPage between [1; pages]
  $: currentPage = Math.min(Math.max(currentPage, 1), pages);

  let inputValue = null;
  let leftInputActive = false;
  let rightInputActive = false;

  const leftEllipsisKey = {};
  const rightEllipsisKey = {};

  function generateButtonList(pageCount, current = 1) {
    const list = [];
    if (current !== 1) {
      list.push(1);
    }

    if (current - 1 == 3) {
      list.push(current - 2);
    } else if (current - 1 > 3) {
      list.push(leftEllipsisKey);
    }

    if (current > 2) {
      list.push(current - 1);
    }

    list.push(current);

    if (current < pageCount - 1) {
      list.push(current + 1);
    }

    if (pageCount - current == 3) {
      list.push(current + 2);
    } else if (pageCount - current > 3) {
      list.push(rightEllipsisKey);
    }

    if (current !== pageCount) {
      list.push(pageCount);
    }

    return list;
  }

  $: pageList = generateButtonList(pages, currentPage);

  function goTo(page) {
    if (page >= 1 && page <= pages) {
      leftInputActive = false;
      rightInputActive = false;
      currentPage = page;
      dispatch('change', { value: page });
    }
  }

  function tryNavigate(_event) {
    const parsed = parseInt(inputValue);
    if (!isNaN(parsed)) {
      goTo(parsed);
    }
  }

  function navigateOnEnter({ detail }) {
    if (detail.nativeEvent.key === 'Enter') {
      tryNavigate();
      inputValue = '';
    }
  }

  function activateLeftInput() {
    leftInputActive = true;
    rightInputActive = false;
  }

  function activateRightInput() {
    leftInputActive = false;
    rightInputActive = true;
  }

  const dispatch = createEventDispatcher();
</script>

{#if pages > 1 || (pages == 1 && showLonePage)}
  <nav class={classes('pagination', _class)} {...$$restProps}>
    {#each pageList as buttonValue (buttonValue)}
      {#if buttonValue === leftEllipsisKey}
        {#if leftInputActive}
          <TextField
            type="number"
            min={1}
            max={pages}
            noSpinner
            autofocus
            bind:value={inputValue}
            on:blur={tryNavigate}
            on:keydown={navigateOnEnter}
          />
        {:else}
          <Button class="page" neutral on:click={activateLeftInput}>...</Button>
        {/if}
      {:else if buttonValue === rightEllipsisKey}
        {#if rightInputActive}
          <TextField
            type="number"
            min={1}
            max={pages}
            noSpinner
            autofocus
            bind:value={inputValue}
            on:blur={tryNavigate}
            on:keydown={navigateOnEnter}
          />
        {:else}
          <Button class="page" neutral on:click={activateRightInput}>
            ...
          </Button>
        {/if}
      {:else}
        <Button
          neutral={buttonValue !== currentPage}
          class={classes('page', buttonValue === currentPage && 'current')}
          on:click={() => goTo(buttonValue)}
        >
          {buttonValue}
        </Button>
      {/if}
    {/each}
  </nav>
{/if}

<style src="./pagination.scss">
</style>
