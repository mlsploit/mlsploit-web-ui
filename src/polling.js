import { get } from 'svelte/store';
import {
  resourceTypes,
  populateResourceStore
} from './state.js';
import { shouldPollFilesAndRunsStore } from './store.js';

let isPolling = false;
const POLLING_INTERVAL = 5000;

const poll = async (fn, pollingInterval) => {
  let pollAgain = await fn();

  if (pollAgain) {
    setTimeout(
      () => poll(fn, pollingInterval),
      pollingInterval
    );
  } else {
    isPolling = false;
  }
};

export const beginPolling = () => {
  shouldPollFilesAndRunsStore.subscribe(shouldPoll => {
    if (shouldPoll && !isPolling) {
      isPolling = true;
      poll(() => {
        return new Promise((resolve, reject) => {
          Promise.all([
            populateResourceStore(resourceTypes.RUN),
            populateResourceStore(resourceTypes.JOB),
            populateResourceStore(resourceTypes.FILE)
          ]).then(() => {
            resolve(get(shouldPollFilesAndRunsStore));
          });
        });
      }, POLLING_INTERVAL);
    }
  });
};

window.beginPolling = beginPolling;
