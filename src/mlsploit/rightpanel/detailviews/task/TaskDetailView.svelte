<script>
  import data from '../../../../dummydata.js';
  import DetailViewTemplate from '../DetailViewTemplate.svelte';

  export let task;
  export let meta = {};

  const isModuleTaskDetailView = meta.isModuleTask || false;
  const isNewPipelineTaskDetailView = meta.isNewPipelineTask || false;

  let task_function = (
    task.intended_function
    || data.functions.find(f => (f.url === task.function)));
</script>

<DetailViewTemplate title="Task: {task_function.name}">
  Task details here...
</DetailViewTemplate>

