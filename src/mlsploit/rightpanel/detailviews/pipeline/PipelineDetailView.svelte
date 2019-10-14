<script>
  import DetailViewTemplate from '../DetailViewTemplate.svelte';

  export let pipeline;
</script>

{#if pipeline}
  <DetailViewTemplate title="Pipeline: {pipeline.name}">
    Pipeline details here...
  </DetailViewTemplate>
{:else}
  <DetailViewTemplate title="New Pipeline">
    New pipeline details here...
  </DetailViewTemplate>
{/if}