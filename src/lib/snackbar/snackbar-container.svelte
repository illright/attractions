<script lang="ts">
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
  import { setContext, type ComponentProps, type ComponentType } from 'svelte';
  import Snackbar from './snackbar.svelte';
  import snackbarContextKey from './snackbar-context-key.js';
  import SnackbarPositions from './snackbar-positions.js';

  interface Key {
    component: ComponentType<Snackbar>;
    props: ComponentProps<Snackbar>;
    resolveExpiredPromise?: (flag: boolean) => void;
    timeoutID?: number;
  }

  /**
   * The position of the snackbar stack inside the container.
   */
  export let position = SnackbarPositions.BOTTOM_LEFT;
  let registeredSnackbars = new Set<Key>();

  function removeSnackbar(key: Key, closedEarly: boolean) {
    registeredSnackbars.delete(key);
    if (typeof key.resolveExpiredPromise === 'function') {
      key.resolveExpiredPromise(!closedEarly);
    }
    registeredSnackbars = registeredSnackbars;
  }

  /**
   * Show the snackbar with the given options
   */
  export function showSnackbar(options: {
    component: Key['component'];
    props: Key['props'];
    duration: number;
  }): {
    close: () => void;
    expired: Promise<boolean>;
  } {
    const {
      component = Snackbar,
      props = {} as Key['props'],
      duration = 4000,
    } = options;

    const key: Key = { component, props };
    const originalCloseCallback = props.closeCallback;
    key.props.closeCallback = function close() {
      clearTimeout(key.timeoutID);
      removeSnackbar(key, true);
      if (typeof originalCloseCallback === 'function') {
        originalCloseCallback();
      }
    };
    key.timeoutID = window.setTimeout(removeSnackbar, duration, key, false);
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
