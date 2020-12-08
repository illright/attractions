<script>
  import { Button, Accordion, AccordionSection } from 'attractions';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  export let places;
  export let segment;

  $: currentPlace = places.find(place => place.segment === segment);
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
              <Button
                href="./docs/{entry.segment}"
                selected={place === currentPlace}
              >
                {entry.title}
              </Button>
            {/each}
          </AccordionSection>
        {:else}
          <Button
            href="./docs/{place.segment}"
            selected={place === currentPlace}
          >
            {place.title}
          </Button>
        {/if}
      {/if}
    {/each}
  </Accordion>
</nav>

<style src="../../../static/css/containers/docs/desktop-navigation.scss">
</style>
