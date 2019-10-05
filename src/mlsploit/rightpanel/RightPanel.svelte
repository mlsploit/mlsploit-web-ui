<script>
  import Module from './modules/module.svelte';
  import Wears_Glasses from './modules/wears_glasses.svelte'
  import Age from './modules/age.svelte'
  import Gender from './modules/gender.svelte'
</script>

<style>
  #right-panel {
    width: 400px;
    height: 100vh;
    padding: 10px;
    background-color: var(--gray);
  }
</style>

<div id="right-panel">
  <h1> Parameters </h1>
  <Module />
  <Age />
  <Gender />
  <Wears_Glasses />
</div>
