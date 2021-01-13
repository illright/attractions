<script>
  /**
   * @slot {{ }} loading-options
   * @slot {{ }} more-options
   * @slot {{ }} not-enough-input
   * @slot {{ loadMoreOptions: (click?: CustomEvent<{nativeEvent: MouseEvent}>) => void }} too-many-options
   * @typedef {import('./autocomplete-field').OptionsGetter} OptionsGetter
   * @typedef {import('./autocomplete-option').Option} Option
   */
  import { createEventDispatcher } from 'svelte';
  import Button from '../button/button.svelte';
  import Chip from '../chip/chip.svelte';
  import AutocompleteField from './autocomplete-field.svelte';
  import AutocompleteOption from './autocomplete-option.svelte';
  import X from '../dialog/x.svelte';
  import Loading from '../loading/loading.svelte';
  import MoreHorizontal from './more-horizontal.svelte';
  import classes from '../utils/classes.js';
  import s from '../utils/plural-s.js';
  import callOnSight from '../utils/call-on-sight.js';

  let _class = null;
  export { _class as class };

  /**
   * An async generator of suggestions.
   * Receives the input from the text field and is expected to yield promises that resolve to arrays of objects
   * @type {OptionsGetter}
   */
  export let getOptions;
  /**
   * The current selection as an array of objects.
   * Can be used to set the selection programmatically.
   * @type {Option[]}
   */
  export let selection = [];
  
  /**
   * The minimum amount of characters to call `getOptions`
   * @type {number}
   */
  export let minSearchLength = 3;
  /**
   * The maximum amount of options than can be selected.
   * @type {number}
   */
  export let maxOptions = Infinity;
  /**
   * The current value of the text field. Can be used to control the query programmatically.
   * @type {string}
   */
  export let searchQuery = '';
  /**
   * Whether to disable the field.
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * The component used to render a suggestion in the list.
   * Receives two props: the option object ({ name, details }) and the current query.
   * Expected to dispatch click events on selection
   * @type {SvelteComponentTyped<{option: Option; query: string}, {click: MouseEvent}, {}>}
   */
  export let optionComponent = AutocompleteOption;

  let focus = false;

  function deselect(item) {
    selection = selection.filter(thisItem => thisItem !== item);
    dispatch('change', { value: selection });
  }

  const dispatch = createEventDispatcher();
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
    {getOptions}
    {minSearchLength}
    {maxOptions}
    {optionComponent}
    {disabled}
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
        Loading...
      </li>
    </slot>
    <li class="more-options" slot="more-options" let:loadMoreOptions>
      <slot name="more-options" {loadMoreOptions}>
        <div use:callOnSight={{ callback: loadMoreOptions }}>
          <Button on:click={loadMoreOptions}>
            <MoreHorizontal />
            load more options
          </Button>
        </div>
      </slot>
    </li>
  </AutocompleteField>
</div>

<style src="./autocomplete.scss">
</style>
