<script>
  import {
    Button,
    RadioGroup,
    Card,
    TextField,
    DropdownShell,
    Dropdown,
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
    Button!!
  </Button>
  <RadioGroup items={colorItems} color bind:value={colorItem} name="colors" />
  <RadioGroup items={items} bind:value={item} name="numbers" />
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
</Card>

<style>
  .padded {
    padding: 1em;
  }

  .dropdown-holder {
    display: flex;
  }
</style>
