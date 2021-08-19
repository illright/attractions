<script>
  /**
   * @slot {{ showSnackbar: <Props extends Record<string, any>>(options: {
   *   component: import('svelte').SvelteComponentTyped<Props>,
   *   props: Props,
   *   duration: number,
   * }) => {
   *   close: () => void,
   *   expired: Promise<boolean>,
   * } }}
   */
  import { setContext } from 'svelte';
  import Snackbar from './snackbar.svelte';
  import snackbarContextKey from './snackbar-context-key.js';
  import SnackbarPositions from './snackbar-positions.js';

  /**
   * The position of the snackbar stack inside the container.
   * @typedef {typeof import('./snackbar-positions').default} SnackbarPositions
   * @type {SnackbarPositions[keyof SnackbarPositions]}
   */
  export let position = SnackbarPositions.BOTTOM_LEFT;
  let registeredSnackbars = new Set();

  function removeSnackbar(key, closedEarly) {
    registeredSnackbars.delete(key);
    if (typeof key.resolveExpiredPromise === 'function') {
      key.resolveExpiredPromise(!closedEarly);
    }
    registeredSnackbars = registeredSnackbars;
  }

  /**
   * Show the snackbar with the given options
   * @type {<Props extends Record<string, any>>(options: {
   *   component: import('svelte').SvelteComponentTyped<Props>,
   *   props: Props,
   *   duration: number,
   * }) => {
   *   close: () => void,
   *   expired: Promise<boolean>,
   * }}
   */
  export function showSnackbar(options) {
    const { component = Snackbar, props = {}, duration = 4000 } = options;

    const key = { component, props };
    const originalCloseCallback = props.closeCallback;
    key.props.closeCallback = function close() {
      clearTimeout(key.timeoutID);
      removeSnackbar(key, true);
      if (typeof originalCloseCallback === 'function') {
        originalCloseCallback();
      }
    };
    key.timeoutID = setTimeout(removeSnackbar, duration, key, false);
    registeredSnackbars.add(key);
    registeredSnackbars = registeredSnackbars;

    return {
      close: key.props.closeCallback,
      expired: new Promise(resolve => (key.resolveExpiredPromise = resolve)),
    };
  }

  setContext(snackbarContextKey, showSnackbar);
</script>

<slot {showSnackbar} />
<div class="snackbar-stack {position}">
  {#each [...registeredSnackbars.values()] as key (key)}
    <svelte:component this={key.component} {...key.props} />
  {/each}
</div>

<style src="snackbar-container.scss">
</style>
