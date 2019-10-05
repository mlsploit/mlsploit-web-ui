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
    height: 100%;
  }
  
  .container {
    display: grid;
    grid-template-columns: 20% 60% 20%;
    height: 100%;
  }
</style>

<div class="root">
  <Header />

  <div class="container">
    <LeftPanel />
    <!-- <MainPanel /> -->
    <!-- <RightPanel /> -->
  </div>
</div>
