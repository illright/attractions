const consecutiveSpace = / {2,}/;

/**
 * Removes extra whitespace in class strings.
 * @param {string} classString The string to be trimmed
 * @returns {string} Clean class string
 */
export function stripClassWhitespace(classString) {
  return classString.replace(consecutiveSpace, ' ').trimRight();
}

/**
 * Filters out falsy classes.
 * @param {...(string | false | null)} args The classes to be filtered
 * @return {string} The classes without the falsy values
 */
export default function classes(...args) {
  return args.filter(cls => !!cls).join(' ');
}
