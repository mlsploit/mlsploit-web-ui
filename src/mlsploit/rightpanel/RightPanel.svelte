<script>
  import { onMount } from 'svelte';
  
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

  onMount(resizeDetailViewContainer);
  jQuery(window).resize(resizeDetailViewContainer);
</script>

<style>
  @media (min-width: 768px) {
    .detail-view-container {
      position: fixed;
      bottom: 0;
      right: 15px;
      z-index: 1020;
      border: 2px solid red;
    }
  }

  .top-spacer {
    height: 2rem;
  }
</style>

<div id="right-panel" class="col-md-3">
  <div class="detail-view-container" bind:this={detailViewContainer}>
    <div class="top-spacer"></div>
    <span>Right Panel</span>
  </div>
</div>
