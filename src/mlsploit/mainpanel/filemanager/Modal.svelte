<script>

	// TODO: Get the real file list
	let file_list = ['file1', 'file2', 'file3', 'file4'];

	// Keep track of file status
	let file_status = {};
	file_list.forEach(file => file_status[file] = false);

	// File check all-or-none
	const file_check_all_none = (e) => {
		
		console.log("will uncheck/check all file");

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
			file_list.forEach(file => file_status[file] = true);
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
			file_list.forEach(file => file_status[file] = false);
		}

		console.log("Now file_status:", file_status);
	}

	// Click one file
	const click_one_file = (e) => {
		console.log("click", e.target.id)

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
		
	}
</script>

<style>

	button {
		display: block;
	}

	#FileManagerModal {
		margin-top: 10vh;
	}

	#file-select-option {
		padding-top: 6px;
		padding-left: 3px;
		padding-right: 3px;
	}

	.file-icon {
		cursor: pointer;
	}

	.file-list {
		list-style: none;
		padding-left: 0px;
	}

	.file-bullet {
		display: inline;
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
				<i class="far fa-square fa-2x file-icon" 
					id="file-uncheck" on:click={file_check_all_none}></i>
				<i class="far fa-check-square fa-2x file-icon" style="display: none;" 
					id="file-check" on:click={file_check_all_none}></i>
				<i class="fas fa-caret-down fa-lg file-icon" id="file-select-option"></i>

				<!-- Title -->
				<h5 class="modal-title" id="exampleModalLabel">Files</h5>

				<!-- Close button -->
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

			<!-- Local file manager -->
      <div class="modal-body">
				<ul class="file-list">
					{#each file_list as file}
						<!-- File check bullet -->
						<i id={"file-bullet-check-" + file} 
							class="far fa-check-square fa-2x file-icon file-bullet file-bullet-check" 
							style="display: none;" on:click={click_one_file}></i>

						<!-- File uncheck bullet -->
						<i id={"file-bullet-uncheck-" + file}  
							class="far fa-square fa-2x file-icon file-bullet file-bullet-uncheck" 
							style="display: inline;" on:click={click_one_file}></i>

						<!-- Filename -->
						<li class="file-bullet"> <text> {file} </text> </li>
						<br>
					{/each}
				</ul>
      </div> 

			<!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>

    </div>
  </div>
</div>