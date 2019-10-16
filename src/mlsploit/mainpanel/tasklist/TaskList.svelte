<script>
  import { afterUpdate } from 'svelte';
  import { onMount } from 'svelte';
  import { taskListIDOffsetStore } from '../../../store.js';
  import Task from './Task.svelte';
  import ImageVis from './ImageVis.svelte'

  export let tasks = [];
  export let showDropzone = false;

  let taskListComponent;
  
  let numTasks = tasks.length;
  const hasNewPipelineTasks = Boolean(showDropzone);

  // Need to create unique ID to distinguish from other TaskList component
  let curID = $taskListIDOffsetStore;
  taskListIDOffsetStore.set(curID + 1);
  let leftEdge;
  let rightEdge;

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

  function updateScrollPosition(taskList, leftEdge, rightEdge) {
    // Variables to track the progress of current scrolling
    let scrolled = jQuery(taskList).scrollLeft();
    let innerWidth = jQuery(taskList).innerWidth();
    let contentWidth = jQuery(taskList)[0].scrollWidth;

    // User scrolls to the left end
    if (scrolled == 0) {
      jQuery(leftEdge).css('opacity');
      jQuery(leftEdge).css('opacity', 0.0);
    
    // User scrolls to the right end
    } else if (scrolled + innerWidth >= contentWidth) {
      jQuery(rightEdge).css('opacity');
      jQuery(rightEdge).css('opacity', 0.0);

    // User is in the middle of scrolling
    } else {
      jQuery(leftEdge).css('opacity');
      jQuery(leftEdge).css('opacity', 1.0);
      jQuery(rightEdge).css('opacity');
      jQuery(rightEdge).css('opacity', 1.0);
    }
  }

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

  onMount(() => {
    let curTaskList = jQuery(taskListComponent).children(`#task-list-${curID}`);
    let leftEdge = jQuery(taskListComponent).children(`#left-edge-${curID}`);
    let rightEdge = jQuery(taskListComponent).children(`#right-edge-${curID}`);

    updateScrollPosition(curTaskList, leftEdge, rightEdge);

    curTaskList.on('scroll', function() {
      updateScrollPosition(curTaskList, leftEdge, rightEdge);
    })
  })

</script>

<style>
  .task-list {
    width: 100%;
    margin-top: 5px;
    padding-bottom: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    position: relative;
  }

  .fade-edge {
    width: 7%;
    height: 45px;
    z-index: 10;
    pointer-events: none;
    position: absolute;
    top: 55px;
    transition: opacity 0.3s ease-in-out;
  }

  .right {
    right: 1.5rem;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8));
  }

  .left {
    left: 1.5rem;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0));
  }

  .dropzone {
    padding: 10px;
    min-height: 43px;
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

  .dropzone .dragzone-label {
    font-size: 14px;
    pointer-events: none;
    white-space: nowrap;
    display: inline-block;
    overflow: hidden;
  }

  .over {
    border-width: 2px;
  }

  .arrow {
    margin: 1rem;
  }

</style>

<div class="task-list-wrapper" bind:this={taskListComponent}>
  <div class="fade-edge left" id={`left-edge-${curID}`}></div>
  <div class="fade-edge right" id={`right-edge-${curID}`}></div>

  <div class="task-list rounded" id={`task-list-${curID}`}>
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
        <div class="dragzone-label">drag here...</div>
      </div>
    {/if}

    <span class="over" style="width:2px;opacity:0;">|</span>
  </div>
</div>
