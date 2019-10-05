<script>

let divider = `
    <style>
      .pipeline-divider {
        width: 20px;
        height: 100px;
        padding-top: 40px;
      }
      .pipeline-divider span {
        font-size: 20cm;
      }
    </style>
    <div class="pipeline-divider">
      <span class="bp3-icon bp3-icon-arrow-right"></span>
    </div>
`
</script>

<style> 



.panel {
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

</style>

<h1>Hello</h1>

<div class="panel">
  <div class="component-container">
    {@html divider}
    <div class="component">
      <h3> Function 1 </h3>
    </div>
    <div class="component">
      <h3> Function 1 </h3>
    </div>
    <div class="component">
      <h3> Function 1 </h3>
    </div>
    <div class="component">
      <h3> Function 1 </h3>
    </div>
    <div class="component">
      <h3> Function 1 </h3>
    </div>
    <div class="component">
      <h3> Function 1 </h3>
    </div>
    <div class="component">
      <h3> Function 1 </h3>
    </div>
    <div class="component">
      <h3> Function 1 </h3>
    </div>
    <div class="component">
      <h3> Function 1 </h3>
    </div>
    <div class="component">
      <h3> Function 1 </h3>
    </div>
  </div>
</div>