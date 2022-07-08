import type { SvelteComponentTyped } from 'svelte';

export interface Place {
  title: string | typeof SvelteComponentTyped<{ size?: string }, any, any>;
  segment?: string | null;
  sub?: Place[];
}
