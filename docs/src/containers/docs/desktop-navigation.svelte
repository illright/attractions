<script>
  import { stores } from '@sapper/app';
  import { Button, Accordion, AccordionSection } from 'attractions';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  const { page } = stores();

  export let places;
  $: currentPlace = places.find(place => place.href === $page.path);
</script>

<nav class="desktop">
  <Accordion let:closeOtherPanels>
    {#each places as place}
      {#if typeof place.title === 'string'}
        {#if place.sub != null}
          <AccordionSection on:panel-open={closeOtherPanels} let:toggle>
            <div slot="handle">
              <Button on:click={toggle}>
                {place.title}
                <ChevronDownIcon size="18" class="accordion-chevron ml" />
              </Button>
            </div>
            {#each place.sub as entry}
              <Button href={entry.href} selected={place === currentPlace}>
                {entry.title}
              </Button>
            {/each}
          </AccordionSection>
        {:else}
          <Button href={place.href} selected={place === currentPlace}>
            {place.title}
          </Button>
        {/if}
      {/if}
    {/each}
  </Accordion>
</nav>

<style src="../../../static/css/containers/docs/desktop-navigation.scss"></style>
