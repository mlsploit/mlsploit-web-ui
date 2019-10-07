<script>
  import data from '../../../dummydata.js';
  
  export let task;
  export let isModuleTask = false;
  export let isNewPipelineTask = false;

  let task_function = (
    task.intended_function
    || data.functions.find(f => (f.url === task.function)));

  const handleDragStart = e => {
    e.target.style.opacity = 0.4;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/json', JSON.stringify(task));
  };

  const handleDragEnd = e => {
    e.target.style.opacity = 1.0;
    jQuery('.dropzone.over').removeClass('over');
  };
</script>

<style>
  .task {
    margin: 20px 10px;
    display: inline-block;
  }

  .task[draggable=true] {
    cursor: move;
  }
</style>

<div class="task bp3-card bp3-elevation-1 bp3-interactive" 
     draggable={isModuleTask} 
     on:dragstart={handleDragStart}
     on:dragend={handleDragEnd}>
  {task_function.name}
</div>
