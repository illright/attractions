<script>
  /**
   * @slot {{ wrongType: boolean; dragActive: boolean }} empty-layer
   * @event {{ files: File[]; nativeEvent?: Event }} change
   */
  import Paperclip from './paperclip.svelte';
  import Plus from './plus.svelte';
  import FileTile from './file-tile.svelte';
  import { createEventDispatcher } from 'svelte';
  import classes from '../utils/classes.js';
  import ripple from '../utils/ripple.js';
  import accepted from '../utils/accepted-file-type.js';

  let _class = null;
  export { _class as class };

  /**
   * The user's selection as an array of [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) objects.
   * Note: this is an actual `Array`, not a `FileList`, as opposed to the native `<input type="file">`.
   * @type {File[]}
   */
  export let files = [];
  /**
   * The component used to render a selected file.
   * Receives a single prop: `file`, the [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object.
   * Expected to dispatch `delete` events to delete this file from the selection with the `file` prop as the detail.
   * @type {SvelteComponentTyped<{ file: File }, { delete: CustomEvent<File> }>}
   */
  export let fileComponent = FileTile;
  /**
   * Limits the allowed files to particular types. For guidelines on the value of the attribute, consult the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept).
   * @type {string | null}
   */
  export let accept = null;
  /**
   * A callback to call for each file that passes the `accept` check before it is added to the `files`.
   * If it returns a Promise, they will be started for every file in parallel and awaited together at the end.
   * @type {((file: File) => void | Promise<void>) | null}
   */
  export let beforeChange = null;
  /**
   * Whether the input should accept files.
   * @type {boolean}
   */
  export let disabled = false;
  /**
   * The maximum amount of files that the user can upload.
   * @type {number}
   */
  export let max = Infinity;

  let dragActive = false;
  let wrongType = false;

  let emptyLayer;
  let dropzoneLayer;
  let inputElement;

  function checkTypesEarly(e) {
    wrongType = [...e.dataTransfer.items].some(file => !accepted(accept, file));
  }

  async function acceptUpload(e) {
    const incomingFiles = Array.from((e.dataTransfer || e.target).files);
    await Promise.all(
      incomingFiles.map(async file => {
        try {
          if (typeof beforeChange === 'function') {
            await beforeChange(file);
          }
        } catch (e) {
          return;
        }

        if (accepted(accept, file) && files.length < max) {
          files.push(file);
        }
      })
    );

    files = files;
    setTimeout(() => (wrongType = false), 1000);
    dispatch('change', { files, nativeEvent: e });
    inputElement.value = '';
    dragActive = false;
  }

  function deleteFile({ detail: thatFile }) {
    files = files.filter(thisFile => thisFile !== thatFile);
    dispatch('change', { files });
  }

  function blockOnTiles(e) {
    if (
      e.target != emptyLayer &&
      e.target != dropzoneLayer &&
      e.target != inputElement
    ) {
      e.preventDefault();
    }
  }

  const dispatch = createEventDispatcher();
</script>

<label
  class={classes('file-dropzone', _class)}
  class:has-content={files && files.length !== 0}
  class:wrong-type={wrongType}
  class:disabled={disabled || files.length >= max}
  on:click={blockOnTiles}
>
  <input
    type="file"
    multiple
    on:change={acceptUpload}
    bind:this={inputElement}
    {accept}
    disabled={disabled || files.length >= max}
    {...$$restProps}
  />
  <div class="empty-layer" bind:this={emptyLayer}>
    <slot name="empty-layer" {wrongType} {dragActive}>
      <Paperclip class="icon" />
      <div class="title">
        {#if disabled}
          file upload unavailable
        {:else if wrongType}
          incorrect file type
        {:else if dragActive}
          release to upload
        {:else}drag &amp; drop here or click to upload files{/if}
      </div>
    </slot>
  </div>
  <div
    class="dropzone-layer"
    bind:this={dropzoneLayer}
    class:accepting={dragActive}
    on:dragover|preventDefault|stopPropagation={checkTypesEarly}
    on:dragenter={() => (dragActive = true)}
    on:dragleave={() => {
      dragActive = false;
      wrongType = false;
    }}
    on:drop|preventDefault|stopPropagation={acceptUpload}
    use:ripple={{ disabled: disabled || files.length >= max }}
  >
    {#if files.length < max}
      <slot name="more-icon">
        <Plus class="plus" />
      </slot>
    {/if}
  </div>
  {#each files as file (file)}
    <svelte:component this={fileComponent} {file} on:delete={deleteFile} />
  {/each}
</label>

<style src="./file-dropzone.scss">
</style>
