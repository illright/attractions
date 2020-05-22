/* Format the file type from the extension. */
export default function formatFileType(filename) {
  const fragments = filename.split('.');
  return fragments[fragments.length - 1].toUpperCase();
}
