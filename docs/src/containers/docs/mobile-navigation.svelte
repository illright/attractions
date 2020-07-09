<script>
  import { goto, stores } from '@sapper/app';
  import { Tab, DropdownShell, Dropdown, Button } from 'attractions';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  const { page } = stores();

  export let places;
  let currentPlace = places.find(place => place.href === $page.path);

  function handleTabClick(place) {
    if (place.href != null) {
      goto(place.href);
    }
  }

  function clearSubmenu({ detail }) {
    if (!detail.value) {
      currentPlace = places.find(place => place.href === $page.path);
    }
  }
</script>

<DropdownShell open={currentPlace.sub != null} on:change={clearSubmenu}>
  <nav class="mobile padded">
    {#each places as place}
      <Tab
        class={place.sub === currentPlace.sub && 'selected'}
        value={place}
        name="nav-mobile"
        bind:group={currentPlace}
        on:change={() => handleTabClick(place)}
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
    {#if currentPlace.sub != null}
      {#each currentPlace.sub as entry (entry.href)}
        <Button href={entry.href}>{entry.title}</Button>
      {/each}
    {/if}
  </Dropdown>
</DropdownShell>

<style src="../../../static/css/containers/docs/mobile-navigation.scss"></style>
