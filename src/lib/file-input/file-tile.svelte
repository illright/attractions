<script lang="ts">
  import Trash2 from './trash-2.svelte';
  import Button from '../button/button.svelte';
  import { createEventDispatcher } from 'svelte';
  import formatFileSize from '../utils/format-file-size.js';
  import formatFileType from '../utils/format-file-type.js';

  /**
   * The File object to display.
   */
  export let file: File;

  const dispatch = createEventDispatcher<{ delete: File }>();
</script>

<div class="file-tile">
  <div class="filename" title={file.name}>{file.name}</div>
  <div class="properties">
    {formatFileSize(file.size)}
    •
    {formatFileType(file.name)}
  </div>
  <Button
    color="danger"
    shape="square"
    on:click={() => dispatch('delete', file)}
  >
    <Trash2 />
  </Button>
</div>

<style lang="scss">
  .file-tile {
    background: #fff;
    border-radius: var(--a-file-tile-radius);
    box-shadow: var(--a-shadow-1);
    color: var(--a-dark);
    display: grid;
    font-size: 0.9em;
    gap: 0.2em;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    padding: 0.5em;
    padding-left: 1.2em;
    z-index: 100;

    :global .btn {
      align-self: center;
      grid-column: 2;
      grid-row: 1 / 3;
    }

    .filename {
      align-self: end;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .properties {
      font-size: 0.85em;
      font-weight: var(--a-thin-font-weight);
    }
  }
</style>
