/**
 * Returns an 's' character to use for pluralization if the amount is not one.
 * @param {number} amount
 * @returns {"" | "s"}
 */
export default function pluralS(amount) {
  return amount === 1 ? '' : 's';
}
