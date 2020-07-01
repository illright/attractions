<script>
  import {
    Button,
    Badge,
    // RadioGroup,
    Card,
    TextField,
    DropdownShell,
    Dropdown,
    // CheckboxGroup,
    Switch,
    RadioChipGroup,
    CheckboxChipGroup,
    Accordion,
    AccordionSection,
    Modal,
    Tab, Tabs,
    // Label,
    // Headline,
    Dot,
    SnackbarContainer,
    StarRating,
    Popover,
    PopoverButton,
    // Dialog,
    FileInput,
    FileDropzone,
    DatePicker,
    TimePicker,
    Calendar,
    FormField,
    Autocomplete,
    Pagination,
  } from '../attractions/index.js';
  import { SnackbarPositions } from '../attractions/snackbar';
  import { PopoverPositions } from '../attractions/popover';
  import ModalCard from './modal-card.svelte';
  import MySnackbar from './my-snackbar.svelte';
  import ModalDialog from './modal-dialog.svelte';
  import getOptions from './get-autocomplete-options.js';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  const items = [
    { value: 1, label: 'one', disabled: true },
    { value: 2, label: 'two', disabled: false },
    { value: 3 },
    { value: 4, disabled: true },
    { value: 5, label: 5 },
  ];
  // let colorItems = [
  //   { value: '#FFFFFF', disabled: false },
  //   { value: '#FF0000', disabled: false },
  //   { value: '#00FF00' },
  //   { value: '#00FFFF', disabled: true },
  //   { value: '#000000' },
  // ];
  // let item = items[1].value;
  // let colorItem = colorItems[1].value;

  let open1 = false;
  let open2 = false;
  let open3 = false;
  let dropdownTabSelected = false;
  let date = new Date();

  let selection = [];
  let filesSelected = [];

  let inputNumber = null;

  let pageCount = 5;
</script>

<SnackbarContainer position={SnackbarPositions.BOTTOM_LEFT} let:showSnackbar>
  <div class="flex">
    <FileDropzone accept="image/jpeg" />
  </div>
  <div class="flex">
    <FileInput accept="image/*" bind:value={filesSelected} vertical />

    <div>
      {#if filesSelected != null}
        <Card>{filesSelected.name}</Card>
      {/if}
    </div>
  </div>
  <Button on:click={() => pageCount--}>-</Button>
  <Pagination pages={pageCount} />
  <Button on:click={() => pageCount++}>+</Button>
  <a href="https://googles.com">say my name</a>
  <Card>
    <Autocomplete
      {getOptions}
      bind:selection
      maxOptions={2}
      minSearchLength={0}
    />
    <StarRating name="test" max={7} />
    <div class="flex">
      {date}
    </div>
    <div class="flex">
      <DatePicker bind:value={date} />
      <TimePicker format="%H:%M:%S %P" bind:value={date} />
    </div>
    <FormField
      name="One"
      help="Faithful to my made-up mission"
      errors={[
        inputNumber != null && inputNumber < 15 && "Enter a number greater than 14.",
        inputNumber != null && inputNumber % 2 !== 0 && "Make sure the number is even.",
        inputNumber === 42 && "42 is not allowed (don't ask why)",
      ]}
      required
    >
      <TextField type="number" min={15} bind:value={inputNumber} />
    </FormField>
    <FormField
      name="Eden"
      optional
    >
      <FileInput accept="image/*" bind:value={filesSelected} vertical />
      <div slot="message">
        don't worry, I don't bite
      </div>
    </FormField>
    <div class="flex">
      <Button filled>
        <Dot success />
        <Dot attention small class="ml" />
        <Dot info small class="ml" />
        <Dot danger class="ml" title="You're in trouble now, son." />
      </Button>
      <Popover position={PopoverPositions.BOTTOM}>
        <Button>
          <Badge>
            i have a popover
          </Badge>
        </Button>
        <div slot="popover-content">
          <PopoverButton>
            hello
          </PopoverButton>
        </div>
      </Popover>
      <Popover position={PopoverPositions.BOTTOM}>
        <Button>
          i have a popover too!
        </Button>
        <div
          slot="popover-content"
          style="background: white; padding: .3em; border: 1px solid gray;"
        >
          bad ideas inbound.
        </div>
      </Popover>
    </div>
    <!-- <RadioGroup items={colorItems} color bind:value={colorItem} name="colors" />
    <RadioGroup items={items} bind:value={item} name="numbers" />
    <CheckboxGroup items={items} max={1} name="numbers-check" /> -->
    <div class="dropdown-holder">
      <DropdownShell let:toggle>
        <Button on:click={toggle}>
          test me!
          <ChevronDownIcon size="24" class="ml dropdown-chevron" />
        </Button>
        <Dropdown top>
          <div class="padded">
            <Calendar year={2020} month={4} />
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
      <Tab
        class={dropdownTabSelected && 'selected'}
        value="page1"
        name="nav1"
        on:change={() => dropdownTabSelected = true}
      >
        Components
        <ChevronDownIcon size="24" class="tab-chevron" />
      </Tab>
      <Tab value="page2" name="nav1" on:change={() => dropdownTabSelected = false}>
        Installation
      </Tab>
      <Tab value="Showcase" name="nav1" />
    </div>
    <div class="flex">
      <Tabs name="nav2" items={['Showcase', 'Components']} />
    </div>
    <div class="flex">
      <Button on:click={() => open1 = true}>open modal 1</Button>
      <Button on:click={() => open2 = true}>open modal 2</Button>
      <Button on:click={() => open3 = true}>open dialog</Button>
      <Button on:click={() => showSnackbar({
        props: {
          text: 'Did it hurt when you fell from the vending machine? Cause you a snack ;)',
          action: { text: 'smooth' },
        },
      })}>
        show a snackbar
      </Button>
      <Button on:click={() => showSnackbar({ component: MySnackbar })}>
        show a custom snackbar
      </Button>
    </div>
    <Modal bind:open={open1} let:closeCallback>
      <ModalCard doYou="hear what I hear" {closeCallback} />
    </Modal>
    <Modal bind:open={open2} let:closeCallback>
      <ModalCard doYou="care if I care" {closeCallback} />
    </Modal>
    <Modal bind:open={open3} let:closeCallback>
      <ModalDialog {closeCallback} />
    </Modal>
    <div class="flex">
      <Accordion let:closeOtherPanels>
        <AccordionSection on:panel-open={closeOtherPanels} let:toggle>
          <div slot="handle">
            <Button on:click={toggle}>
              open first panel
              <ChevronDownIcon size=24 class="ml accordion-chevron" />
            </Button>
          </div>
          <Card>
            But until someday comes...
          </Card>
        </AccordionSection>
        <AccordionSection on:panel-open={closeOtherPanels} let:toggle>
          <div slot="handle">
            <Button on:click={toggle}>
              open second panel
              <ChevronDownIcon size=24 class="ml accordion-chevron" />
            </Button>
          </div>
          <Card>
            I'll be writing sad songs.
          </Card>
        </AccordionSection>
      </Accordion>
    </div>
  </Card>
</SnackbarContainer>

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

  .flex :global(.tab .tab-chevron) {
    transition: transform 150ms;
  }

  .flex :global(.tab.selected .tab-chevron) {
    transform: rotate(180deg);
  }

  :global(.ml) {
    margin-left: .4em;
  }

  :global(.mr) {
    margin-right: .4em;
  }
</style>
