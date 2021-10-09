import { calcPercentOfRange } from './utils';
/**
 * An action that sets the position styles of the slider's handle depending on the slider value.
 * @param {HTMLElement} node The handle element
 * @param {{active: boolean, vertical: boolean, value: number}} props
 */
export function handleStyle(node, props) {
  /**
   * @param {{active: boolean, vertical: boolean, value: number}} props
   */
  function applyStyles({ vertical, value, active }) {
    if (vertical) {
      node.style.setProperty('bottom', `${value}%`);
    } else {
      node.style.setProperty('left', `${value}%`);
    }
    node.style.setProperty('z-index', `${active ? 3 : 2}`);
  }

  applyStyles(props);
  return {
    update: applyStyles,
  };
}

/**
 * Converts the current value range to styles on the range element
 * @param {HTMLElement} node The range element
 * @param {{value: [number] | [number, number], vertical: boolean, min: number, max: number}} props
 */
export function rangeStyle(node, props) {
  /**
   * @type {Map<string, string>}
   */
  const styles = new Map();
  /**
   * @param {{value: [number] | [number, number], vertical: boolean}} props
   */
  function applyStyles({ value, vertical }) {
    const isRange = value.length > 1;
    for (const property of styles.keys()) {
      node.style.removeProperty(property);
    }
    styles.clear();
    const offsets = value.map(v => calcPercentOfRange(v, props));
    // if offsets have crossed over
    offsets.sort((a, b) => a - b);

    // this offset is the percent length of the track
    const offset = isRange ? offsets[1] - offsets[0] : offsets[0];
    const sizeKey = vertical ? 'height' : 'width';
    styles.set(sizeKey, `${offset}%`);

    if (isRange) {
      const offsetKey = vertical ? 'bottom' : 'left';
      styles.set(offsetKey, `${offsets[0]}%`);
    }
    for (const [property, value] of styles.entries()) {
      node.style.setProperty(property, value);
    }
  }

  applyStyles(props);

  return {
    update: applyStyles,
  };
}
