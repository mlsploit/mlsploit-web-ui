<script>
  import { afterUpdate } from 'svelte';
  import { getResourceByURL } from '../../../../state.js';

  export let run;

  let momentString = moment(run.date_created).fromNow();
  
  const loadJobs = () => {
    let promises = [];
    for (let jobURL of run.jobs) {
      promises.push(
        getResourceByURL(jobURL)
      );
    }
    return Promise.all(promises);
  };

  const getStatus = jobs => {
    const statusRanks = {
      PENDING: 0,
      RUNNING: 1,
      FINISHED: 2
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
      <a href="#" data-toggle="tooltip" data-placement="top" title="Show logs">
        <i class="fas fa-scroll"></i>
      </a>
      <a href="#" data-toggle="tooltip" data-placement="top" title="View output files">
        <i class="fas fa-file"></i>
      </a>
    </td>
  {/await}
</tr>
