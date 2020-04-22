<script>
  import {
    Button,
    RadioGroup,
    Card,
    TextField,
  } from '@/index.js';

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
    { value: '#000000',},
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
</Card>
