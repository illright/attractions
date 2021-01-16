/**
 * Create a transition that allows specifying a transition programmatically
 *  or disable it altogether.
 * @typedef {{ delay: number; duration: number; css: () => string}} Transition
 * @param {Element} node
 * @param {{ transition: (node: Element; options: any) => Transition; options: any }} options
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
