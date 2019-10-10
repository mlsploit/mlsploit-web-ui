<script>
  import { onMount } from 'svelte';
  import TaskList from '../tasklist/TaskList.svelte';

  export let pipeline = {};
  export let isNewPipeline = false;
  export let toggleShowNewPipeline = () => {};

  let pipelineComponent;
  
  let tasks = isNewPipeline ? [] : pipeline.tasks;
  const showDropzone = isNewPipeline;
  const cursorStyle = isNewPipeline ? 'default' : 'pointer';

  const deletePipeline = (e) => {
    if (isNewPipeline) { toggleShowNewPipeline(); }
    else {
      // delete pipeline
    }
  };

  onMount(() => {
    jQuery(pipelineComponent).focus(e => {
      console.log('pipeline in focus', pipelineComponent);
    });
    
    if (isNewPipeline) { jQuery(pipelineComponent).focus(); }
  });
</script>

<style>
  .pipeline {
    margin: 20px;
    margin-bottom: 40px;
    padding: 20px;
  }

  .pipeline:focus {
    box-shadow: var(--outer-shadow);
  }

  .pipeline:focus .title h5 {
    font-weight: 600;
    text-decoration: underline;
  }

  .pipeline:hover .title {
    text-decoration: underline;
  }

  .title {
    margin: 0 0 10px 20px;
  }

  .title > h5, input {
    display: inline;
  }
  
  .delete {
    float: right;
    margin-top: -5px;
    cursor: pointer;
    color: red;
    opacity: 0.5;
  }

  .delete:hover {
    opacity: 1.0;
  }

  .controls {
    margin: 20px;
    margin-bottom: 0px;
  }
</style>

<div class="pipeline card" 
     bind:this={pipelineComponent}
     style="cursor:{cursorStyle};" 
     tabindex="-1">
  
  <div class="title">
    {#if isNewPipeline}
      <input type="text" class="form-control w-50" value="New Pipeline" />
    {:else}
      <h5>{pipeline.name}</h5>
    {/if}
    <i class="fas fa-times-circle delete" on:click={deletePipeline}></i>
  </div>
  
  <TaskList tasks={tasks} showDropzone={showDropzone} />

  {#if isNewPipeline}
    <div class="controls text-right">
      <button type="button" class="btn btn-primary">
        <i class="fas fa-save"></i> Save
      </button>
    </div>
  {/if}
</div>
