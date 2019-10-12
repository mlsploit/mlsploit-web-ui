<script>
  
  // Export filemanager
  export let FileManager;

  // File-type
  let file_type_div = document.getElementById("file-type");
  // file_type_div.

</script>

<style>
  #file-user-input {
    padding: 10px;
  }

  #file-select-option {
    vertical-align: 5px;
  }

  #file-type {
    display: inline;
    border: solid 1px;
    vertical-align: 7.5px;
    margin-left: 10px;
    margin-right: 15px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 3px;
    padding-bottom: 5px;
    border-radius: 4px;
  }

  .file-options {
    display: inline;
    cursor: pointer;
  }

  .file-options-type {
    display: inline;
  }

</style>

<!-- File user input -->
<div id="file-background">
  <div id="file-user-input">

    <!-- File select option -->
    <div id="file-select" class="file-options">
      <!-- <i class="far fa-check-square fa-2x" id="file-check"></i> -->
      <i class="far fa-square fa-2x" id="file-uncheck"></i>
      <i class="fas fa-caret-down fa-lg" id="file-select-option"></i>
    </div>
    
    <!-- File type option -->
    <div id="file-type" class="file-options">
      File Type: 
      <div id="file-type-option" class="file-options-type">All</div>
    </div>

    <!-- File other options -->
    <div id="file-others" class="file-options">
      <i class="fas fa-tag fa-2x"></i>
      <i class="fas fa-file-download fa-2x"></i>
      <i class="fas fa-trash fa-2x"></i>
    </div>
    
  </div>

  <!-- File list -->
  <div id="file-list">
    File-list
  </div>
</div>