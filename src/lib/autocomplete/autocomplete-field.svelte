<script lang="ts" context="module">
  export type OptionsGetter = (
    q: string
  ) => AsyncGenerator<Option[], void, void>;
</script>

<script lang="ts">
  import { createEventDispatcher, type ComponentType } from 'svelte';
  import type { Option } from './autocomplete-option.svelte';
  import DropdownShell from '../dropdown/dropdown-shell.svelte';
  import Dropdown from '../dropdown/dropdown.svelte';
  import Button from '../button/button.svelte';
  import Loading from '../loading/loading.svelte';
  import AutocompleteOption from './autocomplete-option.svelte';
  import MoreHorizontal from './more-horizontal.svelte';
  import s from '../utils/plural-s.js';
  import callOnSight from '../utils/call-on-sight.js';
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };

  /**
   * An async generator of suggestions.
   * Receives the input from the text field and is expected to yield promises that resolve to arrays of `Option` objects.
   */
  export let getOptions: OptionsGetter;
  /**
   * The current selection as an array of `Option` objects.
   * Can be used to set the selection programmatically.
   */
  export let selection: Option[] = [];
  /**
   * The minimum length the search query must be to call `getOptions`.
   */
  export let minSearchLength = 3;
  /**
   * The maximum amount of options than can be selected.
   */
  export let maxOptions = Infinity;
  /**
   * The current value of the text field. Can be used to control the query programmatically.
   */
  export let searchQuery = '';
  /**
   * The component used to render a suggestion in the list.
   * Receives two props: `option` – the `Option` object ({ name, details }) and `query` – the current query.
   * Expected to dispatch click events on selection.
   */
  export let optionComponent: ComponentType<AutocompleteOption> =
    AutocompleteOption;
  /**
   * Whether to disable the field.
   */
  export let disabled = false;
  /**
   * Allows to programmatically control whether the suggestions dropdown is shown.
   */
  export let focus = false;

  let moreOptions = false;
  let promises: Promise<IteratorResult<Option[], void>>[] = [];
  let optionGenerator: AsyncGenerator<Option[], void, void> | null = null;

  $: updateOptionGenerator(searchQuery);

  let inputElement: HTMLInputElement;

  function updateOptionGenerator(query: string) {
    if (query.length >= minSearchLength) {
      optionGenerator = getOptions(query);
    } else {
      optionGenerator = null;
    }
    promises = [];
    if (optionGenerator != null) {
      promises.push(optionGenerator.next());
    }
  }

  function filterOutSelected(generatorState: IteratorResult<Option[], void>) {
    moreOptions = !generatorState.done;
    if (generatorState.value == null) {
      return [];
    }

    return generatorState.value.filter(
      option => selection.find(thisOption => thisOption === option) == null
    );
  }

  function loadMoreOptions(click: CustomEvent<{ nativeEvent: MouseEvent }>) {
    if (optionGenerator == null) return;
    promises.push(optionGenerator.next());
    promises = promises;

    if (click != null) {
      click.detail.nativeEvent.stopPropagation();
    }
  }

  function select(option: Option) {
    selection.push(option);
    selection = selection;
    searchQuery = '';
    dispatch('change', { value: selection });
    if (selection.length < maxOptions) {
      inputElement.focus();
    } else {
      focus = false;
    }
  }

  function focusInputElement() {
    promises = promises;
    focus = true;
  }

  const dispatch = createEventDispatcher<{ change: { value: Option[] } }>();
</script>

<DropdownShell
  class={classes('autocomplete-field', _class)}
  open={focus}
  on:change={({ detail }) => (focus = detail.value)}
>
  <input
    {disabled}
    bind:this={inputElement}
    bind:value={searchQuery}
    on:focus={focusInputElement}
    {...$$restProps}
  />
  <Dropdown>
    <div class="shown-on-focus">
      <Button noRipple on:click={() => (focus = false)}>
        <slot name="close-message">close the options</slot>
      </Button>
    </div>
    {#if selection.length >= maxOptions}
      <slot name="too-many-options">
        <div class="notice">
          Cannot select more than
          {maxOptions}
          option{s(maxOptions)}
        </div>
      </slot>
    {:else if minSearchLength > 0 && (searchQuery == null || searchQuery.length < minSearchLength)}
      <slot name="not-enough-input">
        <div class="notice">
          Type
          {minSearchLength}
          character{s(minSearchLength)}
          to search
        </div>
      </slot>
    {:else}
      <ul class="options-list">
        {#each promises as promise}
          {#await promise}
            <slot name="loading-options">
              <li class="loading-options">
                <Loading />
                <slot name="loading-message">Loading...</slot>
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
            <slot name="more-options" {loadMoreOptions}>
              <li
                class="more-options"
                use:callOnSight={{ callback: loadMoreOptions }}
              >
                <Button on:click={loadMoreOptions}>
                  <MoreHorizontal />
                  <slot name="load-more-options-message">
                    load more options
                  </slot>
                </Button>
              </li>
            </slot>
          {/await}
        {/if}
      </ul>
    {/if}
  </Dropdown>
</DropdownShell>

<style src="./autocomplete-field.scss">
</style>
