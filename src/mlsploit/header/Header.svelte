<script>
  import { newPipelineVisibleStore, FileManagerVisibleStore } from '../../store.js';
  import Modal from '../mainpanel/filemanager/Modal.svelte';

  const onNewPipelineBtnClicked = (e) => {
    if (e.preventDefault) { e.preventDefault(); }
    $newPipelineVisibleStore = true;
  };

  const onFileManagerBtnClicked = (e) => {

    console.log("file manager btn clicked")
    
    if (e.preventDefault) { e.preventDefault() ;}
    $FileManagerVisibleStore = true;
  }

</script>

<style>
  .logo {
    display: inline-block;
    vertical-align: text-bottom;
  }

  .logo > img {
    height: 4rem;
  }

  .brand {
    margin-left: 0.5rem;
    display: inline-block;
  }

  .brand-name {
    font-size: 2rem;
    color: white;
  }
  
  .tagline {
    font-size: 1rem;
    font-weight: 200;
    color: white;
  }

  .navbar-buttons {
    margin-top: 1rem;
  }
</style>

<nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
  <div class="container-fluid">
    <div class="row w-100">
      <div class="col-md-6">
            <div class="logo">
                <img src="/assets/img/mlsploit-icon.png" alt="MLsploit" />
            </div>

            <div class="brand">
              <span class="brand-name" href="/"><strong>ML</strong>sploit</span>
              <br />
              <span class="tagline">Experiment with AI Security in your browser!</span>
            </div>
      </div>
      
      <div class="col-md-6 text-right">
        <div class="navbar-buttons">
          <button type="button" class="btn btn-primary" 
                  on:click={onNewPipelineBtnClicked}>
            <i class="fas fa-plus-square"></i> New Pipeline
          </button>
          
          <button type="button" class="btn btn-secondary" id="btn-files" 
                  on:click={onFileManagerBtnClicked}>
            <i class="fas fa-file"></i> Files
          </button>
          
          <button type="button" class="btn btn-secondary">
            <i class="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
