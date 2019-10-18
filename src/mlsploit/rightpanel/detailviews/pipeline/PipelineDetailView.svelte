<script>
  import { getResourceByURL } from '../../../../state.js';
  import DetailViewTemplate from '../DetailViewTemplate.svelte';
  import Run from './Run.svelte';

  export let pipeline;

  const loadRuns = () => {
    if (!pipeline)
      Promise.resolve([]);
    
    let promises = [];
    for (let runURL of pipeline.runs) {
      promises.push(
        getResourceByURL(runURL)
      );
    }
    return Promise.all(promises);
  };

</script>

{#if pipeline}
  <DetailViewTemplate title="Pipeline: {pipeline.name}">
    {#await loadRuns() then runs}
      {#if runs.length > 0}
        <table class="table table-hover table-borderless">
          <tbody>
            {#each runs as run}
              <Run run={run} />
            {/each}
            {#each runs as run}
              <Run run={run} />
            {/each}
            {#each runs as run}
              <Run run={run} />
            {/each}
          </tbody>
        </table>
      {:else}
        <input class="form-control" type="text" readonly
               placeholder="This pipeline has no recorded runs." />
      {/if}
    {/await}
  </DetailViewTemplate>
{:else}
  <DetailViewTemplate title="New Pipeline">
    New pipeline details here...
  </DetailViewTemplate>
{/if}