<script>
  import { onMount } from 'svelte';
  import API from '../rest.js';
  import { beginPolling } from './polling.js';
  import Sidebar from './sidebar/Sidebar.svelte';
  import MainPanel from './body/MainPanel.svelte';

  onMount(() => {
    beginPolling();
  });
</script>

<style>
  .root {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>

<div class="root">
  <Sidebar />
  <MainPanel />
</div>
