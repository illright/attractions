<script>
  import { createEventDispatcher } from 'svelte';
  import Button from '../button/button.svelte';
  import TextField from '../text-field/text-field.svelte';
  import { classes } from '../utils';

  let _class = null;
  export { _class as class };
  export let pages;
  export let currentPage = 1;

  if (currentPage < 1 || currentPage > pages) {
    currentPage = 1;
  }

  let leftInputActive = false;
  let rightInputActive = false;

  const leftEllipsisKey = {};
  const rightEllipsisKey = {};

  function generateButtonList() {
    const list = [];
    if (currentPage !== 1) {
      list.push(1);
    }

    if (currentPage - 1 == 3) {
      list.push(currentPage - 2);
    } else if (currentPage - 1 > 3) {
      list.push(leftEllipsisKey);
    }

    if (currentPage > 2) {
      list.push(currentPage - 1);
    }

    list.push(currentPage);

    if (currentPage < pages - 1) {
      list.push(currentPage + 1);
    }

    if (pages - currentPage == 3) {
      list.push(currentPage + 2);
    } else if (pages - currentPage > 3) {
      list.push(rightEllipsisKey);
    }

    if (currentPage !== pages) {
      list.push(pages);
    }

    return list;
  }

  function goTo(page) {
    if (page >= 1 && page <= pages) {
      leftInputActive = false;
      rightInputActive = false;
      currentPage = page;
      dispatch('page-switch', page);
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

{#if pages > 1}
  <nav class={classes('pagination', _class)} {...$$restProps}>
    {#each generateButtonList() as buttonValue (buttonValue)}
      {#if buttonValue === leftEllipsisKey}
        {#if leftInputActive}
          <TextField
            type="number"
            min={1}
            max={pages}
            spinner={false}
            autofocus
            on:change={({ detail }) => goTo(detail.value)}
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
            spinner={false}
            autofocus
            on:change={({ detail }) => goTo(detail.value)}
          />
        {:else}
          <Button class="page" neutral on:click={activateRightInput}>...</Button>
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

<style src="./pagination.scss"></style>
