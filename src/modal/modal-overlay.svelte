<script>
  import { setContext, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import modalContextKey from './modal-context-key.js';

  /* Stores modal registration objects.
     A key for such a registration is a store object
       that stores the open state of the modal. */
  let registeredModals = new Map();

  /* Meant to be bound to registration objects and used as a subscription function. */
  function updateOpenState(newState) {
    this.open = newState;
    registeredModals = registeredModals;
  }

  /* Register and render a new modal from the `component` and `props`.
     Will return the open state store
       – the object that is used for identifying the registration. */
  function register(component, props) {
    const openState = writable(false);
    const registration = { component, props, open: false };
    registration.unsubscribe = openState.subscribe(updateOpenState.bind(registration));

    registeredModals.set(openState, registration);
    return openState;
  }

  /* Unregister and destroy the modal that corresponds to this `openState`. */
  function unregister(openState) {
    const registration = registeredModals.get(openState);
    if (registration == null) {
      return;
    }

    registration.unsubscribe();
    registeredModals.delete(openState);
  }

  /* Pass new props to the modal that corresponds to this `openState`.
     Needed to support reactivity. */
  function updateProps(openState, newProps) {
    const registration = registeredModals.get(openState);
    if (registration == null) {
      return;
    }

    registration.props = newProps;
  }

  setContext(modalContextKey, { register, update: updateProps, unregister });

  onDestroy(() => {
    for (let registration of registeredModals.values()) {
      registration.unsubscribe();
    }
  });
</script>

<slot />
{#each [...registeredModals.entries()] as [openState, registration] (openState)}
  <div
    class="modal-overlay"
    class:open={registration.open}
    on:click|self={() => openState.set(false)}
  >
    <svelte:component
      this={registration.component}
      {...registration.props}
      closeCallback={() => openState.set(false)}
    />
  </div>
{/each}

<style src="./modal-overlay.scss"></style>
