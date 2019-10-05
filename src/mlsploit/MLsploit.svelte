<script>
  import { onMount } from 'svelte';
  import API from '../rest.js';
  import { beginPolling } from './polling.js';
  import Header from './header/Header.svelte'
  import LeftPanel from './leftpanel/LeftPanel.svelte'
  import MainPanel from './mainpanel/MainPanel.svelte'
  import RightPanel from './rightpanel/RightPanel.svelte'

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
  <Header />
  
  <LeftPanel />
  <MainPanel />
  <RightPanel />
</div>
