<script>
  import { onMount } from 'svelte';
  import { Button } from 'attractions';
  import { CopyIcon, CheckIcon } from 'svelte-feather-icons';
  import { writeText } from 'clipboard-polyfill';

  let self;
  let text = null;
  let copied = false;

  onMount(function extractCodeToCopy() {
    text = self.children[0].textContent;
  });

  async function copy() {
    if (text == null) {
      return;
    }

    try {
      await writeText(text);
      copied = true;
      setTimeout(() => (copied = false), 1000);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<div class="copyable" bind:this={self}>
  <slot />
  <Button small round title="Copy" on:click={copy}>
    {#if copied}
      <CheckIcon size="20" />
    {:else}
      <CopyIcon size="20" />
    {/if}
  </Button>
</div>

<style src="../../../static/css/components/docs/copyable-code.scss">
</style>
