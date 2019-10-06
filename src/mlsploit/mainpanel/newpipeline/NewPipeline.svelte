<script>
  import tasks from './data.js';
  import TaskList from '../tasklist/TaskList.svelte';

  const showDropzone = true;
</script>

<style>
  .new-pipeline {
    width: 80%;
    margin: 20px;
    padding: 20px;
  }

  .heading {
    margin: 0 0 0 20px;
  }

  .controls {
    margin: 0 20px;
  }
  
  .delete {
    float: right;
    margin-top: -5px;
  }
</style>

<div class="new-pipeline bp3-card bp3-elevation-3">
  <div class="heading">
    <input type="text" class="bp3-input bp3-intent-primary" value="New Pipeline" />
    <button type="button" class="delete bp3-button bp3-intent-danger bp3-minimal bp3-icon-cross"></button>
  </div>
  
  <TaskList tasks={tasks} showDropzone={showDropzone} />

  <div class="controls">
    <button type="button" class="bp3-button bp3-intent-primary bp3-icon-floppy-disk">Save</button>
  </div>
</div>
