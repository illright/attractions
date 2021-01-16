/**
 * Format the file type from the extension.
 * @param {string} filename
 * @returns {string} The file extension (in upper case)
 */
export default function formatFileType(filename) {
  const fragments = filename.split('.');
  return fragments[fragments.length - 1].toUpperCase();
}
