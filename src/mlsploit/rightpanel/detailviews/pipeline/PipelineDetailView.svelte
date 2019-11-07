<script>
  import { getResourceByURL } from '../../../../state.js';
  import { loadRuns } from '../../../mainpanel/pipeline/Pipeline.svelte';
  import DetailViewTemplate from '../DetailViewTemplate.svelte';
  import Run from './Run.svelte';

  export let pipeline;

  const sortRuns = runs => {
    return runs.sort((r1, r2) => {
      let r1Timestamp = new Date(r1.date_created);
      let r2Timestamp = new Date(r2.date_created);
      return (r1Timestamp > r2Timestamp ? -1 : 1);
    });
  };
</script>

<style>
  .input-field {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>

{#if pipeline}
  <DetailViewTemplate title="Pipeline: {pipeline.name}">
    {#await loadRuns(pipeline) then runs}
      {#if runs.length > 0}
        <table class="table table-hover table-borderless">
          <tbody>

            {#each sortRuns(runs) as run}
              <Run run={run} />
            {/each}

          </tbody>
        </table>
      {:else}
        <input class="form-control input-field" type="text" readonly
               title="This pipeline has no recorded runs."
               placeholder="This pipeline has no recorded runs." />
      {/if}
    {/await}
  </DetailViewTemplate>
{:else}
  <DetailViewTemplate title="New Pipeline"></DetailViewTemplate>
{/if}