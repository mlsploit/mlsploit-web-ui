<script>
  import { onMount } from 'svelte';
  
  export let hasInput = true;
  export let isReadonly = false;
  export let value = null;
  export let config;

  const get_allowed_values = (t) => {
    switch(type) {
      case 'enum':
        return config.values;
      case 'bool':
        return [true, false];
      default:
        return null;
    }
  };

  $: name = config.name;
  $: type = config.type;
  $: required = config.required;
  $: allowed_values = get_allowed_values(type);
  
  onMount(() => {
    if (value === null) {
      switch(type) {
        case 'enum':
        case 'bool':
          value = allowed_values[0];
          break;
        case 'str':
          value = '';
          break;
        case 'int':
          value = 0;
          break;
        case 'float':
          value = 0.0;
          break;
      }
    }
  });
</script>

<style>

</style>

<div class="form-group">
  <label>{name}</label>
  
  {#if hasInput}
    {#if type === 'str'}
      <input type="text" class="form-control form-control-sm"
             bind:value={value} readonly={isReadonly}>

    {:else if (type === 'enum' || type === 'bool')}
      <select class="form-control form-control-sm custom-select"
              bind:value={value} disabled={isReadonly}>
        {#each allowed_values as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    
    {:else if (type === 'int')}
      <input type="number" class="form-control form-control-sm"
             bind:value={value} readonly={isReadonly}>
    
    {:else if (type === 'float')}
      <input type="number" step=any class="form-control form-control-sm"
             bind:value={value} readonly={isReadonly}>
    {/if}
  {/if}
  
  <small class="form-text text-muted">
    Option help text will appear here...
  </small>
</div>