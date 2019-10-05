<script>
  import Panel from './Panel.svelte'
  import NewPipeline from './pipeline/NewPipeline.svelte';

</script>

<style>
  #main-panel {
    padding: 20px;
  }
</style>

<div id="main-panel">
  Main Panel
  <Panel />
  <NewPipeline />
  <NewPipeline />
  <NewPipeline />
  <NewPipeline />
  <NewPipeline />
</div>