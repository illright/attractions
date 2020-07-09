<script>
  import { getContext } from 'svelte';
  import {
    Button,
    Card,
    TextField,
  } from 'attractions/index.js';
  import { snackbarContextKey } from 'attractions/snackbar';

  const showSnackbar = getContext(snackbarContextKey);

  export let doYou;
  export let closeCallback;
</script>

<Card>
  <h1>Do you {doYou}?</h1>
  <TextField />
  <Button on:click={closeCallback}>close this</Button>
  <Button on:click={() => showSnackbar({ props: { text: 'hello' } })}>
    show a snackbar
  </Button>
</Card>
