/**
 * Returns an 's' character to use for pluralization if the amount is not one.
 */
export default function pluralS(amount: number) {
  return amount === 1 ? '' : 's';
}
