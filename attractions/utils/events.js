/* An action to set up arbitrary event listeners dynamically. */
export default function events(node, args) {
  if (args != null) {
    for (const event of args) {
      node.addEventListener(event.name, event.handler);
    }
  }

  return {
    destroy() {
      if (args != null) {
        for (const event of args) {
          node.removeEventListener(event.name, event.handler);
        }
      }
    },
  };
}
