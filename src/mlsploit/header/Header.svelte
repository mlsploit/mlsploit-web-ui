<script>
  import { newPipelineVisibleStore } from '../../store.js';

  const onNewPipelineBtnClicked = (e) => {
    if (e.preventDefault) { e.preventDefault(); }
    $newPipelineVisibleStore = true;
  };
</script>

<style>
  .logo {
    height: 40px;
  }
  
  .tagline {
    color: #6c757d;
  }
</style>

<nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
  <div class="container-fluid">
    <div class="row w-100">
      <div class="col-md-4">
        <img class="logo" src="/assets/img/mlsploit-icon.png" alt="MLsploit" />
        <a class="navbar-brand" href="/">MLsploit</a>
        <span class="tagline">Experiment with AI Security in your browser!</span>
      </div>
      
      <div class="col-md-4 text-center">
        <button type="button" class="btn btn-outline-secondary" 
                on:click={onNewPipelineBtnClicked}>
          <i class="fas fa-plus-square"></i> New Pipeline
        </button>
        
        <button type="button" class="btn btn-outline-secondary" id="btn-files">
          <i class="fas fa-file"></i> Files
        </button>
      </div>
      
      <div class="col-md-4 text-right">
        <button type="button" class="btn btn-outline-secondary">
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </div>
  </div>
</nav>