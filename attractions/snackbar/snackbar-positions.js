/**
 * Identity function. Coerces string/number literals to literal types.
 * This is needed to improve type inference in JSDoc, as it doesn't yet support `as const` assertions.
 * See [microsoft/TypeScript#30445](https://github.com/microsoft/TypeScript/issues/30445) for more details.
 * @template {string | number} T
 * @param {T} v
 * @return {T}
 */
const id = v => v;

export default Object.freeze({
  // The types of all values would be detected as `string` if not using the `id` function
  TOP_LEFT: id('top left'),
  TOP_MIDDLE: id('top h-middle'),
  TOP_RIGHT: id('top right'),
  MIDDLE_RIGHT: id('v-middle right'),
  BOTTOM_RIGHT: id('bottom right'),
  BOTTOM_MIDDLE: id('bottom h-middle'),
  BOTTOM_LEFT: id('bottom left'),
  MIDDLE_LEFT: id('v-middle left'),
});
