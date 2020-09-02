<script>
  import { goto } from '@sapper/app';
  import { Tab, DropdownShell, Dropdown, Button } from 'attractions';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  export let places;
  export let segment;

  let currentPlace = places.find(place => place.segment === segment);

  function handleTabClick(place) {
    if (place.segment != null) {
      goto(`./docs/${place.segment}`);
    }
  }

  function clearSubmenu({ detail }) {
    if (!detail.value) {
      currentPlace = places.find(place => place.segment === segment);
    }
  }
</script>

<DropdownShell let:toggle on:change={clearSubmenu}>
  <nav class="mobile padded">
    {#each places as place}
      <Tab
        class={currentPlace != null && place.sub === currentPlace.sub && 'selected'}
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
  <Dropdown right>
    {#if currentPlace != null && currentPlace.sub != null}
      {#each currentPlace.sub as entry (entry.segment)}
        <Button href="./docs/{entry.segment}" on:click={toggle}>{entry.title}</Button>
      {/each}
    {/if}
  </Dropdown>
</DropdownShell>

<style src="../../../static/css/containers/docs/mobile-navigation.scss"></style>
