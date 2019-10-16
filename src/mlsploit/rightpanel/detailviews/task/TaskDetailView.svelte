<script>
  import data from '../../../../dummydata.js';
  import TaskParam from './TaskParam.svelte';
  import DetailViewTemplate from '../DetailViewTemplate.svelte';

  export let task;
  export let meta = {};

  const get_task_function = t => {
    let tf = (t.intended_function
              || data.functions.find(
                f => (f.url === t.function)
              )
    );

    let task_function = {...tf};
    task_function.options = JSON.parse(task_function.options);
    return task_function;
  };

  $: task_function = get_task_function(task);
  $: task_arguments = task.arguments ? JSON.parse(task.arguments) : {};
  $: isModuleTaskDetailView = meta.isModuleTask || false;
  $: isNewPipelineTaskDetailView = meta.isNewPipelineTask || false;
  $: isDefaultTaskDetailView = !(isModuleTaskDetailView || isNewPipelineTaskDetailView);
</script>

<DetailViewTemplate title="Task: {task_function.name}">
  {#if task_function.options.length > 0}
    <form>
      {#each task_function.options as option}
        <TaskParam config={option}
                   value={task_arguments[option.name]}
                   hasInput={!isModuleTaskDetailView}
                   isReadonly={isDefaultTaskDetailView} />
      {/each}
      
      {#if isNewPipelineTaskDetailView}
        <button type="submit" class="btn btn-primary">Submit</button>
      {/if}
    </form>
  {:else}
    <input class="form-control" type="text" readonly
           placeholder="This function requires no options." />
  {/if}

  <div slot="detail-view-footer" class="detail-view-footer">
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
  </div>
</DetailViewTemplate>
