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
        outputTyle: 'image',
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
  console.log(taskInputOutput)

</script>

<style>
  .task-list {
    width: 100%;
    display: flex;
    flex-direction: row;
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

  .output, .input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .hidden {
    opacity: 0.0;
  }

  .first {
    margin-left: 20px;
  }

</style>

<div class="task-list rounded" bind:this={taskListComponent}>
  {#if !showDropzone}
    {#each tasks as task, idx}
      <Task task={task} isNewPipelineTask={hasNewPipelineTasks}>
        <!-- Input slot-->
        <div slot="input-vis">
          {#if taskInputOutput[idx].showInput}
            <div class="input first">
              <i class="fas fa-arrow-right hidden"></i>
              <ImageVis imageURL={taskInputOutput[idx].inputSource} isInput/>
              <i class="fas fa-arrow-right"></i>
            </div>
          {/if}  
        </div>

        <!-- Output Slot-->
        <div class="output" slot="output-vis">
          {#if taskInputOutput[idx].showOutput}
            {#if idx !== tasks.length - 1}
              <i class="fas fa-arrow-right hidden"></i>
                <ImageVis imageURL={taskInputOutput[idx].outputSource}/>
              <i class="fas fa-arrow-right"></i>
            {:else}
              <ImageVis imageURL={taskInputOutput[idx].outputSource}/>
            {/if}
          {:else}
            {#if idx !== tasks.length - 1}
              <i class="fas fa-arrow-right"></i>
            {/if}
          {/if}
        </div>
      </Task>
    {/each}
  {/if}

  {#if showDropzone}
    {#each tasks as task, idx}
      {#if idx !== 0}
        <i class="fas fa-arrow-right"></i>
      {/if}
      
      <Task task={task} isNewPipelineTask={hasNewPipelineTasks}>
      </Task>
    {/each}

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
