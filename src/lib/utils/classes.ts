const consecutiveSpace = / {2,}/;

/**
 * Removes extra whitespace in class strings.
 * @param classString The string to be trimmed
 * @returns Clean class string
 */
export function stripClassWhitespace(classString: string) {
  return classString.replace(consecutiveSpace, ' ').trimEnd();
}

/**
 * Filters out falsy classes.
 * @param args The classes to be filtered
 * @return The classes without the falsy values
 */
export default function classes(...args: (string | false | null)[]) {
  return args.filter(cls => !!cls).join(' ');
}
