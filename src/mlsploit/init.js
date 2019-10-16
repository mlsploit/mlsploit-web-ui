import API from '../rest.js';
import {
  moduleStore,
  functionStore,
  fileStore,
  pipelineStore,
  taskStore,
  runStore,
  jobStore
} from '../store.js';

export const initStores = async () => {
  moduleStore.set(await API.getModules());
  functionStore.set(await API.getFunctions());
  fileStore.set(await API.getFiles());
  pipelineStore.set(await API.getPipelines());
  taskStore.set(await API.getTasks());
  runStore.set(await API.getRuns());
  jobStore.set(await API.getJobs());
};
