<script>
  export let value;
  export let bordered = false;
</script>

<div class="preview">
  <div class="color" class:bordered style="background: {value};" />
  {value}
</div>

<style src="../../../static/css/components/docs/color-preview.scss">
</style>
