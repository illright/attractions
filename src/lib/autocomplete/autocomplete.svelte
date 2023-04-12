<script lang="ts">
  /**
   * @slot {{ }} loading-options
   * @slot {{ loadMoreOptions: (click?: CustomEvent<{ nativeEvent: MouseEvent }>) => void }} more-options
   * @slot {{ }} not-enough-input
   * @slot {{ }} too-many-options
   * @extends {'./autocomplete-field.svelte'} AutocompleteFieldProps
   */
  import { createEventDispatcher } from 'svelte';
  import type { Option } from './autocomplete-option.svelte';
  import Button from '../button/button.svelte';
  import Chip from '../chip/chip.svelte';
  import AutocompleteField, {
    type OptionsGetter,
  } from './autocomplete-field.svelte';
  import X from '../dialog/x.svelte';
  import Loading from '../loading/loading.svelte';
  import MoreHorizontal from './more-horizontal.svelte';
  import classes from '../utils/classes.js';
  import s from '../utils/plural-s.js';
  import callOnSight from '../utils/call-on-sight.js';

  let _class: string | false | null = null;
  export { _class as class };

  /**
   * An async generator of suggestions.
   * Receives the input from the text field and is expected to yield promises that resolve to arrays of `Option` objects.
   * Gets passed as the `getOptions` prop of the underlying `AutocompleteField`.
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
   * Whether to disable the field.
   */
  export let disabled = false;

  let focus = false;

  function deselect(item: Option) {
    selection = selection.filter(thisItem => thisItem !== item);
    dispatch('change', { value: selection });
  }

  const dispatch = createEventDispatcher<{ change: { value: Option[] } }>();
</script>

<div class:focus class={classes('autocomplete', _class)} class:disabled>
  {#each selection as item}
    <Chip noPadding>
      {item.name}
      <Button neutral round small on:click={() => deselect(item)}>
        <X />
      </Button>
    </Chip>
  {/each}
  <AutocompleteField
    bind:selection
    bind:searchQuery
    bind:focus
    {minSearchLength}
    {maxOptions}
    {disabled}
    {getOptions}
    {...$$restProps}
    on:change
  >
    <slot name="too-many-options" slot="too-many-options">
      <div class="notice">
        Cannot select more than
        {maxOptions}
        option{s(maxOptions)}
      </div>
    </slot>
    <slot name="not-enough-input" slot="not-enough-input">
      <div class="notice">
        Type
        {minSearchLength}
        character{s(minSearchLength)}
        to search
      </div>
    </slot>
    <slot name="loading-options" slot="loading-options">
      <li class="loading-options">
        <Loading />
        <slot name="loading-message">Loading...</slot>
      </li>
    </slot>
    <li class="more-options" slot="more-options" let:loadMoreOptions>
      <slot name="more-options" {loadMoreOptions}>
        <div use:callOnSight={{ callback: loadMoreOptions }}>
          <Button on:click={loadMoreOptions}>
            <MoreHorizontal />
            <slot name="load-more-options-message">load more options</slot>
          </Button>
        </div>
      </slot>
    </li>
  </AutocompleteField>
</div>

<style src="./autocomplete.scss">
</style>
