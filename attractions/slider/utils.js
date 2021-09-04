/**
 * @typedef {import('./types').SliderState} State
 * @typedef {import('./types').TickConfig} TickConfig
 */

/**
 * to use mouse and touch events in same handler
 * @param {MouseEvent | TouchEvent} e
 * @returns {Event}
 */
function normalizeEvent(e) {
  if (e.type.includes('touch')) {
    return e.touches[0];
  } else {
    return e;
  }
}
/**
 * get position of mouse or touch event
 * @param {boolean} vertical
 * @param {MouseEvent | TouchEvent} e
 * @returns {number}
 */
export function getPosition(vertical, e) {
  const normalizedE = normalizeEvent(e);
  return vertical ? normalizedE.clientY : normalizedE.clientX;
}

/**
 *  stop event
 * @param {Event} e
 */
export function stopEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}
/**
 * if value is outside of range return min or max limit
 * @param {number} val
 * @param {State} state
 * @returns {number}
 */
export function ensureValueInRange(val, { min, max }) {
  if (val <= min) {
    return min;
  }
  if (val >= max) {
    return max;
  }
  return val;
}

/**
 * adjust resolution in-line with step
 * @param {number} step
 * @returns {number}
 */
export function getPrecision(step) {
  const stepString = step.toString();
  let precision = 0;
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  return precision;
}
/**
 * @template T
 * @param {T} x - A generic parameter that flows through to the return type
 * @return {T}
 */
export function id(v) {
  return v;
}

/**
 * calculate all the possible values on the scale
 * @param {number} step
 * @param {State} state
 * @returns {number[]}
 */
export function getSteps(step, { min, max }) {
  const steps = (max - min) / step;
  return [
    ...new Set([
      min,
      ...Array.from({ length: steps + 1 }, (_, i) => min + i * step).filter(
        s => s < max
      ),
      max,
    ]),
  ];
}

/**
 *  get list of ticks based on the ticks 'mode'
 * @param {TickConfig} ticks
 * @param {number} min
 * @param {number} max
 * @returns {number[]}
 */
export function getTickValues(ticks, min, max) {
  const { mode, step, filter, values } = ticks;
  const f = filter ? list => list.filter(filter) : id;
  return mode === 'step'
    ? f(getSteps(step, { min, max }))
    : mode === 'values' && values
    ? // important to create new array here!
      f([...values])
    : [];
}

/**
 *  get subTick values based on density
 * @param {TickConfig} ticks
 * @param {number} min
 * @param {number} max
 * @param {number[]} tickValues
 * @returns {number[]}
 */
export function getSubTickPositions(ticks, min, max, tickValues = []) {
  const { subDensity } = ticks;
  const step = ((max - min) / 100) * subDensity;
  const subTicks = [];
  for (let i = min; i < max; i += step) {
    if (!tickValues.includes(Math.floor(i))) {
      subTicks.push(i);
    }
  }
  return subTicks;
}

/**
 * find the closest step, including ticks, to a selected point
 * @param {number} val
 * @param {State & TickConfig} state
 * @returns {number}
 */
export function getClosestPoint(val, { ticks, step, min, max }) {
  const points = getTickValues({ ticks, min, max });
  if (step !== null) {
    const baseNum = 10 ** getPrecision(step);
    const maxSteps = Math.floor(
      (max * baseNum - min * baseNum) / (step * baseNum)
    );
    const steps = Math.min((val - min) / step, maxSteps);
    const closestStep = Math.round(steps) * step + min;
    points.push(closestStep);
  }
  const diffs = points.map(point => Math.abs(val - point));
  return points[diffs.indexOf(Math.min(...diffs))];
}

/**
 * convert from slider value to percentage of min between max
 * used for ticks too which are not an array value
 * @param {number} value
 * @param {State} state
 * @returns {number}
 */
export function calcPercentOfRange(value, { min, max }) {
  const ratio = (value - min) / (max - min);
  return Math.max(0, ratio * 100);
}

/**
 * if a single handle give user value unnested
 * @param {number | number[]} value
 * @returns {number | number[]}
 */
export function unnestSingle(value) {
  return value.length === 1 ? value[0] : value;
}

/**
 * @param {number} val
 * @param {State & TickConfig} stateWithTicks
 * @returns {number}
 */
export function ensureValuePrecision(val, stateWithTicks) {
  const { step } = stateWithTicks;
  const possiblePoint = getClosestPoint(val, stateWithTicks);
  const closestPoint = isFinite(possiblePoint) ? possiblePoint : 0;
  return step === null
    ? closestPoint
    : parseFloat(closestPoint.toFixed(getPrecision(step)));
}

/**
 * @type {Record<string, string>}
 */
export const warnOnceWarnings = {};
/**
 * warn once in development
 * @param {string} msg
 */
export function warnOnce(msg) {
  if (
    process.env.NODE_ENV === 'development' &&
    Boolean(msg) &&
    !warnOnceWarnings[msg]
  ) {
    warnOnceWarnings[msg] = true;
    // eslint-disable-next-line no-console
    console.warn(`slider: ${msg}`);
  }
}

/**
 * @param {number} value
 * @param {[number] | [number, number]} handleValues
 * @returns {number}
 */
export function getClosestHandle(value, handleValues) {
  let closestHandleIndex = 0;
  for (let i = 1; i < handleValues.length - 1; i += 1) {
    if (value >= handleValues[i]) {
      closestHandleIndex = i;
    }
  }
  if (
    Math.abs(handleValues[closestHandleIndex + 1] - value) <
    Math.abs(handleValues[closestHandleIndex] - value)
  ) {
    closestHandleIndex += 1;
  }
  return closestHandleIndex;
}
