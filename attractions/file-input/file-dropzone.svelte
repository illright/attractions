<script>
  import Paperclip from './paperclip.svelte';
  import Plus from './plus.svelte';
  import FileTile from './file-tile.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import ripple from '../utils/ripple.js';
  import accepted from '../utils/accepted-file-type.js';

  let _class = null;
  export { _class as class };

  export let files = [];
  export let fileComponent = FileTile;
  export let accept = null;
  export let disabled = false;

  let dragActive = false;
  let wrongType = false;

  let emptyLayer;
  let dropzoneLayer;
  let inputElement;

  function checkTypesEarly(e) {
    wrongType = [...e.dataTransfer.items].some(file => !accepted(accept, file));
  }

  function acceptUpload(e) {
    for (let file of (e.dataTransfer || e.target).files) {
      if (accepted(accept, file)) {
        files.push(file);
      }
    }
    files = files;
    setTimeout(() => wrongType = false, 1000);
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
  class={classes('file-platform', _class)}
  class:has-content={files && files.length !== 0}
  class:wrong-type={wrongType}
  class:disabled
  on:click={blockOnTiles}
>
  <input
    type="file"
    multiple
    on:change={acceptUpload}
    bind:this={inputElement}
    {accept}
    {disabled}
    {...$$restProps}
  />
  <div class="empty-layer" bind:this={emptyLayer}>
    <slot name="empty-layer">
      <Paperclip class="icon" />
      <div class="title">
        {#if disabled}
          file upload unavailable
        {:else if wrongType}
          incorrect file type
        {:else if dragActive}
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
    on:dragover|preventDefault|stopPropagation={checkTypesEarly}
    on:dragenter={() => dragActive = true}
    on:dragleave={() => { dragActive = false; wrongType = false; }}
    on:drop|preventDefault|stopPropagation={acceptUpload}
    use:ripple={{ disabled }}
  >
    <slot name="more-icon">
      <Plus class="plus" />
    </slot>
  </div>
  {#each files as file}
    <svelte:component this={fileComponent} {file} on:delete={() => deleteFile(file)} />
  {/each}
</label>

<style src="./file-dropzone.scss"></style>
