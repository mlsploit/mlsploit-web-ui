<script>
  import { newPipelineVisibleStore, pipelineStore } from '../../store.js';
  import Pipeline from './pipeline/Pipeline.svelte';

  $: pipelines = $pipelineStore.sort(
    (p1, p2) => (p1.date_created > p2.date_created ? -1 : 1)
  );
</script>

<style>
  #main-panel {
    padding: 2rem;
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


