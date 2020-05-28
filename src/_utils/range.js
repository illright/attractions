/* Generates a semi-open range. */
export default function* range(start, end, step = 1) {
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

  for (let i = start; (start < end ? i < end : i > end); i += step) {
    yield i;
  }
}
