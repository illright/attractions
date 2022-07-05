/**
 * Format the file type from the extension.
 * @returns The file extension (in upper case)
 */
export default function formatFileType(filename: string) {
  const fragments = filename.split('.');
  return fragments[fragments.length - 1].toUpperCase();
}
