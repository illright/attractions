/**
 * @typedef {import('./types').SliderState} State
 * @typedef {import('./types').TickConfig} TickConfig
 */

/**
 * Normalizes the event to be able to use the same handler for both mouse and touch events.
 * @param {MouseEvent | TouchEvent} e
 * @returns {Pick<MouseEvent, 'clientY' | 'clientX'>}
 */
function normalizeEvent(e) {
  if (e.type.includes('touch')) {
    return /** @type {TouchEvent}*/ (e).touches[0];
  } else {
    return /** @type {MouseEvent}*/ (e);
  }
}

/**
 * Get position of mouse or touch event.
 * @param {boolean} vertical
 * @param {MouseEvent | TouchEvent} e
 * @returns {number}
 */
export function getPosition(vertical, e) {
  const normalizedE = normalizeEvent(e);
  return vertical ? normalizedE.clientY : normalizedE.clientX;
}

/**
 * Stop event propagation and cancel default operation.
 * @param {Event} e
 */
export function stopEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

/**
 * Clamps the value to the provided min/max limits
 * @param {number} val
 * @param {{ min: number, max: number }} state
 * @returns {number}
 */
export function ensureValueInRange(val, { min, max }) {
  return Math.min(Math.max(val, min), max);
}

/**
 * Adjust resolution in-line with step.
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
 * @template T A generic parameter that flows through to the return type.
 * @param {T} v A value.
 * @return {T} The same value.
 */
export function id(v) {
  return v;
}

/**
 * Calculate all the possible values in the range.
 * @param {number} step The increment between each value and the next.
 * @param {{ min: number, max: number }} state The minimum and maximum values.
 * @returns {number[]} An array of all the possible values.
 */
export function getSteps(step, { min, max }) {
  const steps = (max - min) / step;
  return Array.from({ length: steps + 1 }, (_, i) => min + i * step);
}

/**
 * Get the list of ticks depending on the ticks' `mode`.
 * @param {TickConfig} ticks The ticks configuration.
 * @param {number} min
 * @param {number} max
 * @returns {number[]}
 */
export function getTickValues(ticks, min, max) {
  if (ticks.mode === 'steps') return getSteps(ticks.step, { min, max });
  if (ticks.mode === 'values' && Array.isArray(ticks.values))
    return [...ticks.values];
  return [];
}

/**
 * Get the subTick values depending on the density.
 * @param {TickConfig} ticks The ticks configuration.
 * @param {number} min
 * @param {number} max
 * @param {number[]} [tickValues=[]] The values of the major ticks (to avoid collision).
 * @returns {number[]}
 */
export function getSubTickPositions(ticks, min, max, tickValues = []) {
  if (ticks.mode === 'none') return [];
  const { subDensity } = ticks;
  if (!subDensity) return [];
  const step = ((max - min) / 100) * subDensity;
  const subTicks = getSteps(step, { min, max }).filter(
    tick => !tickValues.includes(tick)
  );
  return subTicks;
}

/**
 * Find the closest step, including ticks, to the given value.
 * @param {number} val The value to find the closest step for.
 * @param {{ ticks: TickConfig, step: number, min: number, max: number }} state
 * @returns {number}
 */
export function getClosestPoint(val, { ticks, step, min, max }) {
  const points = getTickValues(ticks, min, max);
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
 * Convert from slider value to percentage of the range [min .. max]
 * used for ticks too which are not an array value
 * @param {number} value
 * @param {{ min: number, max: number }} state
 * @returns {number}
 */
export function calcPercentOfRange(value, { min, max }) {
  const ratio = (value - min) / (max - min);
  return Math.max(0, ratio * 100);
}

/**
 * If using a single handle for the slider, give the user the value unnested.
 * @param {[number] | [number, number]} value
 * @returns {number | [number, number]}
 */
export function unnestSingle(value) {
  return value.length === 1 ? value[0] : value;
}

/**
 * @param {number} val
 * @param {{ ticks: TickConfig, step: number, min: number, max: number }} stateWithTicks
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
 * Find the handle closest to the given value.
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
