import { writable } from 'svelte/store';

export const tokenStore = writable('');

export const moduleStore = writable([]);
export const functionStore = writable([]);
export const fileStore = writable([]);
export const pipelineStore = writable([]);
export const taskStore = writable([]);
export const runStore = writable([]);
export const jobStore = writable([]);

export const detailViewItemStore = writable(null);
export const newPipelineDataStore = writable(null);
export const newPipelineVisibleStore = writable(false);

export const fileManagerMetaStore = writable({});
export const fileManagerModeStore = writable(null);

export const shouldPollFilesAndRunsStore = writable(false);
