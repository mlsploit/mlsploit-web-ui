<script>
  import data from '../../dummydata.js';
  import Pipeline from './pipeline/Pipeline.svelte';
  import NewPipeline from './newpipeline/NewPipeline.svelte';

  let pipelines = data.pipelines;
</script>

<style>
  #main-panel {
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* overflow-y: scroll; */
    background-color: rgb(250, 250, 250);
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  }
</style>

<div id="main-panel">
  {#each pipelines as pipeline}
    <Pipeline {pipeline} />
  {/each}
  
  <NewPipeline />
  
  <div style="margin:50px; opacity:0;">-</div>
</div>