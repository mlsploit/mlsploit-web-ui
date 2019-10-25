<script>
  import { get } from 'svelte/store';
  import { moduleStore } from '../../store.js';
  import Module from './module/Module.svelte';

  $: modules = $moduleStore.sort(
    (a, b) => ((a.name > b.name) ? 1 : -1)
  );
</script>

<style>
  #left-panel {
    padding: 2rem;
  }

  .sidebar {
    position: sticky;
    top: 8rem;
    height: 70vh;
    margin-top: 1rem;
    margin-left: -2.125rem;
  }

  .sidebar-header {
    padding: 1.25rem;
    border-bottom: var(--border);
  }

  .sidebar-header > h3 {
    margin: 0;
  }

  .sidebar-contents {
    overflow-y: scroll;
  }
</style>

<div id="left-panel" class="col-md-3">

  <div class="accordion card shadow sidebar">
    <div class="sidebar-header">
      <h3>Research Modules</h3>
    </div>

    <div class="sidebar-contents">
      {#each modules as module}
        <Module {module} />
      {/each}
    </div>
  </div>

</div>
