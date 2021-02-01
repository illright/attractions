/**
 * Validates a File object against an `accept` parameter value.
 * @param {string | null} references comma-delimited list of reference MIME types (similar to `input`'s `accept` attribute)
 * @param {string} subject The MIME type of the file to be checked
 * @returns {boolean} Whether the file should be accepted
 */
export default function accepted(references, subject) {
  if (references == null) {
    return true;
  }

  const referencesArray = references
    .split(',')
    .map(value => value.trim().toLowerCase());
  return referencesArray.some(reference => matches(reference, subject));
}

/**
 * Handles the check with either an extension (beginning with a dot ".") or a MIME type pattern.
 * @param {string} reference The reference pattern
 * @param {string} subject The pattern to be checked
 * @returns {boolean} Whether the MIME types match
 */
function matches(reference, subject) {
  if (reference.startsWith('.')) {
    return subject.name.toLowerCase().endsWith(reference);
  }

  return checkMimeType(
    reference.toLowerCase(),
    (subject.type || '').toLowerCase()
  );
}

/**
 * Checks for compatibility of the reference MIME type pattern with the subject MIME type.
 *   Adapted from Chromium sources:
 *     https://source.chromium.org/chromium/chromium/src/+/master:net/base/mime_util.cc;l=413
 * @param {string} reference The reference pattern
 * @param {string} subject The pattern to be checked
 * @returns {boolean} Whether the MIME types are compatible
 */
function checkMimeType(reference, subject) {
  if (reference === '*' || reference === '*/*') {
    return true;
  }

  const parts = reference.split('*');
  if (parts.length === 1) {
    return reference === subject;
  }

  if (parts.length !== 2) {
    // Invalid reference pattern: multiple wildcards
    return false;
  }

  return subject.startsWith(parts[0]) && subject.endsWith(parts[1]);
}

// // true
// console.log(accepted('image/*,.pdf', { name: 'test.pdf', type: 'application/pdf' }));
// // true
// console.log(accepted('image/*,.pdf', { name: 'test.jpg', type: 'image/jpeg' }));
// // false
// console.log(accepted('image/*,.pdf', { name: 'test.webm', type: 'video/webm' }));
// // false
// console.log(accepted('audio/*', { name: 'test.webm', type: 'video/webm' }));
// // true
// console.log(accepted('audio/*', { name: 'test.mp3', type: 'audio/mp3' }));
// // false
// console.log(accepted('.jpg', { name: 'test.mp3', type: 'audio/mp3' }));
// // true
// console.log(accepted('.jpg', { name: 'test.jpg', type: 'image/jpeg' }));
// // false
// console.log(accepted('.jpg', { name: 'test.jpeg', type: 'image/jpeg' }));
// // true
// console.log(accepted('.jpg, .jpeg', { name: 'test.jpeg', type: 'image/jpeg' }));
