<style>
  #left-panel {
    background-color: white;
  }

  .module-li {
    list-style-type: none;
  }

  .module-button {
    border: 0px;
    background-color: white;
    border-radius: 5px;
  }

  .module-button:hover {
    border: 0px;
    background-color: lightgrey;
    cursor: pointer;
  }

  .module-fun {
    display: none;
  }
</style>



<div id="left-panel">
  <!-- Create the List for modules -->
  <ul>
    {#each modules as module, module_i}
      <li class="module-li">
        <i class="fas fa-angle-right" id={ids_of_list_icon[module_i]}></i>
          <button id={module.module} class="module-button" on:click={click_module}> {module.module} </button>
        <ul>
          {#each module.function as f}
            <li class={class_of_list_fun[module_i]}>{f}</li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
</div>


<script>
  // TODO: Need to get the real modules
  let modules = [
    {module: 'Mod1', function: ['Fun1-1', 'Fun1-2', 'Fun1-3']},
    {module: 'Mod2', function: ['Fun2-1', 'Fun2-2', 'Fun2-3', 'Fun2-4']},
    {module: 'Mod3', function: ['Fun3-1', 'Fun3-2']}
  ]

  // Get class names of functions
  let class_of_list_fun = []
  modules.forEach(m => {
    class_of_list_fun.push('module-fun ' + m.module + '-fun')
  })

  // Get ids of module list icon
  let ids_of_list_icon = []
  modules.forEach(m => {
    ids_of_list_icon.push(m.module + '-icon')
  })

  // Click module
  function click_module() {
    // Get this module
    var clicked_module = this.id

    // On off the functions
    var class_of_functions = clicked_module + '-fun' 
    var module_functions = document.getElementsByClassName(class_of_functions)
    for(var i=0; i < module_functions.length; i++) {
      display_on_off(module_functions[i])
    }

    // Expand or fold the icon
    var module_icon = document.getElementById(clicked_module + '-icon')
    expand_fold(module_icon)

  }
  
  // Display on / off an element
  function display_on_off(element) {
    var display = element.style.display

    if (!display) {
      element.style.display = 'block'
    } else if (display == 'none') {
      element.style.display = 'block'
    } else {
      element.style.display = 'none'
    }
  }

  // Expand of fold the icon
  function expand_fold(icon){
    var icon_class = icon.getAttribute('class')
    if (icon_class.includes('right')) {
      var new_class = icon_class.replace('right', 'down')
    } else {
      var new_class = icon_class.replace('down', 'right')
    }
    icon.setAttribute('class', new_class)
  }

</script>