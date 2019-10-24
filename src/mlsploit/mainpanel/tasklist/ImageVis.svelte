<script>
  import data from '../../../dummydata.js';
  import { onMount } from 'svelte';

  export let visItem;
  export let isInput = false;

  // Enable tooltips
  onMount(() => {
    jQuery('.image-vis[data-toggle="popover"]').popover({
      delay: { show: 200 }
    })
  });

  // Can't set style in this html tag -> set in global.css instead
  let tooltipImageTemplate = `<img src="${visItem.url}" alt="">`
</script>

<style>

.image-vis {
  margin: 0 0;
}

.image-vis img {
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 3px;
}

</style>

<div class="image-vis"
     class:input={isInput}
     data-toggle="popover"
     data-container="#image-vis-popover-container"
     data-trigger="hover"
     data-offset=100%p
     data-html="true"
     data-delay={{show: 500}}
     data-content={tooltipImageTemplate}>
  <img src="{visItem.url}" alt="">
</div>
