import { writable } from 'svelte/store';

export const newPipelineVisibleStore = writable(false);

export const tokenStore = writable('');
export const fileStore = writable([]);
