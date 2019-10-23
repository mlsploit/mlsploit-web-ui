<script>
  import { deletePipelineWithURL } from '../../../state.js';

  export let pipeline;

  const onDeleteConfirmationBtnClicked = e => {
    // Note: Let event propagate to close the modal
    e.preventDefault();

    deletePipelineWithURL(pipeline.url);
  };
</script>

<style>
  .modal-body {
    padding: 20px;
    font-size: 16px;
  }
</style>

<div id="delete-pipeline-{pipeline == null ? 'new' : pipeline.id}-confirm"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        Do you want to delete "{pipeline == null ? 'this new pipeline' : pipeline.name}"?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Cancel
        </button>
        <button type="button" class="btn btn-danger" data-dismiss="modal"
                on:click={onDeleteConfirmationBtnClicked}>
          Yes, delete it
        </button>
      </div>
    </div>
  </div>
</div>