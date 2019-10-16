import { get } from 'svelte/store';
import { detailViewItemStore, detailViewResetTimeoutStore } from '../../store.js';

export const setupDetailViewHandlers = (el, detailViewItem) => {
  jQuery(el).focusin(e => {
    e.preventDefault();
    e.stopPropagation();
    
    if (detailViewItem !== undefined) {
      detailViewItem.target = el;
      detailViewItemStore.set(null);
      setTimeout(() => { 
        detailViewItemStore.set(detailViewItem); 
      }, 10);
    }

    const timeout = get(detailViewResetTimeoutStore);
    if (timeout !== null) {
      clearTimeout(timeout);
      detailViewResetTimeoutStore.set(null);
    }
  });
  
  jQuery(el).focusout(e => {
    e.preventDefault();
    e.stopPropagation();

    const resetDetailView = () => {
      detailViewItemStore.set(null);
      detailViewResetTimeoutStore.set(null);
    };

    detailViewResetTimeoutStore.set(
      setTimeout(resetDetailView, 10)
    );
  });
};
