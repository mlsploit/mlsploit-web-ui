<script>
  import { onMount } from 'svelte';
  import { detailViewItemStore, newPipelineVisibleStore } from '../../../store.js';
  import detailViewTypes from '../../rightpanel/detailviews/types.js';
  import TaskList from '../tasklist/TaskList.svelte';

  export let pipeline;
  export let isNewPipeline = false;

  let pipelineComponent;

  const pipelineDetailViewItem = {
    type: detailViewTypes.PIPELINE,
    item: pipeline
  }
  
  let tasks = isNewPipeline ? [] : pipeline.tasks;
  const showDropzone = isNewPipeline;
  const cursorStyle = isNewPipeline ? 'default' : 'pointer';

  const deletePipeline = (e) => {
    if (isNewPipeline) { 
      $newPipelineVisibleStore = false;
      $detailViewItemStore = null;
    }
    else {
      // delete pipeline
    }
  };

  onMount(() => {
    jQuery(pipelineComponent)
      .focus(e => {
        if (e.stopPropagation) { e.stopPropagation(); }
        $detailViewItemStore = pipelineDetailViewItem;
      }).focusout(e => {
        if (e.stopPropagation) { e.stopPropagation(); }
        if ($detailViewItemStore === pipelineDetailViewItem) {
          $detailViewItemStore = null;
        }
      });
    
    if (isNewPipeline) { jQuery(pipelineComponent).focus(); }
  });
</script>

<style>
  .pipeline {
    margin: 1rem;
    margin-bottom: 3rem;
    padding: 2rem;
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
    font-weight: var(--font-weight-hover);
  }

  .pipeline:focus .title h5 {
    font-weight: var(--font-weight-focus);
  }
  
  .delete, .check, .play {
    opacity: 0.0;
  }

  .delete, .check, .sticky-check, .sticky-delete, .play{
    margin-left: 5px;
    cursor: pointer;
    color: var(--g-dark-gray);
  }

  .pipeline:hover .delete, .pipeline:hover .check, .pipeline:hover .play,
  .sticky-delete, .sticky-check{
    opacity: 0.5;
  }

  .pipeline:hover .delete:hover, .sticky-delete:hover {
    color: var(--g-red);
    opacity: 1.0;
  }

  .pipeline:hover .check:hover, .sticky-check:hover {
    color: var(--g-green);
    opacity: 1.0;
  }

  .pipeline:hover .play:hover {
    color: var(--g-blue);
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

  #name-input, #name-input::placeholder {
    font-size: 20px;
    color: var(--g-dark-gray);
  }
</style>

<div class="pipeline card" 
     bind:this={pipelineComponent}
     style="cursor:{cursorStyle};" 
     tabindex="-1">
  
  <div class="title">
    {#if isNewPipeline}
      <input id="name-input" type="text" class="form-control w-50" placeholder="New Pipeline" />
    {:else}
      <h5>{pipeline.name}</h5>
    {/if}
    <div class="title-controls">
      {#if isNewPipeline}
        <i class="fa fa-lg fa-check-circle sticky-check"></i>
        <i class="fa fa-lg fa-times-circle sticky-delete" on:click={deletePipeline}></i>
      {:else}
        <i class="fa fa-lg fa-play-circle play"></i>
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
