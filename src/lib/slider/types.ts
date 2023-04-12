export type TickConfig =
  | { mode: 'none' }
  | {
      mode: 'steps';
      step: number;
      subDensity?: number;
    }
  | {
      mode: 'values';
      values: number[];
      subDensity?: number;
    };
export type RangeBehavior = 'free' | 'block' | 'push';
export type SliderState = {
  value: number;
  activeHandle: number;
  min: number;
  max: number;
  sliderActive: boolean;
};
export type Tooltips = 'active' | 'always' | 'never';
