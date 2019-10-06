<script>
  import Panel from './Panel.svelte'
  import Pipeline from './pipeline/Pipeline.svelte';
  import NewPipeline from './newpipeline/NewPipeline.svelte';

</script>

<style>
  #main-panel {
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
  }
</style>

<div id="main-panel">
  <Pipeline />
  <Pipeline />
  <Pipeline />
  <Pipeline />
  <NewPipeline />
  <div style="margin:50px; opacity:0;">-</div>
</div>