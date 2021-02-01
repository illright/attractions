/**
 * Action that allows calling a function when an element appears in the viewport.
 * Uses the IntersectionObserver API, which might not be available in older browsers like IE11.
 * If it is not available, the action will be silently ignored.
 * @template T
 * @param {Element} node The HTML element to be observed
 * @param {{ callback: (...args: T[]) => void; args: T[] }} options Callback and its args
 * @returns {{ destroy: () => void }}
 */
export default function callOnSight(node, { callback, args = [] }) {
  let observer = null;

  function onIntersect(entries, _observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(...args);
      }
    });
  }

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
