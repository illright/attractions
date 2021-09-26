import { URL } from 'url';

/**
 * `path.resolve(__dirname, ...)` functionality for ES Modules.
 *
 * @param {string} importMetaURL The value of `import.meta.url` for a given module (acts as `__dirname`).
 * @param {string} path The path to resolve relative to the current file.
 * @returns The absolute path corresponding to the given relative path.
 */
export default function resolve(importMetaURL, path) {
  return decodeURIComponent(new URL(path, importMetaURL).pathname);
}
