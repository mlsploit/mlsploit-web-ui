<script>
  import data from '../../../dummydata.js';
  
  export let imageURL;
  export let isInput = false;

</script>

<style>

.image-vis img {
  object-fit: cover;
  width: 20px;
  height: 20px;
  margin: 5px 0;
}

</style>

<div class="image-vis" class:input={isInput}>
  <img src={imageURL} alt="Visualization of the input/output image.">
</div>
