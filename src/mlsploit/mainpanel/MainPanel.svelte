<script>
  import data from '../../dummydata.js';
  import {newPipelineVisibleStore} from '../../store.js';
  import Pipeline from './pipeline/Pipeline.svelte';

  export let showNewPipeline = false;
  
  let pipelines = data.pipelines;

  const toggleShowNewPipeline = () => { 
    $newPipelineVisibleStore = !newPipelineVisibleStore; 
  };
</script>

<style>
  #main-panel {
    padding: 20px;
    background-color: rgb(250, 250, 250);
    overflow-y: scroll;
    height: 100vh;
  }
</style>

<div id="main-panel" class="col-md-6">
  {#if $newPipelineVisibleStore}
    <Pipeline isNewPipeline={true} toggleShowNewPipeline={toggleShowNewPipeline} />
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