<script>
  import data from '../../../dummydata.js';
  import { onMount } from 'svelte';
  
  export let imageURL;
  export let isInput = false;

  // Enable tooltips
  onMount(() => {
    jQuery('[data-toggle="popover"]').popover()
  });

  // Popover template
  let popoverTemplate = `'<div class="popover image-vis-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'`
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
  margin: 0 0;
}

.image-vis img {
  object-fit: cover;
  width: 40px;
  height: 40px;
  border-radius: 3px;
}

</style>

<div class="image-vis"
  lass:input={isInput}
  data-toggle="popover"
  data-container="#image-vis-popover-container"
  data-trigger="hover"
  data-offset=100%p
  data-html="true"
  data-content={tooltipImageTemplate}>
  <img src="{imageURL}" alt="Visualization of the input/output image.">
</div>
