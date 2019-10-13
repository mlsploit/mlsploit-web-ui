<script>
  import data from '../../dummydata.js';
  import Module from './module/Module.svelte';
  import FileManager from './filemanager/FileManager.svelte';

  // Modules
  let modules = data.modules;
  modules.sort((a, b) => (a.name > b.name) ? 1 : -1)

</script>

<style>
  #left-panel {
    padding: 2rem 2rem 0 0;
    margin-left: -0.15rem;
    overflow-y: scroll;
    height: 100vh;
  }
</style>

<div id="left-panel" class="col-md-3">

  <!-- Module -->
  <div class="accordion">
    {#each modules as module}
      <Module {module} />
    {/each}
  </div>

  <!-- File manager -->
  <div id="file-manager">
    <FileManager {FileManager} />
  </div>

</div>
