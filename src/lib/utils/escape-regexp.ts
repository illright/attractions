/**
 * Escapes any RegEx symbols found in the string to be able to use the string as it is in a RegEx constructor
 *  Taken from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping)
 * @param string The string to escaped for use in a RegEx
 */
export default function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
