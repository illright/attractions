<script>
  import { onMount } from 'svelte';
  import { Popover } from 'attractions';
  import { PopoverPositions } from 'attractions/popover';

  export let value;
  let preview;

  onMount(function setBoxShadow() {
    preview.style.boxShadow = value.slice(0, -1);
  });
</script>

<Popover position={PopoverPositions.LEFT}>
  <div class="preview" bind:this={preview}>hover me</div>
  <div slot="popover-content" class="value-popover">
    {value.replace(/\), /g, '),\n')}
  </div>
</Popover>

<style src="../../../static/css/components/docs/shadow-preview.scss">
</style>
