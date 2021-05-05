/**
 * This is needed to improve type inference in JSDoc, as it doesn't yet support `as const` assertions.
 * See [microsoft/TypeScript#30445](https://github.com/microsoft/TypeScript/issues/30445) for more details.
 * @type {{
 *  TOP_LEFT: 'top left',
 *  TOP_MIDDLE: 'top h-middle',
 *  TOP_RIGHT: 'top right',
 *  MIDDLE_RIGHT: 'v-middle right',
 *  BOTTOM_RIGHT: 'bottom right',
 *  BOTTOM_MIDDLE: 'bottom h-middle',
 *  BOTTOM_LEFT: 'bottom left',
 *  MIDDLE_LEFT: 'v-middle left',
 * }}
 */
const positions = {
  TOP_LEFT: 'top left',
  TOP_MIDDLE: 'top h-middle',
  TOP_RIGHT: 'top right',
  MIDDLE_RIGHT: 'v-middle right',
  BOTTOM_RIGHT: 'bottom right',
  BOTTOM_MIDDLE: 'bottom h-middle',
  BOTTOM_LEFT: 'bottom left',
  MIDDLE_LEFT: 'v-middle left',
};
export default Object.freeze(positions);
