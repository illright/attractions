/* Create a transition that allows specifying a transition programmatically
   or disable it altogether. */
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
