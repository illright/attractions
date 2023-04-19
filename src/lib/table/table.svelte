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

<style lang="scss">
  table {
    border-collapse: separate;
    border-spacing: 0;
    display: block;
    margin-bottom: 1em;
    overflow-x: auto;

    th {
      padding: 0.5em 1em;
      text-align: start;

      &.center {
        text-align: center;
      }

      &.end {
        text-align: end;
      }
    }

    tr {
      &.alternating {
        &:nth-child(even) {
          background: hsla(var(--a-primary-hsl), 0.03);
        }
      }

      &:first-child {
        > td:first-child {
          border-top-left-radius: var(--a-table-radius);
        }

        > td:last-child {
          border-top-right-radius: var(--a-table-radius);
        }
      }

      &:last-child {
        > td {
          border-bottom-width: 1px;
        }

        > td:first-child {
          border-bottom-left-radius: var(--a-table-radius);
        }

        > td:last-child {
          border-bottom-right-radius: var(--a-table-radius);
        }
      }
    }

    td {
      border: 0 solid hsla(var(--a-primary-hsl), 0.25);
      border-width: 1px 0 0 1px;
      line-height: 1.3em;
      padding: 1em;
      text-align: start;

      &.center {
        text-align: center;
      }

      &.end {
        text-align: end;
      }

      &:last-child {
        border-right-width: 1px;
      }
    }
  }
</style>
