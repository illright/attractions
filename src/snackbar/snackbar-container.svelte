<script>
  import { setContext } from 'svelte';
  import Snackbar from './snackbar.svelte';
  import snackbarContextKey from './snackbar-context-key.js';

  export let position;
  let registeredSnackbars = new Set();

  function removeSnackbar(key, closedEarly) {
    registeredSnackbars.delete(key);
    if (key.resolveExpiredPromise != null) {
      key.resolveExpiredPromise(!closedEarly);
    }
    registeredSnackbars = registeredSnackbars;
  }

  function showSnackbar(options) {
    const {
      component = Snackbar,
      props = {},
      duration = 4000,
    } = options;

    const key = { component, props };
    key.props.closeCallback = function close() {
      clearTimeout(key.timeoutID);
      removeSnackbar(key, true);
    };
    key.timeoutID = setTimeout(removeSnackbar, duration, key, false);
    registeredSnackbars.add(key);
    registeredSnackbars = registeredSnackbars;

    return {
      close: key.props.closeCallback,
      expired: new Promise((resolve) => key.resolveExpiredPromise = resolve),
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
