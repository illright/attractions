/**
 * This is needed to improve type inference in JSDoc, as it doesn't yet support `as const` assertions.
 * See [microsoft/TypeScript#30445](https://github.com/microsoft/TypeScript/issues/30445) for more details.
 * @type {{
 *  AUTO_START: 'auto-start',
 *  AUTO_END: 'auto-end',
 *  START: 'start',
 *  END: 'end',
 * }}
 */
export const HorizontalAlignment = {
  AUTO_START: 'auto-start',
  AUTO_END: 'auto-end',
  START: 'start',
  END: 'end',
};

/**
 * This is needed to improve type inference in JSDoc, as it doesn't yet support `as const` assertions.
 * See [microsoft/TypeScript#30445](https://github.com/microsoft/TypeScript/issues/30445) for more details.
 * @type {{
 *  AUTO_BOTTOM: 'auto-bottom',
 *  AUTO_TOP: 'auto-top',
 *  BOTTOM: 'bottom',
 *  TOP: 'top',
 * }}
 */
export const VerticalAlignment = {
  AUTO_BOTTOM: 'auto-bottom',
  AUTO_TOP: 'auto-top',
  BOTTOM: 'bottom',
  TOP: 'top',
};

Object.freeze(HorizontalAlignment);
Object.freeze(VerticalAlignment);
