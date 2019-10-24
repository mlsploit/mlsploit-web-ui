<script context="module">
  export const getLogsModalIDForRun = run => {
    return `run-${run.id}-logs-modal`;
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { getResourceByURL } from '../../../state.js';

  export let run;

  let logs = '';
  let logsModalID = getLogsModalIDForRun(run);

  const getRunLogs = run => {
    return Promise.all(run.jobs.map(getResourceByURL))
      .then(jobs => {
        let logs_ = '';
        for (let job of jobs) { logs_ += job.logs + '\n\n'; }
        return logs_;
      });
  };

  onMount(() => {
    jQuery(`#${logsModalID}`).on('show.bs.modal', e => {
      getRunLogs(run).then(logs_ => { logs = logs_ });
    });
  });
</script>

<style>
  .modal {
    height: 80vh;
  }
</style>

<div id={logsModalID} class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Logs</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <span style="white-space: pre-line">{logs}</span>
      </div>
    </div>
  </div>
</div>