/* Validates a File object against an `accept` parameter value. */
export default function accepted(references, subject) {
  if (references == null) {
    return true;
  }

  const referencesArray = references.split(',').map(value => value.trim().toLowerCase());
  return referencesArray.some(reference => matches(reference, subject));
}

/* Handles the check with either an extension (beginning with a dot ".") or a MIME type pattern. */
function matches(reference, subject) {
  if (reference.startsWith('.')) {
    return subject.name.toLowerCase().endsWith(reference);
  }

  return checkMimeType(reference, (subject.type || '').toLowerCase());
}

/* Checks for compatibility of the reference MIME type pattern with the subject MIME type.
   Adapted from Chromium sources:
     https://source.chromium.org/chromium/chromium/src/+/master:net/base/mime_util.cc;l=413 */
function checkMimeType(reference, subject) {
  const baseReference = reference.split(';')[0].toLowerCase();
  const baseSubject = subject.split(';')[0].toLowerCase();

  if (baseReference === '*' || baseReference === '*/*') {
    return matchesMimeTypeParameters(reference, subject);
  }

  const parts = baseReference.split('*');
  if (parts.length === 1) {
    return (
      baseReference === baseSubject
      && matchesMimeTypeParameters(reference, subject)
    );
  }

  if (parts.length !== 2) {
    // Invalid reference pattern: multiple wildcards
    return false;
  }

  return (
    baseSubject.startsWith(parts[0])
    && baseSubject.endsWith(parts[1])
    && matchesMimeTypeParameters(reference, subject)
  );
}


/* Ensures that the parameters of the MIME types match, if any. */
function matchesMimeTypeParameters(reference, subject) {
  const semicolon = reference.indexOf(';');
  const subjectSemicolon = subject.indexOf(';');
  if (semicolon !== -1) {
    if (subjectSemicolon === -1) {
      return false;
    }

    const referenceParameters = splitIntoKeyValue(reference.slice(semicolon + 1));
    const subjectParameters = splitIntoKeyValue(subject.slice(subjectSemicolon + 1));

    if (referenceParameters.length > subjectParameters.length)
      return false;

    for (let [key, value] of referenceParameters.entries()) {
      if (subjectParameters.get(key) !== value) {
        return false;
      }
    }
  }

  return true;
}

/* Splits a string of the form 'key=value;key2=value2' into a map with lowercase keys. */
function splitIntoKeyValue(parameterString) {
  const params = new Map();
  if (parameterString === '') {
    return params;
  }

  for (let parameter of parameterString.split(';')) {
    const [key, value = null] = parameter.split('=');
    params.set(key.toLowerCase(), value);
  }

  return params;
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
