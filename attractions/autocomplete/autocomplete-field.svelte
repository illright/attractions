<script>
  import { createEventDispatcher } from 'svelte';
  import DropdownShell from '../dropdown/dropdown-shell.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import Button from '../button/button.svelte';
  import Loading from '../loading/loading.svelte';
  import AutocompleteOption from './autocomplete-option.svelte';
  import MoreHorizontal from './more-horizontal.svelte';
  import s from '../_utils/plural-s.js';
  import callOnSight from '../_utils/call-on-sight.js';
  import classes from '../_utils/classes.js';

  let _class = null;
  export { _class as class };

  export let getOptions;
  export let selection = [];
  export let minSearchLength = 3;
  export let maxOptions = null;
  export let searchQuery = '';
  export let optionComponent = AutocompleteOption;
  export let focus = false;

  let moreOptions = false;
  let promises = [];
  let optionGenerator = null;

  $: updateOptionGenerator(searchQuery);

  let inputElement = null;

  function updateOptionGenerator(query) {
    if (query != null && query.length >= minSearchLength) {
      optionGenerator = getOptions(query);
    } else {
      optionGenerator = null;
    }
    promises = [];
    if (optionGenerator != null) {
      promises.push(optionGenerator.next());
    }
  }

  function filterOutSelected(generatorValue) {
    moreOptions = !generatorValue.done;
    return generatorValue.value.filter(
      option => selection.find(thisOption => thisOption === option) == null,
    );
  }

  function loadMoreOptions(click) {
    promises.push(optionGenerator.next());
    promises = promises;

    if (click != null) {
      click.stopPropagation();
    }
  }

  function select(option) {
    selection.push(option);
    selection = selection;
    searchQuery = null;
    dispatch('change', { value: selection });
    inputElement.focus();
  }

  const dispatch = createEventDispatcher();
</script>

<DropdownShell
  class={classes('autocomplete-field', _class)}
  open={focus}
  on:change={() => focus = false}
>
  <input
    bind:this={inputElement}
    bind:value={searchQuery}
    on:focus={() => focus = true}
    {...$$restProps}
  />
  <Dropdown>
    <div class="shown-on-focus">
      <Button noRipple on:click={() => focus = false}>close the options</Button>
    </div>
    {#if maxOptions != null && selection.length >= maxOptions}
      <slot name="too-many-options">
        <div class="notice">
          Cannot select more than {maxOptions} option{s(maxOptions)}
        </div>
      </slot>
    {:else if minSearchLength > 0 && (searchQuery == null || searchQuery.length < minSearchLength)}
      <slot name="not-enough-input">
        <div class="notice">
          Type {minSearchLength} character{s(minSearchLength)} to search
        </div>
      </slot>
    {:else}
      <ul class="options-list">
        {#each promises as promise (promise)}
          {#await promise}
            <slot name="loading-options">
              <li class="loading-options">
                <Loading />
                Loading...
              </li>
            </slot>
          {:then options}
            {#each filterOutSelected(options) as option (option)}
              <svelte:component
                this={optionComponent}
                {option}
                query={searchQuery}
                on:click={() => select(option)}
              />
            {/each}
          {/await}
        {/each}

        {#if moreOptions && optionGenerator != null}
          {#await Promise.all(promises) then _}
            <slot name="more-options">
              <li class="more-options" use:callOnSight={{ callback: loadMoreOptions }}>
                <Button on:click={loadMoreOptions}>
                  <MoreHorizontal />
                  load more options
                </Button>
              </li>
            </slot>
          {/await}
        {/if}
      </ul>
    {/if}
  </Dropdown>
</DropdownShell>

<style src="./autocomplete-field.scss"></style>
