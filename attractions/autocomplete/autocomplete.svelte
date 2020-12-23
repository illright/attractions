<script>
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

  export let getOptions;
  export let selection = [];
  export let minSearchLength = 3;
  export let maxOptions = Infinity;
  export let searchQuery = '';
  export let optionComponent = AutocompleteOption;

  let focus = false;

  function deselect(item) {
    selection = selection.filter(thisItem => thisItem !== item);
    dispatch('change', { value: selection });
  }

  const dispatch = createEventDispatcher();
</script>

<div class:focus class={classes('autocomplete', _class)}>
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
    <div slot="more-options" let:loadMoreOptions>
      <slot name="more-options" {loadMoreOptions}>
        <li
          class="more-options"
          use:callOnSight={{ callback: loadMoreOptions }}
        >
          <Button on:click={loadMoreOptions}>
            <MoreHorizontal />
            load more options
          </Button>
        </li>
      </slot>
    </div>
  </AutocompleteField>
</div>

<style src="./autocomplete.scss">
</style>
