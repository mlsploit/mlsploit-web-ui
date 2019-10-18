<script>
  import { onMount } from 'svelte';
  import { setupDetailViewHandlers } from '../../rightpanel/detailview.js';
  import detailViewTypes from '../../rightpanel/detailviews/types.js';
  import Task from '../../mainpanel/tasklist/Task.svelte';
  
  export let module;

  let moduleComponent;

  const moduleDetailViewItem = {
    type: detailViewTypes.MODULE,
    item: module
  }

  let isExpanded = false;
  const toggleIsExpanded = e => {
    if (e.preventDefault) { e.preventDefault(); }
    if (e.stopPropagation) { e.stopPropagation(); }

    isExpanded = !isExpanded;
    jQuery('#module-'+module.id+'-tasks').collapse('toggle');
  };

  let tasks = module.functions.map(f => {
    return { 'intended_function': f };
  });

  onMount(() => {
    setupDetailViewHandlers(
      moduleComponent, 
      moduleDetailViewItem
    );
  });
</script>

<style>
  .module {
    cursor: pointer;
    border-bottom: var(--border);
    transition: background 500ms;
  }

  .expand-btn {
    opacity: 0;
    float: right;
    font-size: 1.5rem;
  }

  .module:hover, .module:focus {
    background: var(--g-light-gray);
  }

  .module:hover .expand-btn {
    opacity: 0.4;
  }

  .module h6 {
    font-weight: 200;
    color: var(--g-dark-gray);
  }

  .module:focus h6 {    
    color: black;
  }

  .module .expand-btn:hover {
    opacity: 1;
    color: var(--g-blue);
  }

  .module-icon {
    padding: 0;
  }

  .module-icon > img {
    width: 100%;
    height: 100%;
    object-fit: fit;
  }

  .module-tasks {
    margin-top: 20px;
    overflow-x: auto;
  }

  .module-tasks:hover {
    cursor: default;
  }

  .task-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="module" tabindex="-1" bind:this={moduleComponent}>
  <div class="card-body">
    <div class="container">
      
      <div class="row">
        <div class="col-md-3 module-icon">
          <img src="/assets/img/module.jpg" alt={module.name} />
        </div>
        
        <div class="col-md-9">
          <i class="fas fa-chevron-{isExpanded ? 'up' : 'down'} expand-btn" on:click={toggleIsExpanded}></i>
          <h4 class="module-name">{module.name}</h4>
          <h6 class="mb-2">Module tagline here...</h6>
        </div>
      </div>

      <div id="module-{module.id}-tasks" class="row collapse rounded module-tasks"
           tabindex="-1" on:click={(e) => { e.stopPropagation(); }}>
        <div class="task-wrapper">
          {#each tasks as task}
            <Task {task} isModuleTask={true} />
          {/each}
        </div>
      </div>

    </div>
  </div>
</div>