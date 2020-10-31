<svelte:options tag="a-divider" />

<script>
  export let text = null;
</script>

<hr data-text={text} {...$$restProps} />

<style src="./divider.scss"></style>
