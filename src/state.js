// Best of rest.js and store.js
import { get } from 'svelte/store';
import config from './config.js';
import dummydata from './dummydata.js';
import API from './rest.js';
import {
  moduleStore,
  functionStore,
  fileStore,
  pipelineStore,
  taskStore,
  runStore,
  jobStore
} from './store.js';

export const resourceTypes = {
  MODULE: 'MODULE',
  FUNCTION: 'FUNCTION',
  FILE: 'FILE',
  PIPELINE: 'PIPELINE',
  TASK: 'TASK',
  RUN: 'RUN',
  JOB: 'JOB'
}

const m = (ep, sb, af, s) => ({ENDPOINT: ep, STUB: sb, API_FN: af, STORE: s});
export const resourceMap = {
  MODULE: m(API.ENDPOINTS.MODULES, '/modules/', API.getModules, moduleStore),
  FUNCTION: m(API.ENDPOINTS.FUNCTIONS, '/functions/', API.getFunctions, functionStore),
  FILE: m(API.ENDPOINTS.FILES, '/files/', API.getFiles, fileStore),
  PIPELINE: m(API.ENDPOINTS.PIPELINES, '/pipelines/', API.getPipelines, pipelineStore),
  TASK: m(API.ENDPOINTS.TASKS, '/tasks/', API.getTasks, taskStore),
  RUN: m(API.ENDPOINTS.RUNS, '/runs/', API.getRuns, runStore),
  JOB: m(API.ENDPOINTS.JOBS, '/jobs/', API.getJobs, jobStore)
}

export const populateResourceStore = resourceType => {
  let resourceItem = resourceMap[resourceType];
  let resourceStore = resourceItem.STORE;
  let getResourcesFromAPI = resourceItem.API_FN;

  if (config.DEBUG) {
    return Promise.resolve(
      resourceStore.set(dummydata[resourceType])
    );
  }

  return new Promise((resolve, reject) => {
    getResourcesFromAPI().then(newResources => {
      const str = JSON.stringify;
      const currentResources = get(resourceStore);
      if (str(newResources) != str(currentResources))
        resourceStore.set(newResources);
    }).then(resolve).catch(reject);
  });
};

export const populateAllResourceStores = () => {
  let promises = [];
  for (let resourceType in resourceTypes) {
    promises.push(
      populateResourceStore(resourceType)
    );
  }
  return Promise.all(promises);
};

export const getResourceByURL = resourceURL => {
  return new Promise((resolve, reject) => {
    // Determine the resource type of a URL
    let resourceType = Object.values(resourceTypes).find(
      r => resourceURL.includes(resourceMap[r].STUB)
    );

    if (resourceType === undefined) {
      reject('Invalid resource URL');
    }

    // Check if the data is in the corresponding store.
    let resourceStore = resourceMap[resourceType].STORE;
    let allResourcesOfType = get(resourceStore);
    let resource = allResourcesOfType.find(
      r => (r.url === resourceURL)
    );

    if (resource !== undefined) resolve(resource);
    else {
      // Otherwise query the API
      API.getResourceFromURLWithAuth(resourceURL)
         .then(resolve);

      // Also refresh the corresponding resource store
      populateResourceStore(resourceType);
    }
  });
};

export const getResourcesByURLs = resourceURLs => {
  return Promise.all(resourceURLs.map(getResourceByURL));
};


// All API mutation requests should go through state handlers
// DO NOT let UI components directly call API functions
// i.e., NEVER "import API from rest.js" inside a UI component

export const createNewPipelineWithTasks = async (pipelineName, tasks) => {
  const newPipeline = await API.createNewPipelineWithTasks(pipelineName, tasks);
  await populateAllResourceStores();
  return newPipeline;
};

export const deletePipelineWithURL = pipelineURL => {
  return API.deleteResourceByURLWithAuth(pipelineURL)
            .then(populateAllResourceStores);
};

export const runPipeline = (pipelineURL, fileURLs) => {
  return API.runPipeline(pipelineURL, fileURLs)
            .then(populateAllResourceStores);
};

export const uploadFiles = fileList => {
  return API.uploadFiles(fileList)
            .then(populateAllResourceStores);
};

export const deleteFileWithURL = fileURL => {
  return API.deleteResourceByURLWithAuth(fileURL)
            .then(populateAllResourceStores);
};

window.populateAllResourceStores = populateAllResourceStores;
