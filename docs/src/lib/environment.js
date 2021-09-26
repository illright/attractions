/**
 * Environmental substitutions to be handled by Vite.
 *
 * These values show as undefined, which is alright,
 * as they will get their values at build time.
 * For more information, see https://vitejs.dev/config/#define.
 *
 * @module
 */

/* global vite */

/** The current version of the Attractions package. */
export const latestVersion = vite.define.latestVersion;
/** The license under which Attractions is published. */
export const license = vite.define.license;
