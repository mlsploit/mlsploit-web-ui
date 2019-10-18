<script>
  import { onMount } from 'svelte';
  import API from '../rest.js';
  import { populateAllResourceStores } from '../state.js';
  import { beginPolling } from './polling.js';
  import Header from './header/Header.svelte';
  import LeftPanel from './leftpanel/LeftPanel.svelte';
  import MainPanel from './mainpanel/MainPanel.svelte';
  import RightPanel from './rightpanel/RightPanel.svelte';
  import FileManager from './filemanager/FileManager.svelte';

  onMount(() => {
    populateAllResourceStores();
    // beginPolling();
  });
</script>

<style>
  #image-vis-popover-container  {
    /* Prevent overlay popover flashing */
    pointer-events: none;
  }
</style>

<Header />

<main class="container-fluid h-100" role="main">
  <!-- Put our popover in this container -->
  <div id="popover-container">
    <div id="image-vis-popover-container"></div>
  </div>
  <div class="row h-100">
    <LeftPanel /> 
    <MainPanel />
    <RightPanel />
  </div>
  <FileManager />
</main>
