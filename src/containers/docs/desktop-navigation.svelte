<script lang="ts">
  import { base } from '$app/paths';
  import { Button, Accordion, AccordionSection } from '$lib';
  import { ChevronDownIcon } from 'svelte-feather-icons';
  import type { Place } from './place';

  export let places: Place[];
  export let segment: string;

  $: currentPlace = places.find(place => place.segment === segment);
</script>

<nav class="desktop">
  <Accordion let:closeOtherPanels>
    {#each places as place}
      {#if typeof place.title === 'string'}
        {#if place.sub != null}
          <AccordionSection on:panel-open={closeOtherPanels}>
            <div slot="handle" let:toggle>
              <Button on:click={toggle}>
                {place.title}
                <ChevronDownIcon size="18" class="accordion-chevron ml" />
              </Button>
            </div>
            {#each place.sub as entry}
              <Button
                href="{base}/docs/{entry.segment}"
                selected={place === currentPlace}
              >
                {entry.title}
              </Button>
            {/each}
          </AccordionSection>
        {:else}
          <Button
            href="{base}/docs/{place.segment}"
            selected={place === currentPlace}
          >
            {place.title}
          </Button>
        {/if}
      {/if}
    {/each}
  </Accordion>
</nav>

<style lang="scss">
  @use 'sass:color';
  @use '$css/attractions-theme' as vars;

  nav {
    display: none;

    @media only screen and (min-width: 1024px) {
      border-right: 1px solid color.adjust(vars.$main, $alpha: -0.75);
      display: block;
      margin-right: 3em;
      min-width: 13em;
      padding: 0.5em 0.5em 0.5em 0;

      :global .btn {
        margin-bottom: 0.25em;
        white-space: nowrap;
      }

      :global .accordion {
        align-items: flex-start;
        display: flex;
        flex-direction: column;

        section {
          align-items: flex-start;
          border-left: 1px solid vars.$light-contrast;
          display: flex;
          flex-direction: column;
          margin: 0.5em 0 0.5em 1em;
          padding-left: 0.5em;
        }
      }
    }
  }
</style>
