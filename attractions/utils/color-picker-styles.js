/**
 * Generates the styles needed for displaying a radiobutton or a checkbox
 *  with the given color.
 * @param {string} hexColor The color (in `#XXXXXX` format)
 * @returns {string | null} The `style` string to be used on the element
 */
export default function getColorPickerStyles(hexColor) {
  if (hexColor == null) {
    return null;
  }

  if (hexColor.length !== 7) {
    console.error('Values of colored radio groups must be #XXXXXX hex colors.');
    return null;
  }

  let r, g, b, beforeR, beforeG, beforeB;
  const bgR = (r = parseInt(hexColor.slice(1, 3), 16));
  const bgG = (g = parseInt(hexColor.slice(3, 5), 16));
  const bgB = (b = parseInt(hexColor.slice(5, 7), 16));
  beforeR = beforeG = beforeB = 255;

  const whiteThreshold = 240;
  const gray = 153;
  if (r > whiteThreshold && g > whiteThreshold && b > whiteThreshold) {
    r = g = b = beforeR = beforeG = beforeB = gray;
  }

  return `background-color: rgb(${bgR}, ${bgG}, ${bgB});
          border-color: rgb(${r}, ${g}, ${b});
          --r: ${r}; --g: ${g}; --b: ${b};
          --before-r: ${beforeR};
          --before-g: ${beforeG};
          --before-b: ${beforeB};`;
}
