<script>
  import funcs from './data.js';
  import NewFunction from './NewFunction.svelte';
</script>

<style>
  .new-pipeline {
    margin: 40px;
    padding: 20px;
  }
</style>

<div class="new-pipeline bp3-card bp3-elevation-4">
  {#each funcs as func}
    <i class="fas fa-arrow-right"></i>
    <NewFunction {func} />
  {/each}
</div>
