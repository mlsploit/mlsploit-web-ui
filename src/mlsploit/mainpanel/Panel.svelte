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
  background-color: #F5F8FA;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease-in-out;
}

.panel:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.component-container {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;
  overflow-x: auto;
}

.component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50px;
  min-width: 200px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #EBF1F5;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease-in-out;
}

.component:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}


.header {
  display: flex;
  justify-content: center;
}

</style>

<div class="panel">
  <div class="header">
    <p id="headr-label">Name<p>
    <i id="play-icon" class="fas fa-play"></i>
    <i id="remove-icon" class="fas fa-trash"></i>
  </div>
  <div class="component-container">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as func}
      {@html divider}
      <div class="component">
        <h3>Function 1</h3>
      </div>
    {/each}
  </div>
</div>