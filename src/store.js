import { writable } from 'svelte/store';

export const detailViewItemStore = writable(null);
export const detailViewResetTimeoutStore = writable(null);
export const newPipelineVisibleStore = writable(false);

export const tokenStore = writable('');
export const fileStore = writable([]);
