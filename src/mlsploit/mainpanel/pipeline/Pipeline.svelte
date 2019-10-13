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
    transition: box-shadow 0.3s ease-in-out;
  }

  .pipeline:focus {
    box-shadow: var(--outer-shadow);
  }

  .title {
    margin: 0 0 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title h5 {
    font-size: 20px;
    margin: 0;
  }

  .pipeline:hover .title h5 {
    text-decoration: underline;
  }

  .pipeline:focus .title h5 {
    font-weight: 600;
    text-decoration: underline;
  }
  
  .delete, .check {
    opacity: 0.0;
  }

  .delete, .check, .sticky-check, .sticky-delete{
    margin-left: 5px;
    cursor: pointer;
    color: rgb(155, 155, 155);
  }

  .pipeline:hover .delete, .pipeline:hover .check, .sticky-delete, .sticky-check{
    opacity: 0.5;
  }

  .pipeline:hover .delete:hover, .sticky-delete:hover {
    color: red;
    opacity: 1.0;
  }

  .pipeline:hover .check:hover, .sticky-check:hover {
    color: #28A745;
    opacity: 1.0;
  }

  .controls {
    margin: 20px;
    margin-bottom: 0px;
  }

  .title-controls{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  #name-input {
    font-size: 20px;
    color: rgb(155, 155, 155);
  }
</style>

<div class="pipeline card" 
     bind:this={pipelineComponent}
     style="cursor:{cursorStyle};" 
     tabindex="-1">
  
  <div class="title">
    {#if isNewPipeline}
      <input id="name-input" type="text" class="form-control w-50" value="New Pipeline" />
    {:else}
      <h5>{pipeline.name}</h5>
    {/if}
    <div class="title-controls">
      {#if isNewPipeline}
        <i class="fa fa-lg fa-check-circle sticky-check"></i>
        <i class="fa fa-lg fa-times-circle sticky-delete" on:click={deletePipeline}></i>
      {:else}
        <i class="fa fa-lg fa-times-circle delete" on:click={deletePipeline}></i>
      {/if}
    </div>

  </div>
  
  <TaskList tasks={tasks} showDropzone={showDropzone} />

  <!--
  {#if isNewPipeline}
    <div class="controls text-right">
      <button type="button" class="btn btn-primary">
        <i class="fas fa-save"></i> Save
      </button>
    </div>
  {/if}
  -->
</div>
