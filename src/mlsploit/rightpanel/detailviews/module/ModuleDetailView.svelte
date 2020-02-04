<script>
  import { MODULE_NAME_OVERRIDES } from '../../../leftpanel/module/Module.svelte';
  import DetailViewTemplate from '../DetailViewTemplate.svelte';

  export let module;
</script>

<DetailViewTemplate title="Module: {MODULE_NAME_OVERRIDES[module.name] || module.name}">
  {#if module.doctxt}
    <span style="white-space: pre-line">
      {module.doctxt}
    </span>
  {/if}
</DetailViewTemplate>