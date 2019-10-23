<script>
  import { get } from 'svelte/store';
  import { newPipelineVisibleStore, pipelineStore } from '../../store.js';
  import Pipeline from './pipeline/Pipeline.svelte';
  
  let pipelines = get(pipelineStore);
  pipelineStore.subscribe(pipelines_ => {
    pipelines = pipelines_;
  });
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
</div>


