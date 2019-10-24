<script>
  import data from '../../../dummydata.js';
  import { onMount } from 'svelte';

  export let visItem;
  export let isInput = false;

  // Enable tooltips
  onMount(() => {
    jQuery('.image-vis[data-toggle="popover"]').popover({
      trigger: 'focus hover',
      delay: { show: 200 }
    })
  });

  // Can't set style in this html tag -> set in global.css instead
  let tooltipImageTemplate = `<img src="${visItem.url}" alt="">`
</script>

<style>

.image-vis {
  margin: 0 0;
  position: relative;
}

.image-vis img {
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 3px;
}

.badge {
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 90px;
  text-overflow: ellipsis;
}

</style>

<div class="image-vis text-center"
     class:input={isInput}
     data-toggle="popover"
     data-container="#image-vis-popover-container"
     data-trigger="hover"
     data-offset=100%p
     data-html="true"
     data-delay={{show: 500}}
     data-content={tooltipImageTemplate}>
  <img src="{visItem.url}" alt="">
  {#if visItem.label}
    <br />
    <span class="badge badge-info">{visItem.label}</span>
  {/if}
</div>
