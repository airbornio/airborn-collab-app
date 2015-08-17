navigator.mozSetMessageHandler('activity', function(activityRequest) {
	var name = activityRequest.source.name;
	var data = activityRequest.source.data;
	
	var sdcard = navigator.getDeviceStorage('sdcard');
	var request = sdcard.addNamed(data.blob, 'shared_docs/sdcard/' + data.filename);
	
	request.addEventListener('success', function() {
		alert('success')
	});
	request.addEventListener('error', function() {
		alert(this.error);
	});

	
	
	//alert('done');
	
	
	if(0) {
		var deviceStorage = data.path.split('/')[1];
		var path = data.path.split('/').slice(2).join('/');
		
		var storage = navigator.getDeviceStorage(deviceStorage);
		
		var req = storage.get(path);
		req.addEventListener('success', function() {
			var file = this.result;
			var req = storage.delete(path);
			req.addEventListener('success', function() {
				storeFile(data.path, file, function() {
					window.location = 'index.html';
				});
			});
			req.addEventListener('error', function() {
				alert(this.error);
			});
		});
		req.addEventListener('error', function() {
			alert(this.error);
		});
	}
});