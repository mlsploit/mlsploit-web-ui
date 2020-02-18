import { detailViewItemStore } from '../../store.js';

// The detail view is updated when the corresponding item
// gets the focus, and reset when it loses focus.

// We also need to make sure that it doesn't get reset
// if the detail view itself gets the focus.

const TIMEOUT_INTERVAL = 10;
let itemURLInFocus = null;
let resetTimeout = null;
const resetDetailViewItemStore = () => {
  detailViewItemStore.set(null);
  itemURLInFocus = null;
  resetTimeout = null;
};

(() => {
  jQuery('body').click(e => {
    resetTimeout = setTimeout(
        resetDetailViewItemStore, TIMEOUT_INTERVAL
    );
  });
})();

export const setupDetailViewHandlers = (el, detailViewItem) => {
  jQuery(el).click(e => {
    e.preventDefault();
    e.stopPropagation(); // IMPORTANT

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
        itemURLInFocus = (
          detailViewItem.item
          ? detailViewItem.item.url
          : null
        );
      }, TIMEOUT_INTERVAL);
    }
  });

  const destroyDetailView = () => {
    if (detailViewItem.item
        && detailViewItem.item.url == itemURLInFocus) {
      jQuery(el).off();
      resetDetailViewItemStore();
    }
  };

  return destroyDetailView;
};
