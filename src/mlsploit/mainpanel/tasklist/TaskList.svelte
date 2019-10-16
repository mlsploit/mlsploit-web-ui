<script>
  import { afterUpdate } from 'svelte';
  import Task from './Task.svelte';
  import ImageVis from './ImageVis.svelte'
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

  // Create input and output rule for each task in the task list
  let taskInputOutput = [];
  tasks.forEach(function(d, i) {
    // Change the logic here later
    // If the previous item has output, remember to make the current task's 
    // showInput as false
    if (i === 0) {
      let rule = {
        showInput: true,
        inputType: 'image',
        inputSource: 'https://nimages2.champdogs.net/29893/l46292823.jpg',
        showOutput: true,
        outputType: 'image',
        outputSource: 'https://nimages2.champdogs.net/29893/l46292823.jpg'
      };
      taskInputOutput = [...taskInputOutput, rule];
    } else {
      taskInputOutput = [
        ...taskInputOutput,
        {showInput: false, showOutput: false}
      ]
    }
  })

</script>

<style>
  .task-list {
    width: 100%;
    margin-top: 1px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    background-color: var(--g-light-gray);
  }

  .dropzone {
    margin: 20px;
    padding: 20px;
    min-width: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border-style: dashed;
    border-width: 1px;
    color: var(--g-dark-gray);
    font-weight: 300;
    user-select: none;
  }

  .dropzone > span {
    pointer-events: none;
  }

  .over {
    border-width: 2px;
  }

  .arrow {
    margin: 1rem;
  }

</style>

<div class="task-list rounded" bind:this={taskListComponent}>
  {#if !showDropzone}
    {#each tasks as task, idx}

      <!-- Add an input component if this task requires to show one -->
      {#if taskInputOutput[idx].showInput}
        {#if taskInputOutput[idx].inputType === 'image'}
         <ImageVis imageURL={taskInputOutput[idx].inputSource} isInput/>
        {/if}
        <i class="fas fa-arrow-right arrow"></i>
      {/if}

      <Task task={task} isNewPipelineTask={hasNewPipelineTasks}/>

      <!-- Add an output component if this task requires to show one -->
      {#if taskInputOutput[idx].showOutput}
        <i class="fas fa-arrow-right arrow"></i>
        {#if taskInputOutput[idx].outputType === 'image'}
         <ImageVis imageURL={taskInputOutput[idx].outputSource} />
        {/if}
      {/if}

      {#if idx !== tasks.length - 1}
        <i class="fas fa-arrow-right arrow"></i>
      {/if}
    {/each}
  {/if}

  {#if showDropzone}
    {#each tasks as task, idx}
      {#if idx !== 0}
        <i class="fas fa-arrow-right arrow"></i>
      {/if}
      
      <Task task={task} isNewPipelineTask={hasNewPipelineTasks}>
      </Task>
    {/each}

    {#if tasks.length > 0}
      <i class="fas fa-arrow-right arrow"></i>
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
