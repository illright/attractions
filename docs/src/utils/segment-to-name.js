// Return the word with only the first letter uppercased
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export default function segmentToName(segment) {
  return segment.split('-').map(capitalize).join(' ');
}
