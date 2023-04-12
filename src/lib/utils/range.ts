/**
 * Generates a semi-open range.
 * @param start The beginning of the range (included)
 * @param end The end of the range (excluded)
 * @param step The distance between the numbers in the range
 */
export default function* range(start: number, end?: number, step = 1) {
  if (end == null) {
    end = start;
    start = 0;
  }

  if (step === 0) {
    throw new Error('Range must have a non-zero step.');
  }

  if ((start >= end && step > 0) || (start <= end && step < 0)) {
    return;
  }

  for (let i = start; start < end ? i < end : i > end; i += step) {
    yield i;
  }
}
