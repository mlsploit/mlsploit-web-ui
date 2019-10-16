import { detailViewItemStore } from '../../store.js';

// The detail view is updated when the corresponding item
// gets the focus, and reset when it loses focus.

// We also need to make sure that it doesn't get reset
// if the detail view itself gets the focus.

let resetTimeout = null;
const TIMEOUT_INTERVAL = 20;
const resetDetailViewItemStore = () => {
  detailViewItemStore.set(null);
  resetTimeout = null;
};

export const setupDetailViewHandlers = (el, detailViewItem) => {
  jQuery(el).focusin(e => {
    e.preventDefault();
    e.stopPropagation();

    // Stop from resetting the store asynchronously
    // since we will be resetting it synchronously
    // if it has to be updated
    if (resetTimeout !== null) {
      clearTimeout(resetTimeout);
      resetTimeout = null;
    }
    
    
    if (detailViewItem !== undefined) {
      // Resetting the store to null
      // and then re-setting it with a timeout
      // will force the view to re-render and avoid stale artifacts.
      resetDetailViewItemStore();
      setTimeout(() => { 
        detailViewItem.target = el;
        detailViewItemStore.set(detailViewItem); 
      }, TIMEOUT_INTERVAL);
    }
  });
  
  jQuery(el).focusout(e => {
    e.preventDefault();
    e.stopPropagation();

    resetTimeout = setTimeout(
      resetDetailViewItemStore, TIMEOUT_INTERVAL
    );
  });
};
