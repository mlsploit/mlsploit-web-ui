<script>
  export let task;
</script>

<style>
  .new-task {
    margin: 20px;
    display: inline-block;
    width: 150px;
  }
</style>

<div class="new-task bp3-card bp3-elevation-2 bp3-interactive">
  <strong>{task.name}</strong>
</div>