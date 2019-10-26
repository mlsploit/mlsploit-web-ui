<script>
  import { newPipelineVisibleStore } from '../../store.js';
  import Settings from './Settings.svelte';

  const onNewPipelineBtnClicked = (e) => {
    if (e.preventDefault) { e.preventDefault(); }
    $newPipelineVisibleStore = true;
  };

</script>

<style>
  .brand {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .brand-text {
    margin-left: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
  }

  .logo {
    display: inline-block;
    vertical-align: text-bottom;
  }

  .logo > img {
    height: 4rem;
  }

  .brand-name {
    font-size: 2.5rem;
    color: white;
  }

  .brand-tagline {
    margin-left: 1.5rem;
    font-size: 1.75rem;
    font-weight: 200;
    color: rgba(255, 255, 255, 0.5);
  }

  .navbar-buttons {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  .navbar-buttons button {
    margin: 0 0.1rem;
    font-size: 1.2rem;
  }

  @media all and (max-width: 960px) {
    .brand-text {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .brand-tagline {
      margin-left: 0;
      font-size: 1.5rem;
      font-weight: 200;
      color: rgba(255, 255, 255, 0.5);
    }

    .navbar-buttons button {
      font-size: 1rem;
    }
  }

</style>

<nav class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm sticky-top">
  <div class="container-fluid">
    <div class="row w-100 align-items-center">
      <div class="col-md-8">
        <div class="brand">
          <div class="logo">
              <img src="/assets/img/mlsploit-icon.png" alt="MLsploit" />
          </div>
          <div class="brand-text">
            <div class="brand-name" href="/"><strong>ML</strong>sploit</div>
            <div class="brand-tagline">Experiment with AI Security in your browser!</div>
          </div>
        </div>
      </div>

      <div class="col-md-4 text-md-right text-sm-left">
        <div class="navbar-buttons">
          <button type="button"
            class="btn btn-primary"
            style="order: 3;"
            on:click={onNewPipelineBtnClicked}>
            <i class="fas fa-plus-square"></i> New Pipeline
          </button>

          <button type="button"
            class="btn btn-secondary"
            id="btn-files"
            style="order: 2;"
            data-toggle="modal"
            data-target="#file-manager">
            <i class="fas fa-file"></i> Files
          </button>

          <Settings />

        </div>
      </div>
    </div>
  </div>
</nav>