<script>
  import Label from '../typography/label.svelte';

  /**
   * @typedef {{
   *  text: string;
   *  value: string;
   *  align?: "start" | "center" | "end";
   * }} Header
   * @typedef {{[value: string]: string | number}} Item
   *
   * @slot {{ header: Header; item: Item }} item
   * @slot {{ item: Item }} row
   */

  /**
   * The header row of the table. `text` is the text to display, and `value` is used to link the row data.
   * @type {Array<Header>}
   */
  export let headers = [];
  /**
   * The actual data displayed in the table rows.
   * The keys of the objects have to belong to the `value`s of the headers.
   * @type {Array<Item>}
   */
  export let items = [];

  /**
   * Rows should have alternating background colors.
   * @type {boolean}
   */
  export let alternatingRows = true;
</script>

<table {...$$restProps}>
  <slot>
    <slot name="header">
      <thead>
        <tr>
          {#each headers as header (header.value)}
            <th
              class:center={header.align === 'center'}
              class:end={header.align === 'end'}
            >
              <Label>{header.text}</Label>
            </th>
          {/each}
        </tr>
      </thead>
    </slot>
    <slot name="body">
      <tbody>
        {#each items as item}
          <slot name="row" {item}>
            <tr class:alternating={alternatingRows}>
              {#each headers as header (header.value)}
                <slot name="item" {header} {item}>
                  <td
                    class:center={header.align === 'center'}
                    class:end={header.align === 'end'}
                  >
                    {item[header.value]}
                  </td>
                </slot>
              {/each}
            </tr>
          </slot>
        {/each}
      </tbody>
    </slot>
  </slot>
</table>

<style src="./table.scss">
</style>
