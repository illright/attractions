/**
 * An action to set up arbitrary event listeners dynamically.
 * @param {Element} node
 * @param {Array<{ name: string; handler: EventListenerOrEventListenerObject }>} args The event listeners to be registered
 * @returns {{ destroy: () => void }}
 */
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
