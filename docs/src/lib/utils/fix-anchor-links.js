/* Adapted from https://github.com/sveltejs/sapper/issues/331#issuecomment-627282773 */
export default function fixAnchorLinks() {
  document.querySelectorAll('a').forEach(a => {
    if (a.hash && document.querySelectorAll(a.hash).length) {
      a.href = window.location.origin + window.location.pathname + a.hash;
    }
  });
}
