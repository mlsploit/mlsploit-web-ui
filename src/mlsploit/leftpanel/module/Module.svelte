<script>
  import data from '../../../dummydata.js';
  import Task from '../../mainpanel/tasklist/Task.svelte';
  
  export let module;

  const toggleIsExpanded = () => {
    jQuery('#module-'+module.id+'-tasks').collapse('toggle');
  };

  let tasks = module.functions.map(f => {
    return { "intended_function": f };
  });
</script>

<style>
  .module {
    cursor: pointer;
    border-bottom: var(--border);
  }

  .module:hover .card-title {
    font-weight: bolder;
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
    background-color: var(--g-light-gray);
  }

  .module-tasks:hover {
    cursor: default;
  }

  .task-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

<div class="module">
  <div class="card-body" on:click={toggleIsExpanded}>
    <div class="container">
      
      <div class="row">
        <div class="col-md-3 module-icon">
          <img src="/assets/img/module.jpg" alt={module.name} />
        </div>
        
        <div class="col-md-9">
          <h4 class="card-title">{module.name}</h4>
          <h6 class="card-subtitle mb-2 text-muted">Module tagline here...</h6>
        </div>
      </div>

      <div id="module-{module.id}-tasks" class="row collapse rounded module-tasks"
           on:click={(e) => { e.stopPropagation(); }}>
        <div class="task-wrapper">
          {#each tasks as task}
            <Task {task} isModuleTask={true} />
          {/each}
        </div>
      </div>

    </div>
  </div>
</div>