<script>
  import { afterUpdate, onMount } from 'svelte';
  import Task from './Task.svelte';
  import { getVisualizationItems } from './visualize.js';
  import ImageVis from './ImageVis.svelte'

  export let tasks = [];
  export let runURLs = [];
  export let showDropzone = false;
  export let onNewPipelineTasksUpdated;

  let taskListWrapperComponent;
  let taskListComponent;

  let numTasks = tasks.length;
  let visualizationItems = [];
  const hasNewPipelineTasks = Boolean(showDropzone);

  getVisualizationItems(runURLs[runURLs.length - 1], numTasks).then(items => {
    visualizationItems = items;
  });

  // newPipelineTasksData will track the task data for the rendered UI elements
  // so DO NOT modify tasks directly, use the below helper functions
  let newPipelineTasksData = [];
  const addNewTask = t => {
    newPipelineTasksData = [...newPipelineTasksData, t];
    onNewPipelineTasksUpdated(newPipelineTasksData);

    // update UI elements AFTER updating store
    tasks = [...tasks, t];
  };
  const removeTask = idx => {
    newPipelineTasksData.splice(idx, 1);
    onNewPipelineTasksUpdated(newPipelineTasksData);

    // update UI elements AFTER updating store
    let tempTasks = [...tasks];
    tempTasks.splice(idx, 1);
    tasks = [...tempTasks];
  };
  const updateNewPipelineTaskData = (idx, taskData) => {
    newPipelineTasksData[idx] = taskData;
    onNewPipelineTasksUpdated(newPipelineTasksData);
  }

  const handleDragEnter = e => { e.target.classList.add('over'); };
  const handleDragLeave = e => { e.target.classList.remove('over'); };

  const handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  };

  const handleDrop = e => {
    e.stopPropagation(); // IMPORTANT
    let newTaskData = JSON.parse(
      e.dataTransfer.getData('text/json')
    );
    addNewTask(newTaskData);
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

  onMount(() => {
    // Need timeout, because TaskList's onMount is called before all its tasks
    // are rendered (so every TaskList is considered as unscrollable)
    setTimeout(handleScrollPosition, 100);
    jQuery(taskListComponent).on('scroll', handleScrollPosition);
  });

  afterUpdate(() => {
    let newNumTasks = tasks.length;
    if (numTasks !== newNumTasks) {
      const taskElements = jQuery(taskListComponent).children('.task');
      const newTaskElement = taskElements[newNumTasks - 1];
      setTimeout(e => jQuery(newTaskElement).trigger('click'), 10);
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
      }, 10);
    };
  });

</script>

<style>
  .task-list-wrapper {
    position: relative;
  }

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
    height: 100%;
    z-index: 10;
    pointer-events: none;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
  }

  .right {
    right: 0;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8));
  }

  .left {
    left: 0;
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
  {#if !hasNewPipelineTasks}
    <div class="fade-edge left" class:new-pipeline-edge={showDropzone} style="opacity: 0"></div>
    <div class="fade-edge right" class:new-pipeline-edge={showDropzone} style="opacity: 0"></div>
  {/if}

  <div class="task-list rounded" bind:this={taskListComponent}>

    {#each tasks as task, idx}
      <!-- Add an input component if this task requires to show one -->
      {#if !hasNewPipelineTasks
           && visualizationItems[idx]
           && visualizationItems[idx].input !== undefined}
        <ImageVis visItem={visualizationItems[idx].input.item} isInput/>
        <i class="fas fa-arrow-right arrow"></i>
      {/if}

      <Task task={task}
            taskIndex={idx}
            onRemoveTask={removeTask}
            isLastTask={idx == tasks.length - 1}
            isNewPipelineTask={hasNewPipelineTasks}
            onNewTaskDataUpdated={updateNewPipelineTaskData} />

      <!-- Add an output component if this task requires to show one -->
      {#if !hasNewPipelineTasks
           && visualizationItems[idx]
           && visualizationItems[idx].output !== undefined}
        <i class="fas fa-arrow-right arrow"></i>
        <ImageVis visItem={visualizationItems[idx].output.item} />
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
