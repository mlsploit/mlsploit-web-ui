<script>
  import { afterUpdate } from 'svelte';
  import Task from './Task.svelte';
  export let tasks = [];
  export let showDropzone = false;

  let taskListComponent;
  
  let numTasks = tasks.length;
  const hasNewPipelineTasks = Boolean(showDropzone);

  const handleDragEnter = e => { e.target.classList.add('over'); };
  const handleDragLeave = e => { e.target.classList.remove('over'); };

  const handleDragOver = e => {
    if (e.preventDefault) { e.preventDefault(); }
    e.dataTransfer.dropEffect = 'move'; 
    return false;
  };

  const handleDrop = e => {
    if (e.stopPropagation) { e.stopPropagation(); }
    let t = JSON.parse(e.dataTransfer.getData('text/json'));
    tasks = [...tasks, t];
    return false;
  };

  afterUpdate(() => {
    let currentNumTasks = tasks.length;
    if (numTasks !== currentNumTasks) {
      const taskElements = jQuery(taskListComponent).children('.task');
      const newTaskElement = taskElements[currentNumTasks - 1];
      jQuery(newTaskElement).focus();
      numTasks = currentNumTasks;
    }
	});
</script>

<style>
  .task-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 20px;
    background-color: rgb(250, 250, 250);
  }

  .fa-arrow-right {
    margin: auto 10px;
  }

  .dropzone {
    margin: 20px;
    padding: 20px;
    min-width: 160px;
    display: inline-block;
    border-radius: 3px;
    border-style: dashed;
    border-width: 1px;
    color: rgb(155, 155, 155);
    font-weight: 300;
    user-select: none;
  }

  .dropzone > span {
    pointer-events: none;
  }

  .over {
    border-width: 2px;
  }
</style>

<div class="task-list rounded" bind:this={taskListComponent}>
  {#each tasks as task, idx}
    {#if idx !== 0}
      <i class="fas fa-arrow-right"></i>
    {/if}
    
    <Task task={task} isNewPipelineTask={hasNewPipelineTasks} />
  {/each}

  {#if showDropzone}
    {#if tasks.length > 0}
      <i class="fas fa-arrow-right"></i>
    {/if}
    
    <div class="dropzone" 
         on:dragenter={handleDragEnter}
         on:dragleave={handleDragLeave}
         on:dragover={handleDragOver}
         on:drop={handleDrop}>
      <span>drag here...</span>
    </div>
  {/if}

  <span class="over" style="width:2px;opacity:0;">|</span>
</div>