<script>
  import Module from './modules/module.svelte';
  import Wears_Glasses from './modules/wears_glasses.svelte'
  import Age from './modules/age.svelte'
  import Gender from './modules/gender.svelte'
</script>

<style>
  #right-panel {
    padding: 20px;
    overflow-y: scroll;
    height: 100vh;
  }
</style>

<div id="right-panel" class="col-md-3 collapse">
  <h1> Parameters </h1>
  <Module />
  <Age />
  <Gender />
  <Wears_Glasses />
</div>
