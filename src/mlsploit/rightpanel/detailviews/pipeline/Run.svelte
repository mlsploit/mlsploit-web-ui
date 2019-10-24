<script>
  import { afterUpdate } from 'svelte';
  import { getResourceByURL } from '../../../../state.js';
  import {
    fileManagerModes,
    setAndShowFileManager
  } from '../../../filemanager/FileManager.svelte';
  import { getLogsModalIDForRun } from '../../../mainpanel/pipeline/LogsModal.svelte';

  export let run;

  let momentString = moment(run.date_created).fromNow();

  const loadJobs = () => Promise.all(run.jobs.map(getResourceByURL));

  const getStatus = jobs => {
    const statusRanks = {
      PENDING: 0,
      RUNNING: 1,
      FINISHED: 2,
      FAILED: 3
    }

    let rank = 0, status = 'PENDING';
    for (let job of jobs) {
      let currentJobRank = statusRanks[job.status];
      if (currentJobRank > rank) {
        rank = currentJobRank;
        status = job.status;
      }
    }

    return status;
  };

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
      jQuery('[data-toggle="tooltip"]').tooltip();
    }, 1000);
  });

</script>

<tr>
  {#await loadJobs() then jobs}
    <td>
      {momentString}
    </td>

    <td>
      {getStatus(jobs)}
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
  {/await}
</tr>
