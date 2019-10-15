<script>
  import data from '../../../dummydata.js';
  
  export let imageURL;
  export let isInput = false;

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

<div class="image-vis" class:input={isInput}>
  <img src={imageURL} alt="Visualization of the input/output image.">
</div>
