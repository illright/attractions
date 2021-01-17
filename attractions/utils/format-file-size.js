/**
 * Format the file size in bytes to a human-readable format.
 * Adapted from https://stackoverflow.com/a/14919494/5726823
 * @param {number} bytes The size of the file in bytes
 * @returns {string}
 */
export default function formatFileSize(bytes) {
  const threshold = 1000;

  if (Math.abs(bytes) < threshold) {
    return bytes + ' B';
  }

  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let u = -1;
  const r = 10;

  do {
    bytes /= threshold;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= threshold &&
    u < units.length - 1
  );

  return bytes.toFixed(1) + ' ' + units[u];
}
