<script>
  import data from '../../dummydata.js';
  import { newPipelineVisibleStore, FileManagerVisibleStore } from '../../store.js';
  import Pipeline from './pipeline/Pipeline.svelte';
  import Modal from './filemanager/Modal.svelte';

  export let showNewPipeline = false;
  
  let pipelines = data.pipelines;
  // let showModal = $FileManagerVisibleStore;
  // console.log("showModal:", showModal);

</script>

<style>
  #main-panel {
    padding: 2rem;
    background-color: var(--g-light-gray);
  }
</style>

<div id="main-panel" class="col-md-6">
  {#if $newPipelineVisibleStore}
    <Pipeline isNewPipeline={true} />
  {/if}
  
  {#each pipelines as pipeline}
    <Pipeline {pipeline} />
  {/each}
  {#each pipelines as pipeline}
    <Pipeline {pipeline} />
  {/each}
  {#each pipelines as pipeline}
    <Pipeline {pipeline} />
  {/each}

</div>

{#if $FileManagerVisibleStore}
	<Modal on:close="{() => $FileManagerVisibleStore = false}">
		<h2 slot="header">
			modal
			<small><em>adjective</em>  mod·al \ˈmō-dəl\</small>
		</h2>

		<ol class="definition-list">
			<li>of or relating to modality in logic</li>
			<li>containing provisions as to the mode of procedure or the manner of taking effect —used of a contract or legacy</li>
			<li>of or relating to a musical mode</li>
			<li>of or relating tso structure as opposed to substance</li>
			<li>of, relating to, or constituting a grammatical form or category characteristically indicating predication</li>
			<li>of or relating to a statistical mode</li>
		</ol>

		<a href="https://www.merriam-webster.com/dictionary/modal">merriam-webster.com</a>
	</Modal>
{/if}
