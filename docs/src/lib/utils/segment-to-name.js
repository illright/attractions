// Return the word with only the first letter uppercased
function capitalize(word) {
  if (word.length < 1) {
    return word;
  }

  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export default function segmentToName(segment) {
  return segment.split('/')[0].split('-').map(capitalize).join(' ');
}
