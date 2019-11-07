<script context="module">
  import { get } from 'svelte/store';
  import { getResourceByURL } from '../../../state.js';
  import { functionStore } from '../../../store.js';

  export const getTaskFunction = task_ => {
    return new Promise((resolve, reject) => {
      if (task_.intended_function !== undefined) {
        resolve(task_.intended_function);
      } else {
        let functionURL = task_.function;
        getResourceByURL(functionURL).then(resolve);
      }
    }).then(taskFunction => {
      return {
        ...taskFunction,
        options: JSON.parse(taskFunction.options)
      };
    });
  };
</script>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { detailViewItemStore } from '../../../store.js';
  import { setupDetailViewHandlers } from '../../rightpanel/detailview.js';
  import detailViewTypes from '../../rightpanel/detailviews/types.js';

  export let task;
  export let taskIndex = null;
  export let isLastTask = false;
  export let isModuleTask = false;
  export let isNewPipelineTask = false;
  export let onRemoveTask = (idx) => {};
  export let onNewTaskDataUpdated = (idx, data) => {};

  let taskComponent;

  let newTaskData = { arguments: {} };
  const onNewTaskArgumentValueChanged = (argument, value) => {
    newTaskData.arguments[argument] = value;
    onNewTaskDataUpdated(taskIndex, newTaskData);
  };

  let destroyDetailView;
  const taskDetailViewItem = {
    type: detailViewTypes.TASK,
    item: task,
    meta: {
      taskIndex,
      isModuleTask,
      isNewPipelineTask,
      onNewTaskArgumentValueChanged
    }
  };
  $: inFocus = (
    task
    && $detailViewItemStore
    && $detailViewItemStore.item == task
  );

  const handleDragStart = e => {
    e.target.style.opacity = 0.4;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/json', JSON.stringify(task));
  };

  const handleDragEnd = e => {
    e.target.style.opacity = 1.0;
    jQuery('.dropzone.over').removeClass('over');
  };

  const onRemoveTaskBtnClicked = e => { onRemoveTask(taskIndex); };

  onMount(() => {
    destroyDetailView = setupDetailViewHandlers(taskComponent, taskDetailViewItem);

    getTaskFunction(task).then(taskFunction => {
      newTaskData.function = taskFunction;
      onNewTaskDataUpdated(taskIndex, newTaskData);
    });

    if (isNewPipelineTask) { jQuery(taskComponent).trigger('click'); }
  });

  onDestroy(() => {
    destroyDetailView();
  });
</script>

<style>
  .task {
    padding: 10px;
    max-width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    transition: border-color 0.2s ease-in-out,
      box-shadow 0.3s ease-in-out,
      background-color 0.2s ease-in-out;

    /* Mimic Bootstrap Card component */
    position: relative;
    border: 1px solid rgba(0,0,0,.125);
    background: #ffffff;
    border-radius: .25rem;
  }

  .task:hover {
    border-color: var(--g-dark-gray);
    background: var(--g-light-gray);
  }

  .task-focus {
    border-color: var(--g-dark-gray);
    background: var(--g-light-gray);
    box-shadow: var(--outer-shadow);
  }

  /* Add additional style to the tasks in the left panel */
  .task.module {
    margin: 1rem;
  }

  .task .function-name {
    font-weight: 300;
    font-size: 14px;
    max-width: 280px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
  }

  .delete {
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 10px;
    color: var(--g-dark-gray);
    opacity: 0.5;
  }

  .delete:hover {
    opacity: 1;
    color: var(--g-red);
  }

</style>

<!--
  Bootsrap Card component has weird behavior with ellipsis overflow text element
  and flex parent, so we are not using it here.
-->
<div class="task"
      class:task-focus={inFocus}
      class:module={isModuleTask}
      bind:this={taskComponent}
      tabindex="-1"
      draggable={isModuleTask}
      on:dragstart={handleDragStart}
      on:dragend={handleDragEnd}>

  <!-- Use div instead of span for text ellipsis overflow -->
  {#await getTaskFunction(task) then task_function}
    <div class="function-name">{task_function.name}</div>
  {/await}

  {#if isNewPipelineTask && isLastTask}
    <!-- Current logic only supports deletion
         if it is the last task of a new pipeline -->
    <i class="fas fa-minus-circle delete"
       on:click={onRemoveTaskBtnClicked}>
    </i>
  {/if}

</div>
