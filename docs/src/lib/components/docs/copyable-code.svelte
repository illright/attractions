<script>
  import { onMount } from 'svelte';
  import { Button } from 'attractions';
  import {
    CopyIcon,
    CheckIcon,
    FileTextIcon,
    TerminalIcon,
  } from 'svelte-feather-icons';
  import { writeText } from 'clipboard-polyfill';

  let self;
  let text = null;
  let copied = false;
  export let filename = null;
  export let terminal = false;

  onMount(() => {
    const preIndex = filename == null && terminal == false ? 0 : 1;
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
  {:else if terminal}
    <div class="filename">
      <TerminalIcon size="16" class="mr" />
      Terminal
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
