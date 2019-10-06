<script>
  import Task from './Task.svelte';
  export let tasks;
  export let showDropzone = false;
</script>

<style>
  .task-list {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .fa-arrow-right {
    margin: auto;
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
    
    <div class="dropzone">
      drag here...
    </div>
  {/if}

  <span style="width:20px;opacity:0;">-</span>
</div>