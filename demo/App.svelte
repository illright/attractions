<script>
  import {
    Button,
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
    ModalOverlay,
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
    Calendar,
  } from '../src/index.js';
  import { SnackbarPositions } from '../src/snackbar';
  import { PopoverPositions } from '../src/popover';
  import ModalCard from './modal-card.svelte';
  import MySnackbar from './my-snackbar.svelte';
  import ModalDialog from './modal-dialog.svelte';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  let items = [
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
  let date = { start: new Date(), end: new Date() };
  date.start.setDate(2);

  function changeFromOutside() {
    date.start.setDate(1);
    date = date;
  }

  // $: console.log(date);

  let filesSelected = [];
  // $: console.log(filesSelected);
</script>

<SnackbarContainer position={SnackbarPositions.BOTTOM_LEFT} let:showSnackbar>
  <ModalOverlay>
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
    <a href="https://googles.com">say my name</a>

    <Card>
      <StarRating name="test" max={7} />
      <TextField label="Write something" outline />
      <DatePicker range bind:value={date} format="%m/%D/%Y" />
      <div class="flex">
        <Button filled on:click={changeFromOutside}>
          <Dot success />
          <Dot attention small class="ml" />
          <Dot info small class="ml" />
          <Dot danger class="ml" title="You're in trouble now, son." />
        </Button>
        <Popover position={PopoverPositions.BOTTOM}>
          <Button>
            i have a popover
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
        <DropdownShell let:toggle on:change={() => console.log('yay')}>
          <Button on:click={toggle}>
            test me!
            <ChevronDownIcon size="24" class="ml dropdown-chevron" />
          </Button>
          <Dropdown>
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
            action: { text: 'smooth', callback: () => console.log('thanks!') },
          },
        })}>
          show a snackbar
        </Button>
        <Button on:click={() => showSnackbar({ component: MySnackbar })}>
          show a custom snackbar
        </Button>
      </div>
      <Modal component={ModalCard} props={{ doYou: 'hear what I hear' }} bind:open={open1} />
      <Modal component={ModalCard} props={{ doYou: 'care if I care' }} bind:open={open2} />
      <Modal component={ModalDialog} bind:open={open3} />
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
  </ModalOverlay>
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
