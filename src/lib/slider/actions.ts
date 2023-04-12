import { calcPercentOfRange } from './utils';

type HandleStyleProps = {
  active: boolean;
  vertical: boolean;
  value: number;
};

/**
 * An action that sets the position styles of the slider's handle depending on the slider value.
 */
export function handleStyle(node: HTMLElement, props: HandleStyleProps) {
  function applyStyles({ vertical, value, active }: HandleStyleProps) {
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

type RangeStyleProps = {
  value: [number] | [number, number];
  vertical: boolean;
  min: number;
  max: number;
};

/**
 * Converts the current value range to styles on the range element
 * @param node The range element
 */
export function rangeStyle(node: HTMLElement, props: RangeStyleProps) {
  const styles = new Map<string, string>();

  function applyStyles({ value, vertical }: RangeStyleProps) {
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
