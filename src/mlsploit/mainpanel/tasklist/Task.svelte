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
    padding: 10px;
    max-width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out;

    /* Mimic Bootstrap Card component */
    position: relative;
    border: 1px solid rgba(0,0,0,.125);
    background: #ffffff;
    border-radius: .25rem;
  }

  .task .function-name {
    font-weight: 300;
    font-size: 14px;
    max-width: 280px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
  }

  /* Add additional style to the tasks in the left panel */
  .task.module {
    margin: 1rem;
  }

  .delete {
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 10px;
    color: var(--g-dark-gray);
    opacity: 0.5;
  }

  .task:hover .function-name{
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

<!--
  Bootsrap Card component has weird behavior with ellipsis overflow text element
  and flex parent, so we are not using it here.
-->
<div class="task"
      class:module={isModuleTask}
      bind:this={taskComponent}
      tabindex="-1"
      draggable={isModuleTask} 
      on:dragstart={handleDragStart}
      on:dragend={handleDragEnd}>
  
  <!-- Use div instead of span for text ellipsis overflow -->
  <div class="function-name">{task_function.name}</div>

  {#if isNewPipelineTask}
    <i class="fa fa-s fa-times-circle delete"></i>
  {/if}

</div>
