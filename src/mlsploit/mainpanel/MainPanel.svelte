<script>
import Panel from './Panel.svelte'
</script>

<style>
  #main-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: yellow;
  }
</style>

<div id="main-panel">
  Main Panel
  <Panel />
</div>