<script lang="ts" context="module">
  interface Header {
    text: string;
    value: string;
    align?: 'start' | 'center' | 'end';
  }
  type Item = { [value: string]: string | number };
</script>

<script lang="ts">
  import Label from '../typography/label.svelte';

  /**
   * @slot {{ header: Header; item: Item }} item
   * @slot {{ item: Item }} row
   */

  /**
   * The labels for the column headers.
   *
   * Each column header is an object with the following fields:
   * - `text` is the text to display;
   * - `value` is the name of the field to take from each object in `items` to put in this column;
   * - `align` is the alignment of the text in the column (`"start" | "center" | "end"`) and defaults to `"start"`.
   */
  export let headers: Array<Header> = [];
  /**
   * The actual data displayed in the table rows.
   * The keys of the objects have to belong to the `value`s of the headers.
   */
  export let items: Array<Item> = [];

  /**
   * Whether the table rows should have alternating background colors.
   */
  export let alternatingRows = true;
</script>

<table {...$$restProps}>
  <thead>
    <tr>
      {#each headers as header (header.value)}
        <th
          class:center={header.align === 'center'}
          class:end={header.align === 'end'}
        >
          <slot name="header-item" {header}>
            <Label>{header.text}</Label>
          </slot>
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each items as item}
      <tr class:alternating={alternatingRows}>
        {#each headers as header (header.value)}
          <td
            class:center={header.align === 'center'}
            class:end={header.align === 'end'}
          >
            <slot name="item" {header} {item}>
              {item[header.value]}
            </slot>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style src="./table.scss">
</style>
