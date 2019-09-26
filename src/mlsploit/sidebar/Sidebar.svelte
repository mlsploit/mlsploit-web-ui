<script>
  import FilesPanel from './files/FilesPanel.svelte';
</script>

<style>
  .sidebar {
    width: 400px;
    height: 100vh;
    padding: 10px;
    background-color: rgb(41, 55, 66);
  }

  .logo > img {
    width: 100px;
  }
</style>

<div class="sidebar bp3-dark">
    
    <div class="logo text-center">
      <img src="/assets/img/mlsploit-logo-alt.png" alt="MLsploit" />
    </div>

    <FilesPanel />
</div>
