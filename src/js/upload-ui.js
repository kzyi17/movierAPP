(function(mui, window, document, undefined) {
	mui.init();
	var get = function(id) {
		return document.getElementById(id);
	};
	var qsa = function(sel) {
		return [].slice.call(document.querySelectorAll(sel));
	};
	var ui = {
		imageList: get('image-list'),
	}; 
	/*ui.clearForm = function() {
		ui.imageList.innerHTML = '';
		ui.newPlaceholder();
	};*/
	ui.getFileInputArray = function() {
		return [].slice.call(ui.imageList.querySelectorAll('input.imageData'));
	}; 
	ui.getFileInputIdArray = function() {
		var fileInputArray = ui.getFileInputArray();
		var idArray = [];
		fileInputArray.forEach(function(fileInput) {
			if (fileInput.value != '') {
				idArray.push(fileInput.getAttribute('id'));
			}
		});
		return idArray;
	};
	var imageIndexIdNum = 0;
	ui.newPlaceholder = function() {
		var fileInputArray = ui.getFileInputArray();
		if (fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		}
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.addEventListener('click', function(event) {
			event.stopPropagation();
			event.cancelBubble = true;
			setTimeout(function() {
				ui.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);
		//定义储存图片编码表单
		var idInput = document.createElement('input');
		idInput.setAttribute('type', 'hidden');
		idInput.setAttribute('id', 'imageData-' + imageIndexIdNum);
		idInput.setAttribute('name', 'imageData-' + imageIndexIdNum);
		idInput.setAttribute('class', 'imageData');
		
		var fileInput = document.createElement('a');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		fileInput.className = "btnAdd";
		fileInput.addEventListener('tap', function(event) {
			var btnArray = [{title: "拍照"}, {title: "从相册中选择图片"}];
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: btnArray
			}, function(event) {
				switch (event.index) {
					case 1:
						console.log('拍照');
						var cmr = plus.camera.getCamera();
					    cmr.captureImage(function(p) {
					        plus.io.resolveLocalFileSystemURL(p, function(entry) {
					            //获取文件
					            entry.file(function(file) {
					            	console.log(file.size + '--' + file.name);
					            	//压缩文件并编码
					            	canvasResize(file, {
				                        width: 800,
				                        //height: tmph,
				                        crop: false,
				                        quality: 50, //压缩质量
				                        rotate: 0,
				                        callback: function(data, width, height) {
				                            idInput.setAttribute('value', data);
				                            placeholder.style.backgroundImage = 'url(' + data + ')';
				                            placeholder.classList.remove('space');
											ui.newPlaceholder();
				                        }
				                    });
					            });
					        }, function(e) {
					        	mui.toast("读取拍照文件错误");
								console.log("读取拍照文件错误：" + e.message);
							});
					    }, function(e) {
					    	switch(e.code)
							{
								case 11:
								case 2:
									mui.toast("取消拍照 ");
							  		break;
								default:
							  		mui.toast("很抱歉，获取拍照失败 ");
							}
					    });
						break;
					case 2:
						console.log('从相册中选择图片');
						plus.gallery.pick(function(e) {
				            plus.io.resolveLocalFileSystemURL(e, function(entry) {
					            //获取文件
					            entry.file(function(file) {
					            	console.log(file.size + '--' + file.name);
					            	//压缩文件并编码
					            	canvasResize(file, {
				                        width: 800,
				                        //height: tmph,
				                        crop: false,
				                        quality: 50, //压缩质量
				                        rotate: 0,
				                        callback: function(data, width, height) {
				                            idInput.setAttribute('value', data);
				                            placeholder.style.backgroundImage = 'url(' + data + ')';
				                            placeholder.classList.remove('space');
											ui.newPlaceholder();
				                        }
				                    });
					            });
					        });
					    }, function(e) {
					    	console.log(JSON.stringify(e));
					        mui.toast("取消选择图片");
					    }, {
					        filter: "image",
					        multiple: false
					    });
						break;
				}
			});
		}, false);
		placeholder.appendChild(closeButton);
		placeholder.appendChild(fileInput);
		placeholder.appendChild(idInput);
		ui.imageList.appendChild(placeholder);
	};
	ui.newPlaceholder();
	
})(mui, window, document, undefined);
/**
 * 获取上传表单图片
 */
function getImgInputArray() {
	var imageList = document.getElementById('image-list');
	var fileInputArray = [].slice.call(imageList.querySelectorAll('input.imageData'));
	var idArray = [];
	fileInputArray.forEach(function(fileInput) {
		if (fileInput.value != '') {
			idArray.push(fileInput.getAttribute('value'));
		}
	});
	return idArray;
};