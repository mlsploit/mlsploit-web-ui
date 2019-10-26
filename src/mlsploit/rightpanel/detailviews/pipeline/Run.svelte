<script>
  import { afterUpdate, onDestroy } from 'svelte';
  import { runStatusTypes, getRunStatus } from '../../../../state.js';
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
    <a href="#" on:click={onShowLogsBtnClicked}
        data-toggle="tooltip" data-placement="top" title="Show logs">
      <i class="fas fa-scroll"></i>
    </a>
    <a href="#" on:click={onShowOutputFilesBtnClicked}
        data-toggle="tooltip" data-placement="top" title="View output files">
      <i class="fas fa-file"></i>
    </a>
  </td>
</tr>
