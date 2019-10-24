<script>
  import Auth from './auth/Auth.svelte';
  import MLsploit from './mlsploit/MLsploit.svelte';
  import { tokenStore } from './store.js';
  import {
    NO_TOKEN,
    loadTokenFromStorage,
    createStorageEventListenerForToken
  } from './auth/token.js';

  loadTokenFromStorage();
  createStorageEventListenerForToken();
  $: token = $tokenStore;
</script>

<MLsploit />
