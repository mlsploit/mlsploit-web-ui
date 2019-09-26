<script>
  export let file;

  let isSelected = false;

  const toggleSelected = (e) => {
    e.preventDefault();
    
    isSelected = !isSelected;
  }
</script>

<style>
  .bp3-menu-item > .fa-check {
    margin-top: 3px;
    margin-right: 5px;
  }
</style>

<li class="bp3-menu-item bp3-popover-dismiss" on:click={toggleSelected}> 
  {#if isSelected}
    <i class="fas fa-check"></i>
  {/if}
  
  {file.name}
</li>