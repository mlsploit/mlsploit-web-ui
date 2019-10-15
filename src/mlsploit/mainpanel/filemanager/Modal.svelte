<script>

  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

</script>

<style>
/* 
  .modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
	} */

	.modal {
		position: absolute;
		z-index: 1; 
		display: block;
		left: 88%;
		top: 55%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
	}

	button {
		display: block;
	}

	#FileManagerModal {
		background-color: transparent;
		z-index: 1050;
	}

</style>

<div class="modal fade" id="FileManagerModal" tabindex="-1" role="dialog" 
	aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div> 
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<!-- 
<div class='modal-background' on:click='{() => dispatch("close")}'></div>
<div class='modal'>
	<slot name='header'></slot>
	<hr>
	<slot></slot>
	<hr>
	<button on:click='{() => dispatch("close")}'>close modal</button>
</div> -->