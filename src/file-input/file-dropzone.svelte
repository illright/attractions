<script>
  import Paperclip from './paperclip.svelte';
  import Plus from './plus.svelte';
  import FileTile from './file-tile.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../_utils/classes.js';
  import ripple from '../_utils/ripple.js';

  let _class = null;
  export { _class as class };

  export let files = [];
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
        files.push(file);
      }
    }
    files = files;
    dispatch('change', { files, nativeEvent: e });
    inputElement.value = '';
    dragActive = false;
  }

  function deleteFile(thatFile) {
    files = files.filter(thisFile => thisFile !== thatFile);
    dispatch('change', { files });
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
  class:has-content={files && files.length !== 0}
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
        {#if dragActive}
          release to upload
        {:else}
          drag &amp; drop here or click to upload files
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
    <slot name="more-icon">
      <Plus />
    </slot>
  </div>
  {#each files as file}
    <svelte:component this={fileComponent} {file} on:delete={() => deleteFile(file)} />
  {/each}
</label>

<style src="./file-dropzone.scss"></style>
