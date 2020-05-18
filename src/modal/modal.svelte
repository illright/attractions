<script>
  import { getContext, onMount, onDestroy } from 'svelte';
  import modalContextKey from './modal-context-key.js';

  const { register, update, unregister } = getContext(modalContextKey);

  export let open = false;

  /* The component to use in creating a modal. */
  export let component;

  /* The props to pass to the modal component.
     It will also receive the `closeCallback` prop which can be used to close the modal. */
  export let props;

  let openState = null;
  let unsubscribe = null;

  $: syncOpenState(open);
  $: update(openState, props);

  /* Written out as a separate function to ensure
     that the reactive statement only depends on `open`. */
  function syncOpenState(openStateValue) {
    openState && openState.set(openStateValue);
  }

  onMount(() => {
    openState = register(component, props);
    unsubscribe = openState.subscribe((openStateValue) => {
      /* To prevent unneeded invalidation (if Svelte isn't smart enough not to) */
      if (open !== openStateValue) {
        open = openStateValue;
      }
    });
  });

  onDestroy(() => {
    unregister(openState);
    if (unsubscribe != null) {
      unsubscribe();
    }
  });
</script>
