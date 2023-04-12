/**
 * An action to set up arbitrary event listeners dynamically.
 * @param args The event listeners to be registered
 */
export default function events(
  node: Element,
  args: Array<{ name: string; handler: EventListenerOrEventListenerObject }>
) {
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
