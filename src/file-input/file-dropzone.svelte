<script>
  import Paperclip from './paperclip.svelte';
  import Plus from './plus.svelte';
  import FileTile from './file-tile.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';
  import ripple from '../_utils/ripple.js';

  let _class = null;
  export { _class as class };

  export let value = [];
  export let fileComponent = FileTile;
  export let accept = null;

  let dragActive = false;

  let emptyLayer;
  let dropzoneLayer;
  let inputElement;

  function mimeMatches(acceptedType, acceptedSubtype, fileType, fileSubtype) {
    if (acceptedType == null) {
      return true;
    }

    if (fileType == null) {
      return false;
    }

    if (acceptedType !== fileType) {
      return false;
    }

    if (acceptedSubtype === '*') {
      return true;
    }

    return acceptedSubtype === fileSubtype;
  }

  function acceptUpload(e) {
    let acceptedType = null;
    let acceptedSubtype = null;

    if (accept != null) {
      [acceptedType, acceptedSubtype] = accept.split('/');
    }

    for (let file of (e.dataTransfer || e.target).files) {
      let fileType = null;
      let fileSubtype = null;
      if (file.type != null) {
        [fileType, fileSubtype] = file.type.split('/');
      }

      if (mimeMatches(acceptedType, acceptedSubtype, fileType, fileSubtype)) {
        value.push(file);
      }
    }
    value = value;
    dispatch('change', { value, nativeEvent: e });
    inputElement.value = '';
    dragActive = false;
  }

  function deleteFile(thatFile) {
    value = value.filter(thisFile => thisFile !== thatFile);
    dispatch('change', { value });
  }

  function blockOnTiles(e) {
    if (e.target != emptyLayer
     && e.target != dropzoneLayer
     && e.target != inputElement) {
      e.preventDefault();
    }
  }

  const dispatch = createEventDispatcher();
</script>

<label
  class={classes('image-platform', _class)}
  class:has-content={value && value.length !== 0}
  on:click={blockOnTiles}
>
  <input
    type="file"
    multiple
    on:change={acceptUpload}
    bind:this={inputElement}
    {accept}
    {...$$restProps}
  />
  <div class="empty-layer" bind:this={emptyLayer}>
    <slot name="empty-layer">
      <Paperclip class="icon" />
      <div class="title">
        {#if !dragActive}
          drag &amp; drop here or click to upload files
        {:else}
          release to upload
        {/if}
      </div>
    </slot>
  </div>
  <div
    class="dropzone-layer"
    bind:this={dropzoneLayer}
    class:accepting={dragActive}
    on:dragover|preventDefault|stopPropagation
    on:dragenter={() => dragActive = true}
    on:dragleave={() => dragActive = false}
    on:drop|preventDefault|stopPropagation={acceptUpload}
    use:ripple
  >
    <Plus />
  </div>
  {#each value as file}
    <svelte:component this={fileComponent} {file} on:delete={() => deleteFile(file)} />
  {/each}
</label>

<style src="./file-dropzone.scss"></style>
