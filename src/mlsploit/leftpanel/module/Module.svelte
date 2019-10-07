<script>
  import data from '../../../dummydata.js';
  import Task from '../../mainpanel/tasklist/Task.svelte';
  
  export let module;

  let isExpanded = false;
  const toggleIsExpanded = () => {
    isExpanded = !isExpanded;
  };

  let tasks = module.functions.map(f => {
    return {
      "intended_function": f
    };
  });
</script>

<style>
  .module {
    margin: 10px;
  }

  .module-name {
    padding: 10px;
    border: 0px;
    background-color: var(--gray);
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
  }

  .module-name:hover {
    background-color: lightgrey;
  }
</style>

<div class="module">
  <div class="module-name" on:click={toggleIsExpanded}>
    {#if isExpanded}
      <i class="fas fa-angle-down"></i>
    {:else}
      <i class="fas fa-angle-right"></i>
    {/if}
    
    <strong>{module.name}</strong>
  </div>

  {#if isExpanded}
    <ul>
      {#each tasks as task}
        <Task {task} isModuleTask={true} />
      {/each}
    </ul>
  {/if}
</div>
