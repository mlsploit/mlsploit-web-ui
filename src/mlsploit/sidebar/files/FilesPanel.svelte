<script>
  import { fileStore } from '../../../store.js';
  import File from './File.svelte';
</script>

<ul class="bp3-menu">
  {#each $fileStore as file}
    <File {file} />
  {/each}
</ul>
