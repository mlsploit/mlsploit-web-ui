<script>

let divider = `
    <style>
      .pipeline-divider {
        display: flex;
        align-items: center;
        padding-right: 3px;
        padding-left: 3px;
      }

    </style>
    <div class="pipeline-divider">
      <i class="fas fa-arrow-right fa-lg"></i>
    </div>
`
</script>

<style> 

.panel {
  width: 92%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.function-container {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 20px;
  overflow-x: auto;
}

.function {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  min-width: 150px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.header {
  display: flex;
  justify-content: center;
}

</style>


<div class="panel bp3-card bp3-elevation-4">

  <div class="header">
    <p id="headr-label">Name<p>
    <i id="play-icon" class="fas fa-play"></i>
    <i id="remove-icon" class="fas fa-trash"></i>
  </div>

  <div class="function-container">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as func}
      {@html divider}
      <div class="function bp3-card bp3-elevation-2 bp3-interactive">
        <h3> Function 1 </h3>
      </div>
    {/each}
  </div>

</div>



