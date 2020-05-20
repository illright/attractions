<script>
  import {
    Button,
    Card,
  } from '../src/index.js';
  import { fade } from 'svelte/transition';
</script>

<div class="my-snackbar" transition:fade>
  <Card>
    <strong>Wasn't expecting this?</strong>
    <div class="actions">
      <Button>nope</Button>
      <Button>sure wasn't</Button>
    </div>
  </Card>
</div>

<style>
  .my-snackbar {
    margin-top: 1em;
  }

  strong {
    margin-bottom: 1em;
    display: block;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
</style>
