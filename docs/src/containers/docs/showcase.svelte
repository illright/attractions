<script>
  import { Label } from 'attractions';
  import CopyableCode from 'src/components/docs/copyable-code.svelte';
</script>

<section class="showcase">
  <Label>Showcase</Label>
  <slot name="showcase" />
  <Label class="code">Source</Label>
  <CopyableCode>
    <slot name="source" />
  </CopyableCode>
</section>

<style src="../../../static/css/containers/docs/showcase.scss"></style>
