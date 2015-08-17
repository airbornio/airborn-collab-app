var files = document.getElementById('files');

function updateDocList() {
	var fragment = document.createDocumentFragment();
	
	var sdcard = navigator.getDeviceStorage('sdcard');

	var request = sdcard.enumerate('shared_docs');
	request.addEventListener('success', function() {
		var file = this.result;
		
		console.log(file, this.done);
		
		if(file) {
			var name = file.name.split('/').pop();
			
			var elm = document.createElement('div');
			elm.className = 'file';
			elm.textContent = name;
			elm.addEventListener('click', function() {
				sdcard.addEventListener('change', function(change) {
					if(change.reason === 'modified' && change.path === file.name) {
						document.body.appendChild(document.createTextNode('changed ' + file.name));
						document.body.appendChild(document.createElement('br'));
					}
				});
				
				var activity = new MozActivity({
					name: 'open',
					data: {
						/* Firetext and Files */
						'type': file.type,
						
						/* Firetext */
						'url': file.name,
						
						/* Files */
						'name': file.name,
						'filename': name,
						'blob': file
					}
				});
				activity.addEventListener('success', function() {
					//alert('success');
				});
				activity.addEventListener('error', function() {
					if(activity.error.name === 'NO_PROVIDER') {
						alert('No app could be found to edit this file. For .html and .txt documents, please install Firetext or Files.');
					} else {
						console.error(this.error);
						alert('An error occurred editing this file: ' + this.error.name);
					}
				});
			});
			
			fragment.appendChild(elm);
		}
		
		if(this.done) {
			files.innerHTML = '';
			files.appendChild(fragment);
		} else {
			this.continue();
		}
	});
	request.addEventListener('error', function() {
		files.textContent = 'No shared files found. Select "Share live" in Firetext or another app to share a file.';
	});
}

updateDocList();





if(0) {
	navigator.requestWakeLock('cpu'); // Ask Airborn to keep the process open even if the user closes the window.
									  // Firefox OS does this anyway, but this increases the priority of the process.
	navigator.requestWakeLock('high-priority'); // For a future in Firefox OS

	/* Airborn OS opens one instance of collabActivity.html per collab request,
	 * so we don't have to keep track of files as we would have to in Firefox OS.
	 */




	storage.addEventListener('change', function(change) {
		if(change.path === path) {
			
		}
	});

	var activity = new MozActivity({
		name: 'edit',
		data: data
	});
	activity.addEventListener('success', function() {
		
	});
	activity.addEventListener('error', function() {
		alert(this.error);
	});
}