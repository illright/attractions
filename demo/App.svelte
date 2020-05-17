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
    ModalOverlay,
    Modal,
  } from '../src/index.js';
  import ModalCard from './modal-card.svelte';
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

  let open1 = false;
  let open2 = false;
</script>

<ModalOverlay>
  <Card>
    <TextField label="Write something" outline />
    <Button filled>
      Button!!
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
    <div class="flex">
      <Button on:click={() => open1 = true}>open modal 1</Button>
      <Button on:click={() => open2 = true}>open modal 2</Button>
    </div>
    <Modal component={ModalCard} props={{ doYou: 'hear what I hear' }} bind:open={open1} />
    <Modal component={ModalCard} props={{ doYou: 'care if I care' }} bind:open={open2} />
  </Card>
</ModalOverlay>

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
</style>
