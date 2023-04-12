/**
 * @typedef {import('svelte/transition').TransitionConfig} TransitionConfig
 */
import type { TransitionConfig } from 'svelte/transition';
/**
 * Create a transition that allows specifying a transition programmatically
 *  or disable it altogether.
 */
export default function dynamic<T>(
  node: Element,
  {
    transition = null,
    options = null,
  }: {
    transition: ((node: Element, options: T | null) => TransitionConfig) | null;
    options: T | null;
  }
) {
  if (transition === null) {
    return {
      delay: 0,
      duration: 0,
      css: () => '',
    };
  }

  return transition(node, options);
}
