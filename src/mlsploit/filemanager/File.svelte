<script context="module">
  export const fileKinds = {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT'
  }
</script>

<script>
  import { afterUpdate } from 'svelte';

  export let file;

  let fileComponent;

  const onDeleteConfirmClick = e => {
    e.preventDefault();
    console.log('delete', file.url, e);
  }

  afterUpdate(() => {
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
    }, 1000);
  });
</script>

<style>
  tr {
    cursor: pointer;
  }
  
  .controls {
    opacity: 0;
  }

  tr:hover .controls {
    opacity: 1;
  }
</style>

<tr bind:this={fileComponent}>
  <td class="align-middle">
    {file.name}
  </td>
  <td class="text-right controls">
    <a href={file.blob_url} class="btn btn-outline-primary btn-sm"
       target="_blank"
       data-tooltip-title="Download file">
      <i class="fas fa-download"></i>
    </a>

    {#if file.kind === fileKinds.INPUT}
      <a href="#" class="btn btn-outline-primary btn-sm"
        data-tooltip-title="Add a tag">
        <i class="fas fa-tag"></i>
      </a>

      <a href="#" class="btn btn-outline-danger btn-sm delete-file" 
         data-tooltip-title="Delete file">
        <i class="fas fa-trash"></i>
      </a>
    {/if}
  </td>
</tr>