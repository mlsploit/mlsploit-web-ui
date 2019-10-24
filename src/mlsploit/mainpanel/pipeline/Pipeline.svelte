<script context="module">
  import { getResourceByURL } from '../../../state.js';

  const DEFAULT_NEW_PIPELINE_NAME = 'New Pipeline';

  export const loadRuns = pipeline_ => {
    if (!pipeline_)
      return Promise.resolve([]);

    return Promise.all(pipeline_.runs.map(getResourceByURL));
  };
</script>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { setupDetailViewHandlers } from '../../rightpanel/detailview.js';
  import {
    detailViewItemStore,
    newPipelineDataStore,
    newPipelineVisibleStore
  } from '../../../store.js';
  import { createNewPipelineWithTasks } from '../../../state.js';
  import {
    fileManagerModes,
    setAndShowFileManager
  } from '../../filemanager/FileManager.svelte';
  import detailViewTypes from '../../rightpanel/detailviews/types.js';
  import TaskList from '../tasklist/TaskList.svelte';
  import LogsModal from './LogsModal.svelte';
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
  let runURLs = isNewPipeline ? [] : pipeline.runs;
  const showDropzone = Boolean(isNewPipeline);
  const cursorStyle = isNewPipeline ? 'default' : 'pointer';

  const hideNewPipeline = () => {
    $newPipelineVisibleStore = false;
    $newPipelineDataStore = null;
    $detailViewItemStore = null;
  }

  const onDeletePipelineBtnClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isNewPipeline) { hideNewPipeline(); }
    else { jQuery(`#delete-pipeline-${pipeline.id}-confirm`).modal('toggle'); }
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
    createNewPipelineWithTasks(
      newPipelineName,
      $newPipelineDataStore.tasks
    );
    hideNewPipeline();
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

<div id="pipeline-id-{pipeline ? pipeline.id : 'none'}"
     class="pipeline card" tabindex="-1"
     bind:this={pipelineComponent}
     style="cursor:{cursorStyle};">

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
        <i class="fa fa-lg fa-times-circle sticky-delete" on:click={onDeletePipelineBtnClicked}></i>
      {:else}
        <i class="fa fa-lg fa-play-circle play" on:click={onRunPipelineBtnClicked}></i>
        <i class="fa fa-lg fa-times-circle delete" on:click={onDeletePipelineBtnClicked}></i>
      {/if}
    </div>
  </div>

  <TaskList tasks={tasks} runURLs={runURLs} showDropzone={showDropzone}
            onNewPipelineTasksUpdated={onNewPipelineTasksUpdated} />

  <DeleteConfirmationAlert {pipeline} />

  {#await loadRuns(pipeline) then runs}
    {#each runs as run}
      <LogsModal run={run} />
    {/each}
  {/await}

</div>
