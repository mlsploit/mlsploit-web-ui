<script>
  import data from '../../dummydata.js';
  import Module from './module/Module.svelte';

  let modules = data.modules;
  modules.sort((a, b) => (a.name > b.name) ? 1 : -1)
</script>

<style>
  #left-panel {
    padding: 20px;
  }

  .accordion {
    margin: 20px;
  }
</style>

<div id="left-panel" class="col-md-3">
  <div class="accordion">
    {#each modules as module}
      <Module {module} />
    {/each}
  </div>
</div>
