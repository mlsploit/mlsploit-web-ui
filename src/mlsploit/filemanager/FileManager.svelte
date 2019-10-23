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

  export const setAndShowFileManager = (mode, meta) => {
    setFileManagerMode(mode, meta);
    jQuery('#file-manager').modal('show');
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { fileStore } from '../../store.js';
  import { uploadFiles } from '../../state.js';
  import { fileKinds } from './File.svelte';
  import File from './File.svelte';

  let fileUploadInputElement;

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
    filesToUpload = null;

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

  const onUploadButtonClicked = e => {
    if (filesToUpload === null) jQuery(fileUploadInputElement).click();
    else {
      uploadFiles(filesToUpload).then(onFileMutated);
      filesToUpload = null;
    }
  }

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

  const onFileMutated = () => {
    setVisibleFiles();
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
        {#if filesVisible.length > 0}
          <table class="table table-hover table-borderless">
            <tbody>
              {#each filesVisible as file}
                <File file={file}
                      onFileMutated={onFileMutated}
                      onFileSelectionChanged={onFileSelectionChanged}
                      enableSelect={$fileManagerModeStore == fileManagerModes.SELECT} />
              {/each}
            </tbody>
          </table>
        {:else}
          No files to show.
        {/if}
      </div>
      {#if $fileManagerModeStore == fileManagerModes.MANAGE}
        <div class="modal-footer">
          <input type="file" multiple style="display:none"
                 bind:this={fileUploadInputElement}
                 on:change={e => { filesToUpload = e.target.files; }}>
          <button type="button" class="btn"
                  class:btn-primary={filesToUpload === null}
                  class:btn-success={filesToUpload !== null}
                  on:click={onUploadButtonClicked}>
            {#if filesToUpload !== null}
              <i class="fas fa-upload"></i>
              {#if filesToUpload.length > 1}
                Upload {filesToUpload.length} file
              {:else}
                Upload {filesToUpload[0].name}
              {/if}
            {:else}
              <i class="fas fa-file-upload"></i>
              Select files to upload
            {/if}
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