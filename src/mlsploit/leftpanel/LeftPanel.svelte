<script>
  import data from '../../dummydata.js';
  import Module from './module/Module.svelte';

  let modules = data.modules;

  // Get class names of functions
  let class_of_list_fun = []
  modules.forEach(m => {
    var class_name = 'module-fun ' + m.module + '-fun' 
    class_name += ' bp3-card bp3-elevation-2 bp3-interactive'
    class_of_list_fun.push(class_name)
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

<style>
  #left-panel {
    padding: 20px;
  }
</style>



<div id="left-panel">
  {#each modules as module}
    <Module {module} />
  {/each}
</div>
