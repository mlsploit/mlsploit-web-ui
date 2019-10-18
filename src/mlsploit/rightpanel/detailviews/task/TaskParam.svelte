<script>
  import { afterUpdate, onMount } from 'svelte';
  
  export let config;
  export let value = null;
  export let hasInput = true;
  export let isReadonly = false;
  export let onValueChange = (name, value) => {};

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

  const onInputChange = e => {
    onValueChange(name, value);
  }
  
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

  afterUpdate(() => {
    onValueChange(name, value);
  });
</script>

<style>

</style>

<div class="form-group">
  <label>{name}</label>
  
  {#if hasInput}
    {#if isReadonly}
      <input type="text" class="form-control" readonly
             placeholder={value} />
    
    {:else if type === 'str'}
      <input type="text" class="form-control" bind:value={value}
             on:change={onInputChange} />

    {:else if (type === 'enum' || type === 'bool')}
      <select class="form-control custom-select" bind:value={value}
              on:change={onInputChange}>
        {#each allowed_values as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    
    {:else if (type === 'int')}
      <input type="number" class="form-control" bind:value={value}
             on:change={onInputChange} />
    
    {:else if (type === 'float')}
      <input type="number" step=any class="form-control" bind:value={value}
             on:change={onInputChange} >
    
    {/if}
  {/if}
  
  <small class="form-text text-muted">
    Option help text will appear here...
  </small>
</div>