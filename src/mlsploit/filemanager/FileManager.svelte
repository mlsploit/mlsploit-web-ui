<script context="module">
  import { filterFilesByURLStore } from '../../store.js';

  export const clearFilterFilesByURLStore = () => {
    filterFilesByURLStore.set([]);
  };
</script>

<script>
  import { afterUpdate } from 'svelte';
  import { getResourceByURL } from '../../state.js';
  import { fileStore } from '../../store.js';
  import { fileKinds } from './File.svelte';
  import File from './File.svelte';

  let filesVisible = [];

  const getFilesByURL = fileURLs => {
    let promises = [];
    for (fileURL of fileURLs) {
      promises.push(
        getResourceByURL(fileURL)
      );
    }

    return Promise.all(promises);
  };

  const setVisibleFiles = () => {
    filesVisible = [];

    if ($filterFilesByURLStore.length > 0) {
      getFilesByURL($filterFilesByURLStore).then(
        files => { filesVisible = files; }
      );
    } else {
      filesVisible = $fileStore.filter(
        f => (f.kind === fileKinds.INPUT)
      );
    }
  };

  filterFilesByURLStore.subscribe(setVisibleFiles);

  afterUpdate(() => {
    jQuery('#file-manager').on('show.bs.modal', setVisibleFiles);
    jQuery('#file-manager').on('hidden.bs.modal', clearFilterFilesByURLStore);
  });
</script>

<style>
  table {
    margin-bottom: 0;
  }
</style>

<div id="file-manager" 
     class="modal fade" 
     tabindex="-1" 
     role="dialog" 
     aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Files</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table table-hover table-borderless">
          <tbody>
            {#each filesVisible as file}
              <File {file} />
            {/each}
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">
          Upload a new file
        </button>
      </div>
    </div>
  </div>
</div>