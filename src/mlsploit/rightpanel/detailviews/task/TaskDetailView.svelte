<script>
  import data from '../../../../dummydata.js';
  import DetailViewTemplate from '../DetailViewTemplate.svelte';

  export let task;
  export let meta = {};

  const get_task_function = t => {
    return (
      t.intended_function 
      || data.functions.find(
        f => (f.url === t.function)
      )
    );
  };

  $: task_function = get_task_function(task);
  $: isModuleTaskDetailView = meta.isModuleTask || false;
  $: isNewPipelineTaskDetailView = meta.isNewPipelineTask || false;
</script>

<DetailViewTemplate title="Task: {task_function.name}">
  Task details here...
</DetailViewTemplate>

