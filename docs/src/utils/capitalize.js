// Return the word with only the first letter uppercased
export default function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
