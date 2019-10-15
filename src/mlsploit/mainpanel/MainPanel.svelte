<script>
  import data from '../../dummydata.js';
  import {newPipelineVisibleStore} from '../../store.js';
  import Pipeline from './pipeline/Pipeline.svelte';

  export let showNewPipeline = false;
  
  let pipelines = data.pipelines;
</script>

<style>
  #main-panel {
    padding: 2rem;
    background-color: var(--g-light-gray);
  }
</style>

<div id="main-panel" class="col-md-6">
  {#if $newPipelineVisibleStore}
    <Pipeline isNewPipeline={true} />
  {/if}
  
  {#each pipelines as pipeline}
    <Pipeline {pipeline} />
  {/each}
  {#each pipelines as pipeline}
    <Pipeline {pipeline} />
  {/each}
  {#each pipelines as pipeline}
    <Pipeline {pipeline} />
  {/each}

</div>
