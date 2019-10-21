<script context="module">
  import { get } from 'svelte/store';
  import { getResourceByURL } from '../../state.js';
  import { fileManagerModeStore, fileManagerMetaStore } from '../../store.js';

  export const fileManagerModes = {
    MANAGE: 'MANAGE', // allows uploading/deleting/tagging etc.
    SELECT: 'SELECT', // select files to run through pipeline
    OUTPUT: 'OUTPUT'  // show output files for a run
  };
  fileManagerModes.DEFAULT = fileManagerModes.MANAGE;

  export const setFileManagerMode = (mode, meta) => {
    fileManagerMetaStore.set(
      meta !== undefined ? meta : {}
    );
    
    fileManagerModeStore.set(
      mode !== undefined 
      ? fileManagerModes[mode] 
      : fileManagerModes.DEFAULT
    );
  };

  export const showFileManager = () => {
    jQuery('#file-manager').modal('show');
  };

  export const setAndShowFileManager = (mode, meta) => {
    setFileManagerMode(mode, meta);
    showFileManager();
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { fileStore } from '../../store.js';
  import { fileKinds } from './File.svelte';
  import File from './File.svelte';
  import API from '../../rest.js';

  let filesVisible = [];
  let filesSelected = [];
  let filesToUpload = null;

  let fileManagerTitle;
  fileManagerModeStore.subscribe(mode => {
    switch (mode) {
      case fileManagerModes.MANAGE:
        fileManagerTitle = 'Manage Files';
        break;

      case fileManagerModes.SELECT:
        let pipeline_name = $fileManagerMetaStore.pipeline.name;
        fileManagerTitle = `Select Files for "${pipeline_name}"`;
        break;

      case fileManagerModes.OUTPUT:
        fileManagerTitle = 'Output Files';
        break;
    }
  });

  
  const getFilesByURL = fileURLs => Promise.all(
    fileURLs.map(getResourceByURL)
  );

  const getJobsForRun = run => Promise.all(
      run.jobs.map(getResourceByURL)
  );

  const setVisibleFiles = () => {
    filesVisible = [];
    filesSelected = [];
    
    // Run after a timeout to re-render the files
    setTimeout(() => {
      if ($fileManagerModeStore == fileManagerModes.OUTPUT) {
        let run = $fileManagerMetaStore.run
        getJobsForRun(run)
          .then(jobs => {
            let lastJob = jobs[jobs.length - 1];
            let fileURLs = lastJob.output_files;
            return fileURLs;
          })
          .then(getFilesByURL)
          .then(files => {
            filesVisible = files;
          });
      } else {
        filesVisible = $fileStore.filter(
          f => (f.kind === fileKinds.INPUT)
        );
      }
    }, 10);
  };

  const onFileSelectionChanged = (fileURL, isSelected) => {
    let newFilesSelected = isSelected
      ? [...new Set([...filesSelected, fileURL])]
      : filesSelected.filter(f => (f != fileURL));

    filesSelected = [...newFilesSelected].sort();
  }

  const onRunPipelineBtnClicked = e => {
    let pipeline = $fileManagerMetaStore.pipeline;
    if (pipeline !== undefined) {
      console.log('run', pipeline.url, filesSelected);
      API.runPipeline(pipeline.url, filesSelected);
    }
  }

  onMount(() => {
    setFileManagerMode();
    fileManagerModeStore.subscribe(setVisibleFiles);
    jQuery('#file-manager').on('show.bs.modal', e => { setVisibleFiles(); });
    jQuery('#file-manager').on('hidden.bs.modal', e => { setFileManagerMode(); });
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
        <h4 class="modal-title">{fileManagerTitle}</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table table-hover table-borderless">
          <tbody>
            {#each filesVisible as file}
              <File file={file} onFileSelectionChanged={onFileSelectionChanged}
                    enableSelect={$fileManagerModeStore == fileManagerModes.SELECT} />
            {/each}
          </tbody>
        </table>
      </div>
      {#if $fileManagerModeStore == fileManagerModes.MANAGE}
        <div class="modal-footer">
          <input type=file multiple on:change={(event) => {
            filesToUpload = event.target.files;
          }}>
          <button type="button" class="btn btn-primary" disabled={filesToUpload == null} on:click={() =>{
            if (filesToUpload) {
              API.uploadFiles(filesToUpload).then(() => {
                // TODO: Notify the users that files are uploaded.
                // TODO: fetch state again.
              });
            } else {
              console.error('No file selected to upload');
            }
          }}>
            <i class="fas fa-file-upload"></i>
            Upload a new file
          </button>
        </div>
      {/if}
      {#if $fileManagerModeStore == fileManagerModes.SELECT}
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"
                  on:click={onRunPipelineBtnClicked}
                  disabled={filesSelected.length == 0}>
            <i class="fa fa-play-circle"></i>
            Run with {filesSelected.length} file(s)
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>