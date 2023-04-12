<script lang="ts">
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { Tab, DropdownShell, Dropdown, Button } from '$lib';
  import { HorizontalAlignment } from '$lib/dropdown';
  import { ChevronDownIcon } from 'svelte-feather-icons';
  import type { Place } from './place';

  export let places: Place[];
  export let segment: string;

  let currentPlace = places.find(place => place.segment === segment);

  function handleTabClick(place: Place) {
    if (place.segment != null) {
      goto(`${base}/docs/${place.segment}`);
    }
  }

  function clearSubmenu({ detail }: CustomEvent<{ value: boolean }>) {
    if (!detail.value) {
      currentPlace = places.find(place => place.segment === segment);
    }
  }
</script>

<DropdownShell let:toggle on:change={clearSubmenu}>
  <nav class="mobile padded">
    {#each places as place}
      <Tab
        class={currentPlace != null &&
          place.sub === currentPlace.sub &&
          'selected'}
        value={place}
        name="nav-mobile"
        bind:group={currentPlace}
        on:change={() => handleTabClick(place)}
        on:click={() => place.sub != null && toggle()}
      >
        {#if typeof place.title === 'string'}
          {place.title}
        {:else}
          <svelte:component this={place.title} size="24" />
        {/if}
        {#if place.sub != null}
          <ChevronDownIcon size="24" class="tab-chevron ml" />
        {/if}
      </Tab>
    {/each}
  </nav>
  <Dropdown horizontalAlignment={HorizontalAlignment.AUTO_END}>
    {#if currentPlace != null && currentPlace.sub != null}
      {#each currentPlace.sub as entry (entry.segment)}
        <Button href="{base}/docs/{entry.segment}" on:click={toggle}>
          {entry.title}
        </Button>
      {/each}
    {/if}
  </Dropdown>
</DropdownShell>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    margin: 0.5em 0 0;
    overflow: auto;
    padding-bottom: 0.5em;

    :global .tab {
      margin: 0 0.25em;

      .tab-chevron {
        transition: transform 150ms;
      }

      &.selected .tab-chevron {
        transform: rotate(180deg);
      }
    }

    @media only screen and (max-width: 479px) {
      padding-right: 0;

      &::after {
        content: '';
        display: block;
        flex: 1 0 0.5em;
        width: 0.5em;
      }
    }

    @media only screen and (min-width: 1024px) {
      display: none;
    }
  }

  nav + :global .dropdown {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    margin: -0.25em 0.5em 0.5em;
    padding: 0.5em;

    .btn {
      margin-top: 0.25em;
    }
  }
</style>
