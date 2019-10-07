<script>
  import TaskList from '../tasklist/TaskList.svelte';

  export let pipeline;
  let tasks = pipeline.tasks;
</script>

<style>
  .pipeline {
    width: 80%;
    margin: 20px;
    padding: 20px;
    cursor: pointer;
  }

  .pipeline:hover .heading {
    text-decoration: underline;
  }

  .heading {
    margin: 0 0 0 20px;
  }

  .heading > h5 {
    display: inline;
  }
  
  .delete {
    float: right;
    margin-top: -5px;
  }
</style>

<div class="pipeline bp3-card bp3-elevation-2">
  <div class="heading">
    <h5>{pipeline.name}</h5>
    <button type="button" class="delete bp3-button bp3-intent-danger bp3-minimal bp3-icon-cross"></button>
  </div>
  
  <TaskList {tasks} />
</div>
