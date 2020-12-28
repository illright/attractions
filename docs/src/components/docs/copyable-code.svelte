<script>
  import { onMount } from 'svelte';
  import { Button } from 'attractions';
  import { CopyIcon, CheckIcon, FileTextIcon } from 'svelte-feather-icons';
  import { writeText } from 'clipboard-polyfill';

  let self;
  let text = null;
  let copied = false;
  export let filename = null;

  onMount(() => {
    const preIndex = (filename == null ? 0 : 1);
    text = self.children[preIndex].textContent;
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
  {#if filename != null}
    <div class="filename">
      <FileTextIcon size="16" class="mr" />
      {filename}
    </div>
  {/if}
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
