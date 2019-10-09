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
    /* overflow-y: hidden; */
  }
  
  .main {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }
</style>

<div class="root">
  <Header />

  <div class="main">
    <LeftPanel />
    <MainPanel />
    <RightPanel />
  </div>
</div>
