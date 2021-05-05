/**
 * This is needed to improve type inference in JSDoc, as it doesn't yet support `as const` assertions.
 * See [microsoft/TypeScript#30445](https://github.com/microsoft/TypeScript/issues/30445) for more details.
 * @type {{
 *  TOP: 'top',
 *  RIGHT: 'right',
 *  BOTTOM: 'bottom',
 *  LEFT: 'left',
 * }}
 */
const positions = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
};
export default Object.freeze(positions);
