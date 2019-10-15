<script>
  import { newPipelineVisibleStore } from '../../store.js';
  import Modal from '../mainpanel/filemanager/Modal.svelte';

  const onNewPipelineBtnClicked = (e) => {
    if (e.preventDefault) { e.preventDefault(); }
    $newPipelineVisibleStore = true;
  };

  let showModal = false;

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
                  on:click={() => showModal = true}>
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

{#if showModal}
  <Modal on:close="{() => showModal = false}">
    <h2 slot="header">
      modal
      <small><em>adjective</em>  mod·al \ˈmō-dəl\</small>
    </h2>

    <ol class="definition-list">
      <li>of or relating to modality in logic</li>
      <li>containing provisions as to the mode of procedure or the manner of taking effect —used of a contract or legacy</li>
      <li>of or relating to a musical mode</li>
      <li>of or relating to structure as opposed to substance</li>
      <li>of, relating to, or constituting a grammatical form or category characteristically indicating predication</li>
      <li>of or relating to a statistical mode</li>
    </ol>

    <a href="https://www.merriam-webster.com/dictionary/modal">merriam-webster.com</a>
  </Modal>
{/if}
