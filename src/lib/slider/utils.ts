import type { SliderState as State, TickConfig } from './types';

/**
 * Normalizes the event to be able to use the same handler for both mouse and touch events.
 */
function normalizeEvent(
  e: MouseEvent | TouchEvent
): Pick<MouseEvent, 'clientY' | 'clientX'> {
  if (e.type.includes('touch')) {
    return (e as TouchEvent).touches[0];
  } else {
    return e as MouseEvent;
  }
}

/**
 * Get position of mouse or touch event.
 */
export function getPosition(vertical: boolean, e: MouseEvent | TouchEvent) {
  const normalizedE = normalizeEvent(e);
  return vertical ? normalizedE.clientY : normalizedE.clientX;
}

/**
 * Stop event propagation and cancel default operation.
 */
export function stopEvent(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}

type MinMax = Pick<State, 'min' | 'max'>;

/**
 * Clamps the value to the provided min/max limits
 */
export function ensureValueInRange(val: number, { min, max }: MinMax): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Adjust resolution in-line with step.
 */
export function getPrecision(step: number) {
  const stepString = step.toString();
  let precision = 0;
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  return precision;
}

/**
 * @param v A value.
 * @return The same value.
 */
export function id<T>(v: T): T {
  return v;
}

/**
 * Calculate all the possible values in the range.
 * @param step The increment between each value and the next.
 * @param state The minimum and maximum values.
 * @returns An array of all the possible values.
 */
export function getSteps(step: number, { min, max }: MinMax) {
  const steps = (max - min) / step;
  return Array.from({ length: steps + 1 }, (_, i) => min + i * step);
}

/**
 * Get the list of ticks depending on the ticks' `mode`.
 * @param {TickConfig} ticks The ticks configuration.
 */
export function getTickValues(ticks: TickConfig, min: number, max: number) {
  if (ticks.mode === 'steps') return getSteps(ticks.step, { min, max });
  if (ticks.mode === 'values' && Array.isArray(ticks.values))
    return [...ticks.values];
  return [];
}

/**
 * Get the subTick values depending on the density.
 * @param {TickConfig} ticks The ticks configuration.
 * @param tickValues The values of the major ticks (to avoid collision).
 */
export function getSubTickPositions(
  ticks: TickConfig,
  min: number,
  max: number,
  tickValues: number[] = []
) {
  if (ticks.mode === 'none') return [];
  const { subDensity } = ticks;
  if (!subDensity) return [];
  const step = ((max - min) / 100) * subDensity;
  const subTicks = getSteps(step, { min, max }).filter(
    tick => !tickValues.includes(tick)
  );
  return subTicks;
}

type StateWithTicks = {
  ticks: TickConfig;
  step: number;
  min: number;
  max: number;
};

/**
 * Find the closest step, including ticks, to the given value.
 * @param val The value to find the closest step for.
 */
export function getClosestPoint(
  val: number,
  { ticks, step, min, max }: StateWithTicks
) {
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
 */
export function calcPercentOfRange(value: number, { min, max }: MinMax) {
  const ratio = (value - min) / (max - min);
  return Math.max(0, ratio * 100);
}

/**
 * If using a single handle for the slider, give the user the value unnested.
 */
export function unnestSingle(value: [number] | [number, number]) {
  return value.length === 1 ? value[0] : value;
}

export function ensureValuePrecision(
  val: number,
  stateWithTicks: StateWithTicks
) {
  const { step } = stateWithTicks;
  const possiblePoint = getClosestPoint(val, stateWithTicks);
  const closestPoint = isFinite(possiblePoint) ? possiblePoint : 0;
  return step === null
    ? closestPoint
    : parseFloat(closestPoint.toFixed(getPrecision(step)));
}

/**
 * Find the handle closest to the given value.
 */
export function getClosestHandle(
  value: number,
  handleValues: [number] | [number, number]
) {
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
