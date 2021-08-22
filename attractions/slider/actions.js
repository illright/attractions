import { calcPercentOfRange } from './utils';
/**
 *
 * @param {HTMLElement} node
 * @param {{active: boolean, vertical: boolean, value: number, min: number, max: number}} props
 */
export function handleStyle(node, props) {
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
    update(props) {
      applyStyles(props);
    },
  };
}

/**
 * converts current value range to styles on the range element
 * @param {HTMLElement} node
 * @param {{min: number, max: number, value: [number] | [number, number], vertical: boolean}} props
 * @returns {void}
 */
export function rangeStyle(node, props) {
  /**
   * @type {Map<string, string>}
   */
  const styles = new Map();

  function applyStyles({ value, vertical }) {
    const isRange = value.length > 1;
    if (styles.size > 0) {
      for (const property of styles.keys()) {
        node.style.setProperty(property, '');
      }
      styles.clear();
    }
    const offsets = value.map((_, i) => calcPercentOfRange(value[i], props));
    // if offsets have crossed over
    offsets.sort();
    // this offset is the percent length of the track
    const offset = isRange ? offsets[1] - offsets[0] : offsets[0];
    if (vertical) {
      styles.set('height', `${offset}%`);
    } else {
      styles.set('width', `${offset}%`);
    }
    if (isRange) {
      if (vertical) {
        styles.set('bottom', `${offsets[0]}%`);
      } else {
        styles.set('left', `${offsets[0]}%`);
      }
    }

    for (const [property, value] of styles.entries()) {
      node.style.setProperty(property, value);
    }
  }

  applyStyles(props);

  return {
    update(props) {
      applyStyles(props);
    },
  };
}
