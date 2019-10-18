<script>
  import { afterUpdate } from 'svelte';
  import { onMount } from 'svelte';
  import Task from './Task.svelte';
  import ImageVis from './ImageVis.svelte'

  export let tasks = [];
  export let showDropzone = false;

  let taskListWrapperComponent;
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

  const handleScrollPosition = () => {
    let jqTaskList = jQuery(taskListComponent);
    let jqLeftEdge = jQuery(taskListWrapperComponent).children('.fade-edge.left');
    let jqRightEdge = jQuery(taskListWrapperComponent).children('.fade-edge.right');

    // Variables to track the progress of current scrolling
    let scrolled = jqTaskList.scrollLeft();
    let innerWidth = jqTaskList.innerWidth();
    let contentWidth = jqTaskList[0].scrollWidth;

    let scrolledLeft = (scrolled == 0);
    let scrolledRight = (scrolled + innerWidth >= contentWidth);
    
    // User scrolls to the left end
    if (scrolledLeft) {
      // JQuery slim needs these two lines to trigger CSS transition
      jqLeftEdge.css('opacity');
      jqLeftEdge.css('opacity', 0.0);
    }
    
    // User scrolls to the right end
    if (scrolledRight) {
      jqRightEdge.css('opacity');
      jqRightEdge.css('opacity', 0.0);
    }
    
    // User is in the middle of scrolling
    if (!(scrolledLeft || scrolledRight)) {
      jqLeftEdge.css('opacity');
      jqLeftEdge.css('opacity', 1.0);;
      jqRightEdge.css('opacity');
      jqRightEdge.css('opacity', 1.0);
    }

    // At the left end, but it is scrollable to the right
    if (scrolledLeft && contentWidth > innerWidth) {
      jqRightEdge.css('opacity', 1.0);
    }
  };

  afterUpdate(() => {
    let newNumTasks = tasks.length;
    if (numTasks !== newNumTasks) {
      const taskElements = jQuery(taskListComponent).children('.task');
      const newTaskElement = taskElements[newNumTasks - 1];
      jQuery(newTaskElement).focus();
      numTasks = newNumTasks;
    }

    // Auto scroll the new pipeline, so the placeholder is always on screen
    if (showDropzone && numTasks > 0) {

      // Improve
      // Need this timeout function, because somehow the program automatically
      // scrolls back to the left when new task is added
      setTimeout(function () {
        let jqTaskList = jQuery(taskListComponent);
        taskListComponent.scrollTo(taskListComponent.scrollWidth, 0);
        if (jqTaskList.scrollLeft() !== 0){
          let jqLeftEdge = jQuery(taskListWrapperComponent).children(
              '.fade-edge.left');
          jqLeftEdge.css('opacity');
          jqLeftEdge.css('opacity', 1.0);
        };
      }, 0.5);
    };
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

  onMount(() => {
    // Need timeout, because TaskList's onMount is called before all its tasks
    // are rendered (so every TaskList is considered as unscrollable)
    setTimeout(() => {
      handleScrollPosition();
    }, 0.5);

    jQuery(taskListComponent).on('scroll', handleScrollPosition);
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
    height: 65px;
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

  .new-pipeline-edge {
    top: 72px;
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
    min-height: 47px;
    /* box-shadow:  inset 0 0 0.5rem rgba(0,0,0,.25); */
  }

  .arrow {
    margin: 1rem;
  }

</style>

<div class="task-list-wrapper" bind:this={taskListWrapperComponent}>
  <div class="fade-edge left" class:new-pipeline-edge={showDropzone} style="opacity: 0"></div>
  <div class="fade-edge right" class:new-pipeline-edge={showDropzone} style="opacity: 0"></div>

  <div class="task-list rounded" bind:this={taskListComponent}>

    {#each tasks as task, idx}
      <!-- Add an input component if this task requires to show one -->
      {#if !hasNewPipelineTasks && taskInputOutput[idx].showInput}
        {#if taskInputOutput[idx].inputType === 'image'}
        <ImageVis imageURL={taskInputOutput[idx].inputSource} isInput/>
        {/if}
        <i class="fas fa-arrow-right arrow"></i>
      {/if}

      <Task task={task} isNewPipelineTask={hasNewPipelineTasks}/>

      <!-- Add an output component if this task requires to show one -->
      {#if !hasNewPipelineTasks && taskInputOutput[idx].showOutput}
        <i class="fas fa-arrow-right arrow"></i>
        {#if taskInputOutput[idx].outputType === 'image'}
        <ImageVis imageURL={taskInputOutput[idx].outputSource} />
        {/if}
      {/if}

      {#if idx !== tasks.length - 1}
        <i class="fas fa-arrow-right arrow"></i>
      {/if}
    {/each}

    {#if showDropzone}
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
