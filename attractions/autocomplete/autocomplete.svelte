<svelte:options tag="a-autocomplete" />

<script>
  import { createEventDispatcher } from 'svelte';
  import Button from '../button/button.svelte';
  import Chip from '../chip/chip.svelte';
  import AutocompleteField from './autocomplete-field.svelte';
  import AutocompleteOption from './autocomplete-option.svelte';
  import X from '../dialog/x.svelte';
  import classes from '../utils/classes.js';

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
      <Button neutral round small on:click={() => deselect(item)}><X /></Button>
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
  />
</div>

<style src="./autocomplete.scss"></style>
