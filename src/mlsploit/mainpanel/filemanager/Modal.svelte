<script>

  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

</script>

<style>

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

<!-- File manager modal window -->
<div class="modal fade" id="FileManagerModal" 
	tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

			<!-- Modal header -->
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

			<!-- Modal body -->
      <div class="modal-body">
        ...
      </div> 

			<!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
			
    </div>
  </div>
</div>