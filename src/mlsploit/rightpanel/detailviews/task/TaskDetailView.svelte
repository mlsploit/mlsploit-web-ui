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
      <h6>Parameters:</h6>
      <form>
        {#each taskFunction.options as option}
          <TaskParam option={option}
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
      {#if taskFunction.doctxt}
        <span style="white-space: pre-line">
          {taskFunction.doctxt}
        </span>
      {/if}
    </div>
  </DetailViewTemplate>
{/await}
