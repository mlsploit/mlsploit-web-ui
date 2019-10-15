<script>
  import data from '../../../dummydata.js';
  import { onMount } from 'svelte';
  
  export let imageURL;
  export let isInput = false;

  // Enable tooltips
  onMount(() => {
    jQuery('[data-toggle="popover"]').popover();
  });

  // Need to set the width to 100% because the popover max-width is set to
  // 300px in the global CSS -> scale the original image to 300px when it is
  // too large
  let tooltipImageTemplate = `
    <img src="${imageURL}"
      alt="Larger Visualization of the input/output image."
      style="width:100%">
    ` 
</script>

<style>

.image-vis {
  margin: 0 20px;
}

.image-vis img {
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 3px;
}

</style>

<div class="image-vis"
  lass:input={isInput}
  data-toggle="popover"
  data-container="main"
  data-trigger="hover"
  data-offset=100%p
  data-html="true"
  data-content={tooltipImageTemplate}>
  <img src="{imageURL}" alt="Visualization of the input/output image.">
</div>
