<script>
  import {
    Button,
    Card,
    TextField,
  } from '../src/index.js';

  export let doYou;
  export let closeCallback;
</script>

<Card>
  <h1>Do you {doYou}?</h1>
  <TextField />
  <Button on:click={closeCallback}>close this</Button>
</Card>
