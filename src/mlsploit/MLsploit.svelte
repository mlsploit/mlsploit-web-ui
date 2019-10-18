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

<Header />

<main class="container-fluid h-100" role="main">
  <div class="row h-100">
    <LeftPanel /> 
    <MainPanel />
    <RightPanel />
  </div>
  <FileManager />
</main>
