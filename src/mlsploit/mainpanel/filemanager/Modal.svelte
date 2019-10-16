<script>

	// TODO: Get the real files
	let files = {
		'file1.csv': {'type': 'type1'},
		'file2.txt': {'type': 'type2222'},
		'file33333.csv': {'type': 'type2222'},
		'file4.txt': {'type': 'type3'},
	}

	// Get file types
	let types = [];
	Object.keys(files).forEach(file => {
		let type = files[file]['type'];
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

		// Check if we want to check all or non-check all
		let will_check_all = all_check_icon.style.display == "none";
		
		// Check all file icons
		if (will_check_all) {
			file_check_all();
		}
		// Uncheck all file icons
		else {
			file_uncheck_all()
		}

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

	// Select all type
	const select_all_type = (e) => {

		if (e.preventDefault) { e.preventDefault(); }

		// Get all file rows
		let file_rows = document.getElementsByClassName("file-rows");

		// Show all file rows
		Array.from(file_rows).forEach(file_row => {
			file_row.style.display = "grid";
		});

	}

	// Select one type
	const select_one_type = (e) => {

		if (e.preventDefault) { e.preventDefault(); }

		// Get type
		let type = e.target.id.split('-').pop();
		
		// Get all file rows
		let file_rows = document.getElementsByClassName("file-rows");

		// Show only rows of the corresponding type
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
					<h5 class="modal-title">Type: all</h5>
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
						<div class={"file-rows file-rows-" + files[file]['type']}>
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
<div class="modal fade" id="selectOptionModal" 
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