<script>

	// TODO: Get the real files
	let files = {
		'file1.csv': {'type': ''},
		'file2.txt': {'type': ''},
		'file33333.csv': {'type': ''},
		'file4.txt': {'type': ''},
	};

	// Get file types
	let types = [];
	Object.keys(files).forEach(file => {
		let type = file.split('.').pop();
		files[file]['type'] = type;
		if (!(types.includes(type))) {
			types.push(type);
		}
	});

	// Keep track of file status
	let file_status = {};
	Object.keys(files).forEach(file => file_status[file] = false);

	// File check all
	const file_check_all = () => {

		// Get global check / uncheck icons
		let all_check_icon = document.getElementById("file-check");
		let uncheck_icon = document.getElementById("file-uncheck");

		// Get bullet check / uncheck icons
		let bullet_check_icons = document.getElementsByClassName("file-bullet-check");
		let bullet_uncheck_icons = document.getElementsByClassName("file-bullet-uncheck");

		// Toggle check / uncheck icons
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

		console.log("Now file_status:", file_status);
	}

	// File uncheck all
	const file_uncheck_all = () => {

		// Get global check / uncheck icons
		let all_check_icon = document.getElementById("file-check");
		let uncheck_icon = document.getElementById("file-uncheck");

		// Get bullet check / uncheck icons
		let bullet_check_icons = document.getElementsByClassName("file-bullet-check");
		let bullet_uncheck_icons = document.getElementsByClassName("file-bullet-uncheck");

		// Toggle check /uncheck icons
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

		console.log("Now file_status:", file_status);
	}

	// File check all-or-none
	const file_check_all_none = (e) => {

		if (e.preventDefault) { e.preventDefault(); }

		// Get global check / uncheck icons
		let all_check_icon = document.getElementById("file-check");
		let uncheck_icon = document.getElementById("file-uncheck");

		// Check if we want to check all or non-check all
		let will_check_all = all_check_icon.style.display == "none";

		// Check if type-filter is applied
		let type = document.getElementById("file-type").children[0].textContent.split(' ').pop();

		// Check all file icons
		if (will_check_all && (type == "All")) {
			file_check_all();
		} 
		// Uncheck all file icons
		else if (!will_check_all && (type == "All")) {
			file_uncheck_all();
		}
		// Check only files of the corresponding filtered type
		else if (will_check_all && !(type == "All")) {
			// Get all file rows
			let file_rows = document.getElementsByClassName("file-rows");

			// Show / check only rows of the corresponding type
			Array.from(file_rows).forEach(file_row => {
				let file_row_class = file_row.getAttribute("class");
				let file_row_type = file_row_class.split(' ')[1].split('-').pop();
				if (type == file_row_type) {
					let file_row_icons = file_row.children[0];
					let file_row_check_icon = file_row_icons.children[0];
					let file_row_uncheck_icon = file_row_icons.children[1];
					let file_name = file_row.id.split("-").pop();
					file_status[file_name] = true;
					file_row_check_icon.style.display = "inline";
					file_row_uncheck_icon.style.display = "none";
				}
			});
			uncheck_icon.style.display = "none";
			all_check_icon.style.display = "inline";
		}
		// Uncheck only files of the corresponding filtered type
		else if (!will_check_all && !(type == "All")) {
			// Get all file rows
			let file_rows = document.getElementsByClassName("file-rows");

			// Show / uncheck only rows of the corresponding type
			Array.from(file_rows).forEach(file_row => {
				let file_row_class = file_row.getAttribute("class");
				let file_row_type = file_row_class.split(' ')[1].split('-').pop();
				if (type == file_row_type) {
					let file_row_icons = file_row.children[0];
					let file_row_check_icon = file_row_icons.children[0];
					let file_row_uncheck_icon = file_row_icons.children[1];
					let file_name = file_row.id.split("-").pop();
					file_status[file_name] = false;
					file_row_check_icon.style.display = "none";
					file_row_uncheck_icon.style.display = "inline";
				}
			});
			uncheck_icon.style.display = "inline";
			all_check_icon.style.display = "none";
		}

		console.log("file_status:", file_status)
	}

	// Click one file
	const click_one_file = (e) => {
		
		if (e.preventDefault) { e.preventDefault(); }

		// Get file name
		let file = e.target.id.split('-').pop();

		// Check if we want to check the file
		let will_check_the_file = e.target.id.includes("uncheck");

		// Toggle check/uncheck in file item rows
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

		// Check the current type selection
		let file_type_div_in_header = document.getElementById("file-type");
		let file_type_text_in_header = file_type_div_in_header.children[0];
		let type = file_type_text_in_header.textContent.split(" ").pop().toLowerCase();
		update_global_checkbox(type);

		console.log("Now file_status:", file_status);
	}

	// Update global check / uncheck icon
	const update_global_checkbox = (type) => {

		// Get global check / uncheck icons
		let all_check_icon = document.getElementById("file-check");
		let uncheck_icon = document.getElementById("file-uncheck");

		if (type == 'all') {

			// Update the global check box
			let if_all_checked = Object.values(file_status).every(if_checked => if_checked);
			if (if_all_checked) {
				all_check_icon.style.display = "inline";
				uncheck_icon.style.display = "none";
			} else {
				all_check_icon.style.display = "none";
				uncheck_icon.style.display = "inline";
			}

		} else {

			// Check if all files of the corresponding type are checked
			let if_type_all_checked = true;
			for(var file in file_status) {
				let file_type = files[file]["type"];
				if (type == file_type) {
					if (!(file_status[file])) {
						if_type_all_checked = false;
					}
				}
			}
			
			// Update the global check / uncheck icons
			if (if_type_all_checked) {
				all_check_icon.style.display = "inline";
				uncheck_icon.style.display = "none";
			} else {
				all_check_icon.style.display = "none";
				uncheck_icon.style.display = "inline";
			}

		}
		
	}

	// Select all type
	const select_all_type = (e) => {

		if (e.preventDefault) { e.preventDefault(); }

		// Get all file rows
		let file_rows = document.getElementsByClassName("file-rows");

		// Show all file rows
		Array.from(file_rows).forEach(file_row => {
			file_row.style.display = "grid";
		});

		// Update the type text
		let file_type_div_in_header = document.getElementById("file-type");
		let file_type_text_in_header = file_type_div_in_header.children[0];
		file_type_text_in_header.textContent = "Type: All";

		// Update the global check box
		update_global_checkbox('all');
	}

	// Select one type
	const select_one_type = (e) => {

		if (e.preventDefault) { e.preventDefault(); }

		// Get type
		let type = e.target.id.split('-').pop();
		
		// Get all file rows
		let file_rows = document.getElementsByClassName("file-rows");

		// Show / check only rows of the corresponding type
		Array.from(file_rows).forEach(file_row => {
			let file_row_class = file_row.getAttribute("class");
			let file_row_type = file_row_class.split(' ')[1].split('-').pop();
			if (type == file_row_type) {
				file_row.style.display = "grid";
			} else {
				file_row.style.display = "none";
			}
		});

		// Update the type text
		let file_type_div_in_header = document.getElementById("file-type");
		let file_type_text_in_header = file_type_div_in_header.children[0];
		file_type_text_in_header.textContent = "Type: " + type;

		// Update global checkbox
		update_global_checkbox(type);

	}

</script>

<style>

	/***** General *****/

	button {
		display: block;
	}

	.simple-list {
		list-style: none;
		padding-left: 0px;
		margin-bottom: 0px;
	}

	/***** Modal global *****/

	#FileManagerModal {
		margin-top: 10vh;
	}

	.file-icon {
		cursor: pointer;
	}


	/***** Modal header *****/

	.file-manager-header {
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

	.file-bullet-icons {
		grid-column-start: 1;
		grid-column-end: 2;
	}

	.file-bullet-types {
		grid-column-start: 2;
		grid-column-end: 3;
	}


	/***** Modal select option *****/

	#select-option-modal-body {
		padding-left: 0px;
		padding-right: 0px;
	}

	#select-option-modal-dialog {
		max-width: 200px;
	}

	#select-option-modal-content {
		transform: translate(-12vh, 14vh);
	}

	.select-option-modal-items {
		cursor: pointer;
		padding-top: 3px;
		padding-bottom: 2px;
		padding-left: 20px;
	}

	.select-option-modal-items:hover {
		background-color: var(--g-middle-gray);
	}

</style>

<!-- File manager modal window -->
<div class="modal fade" id="FileManagerModal" 
	tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

			<!-- Global file manager -->
      <div class="modal-header file-manager-header">
				
				<!-- File checker icons -->
				<div class=global-file-icon>
					<!-- File global check -->
					<i class="far fa-square fa-2x file-icon" 
						id="file-uncheck" on:click={file_check_all_none}>
					</i>
					<!-- File global uncheck -->
					<i class="far fa-check-square fa-2x file-icon" style="display: none;" 
						id="file-check" on:click={file_check_all_none}>
					</i>
					<!-- File select option -->
					<i class="fas fa-caret-down fa-lg file-icon" id="file-select-option" 
						data-toggle="modal" data-target="#selectOptionModal">
					</i>
				</div>

				<!-- File types -->
				<div id="file-type">
					<h5 class="modal-title">Type: All</h5>
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
				<ul class="simple-list">
					{#each Object.keys(files) as file}
						<div class={"file-rows file-rows-" + files[file]['type']} 
							id={"file-rows-" + file}>
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

<!-- Select option modal window -->
<div class="modal fade" data-backdrop="false" id="selectOptionModal" 
	tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

	<div class="modal-dialog" id="select-option-modal-dialog" role="document">
		<div class="modal-content" id="select-option-modal-content">

			<div class="modal-body" id="select-option-modal-body">
				<ul class="simple-list">
					<!-- Check all types -->
					<div class="select-option-modal-items" data-dismiss="modal"
						id="select-option-All" on:click={select_all_type}> 
						<h5> All types </h5>
					</div>

					<!-- Add each file type -->
					{#each types as type}
						<div class="select-option-modal-items" data-dismiss="modal" 
							id={"select-option-" + type} on:click={select_one_type}> 
							<h5 id={"select-option-text-" + type}> {type} </h5>
						</div>
					{/each}
				</ul>
			</div>

		</div>
	</div>

</div>