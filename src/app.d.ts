/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

declare namespace NodeJS {
  interface Process {
    /** The version field from package.json */
    latest_version: string;
    /** The license field from package.json */
    license: string;
  }
}

// A hack/workaround since the built-in type is `number`, which is not assignable to `MonthNumber`.
interface Date {
  getMonth(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}
