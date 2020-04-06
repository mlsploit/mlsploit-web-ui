<script>
  import DetailViewTemplate from '../DetailViewTemplate.svelte';

  export let module;
</script>

<DetailViewTemplate title="Module: {module.display_name}">
  {#if module.doctxt}
    <span style="white-space: pre-line">
      {module.doctxt}
    </span>
  {/if}
</DetailViewTemplate>
