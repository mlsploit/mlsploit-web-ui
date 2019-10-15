<script>
  import { onMount } from 'svelte';
  import { detailViewItemStore } from '../../store.js';
  import { setupDetailViewHandlers } from './detailview.js';
  import detailViewTypes from './detailviews/types.js';
  import ModuleDetailView from './detailviews/module/ModuleDetailView.svelte';
  import PipelineDetailView from './detailviews/pipeline/PipelineDetailView.svelte';
  import TaskDetailView from './detailviews/task/TaskDetailView.svelte';
  
  let detailViewContainer;

  const resizeDetailViewContainer = () => {
    let windowWidth = jQuery(window).width();
    let navHeight = jQuery('nav').outerHeight();
    let rightPanelWidth = jQuery('#right-panel').width();

    if (windowWidth >= 768) {
      let el = jQuery(detailViewContainer);
      el.css({'top': navHeight+'px'});
      el.width(rightPanelWidth);
    }
  }

  onMount(() => {
    resizeDetailViewContainer();
    jQuery(window).resize(resizeDetailViewContainer);
    
    setupDetailViewHandlers(detailViewContainer);
  });
</script>

<style>
  @media (min-width: 768px) {
    .detail-view-container {
      position: fixed;
      bottom: 0;
      right: 15px;
    }
  }
</style>

<div id="right-panel" class="col-md-3">
  <div class="detail-view-container" tabindex="-1" bind:this={detailViewContainer}>
    {#if $detailViewItemStore !== null}
      
      {#if $detailViewItemStore.type === detailViewTypes.MODULE}
        <ModuleDetailView module={$detailViewItemStore.item} />
      
      {:else if $detailViewItemStore.type === detailViewTypes.PIPELINE}
        <PipelineDetailView pipeline={$detailViewItemStore.item} />
      
      {:else if $detailViewItemStore.type === detailViewTypes.TASK}
        <TaskDetailView task={$detailViewItemStore.item} 
                        meta={$detailViewItemStore.meta || {}} />
      
      {/if}
    
    {/if}
  </div>
</div>
