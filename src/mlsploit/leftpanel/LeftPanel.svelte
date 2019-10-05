<style>
  #left-panel {
    background-color: white;
  }
</style>


<!-- TODO: Delete this later -->
<div id="left-panel">Left Panel</div>

<!-- Create the List for modules -->
<ul>
	{#each modules as module}
		<li>
      {module.module}
      <ul>
        {#each module.function as f}
          <li>{f}</li>
        {/each}
      </ul>
    </li>
	{/each}
</ul>

<script>
  // TODO: Need to get the real modules
  let modules = [
    {module: 'Mod1', function: ['Fun1-1', 'Fun1-2', 'Fun1-3']},
    {module: 'Mod2', function: ['Fun2-1', 'Fun2-2', 'Fun2-3', 'Fun2-4']},
    {module: 'Mod3', function: ['Fun3-1', 'Fun3-2']}
  ]


  console.log(modules)
</script>