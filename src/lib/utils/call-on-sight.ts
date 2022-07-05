/**
 * Action that allows calling a function when an element appears in the viewport.
 * Uses the IntersectionObserver API, which might not be available in older browsers like IE11.
 * If it is not available, the action will be silently ignored.
 * @param node The HTML element to be observed
 * @param options Callback and its args
 */
export default function callOnSight<T>(
  node: Element,
  { callback, args = [] }: { callback: (...args: T[]) => void; args?: T[] }
) {
  let observer: IntersectionObserver | null = null;

  const onIntersect: IntersectionObserverCallback = (entries, _observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(...args);
      }
    });
  };

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0.5,
    });
    observer.observe(node);
  }

  return {
    destroy() {
      if (observer != null) {
        observer.disconnect();
      }
    },
  };
}
