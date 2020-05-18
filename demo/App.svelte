<script>
  import {
    Button,
    RadioGroup,
    Card,
    TextField,
    DropdownShell,
    Dropdown,
    CheckboxGroup,
    Switch,
    RadioChipGroup,
    CheckboxChipGroup,
    Dot,
  } from '../src/index.js';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  let items = [
    { value: 1, label: 'one', disabled: true },
    { value: 2, label: 'two', disabled: false },
    { value: 3 },
    { value: 4, disabled: true },
    { value: 5, label: 5 },
  ];
  let colorItems = [
    { value: '#FFFFFF', disabled: false },
    { value: '#FF0000', disabled: false },
    { value: '#00FF00' },
    { value: '#00FFFF', disabled: true },
    { value: '#000000' },
  ];
  let item = items[1].value;
  let colorItem = colorItems[1].value;
</script>

<Card>
  <TextField label="Write something" outline />
  <Button filled>
    <Dot success />
    <Dot attention small class="ml" />
    <Dot info small class="ml" />
    <Dot danger class="ml" title="You're in trouble now, son." />
  </Button>
  <RadioGroup items={colorItems} color bind:value={colorItem} name="colors" />
  <RadioGroup items={items} bind:value={item} name="numbers" />
  <CheckboxGroup items={items} max={1} name="numbers-check" />
  <div class="dropdown-holder">
    <DropdownShell let:toggle on:change={() => console.log('yay')}>
      <Button on:click={toggle}>
        test me!
        <ChevronDownIcon size="24" class="ml dropdown-chevron" />
      </Button>
      <Dropdown top>
        <div class="padded">
          I'm a little dropdown short and stout
        </div>
      </Dropdown>
    </DropdownShell>
  </div>

  <Switch>
    <span class="padded">
      default
    </span>
  </Switch>
  <Switch slotLeft value={true}>
    <span class="padded">
      on
    </span>
  </Switch>
  <Switch slotLeft value={true} disabled>
    <span class="padded">
      disabled
    </span>
  </Switch>
  <div class="flex">
    <RadioChipGroup {items} name="radio-chip-group" outline />
    <CheckboxChipGroup {items} name="checkbox-chip-group" max={2} small />
  </div>
</Card>

<style>
  .padded {
    padding: 1em;
  }

  .dropdown-holder {
    display: flex;
  }

  .flex {
    display: flex;
  }

  .flex > :global(*) {
    margin-left: 1em;
    margin-top: 1em;
  }

  :global(.ml) {
    margin-left: .4em;
  }

  :global(.mr) {
    margin-right: .4em;
  }
</style>
