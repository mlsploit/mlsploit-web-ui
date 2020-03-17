<script context="module">
  export const fileKinds = {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT'
  }
</script>

<script>
  import { afterUpdate } from 'svelte';
  import { deleteFileWithURL } from '../../state.js';
  import FileTagEditor from './FileTagEditor.svelte';

  export let file;
  export let enableSelect;
  export let onFileMutated;
  export let onFileSelectionChanged;

  let fileComponent;
  let isSelected = false;
  let isFileTagEditorOpen = false;

  const onDeleteConfirmClick = e => {
    e.preventDefault();
    deleteFileWithURL(file.url).then(onFileMutated);
    jQuery(fileComponent).find('.controls a,button').remove();
  }

  const toggleFileSelected = () => {
    if (enableSelect) {
      isSelected = !isSelected;
      onFileSelectionChanged(file.url, isSelected);
    }
  };

  afterUpdate(() => {
    if (!enableSelect) {
      setTimeout(() => {
        jQuery(fileComponent).find('.controls a,button')
          .each((i, el) => {
            jQuery(el).tooltip({
              title: jQuery(el).data('tooltip-title')
            })
          });

        jQuery(fileComponent).find('a.delete-file').popover({
          title: `Delete "${file.name}"?`,
          placement: 'bottom',
          trigger: 'focus',
          container: jQuery(fileComponent),
          html: true,
          content: `<a id="delete-file-${file.id}-confirm" href="#" class="btn btn-danger btn-block">Yes, delete it</a>`
        }).on('shown.bs.popover', e => {
          jQuery(fileComponent)
            .find(`a#delete-file-${file.id}-confirm`)
            .click(onDeleteConfirmClick);
        });
      }, 100);
    }
  });
</script>

<style>
  tr {
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 200;
  }
</style>

<tr on:click={toggleFileSelected} bind:this={fileComponent}>
  <td class="align-middle">
    {#if isSelected}
      <i class="fas fa-check"></i>
    {/if}
    {file.name}
    <FileTagEditor file={file} isOpen={isFileTagEditorOpen}></FileTagEditor>
  </td>

  <td class="text-right controls">
    {#if enableSelect}
      <!--
        Choose later if we want to show check marks here
        or beside the file name. Hiding these for now.
      -->
      {#if isSelected}
        <i style="display:none" class="far fa-check-square"></i>
      {:else}
        <i style="display:none"class="far fa-square"></i>
      {/if}
    {:else}
      <a href={file.blob_url} class="btn btn-outline-primary btn-sm"
        target="_blank"
        data-tooltip-title="Download file">
        <i class="fas fa-download"></i>
      </a>

      {#if file.kind === fileKinds.INPUT}
        <!-- <button
          class="btn btn-outline-primary btn-sm"
          data-tooltip-title="Add a tag"
          on:click={() => {
            isFileTagEditorOpen = true;
          }}
        >
          <i class="fas fa-tag"></i>
        </button> -->

        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="btn btn-outline-danger btn-sm delete-file"
           data-tooltip-title="Delete file">
          <i class="fas fa-trash"></i>
        </a>
      {/if}
    {/if}
  </td>
</tr>
