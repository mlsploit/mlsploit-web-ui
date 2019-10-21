<script>
    import API from '../../rest.js';

    export let file; // the target file object
    export let isOpen; // whether this editor is visible

    // helper to convert tags object to list of key value pairs.
    function tagsToList(tags) {
        const list = Object.keys(tags).map(key => ({
            key,
            value: tags[key]
        }));
        return list;
    }

    // helper to convert list of key value pairs to tags object
    function listToTags(listOfKVPairs) {
        const tags = {};
        for (const pair of listOfKVPairs) {
            tags[pair.key] = pair.value;
        }
        return tags;
    }

    let kvPairs = tagsToList(JSON.parse(file.tags));

    // higher order function to help create input change handlers
    function createInputChangeHandlers(index) {
        return function(event) {
            kvPairs[index] = event.target.value;
        }
    }

    async function handleSubmit() {
        const newTags = listToTags(kvPairs);
        await API.editFileTags(file, newTags);
        // TODO: Re-pull the states?
    }
</script>

{#if isOpen}
<div>
    {#each kvPairs as pair, i}
        <div>
            <label>Key</label>
            <input value={kvPairs[i].key} on:change={createInputChangeHandlers(i)}>
            <br>
            <label>Value</label>
            <input value={kvPairs[i].value} on:change={createInputChangeHandlers(i)}>
            <hr>
        </div>
    {/each}
    <button on:click={() => {
        kvPairs = [...kvPairs, {key: '', value: ''}];
    }}>Add Tag</button>
    <button on:click={() => {
        kvPairs = []
    }}>Reset</button>
    <button on:click={handleSubmit}>Update</button>
</div>
{/if}