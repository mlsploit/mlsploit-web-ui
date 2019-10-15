<script>
  import { onMount } from 'svelte';
  import data from '../../../dummydata.js';
  import { setupDetailViewHandlers } from '../../rightpanel/detailview.js';
  import detailViewTypes from '../../rightpanel/detailviews/types.js';
  
  export let task;
  export let isModuleTask = false;
  export let isNewPipelineTask = false;

  let taskComponent;

  const taskDetailViewItem = {
    type: detailViewTypes.TASK,
    item: task,
    meta: {
      isModuleTask: isModuleTask,
      isNewPipelineTask: isNewPipelineTask
    }
  }

  let task_function = (
    task.intended_function
    || data.functions.find(f => (f.url === task.function)));

  const handleDragStart = e => {
    e.target.style.opacity = 0.4;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/json', JSON.stringify(task));
  };

  const handleDragEnd = e => {
    e.target.style.opacity = 1.0;
    jQuery('.dropzone.over').removeClass('over');
  };

  onMount(() => {
    setupDetailViewHandlers(taskComponent, taskDetailViewItem);
    if (isNewPipelineTask) { jQuery(taskComponent).focus(); }
  });
</script>

<style>
  .task {
    margin: 2rem;
    padding: 2rem;
    min-width: 160px;
    max-width: 280px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    transition: box-shadow 0.3s ease-in-out;
  }

  .delete {
    position: absolute;
    top: 5px;
    right: 5px;
    color: var(--g-dark-gray);
    opacity: 0.5;
  }

  .task:hover {
    font-weight: var(--font-weight-hover);
  }

  .delete:hover {
    opacity: 1;
    color: var(--g-red);
  }

  .task:focus {
    font-weight: var(--font-weight-focus);
    box-shadow: var(--outer-shadow);
  }

</style>

<div class="card task"
      bind:this={taskComponent}
      tabindex="-1"
      draggable={isModuleTask} 
      on:dragstart={handleDragStart}
      on:dragend={handleDragEnd}>
    
  <span class="function-name">{task_function.name}</span>
  {#if isNewPipelineTask}
    <i class="fa fa-s fa-times-circle delete"></i>
  {/if}

</div>
