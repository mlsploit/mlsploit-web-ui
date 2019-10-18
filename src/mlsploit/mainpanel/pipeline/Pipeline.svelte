<script context="module">
  const DEFAULT_NEW_PIPELINE_NAME = 'New Pipeline';
</script>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { setupDetailViewHandlers } from '../../rightpanel/detailview.js';
  import { 
    detailViewItemStore,
    newPipelineDataStore, 
    newPipelineVisibleStore 
  } from '../../../store.js';
  import { 
    fileManagerModes, 
    setAndShowFileManager 
  } from '../../filemanager/FileManager.svelte';
  import detailViewTypes from '../../rightpanel/detailviews/types.js';
  import TaskList from '../tasklist/TaskList.svelte';
  import DeleteConfirmationAlert from './DeleteConfirmationAlert.svelte';

  export let pipeline = null;
  export let isNewPipeline = false;

  let pipelineComponent;
  let newPipelineName = '';

  const pipelineDetailViewItem = {
    type: detailViewTypes.PIPELINE,
    item: pipeline
  }
  
  let tasks = isNewPipeline ? [] : pipeline.tasks;
  const showDropzone = Boolean(isNewPipeline);
  const cursorStyle = isNewPipeline ? 'default' : 'pointer';

  const deletePipeline = (e) => {
    if (isNewPipeline) { 
      $newPipelineVisibleStore = false;
      $newPipelineDataStore = null;
      $detailViewItemStore = null;
    } else {
      // Toggle the deletion confirmation dialog
      jQuery(`#delete-pipeline-${pipeline.id}-confirm`).modal('toggle');
    }
  };

  const onRunPipelineBtnClicked = e => {
    e.preventDefault();
    e.stopPropagation();
    setAndShowFileManager(fileManagerModes.SELECT, {pipeline});
  }

  const onSavePipelineBtnClicked = e => {
    e.preventDefault();
    e.stopPropagation();
    newPipelineName = newPipelineName || DEFAULT_NEW_PIPELINE_NAME;
    console.log('create new pipeline:', newPipelineName, $newPipelineDataStore);
  }

  const onNewPipelineTasksUpdated = tasks => {
    if (isNewPipeline) { $newPipelineDataStore = {tasks}; }
  };

  onMount(() => {
    setupDetailViewHandlers(pipelineComponent, pipelineDetailViewItem);
    if (isNewPipeline) { jQuery(pipelineComponent).focus(); }
  });

  onDestroy(() => { if (isNewPipeline) $newPipelineDataStore = null; });
</script>

<style>
  .pipeline {
    margin: 1rem;
    margin-bottom: 3rem;
    padding: 1rem 1.5rem 0.5rem 1.5rem;
    box-shadow: var(--outer-shadow-sm);
    transition: border-color 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  .pipeline:hover {
    border-color: var(--g-dark-gray);
  }

  .pipeline:focus {
    border-color: var(--g-dark-gray);
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

  /*
  .pipeline:hover .title h5 {
    font-weight: var(--font-weight-hover);
  }

  .pipeline:focus .title h5 {
    font-weight: var(--font-weight-focus);
  }
  */
  
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
      <input id="name-input" type="text" class="form-control w-50"
             bind:value={newPipelineName}
             placeholder={DEFAULT_NEW_PIPELINE_NAME} />
    {:else}
      <h5>{pipeline.name}</h5>
    {/if}
    
    <div class="title-controls">
      {#if isNewPipeline}
        <i class="fa fa-lg fa-check-circle sticky-check" on:click={onSavePipelineBtnClicked}></i>
        <i class="fa fa-lg fa-times-circle sticky-delete" on:click={deletePipeline}></i>
      {:else}
        <i class="fa fa-lg fa-play-circle play" on:click={onRunPipelineBtnClicked}></i>
        <i class="fa fa-lg fa-times-circle delete" on:click={deletePipeline}></i>
      {/if}
    </div>
  </div>
  
  <TaskList tasks={tasks} showDropzone={showDropzone}
            onNewPipelineTasksUpdated={onNewPipelineTasksUpdated} />

  <DeleteConfirmationAlert {pipeline} />

</div>
