<script lang="ts">
  /**
   * @slot {{ wrongType: boolean; dragActive: boolean }} empty-layer
   */
  import Paperclip from './paperclip.svelte';
  import Plus from './plus.svelte';
  import FileTile from './file-tile.svelte';
  import { createEventDispatcher, type ComponentType } from 'svelte';
  import classes from '../utils/classes.js';
  import ripple from '../utils/ripple.js';
  import accepted from '../utils/accepted-file-type.js';

  let _class: string | false | null = null;
  export { _class as class };

  /**
   * The user's selection as an array of [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) objects.
   * Note: this is an actual `Array`, not a `FileList`, as opposed to the native `<input type="file">`.
   */
  export let files: File[] = [];
  /**
   * The component used to render a selected file.
   * Receives a single prop: `file`, the [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object.
   * Expected to dispatch `delete` events to delete this file from the selection with the `file` prop as the detail.
   */
  export let fileComponent: ComponentType<FileTile> = FileTile;
  /**
   * Limits the allowed files to particular types. For guidelines on the value of the attribute, consult the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept).
   */
  export let accept: string | null = null;
  /**
   * A callback to call for each file that passes the `accept` check before it is added to the `files`.
   * If it returns a Promise, they will be started for every file in parallel and awaited together at the end.
   */
  export let beforeChange: ((file: File) => void | Promise<void>) | null = null;
  /**
   * Whether the input should accept files.
   */
  export let disabled = false;
  /**
   * The maximum amount of files that the user can upload.
   */
  export let max = Infinity;

  let dragActive = false;
  let wrongType = false;

  let emptyLayer: HTMLDivElement;
  let dropzoneLayer: HTMLDivElement;
  let inputElement: HTMLInputElement;

  function checkTypesEarly(e: DragEvent) {
    if (e.dataTransfer == null) {
      wrongType = false;
      return;
    }
    wrongType = [...e.dataTransfer.items]
      .map(item => item.getAsFile())
      .some(file => file == null || !accepted(accept, file));
  }

  async function acceptUpload(ev: Event) {
    const e = ev as InputEvent & { currentTarget: HTMLInputElement };
    const incomingFiles: File[] = Array.from(
      (e.dataTransfer || e.currentTarget)?.files ?? []
    );
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

  function deleteFile({ detail: thatFile }: CustomEvent<File>) {
    files = files.filter(thisFile => thisFile !== thatFile);
    dispatch('change', { files });
  }

  function blockOnTiles(e: MouseEvent) {
    if (
      e.target != emptyLayer &&
      e.target != dropzoneLayer &&
      e.target != inputElement
    ) {
      e.preventDefault();
    }
  }

  const dispatch = createEventDispatcher<{
    change: { files: File[]; nativeEvent?: Event };
  }>();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
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
          <slot name="upload-unavailable-message">file upload unavailable</slot>
        {:else if wrongType}
          <slot name="incorrect-file-message">incorrect file type</slot>
        {:else if dragActive}
          <slot name="release-to-upload-message">release to upload</slot>
        {:else}
          <slot name="drag-and-drop-message">
            drag &amp; drop here or click to upload files
          </slot>
        {/if}
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
