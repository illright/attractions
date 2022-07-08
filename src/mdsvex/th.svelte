<script lang="ts">
  import { Label } from '$lib';
</script>

<th>
  <Label>
    <slot />
  </Label>
</th>

<style lang="scss">
  th {
    padding: 0.5em 1em;
    text-align: left;
  }
</style>
