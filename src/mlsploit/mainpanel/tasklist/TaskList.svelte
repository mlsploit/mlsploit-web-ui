<script>
  import Task from './Task.svelte';
  export let tasks = [];
  export let showDropzone = false;

  const handleDragEnter = e => {
    e.target.classList.add('over');
  };

  const handleDragOver = e => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move'; 

    return false;
  };

  const handleDragLeave = e => {
    e.target.classList.remove('over');
  };

  const handleDrop = e => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    let t = JSON.parse(e.dataTransfer.getData('text/json'));
    tasks = [...tasks, t];
    
    return false;
  };
</script>

<style>
  .task-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 20px;
    /* border: 1px gray solid; */
    background-color: rgb(250, 250, 250);
  }

  .fa-arrow-right {
    margin: auto 10px;
  }

  .dropzone {
    margin: 20px;
    padding: 20px;
    min-width: 150px;
    display: inline-block;
    border-radius: 3px;
    border-style: dashed;
    border-width: 1px;
    color: rgb(155, 155, 155);
  }

  .over {
    border-width: 2px;
  }
</style>

<div class="task-list">
  {#each tasks as task, idx}
    {#if idx !== 0}
      <i class="fas fa-arrow-right"></i>
    {/if}
    
    <Task {task} />
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
      drag here...
    </div>
  {/if}

  <span class="over" style="width:2px;opacity:0;">-</span>
</div>