<script>
  import { setContext } from 'svelte';
  import Snackbar from './snackbar.svelte';
  import snackbarContextKey from './snackbar-context-key.js';

  export let position;
  let registeredSnackbars = new Set();

  function removeSnackbar(key) {
    registeredSnackbars.delete(key);
    registeredSnackbars = registeredSnackbars;
  }

  function showSnackbar(options) {
    const {
      component = Snackbar,
      props = {},
      duration = 3000,
    } = options;

    const key = { component, props };
    key.timeoutID = setTimeout(removeSnackbar, duration, key);
    registeredSnackbars.add(key);
    registeredSnackbars = registeredSnackbars;

    return function close() {
      clearTimeout(key.timeoutID);
      registeredSnackbars.delete(key);
      registeredSnackbars = registeredSnackbars;
    };
  }

  setContext(snackbarContextKey, showSnackbar);
</script>

<slot {showSnackbar} />
<div class="snackbar-stack {position}">
  {#each [...registeredSnackbars.values()] as key (key)}
    <svelte:component
      this={key.component}
      {...key.props}
    />
  {/each}
</div>

<style src="snackbar-container.scss"></style>
