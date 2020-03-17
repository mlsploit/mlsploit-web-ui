<script>
  import { afterUpdate, onDestroy } from 'svelte';
  import { runStatusTypes, getRunStatus, deleteRunWithURL } from '../../../../state.js';
  import {
    fileManagerModes,
    setAndShowFileManager
  } from '../../../filemanager/FileManager.svelte';
  import { getLogsModalIDForRun } from '../../../mainpanel/pipeline/LogsModal.svelte';

  export let run;

  let runStatus = '';
  let runStatusChecker;
  let momentString = moment(run.date_created).fromNow();

  const getAndShowRunStatus = () => {
    getRunStatus(run.url).then(s => {
      runStatus = s;
      if (!(s === runStatusTypes.FINISHED)
          && !(s === runStatusTypes.FAILED))
        runStatusChecker = setTimeout(getAndShowRunStatus, 5000);
    });
  };
  getAndShowRunStatus();

  const onShowOutputFilesBtnClicked = e => {
    e.preventDefault();
    e.stopPropagation();

    setAndShowFileManager(fileManagerModes.OUTPUT, {run});
  }

  const onShowLogsBtnClicked = e => {
    e.preventDefault();
    e.stopPropagation();

    jQuery(`#${getLogsModalIDForRun(run)}`).modal('show');
  }

  const onDeleteRunBtnClicked = e => {
    e.preventDefault();
    e.stopPropagation();

    deleteRunWithURL(run.url);
    jQuery('.run a[data-toggle="tooltip"]').tooltip('hide');
  }

  afterUpdate(() => {
    setTimeout(() => {
      jQuery('.run a[data-toggle="tooltip"]').tooltip();
    }, 100);
  });

  onDestroy(() => {
    if (runStatusChecker !== null)
      clearTimeout(runStatusChecker);
  });
</script>

<style>
  .delete {
    color: red;
  }
</style>

<tr class="run">
  <td>
    {momentString}
  </td>

  <td>
    {#if runStatus}
      {runStatus}
    {/if}
  </td>

  <td class="text-right">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" on:click={onShowLogsBtnClicked}
        data-toggle="tooltip" data-placement="top" title="Show logs">
      <i class="fas fa-scroll"></i>
    </a>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" on:click={onShowOutputFilesBtnClicked}
        data-toggle="tooltip" data-placement="top" title="View output files">
      <i class="fas fa-file"></i>
    </a>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" on:click={onDeleteRunBtnClicked}
        data-toggle="tooltip" data-placement="top" title="Delete this run">
      <i class="fas fa-times delete"></i>
    </a>
  </td>
</tr>
