/**
 * @typedef {{ delay: number; duration: number; css: () => string }} Transition
 */
/**
 * Create a transition that allows specifying a transition programmatically
 *  or disable it altogether.
 * @template T
 * @param {Element} node
 * @param {{ transition: (node: Element; options: T) => Transition; options: T }} options
 * @returns {Transition}
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
