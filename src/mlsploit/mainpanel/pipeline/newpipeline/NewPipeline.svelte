<script>
  import tasks from './data.js';
  import NewTask from './NewTask.svelte';
</script>

<style>
  .new-pipeline {
    margin: 40px;
  }

  .title {
    margin: 0 20px;
  }

  .controls {
    margin: 0 20px;
  }
  
  .close-new-pipeline {
    float: right;
  }
</style>

<div class="new-pipeline bp3-card bp3-elevation-4">
  <div class="title">
    <input type="text" class="bp3-input bp3-intent-primary" value="New Pipeline" />
    <span class="close-new-pipeline bp3-icon-standard bp3-intent-danger bp3-icon-delete"></span>
  </div>
  
  
  <div class="tasks">
    {#each tasks as task, idx}
      {#if idx !== 0}
        <i class="fas fa-arrow-right"></i>
      {/if}
      <NewTask {task} />
    {/each}
  </div>

  <div class="controls">
    <button type="button" class="bp3-button bp3-intent-primary bp3-icon-floppy-disk">Save</button>
    <button type="button" class="bp3-button bp3-intent-danger bp3-icon-disable">Clear</button>
  </div>
</div>
