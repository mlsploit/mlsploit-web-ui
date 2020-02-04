<script context="module">
  export const MODULE_NAME_OVERRIDES = {
    'shield': 'SHIELD',
    'foolbox': 'Foolbox',
    'captum': 'Captum',
    'avpass': 'AVPASS',
    'elf': 'ELF',
    'barnum': 'Barnum',
    'pe': 'PE',
    'network': 'Network'
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { detailViewItemStore } from '../../../store.js';
  import { setupDetailViewHandlers } from '../../rightpanel/detailview.js';
  import detailViewTypes from '../../rightpanel/detailviews/types.js';
  import Task from '../../mainpanel/tasklist/Task.svelte';

  export let module;

  let moduleComponent;

  let moduleIconURL;
  switch (module.name) {
    case 'shield':
      moduleIconURL = '/assets/img/module-icon-shield.png';
      break;
    case 'foolbox':
      moduleIconURL = '/assets/img/module-icon-foolbox.png';
      break;
    case 'avpass':
      moduleIconURL = '/assets/img/module-icon-avpass.png';
      break;
    case 'elf':
      moduleIconURL = '/assets/img/module-icon-elf.png';
      break;
    case 'barnum':
      moduleIconURL = '/assets/img/module-icon-barnum.png';
      break;
    case 'pe':
      moduleIconURL = '/assets/img/module-icon-pe.png';
      break;
    case 'network':
      moduleIconURL = '/assets/img/module-icon-network.png';
      break;
    default:
      moduleIconURL = '/assets/img/module-icon-placeholder.png';
  }

  let tagline;
  if (module.tagline) {
    tagline = module.tagline;

  } else {
    switch (module.name) {
      case 'avpass':
        tagline = 'Android Malware Detection Bypass';
        break;
      case 'elf':
        tagline = 'ELF File Malware Detection and Bypassing';
        break;
      case 'barnum':
        tagline = 'Deep Learning Software Anomaly Detection';
        break;
      case 'pe':
        tagline = 'PE Malware Detection and Evasion';
        break;
      case 'network':
        tagline = 'Network Intrusion Detection and Evasion';
        break;
      default:
        tagline = '';
    }
  }

  const moduleDetailViewItem = {
    type: detailViewTypes.MODULE,
    item: module
  };
  $: inFocus = (
    module
    && $detailViewItemStore
    && $detailViewItemStore.item == module
  );

  let isExpanded = false;
  const toggleIsExpanded = e => {
    e.preventDefault();

    isExpanded = !isExpanded;
    jQuery('#module-'+module.id+'-tasks').collapse('toggle');
  };

  let tasks = module.functions.map(f => {
    return { intended_function: f, arguments: '' };
  });

  onMount(() => {
    setupDetailViewHandlers(
      moduleComponent,
      moduleDetailViewItem
    );
  });
</script>

<style>
  .module {
    cursor: pointer;
    border-bottom: var(--border);
    transition: background 500ms;
  }

  .expand-btn {
    opacity: 0;
    float: right;
    font-size: 1.5rem;
  }

  .module:hover, .module-focus {
    background: var(--g-light-gray);
  }

  .module:hover .expand-btn {
    opacity: 0.4;
  }

  .module-focus .module-icon img{
    -webkit-filter: drop-shadow(0 0.2rem 0.25rem rgba(0,0,0,.3));
    filter: drop-shadow(0 0.2rem 0.25rem rgba(0,0,0,.3));
  }

  .module h6 {
    font-weight: 300;
    color: var(--g-dark-gray);
    transition: color 300ms ease-in-out;
  }

  .module-focus h6 {
    color: black;
  }

  .module .expand-btn:hover {
    opacity: 1;
    color: var(--g-blue);
  }

  .module-icon {
    padding: 0;
    max-width: 65px;
  }

  .module-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-transition: 300ms -webkit-filter ease-in-out;
    -moz-transition: 300ms -moz-filter ease-in-out;
    -moz-transition: 300ms filter ease-in-out;
    -ms-transition: 300ms -ms-filter ease-in-out;
    -o-transition: 300ms -o-filter ease-in-out;
    transition: 300ms filter ease-in-out, 300ms -webkit-filter ease-in-out;
  }

  .module-tasks {
    border-top: var(--border);
    margin-top: 20px;
    overflow-x: auto;
  }

  .module-tasks:hover {
    cursor: default;
  }

  .task-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
  }
</style>

<div class="module" tabindex="-1" bind:this={moduleComponent} class:module-focus={inFocus}>
  <div class="card-body">
    <div class="container">

      <div class="row align-items-center justify-content-center flex-nowrap">
        <div class="col-md-3 module-icon">
          <div><img src="{moduleIconURL}" alt={module.name} /></div>
        </div>

        <div class="col-md-9">
          <i class="fas fa-chevron-circle-{isExpanded ? 'up' : 'down'} expand-btn" on:click={toggleIsExpanded}></i>
          <h4 class="module-name">{MODULE_NAME_OVERRIDES[module.name] || module.name}</h4>
          {#if tagline}
            <h6 class="mb-2">{tagline}</h6>
          {/if}
        </div>
      </div>

      <div id="module-{module.id}-tasks" class="row justify-content-around collapse module-tasks"
           tabindex="-1" on:click={(e) => { e.stopPropagation(); }}>
        <div class="task-wrapper">
          {#each tasks as task}
            <Task {task} isModuleTask={true} />
          {/each}
        </div>
      </div>

    </div>
  </div>
</div>