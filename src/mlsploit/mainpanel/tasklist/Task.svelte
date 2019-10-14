<script>
  import { onMount } from 'svelte';
  import data from '../../../dummydata.js';
  
  export let task;
  export let isModuleTask = false;
  export let isNewPipelineTask = false;

  let taskComponent;

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
    jQuery(taskComponent).focus(e => {
      console.log('task in focus', taskComponent);
    });
  });
</script>

<style>
  .task-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 20px;
  }

  .task {
    padding: 20px;
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
    color: rgb(155, 155, 155);
    opacity: 0.5;
  }

  .task:hover {
    box-shadow: var(--outer-shadow);
  }

  .delete:hover {
    opacity: 1;
    color: var(--g-red);
  }

  .task:focus {
    font-weight: 600;
    box-shadow: var(--outer-shadow);
  }

</style>

<div class="task-container">
  <slot name="input-vis"></slot>

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

  <slot name="output-vis"></slot>
</div>
