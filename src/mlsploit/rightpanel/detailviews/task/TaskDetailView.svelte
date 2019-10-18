<script>
  import { newPipelineDataStore } from '../../../../store.js';
  import { getTaskFunction } from '../../../mainpanel/tasklist/Task.svelte';
  import TaskParam from './TaskParam.svelte';
  import DetailViewTemplate from '../DetailViewTemplate.svelte';

  export let task;
  export let meta = {};

  let isModuleTaskDetailView = meta.isModuleTask || false;
  let isNewPipelineTaskDetailView = meta.isNewPipelineTask || false;
  let isDefaultTaskDetailView = !(isModuleTaskDetailView || isNewPipelineTaskDetailView);

  let taskArguments = task.arguments ? JSON.parse(task.arguments) : {};
  if (isNewPipelineTaskDetailView) {
    taskArguments = $newPipelineDataStore.tasks[meta.taskIndex].arguments;
  }
</script>

{#await getTaskFunction(task) then taskFunction}
  <DetailViewTemplate title="Task: {taskFunction.name}">
    {#if taskFunction.options.length > 0}
      <form>
        {#each taskFunction.options as option}
          <TaskParam config={option}
                     value={taskArguments[option.name]}
                     hasInput={!isModuleTaskDetailView}
                     isReadonly={isDefaultTaskDetailView}
                     onValueChange={meta.onNewTaskArgumentValueChanged} />
        {/each}
      </form>
    {:else}
      <input class="form-control" type="text" readonly
            placeholder="This task requires no parameters." />
    {/if}

    <div slot="detail-view-footer" class="detail-view-footer">
      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
    </div>
  </DetailViewTemplate>
{/await}
