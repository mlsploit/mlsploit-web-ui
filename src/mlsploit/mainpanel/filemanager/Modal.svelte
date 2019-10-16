<script>

	// TODO: Get the real files
	let files = {
		'file111111111111111111111111111111': {'type': 'type1'},
		'file2': {'type': 'type2222'},
		'file3': {'type': 'type2222'},
		'file4': {'type': 'type3'},
	}

	// Keep track of file status
	let file_status = {};
	Object.keys(files).forEach(file => file_status[file] = false);

	// File check all-or-none
	const file_check_all_none = (e) => {

		if (e.preventDefault) { e.preventDefault(); }

		// Get global check / uncheck icons
		let all_check_icon = document.getElementById("file-check");
		let uncheck_icon = document.getElementById("file-uncheck");

		// Get bullet check / uncheck icons
		let bullet_check_icons = document.getElementsByClassName("file-bullet-check");
		let bullet_uncheck_icons = document.getElementsByClassName("file-bullet-uncheck");

		// Check if we want to check all or non-check all
		let will_check_all = all_check_icon.style.display == "none";
		
		// Check all file icons
		if (will_check_all) {
			// Toggle check icons
			uncheck_icon.style.display = "none";
			all_check_icon.style.display = "inline";

			// Check all bullet icons
			Array.from(bullet_check_icons).forEach(bullet_check_icon => {
				bullet_check_icon.style.display = "inline";
			});
			Array.from(bullet_uncheck_icons).forEach(bullet_uncheck_icon => {
				bullet_uncheck_icon.style.display = "none";
			});

			// Add all files into file_status
			Object.keys(files).forEach(file => file_status[file] = true);
		}
		// Uncheck all file icons
		else {
			// Toggle check icons
			uncheck_icon.style.display = "inline";
			all_check_icon.style.display = "none";

			// Uncheck all bullet icons
			Array.from(bullet_check_icons).forEach(bullet_check_icon => {
				bullet_check_icon.style.display = "none";
			});
			Array.from(bullet_uncheck_icons).forEach(bullet_uncheck_icon => {
				bullet_uncheck_icon.style.display = "inline";
			});

			// Delete all files from file_status
			Object.keys(files).forEach(file => file_status[file] = false);
		}

		console.log("Now file_status:", file_status);
	}

	// Click one file
	const click_one_file = (e) => {
		
		if (e.preventDefault) { e.preventDefault(); }

		// Get file name
		let file = e.target.id.split('-').pop();

		// Check if we want to check the file
		let will_check_the_file = e.target.id.includes("uncheck");

		// Get global check / uncheck icons
		let all_check_icon = document.getElementById("file-check");
		let uncheck_icon = document.getElementById("file-uncheck");

		// Toggle check/uncheck
		let file_check_bullet = document.getElementById("file-bullet-check-" + file);
		let file_uncheck_bullet = document.getElementById("file-bullet-uncheck-" + file);
		if (will_check_the_file) {
			file_check_bullet.style.display = "inline";
			file_uncheck_bullet.style.display = "none"
		} else {
			file_check_bullet.style.display = "none";
			file_uncheck_bullet.style.display = "inline"
		}

		// Manage the file_status list
		if (will_check_the_file) {
			file_status[file] = true;
		} else {
			file_status[file] = false;
		}

		// Manage the global check / uncheck icon
		let got_all_checked = Object.values(file_status).every(if_checked => if_checked);
		if (will_check_the_file) {
			// If all files checked, update the global check / uncheck icons
			if (got_all_checked) {
				// Toggle global check icons
				uncheck_icon.style.display = "none";
				all_check_icon.style.display = "inline";
			}
		} else {
			// If there is one or more files unchecked, update the global check / uncheck icons
			if (!got_all_checked) {
				// Toggle global check icons
				uncheck_icon.style.display = "inline";
				all_check_icon.style.display = "none";
			}
		}	

		console.log("Now file_status:", file_status);
	}

	// File select options
	const file_select_option = (e) => {

		if (e.preventDefault) { e.preventDefault(); }



	}

</script>

<style>

	button {
		display: block;
	}

	/***** Modal global *****/

	#FileManagerModal {
		margin-top: 10vh;
	}

	.file-icon {
		cursor: pointer;
	}


	/***** Modal header *****/

	.modal-header {
		display: grid;
		grid-template-columns: 10% 25% 40% 20% 5%;
		grid-auto-rows: 100%;
	}

	.global-file-icon {
		grid-column-start: 1;
		grid-column-end: 2;
	}

	.modal-title {
		margin-left: 5px;
	}

	#file-select-option {
		transform: translate(3px, -3px);
	}

	#file-type {
		grid-column-start: 2;
		grid-column-end: 3;
	}

	#file-name {
		grid-column-start: 3;
		grid-column-end: 4;
	}

	#file-tag-download-trash {
		grid-column-start: 4;
		grid-column-end: 5;
		margin-left: 2px;
	}

	.file-tag-download-trash-icon {
		margin-left: 7%;
	}


	/***** Modal body *****/

	.file-rows {
		display: grid;
		grid-template-columns: 11% 25% 64%;
		grid-auto-rows: auto;
	}

	.file-list {
		list-style: none;
		padding-left: 0px;
	}

	.file-bullet-icons {
		grid-column-start: 1;
		grid-column-end: 2;
	}

	.file-bullet-types {
		grid-column-start: 2;
		grid-column-end: 3;
	}


</style>

<!-- File manager modal window -->
<div class="modal fade" id="FileManagerModal" 
	tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

			<!-- Global file manager -->
      <div class="modal-header">
				<!-- File checker icons -->
				<div class=global-file-icon>
					<i class="far fa-square fa-2x file-icon" 
						id="file-uncheck" on:click={file_check_all_none}>
					</i>
					<i class="far fa-check-square fa-2x file-icon" style="display: none;" 
						id="file-check" on:click={file_check_all_none}>
					</i>
					<i class="fas fa-caret-down fa-lg file-icon" 
						id="file-select-option" on:click={file_select_option}>
					</i>
				</div>

				<!-- File types -->
				<div id="file-type">
					<h5 class="modal-title">Type</h5>
				</div>
				
				<!-- File names -->
				<div id="file-name">
					<h5 class="modal-title" id="file-name">File Name</h5>
				</div>
				
				<!-- File relevant icons -->
				<div id="file-tag-download-trash">
					<!-- Tag -->
					<i class="fas fa-tag fa-2x file-icon file-tag-download-trash-icon" 
						id="file-tag-icon">
					</i>

					<!-- Download -->
					<i class="fas fa-file-download fa-2x file-icon file-tag-download-trash-icon" 
						id="file-download-icon">
					</i>

					<!-- Trash -->
					<i class="fas fa-trash fa-2x file-icon file-tag-download-trash-icon" 
						id="file-trash">
					</i>
				</div>
				
				<!-- Close button -->
				<div class="file-close">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
        
      </div>

			<!-- Local file manager -->
      <div class="modal-body">
				<ul class="file-list">
					{#each Object.keys(files) as file}
						<div class="file-rows">
							<!-- File bullet checkbox -->
							<div class="file-bullet-icons">
								<!-- File bullet check -->
								<i id={"file-bullet-check-" + file} 
									class="far fa-check-square fa-2x file-icon file-bullet-check" 
									style="display: none;" on:click={click_one_file}></i>

								<!-- File bullet uncheck -->
								<i id={"file-bullet-uncheck-" + file}  
									class="far fa-square fa-2x file-icon file-bullet-uncheck" 
									style="display: inline;" on:click={click_one_file}></i>
							</div>

							<!-- File types -->
							<div class="file-bullet-types">
								<li class="file-bullet-contents"> 
									<h5 class="file-bullet-contents"> {files[file]["type"]} </h5> 
								</li>
							</div>
							
							<!-- File names -->
							<div class="file-bullet-filenames">
								<li class="file-bullet-contents"> 
									<h5 class="file-bullet-contents"> {file} </h5> 
								</li>
							</div>

						</div>
					{/each}
				</ul>
      </div> 

    </div>
  </div>
</div>