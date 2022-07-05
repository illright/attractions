/**
 * @typedef {import('svelte/transition').TransitionConfig} TransitionConfig
 */
/**
 * Create a transition that allows specifying a transition programmatically
 *  or disable it altogether.
 * @template T
 * @param {Element} node
 * @param {{ transition: (node: Element; options: T) => TransitionConfig; options: T }} options
 * @returns {TransitionConfig}
 */
export default function dynamic(node, { transition = null, options = null }) {
  if (transition === null) {
    return {
      delay: 0,
      duration: 0,
      css: () => '',
    };
  }

  return transition(node, options);
}
