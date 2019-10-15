import { writable } from 'svelte/store';

export const newPipelineVisibleStore = writable(false);
export const FileManagerVisibleStore = writable(false);
export const detailViewItemStore = writable(null);
export const detailViewResetTimeoutStore = writable(null);

export const tokenStore = writable('');
export const fileStore = writable([]);
