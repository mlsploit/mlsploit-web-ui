<script>
  import DetailViewTemplate from '../DetailViewTemplate.svelte';

  export let module;
</script>

<DetailViewTemplate title="Module: {module.name}">
  Module details here...
</DetailViewTemplate>