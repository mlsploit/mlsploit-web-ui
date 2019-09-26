import API from '../rest.js';
import { fileStore } from '../store.js';

const POLLING_INTERVALS = {
  FILES: 2000
};

let keepPolling = true;

const poll = async (fn, pollingInterval) => {
  await fn();

  if (keepPolling) {
    setTimeout(
      () => poll(fn, pollingInterval), 
      pollingInterval
    );
    }
};

export const beginPolling = () => {

  // poll for files
  poll(async () => {
    fileStore.set(await API.getFiles());
  }, POLLING_INTERVALS.FILES);

};

export const stopPolling = () => {
  keepPolling = false;
}
