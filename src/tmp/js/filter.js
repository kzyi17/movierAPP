/**
 * 集成筛选器插件
 * varstion 0.0.1
 * by kezhen.yi
 * kezhen.yi@mywork99.com
 */
(function($, window, document, undefined) {

	var Filter = $.Filter = function(holder, options) {
		var self = this;
		self.holder = holder;
		self.options = options || {};
		self.init();
		self.initInertiaParams();
//		self.calcElementItemPostion(true);
		self.bindEvent();
	};

	Filter.prototype.findElementItems = function() {
		var self = this;
		self.elementItems = [].slice.call(self.holder.querySelectorAll('li'));
		return self.elementItems;
	};

	Filter.prototype.init = function() {
		var self = this;
		self.list = self.holder.querySelector('ul');
		self.findElementItems();
	};

/*	Filter.prototype.calcElementItemPostion = function(andGenerateItms) {
		var self = this;
		if (andGenerateItms) {
			self.items = [];
		}
		self.elementItems.forEach(function(item) {
			var index = self.elementItems.indexOf(item);
			self.endAngle = self.itemAngle * index;
			item.angle = self.endAngle;
		    //item.style.webkitTransformOrigin = "center center -" + self.r + "px";
			//item.style.webkitTransform = "translateZ(" + self.r + "px) rotateX(" + (-self.endAngle) + "deg)";
			if (andGenerateItms) {
				var dataItem = {};
				dataItem.text = item.innerHTML || '';
				dataItem.value = item.getAttribute('data-value') || dataItem.text;
				self.items.push(dataItem); 
			}
		});
		self.endExceed = self.endAngle + MAX_EXCEED;
//		self.calcElementItemVisibility(self.beginAngle);
	};*/


	Filter.prototype.bindEvent = function() {
		var self = this;
		var lastAngle = 0;
		var startY = null;
		/*self.holder.addEventListener('touchstart', function(event) {
			event.preventDefault();
			self.list.style.webkitTransition = '';
			startY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
			lastAngle = self.list.angle;
			self.updateInertiaParams(event, true);
		}, false);
		self.holder.addEventListener('touchend', function(event) {
			event.preventDefault();
			self.startInertiaScroll(event);
		}, false);
		self.holder.addEventListener('touchcancel', function(event) {
			event.preventDefault();
			self.startInertiaScroll(event);
		}, false);
		self.holder.addEventListener('touchmove', function(event) {
			event.preventDefault();
			var endY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
			var dragRange = endY - startY;
			var dragAngle = self.calcAngle(dragRange);
			var newAngle = dragRange > 0 ? lastAngle - dragAngle : lastAngle + dragAngle;
			if (newAngle > self.endExceed) {
				newAngle = self.endExceed
			}
			if (newAngle < self.beginExceed) {
				newAngle = self.beginExceed
			}
			self.setAngle(newAngle);
			self.updateInertiaParams(event);
		}, false);*/
		//--
		self.list.addEventListener('tap', function(event) {
			elementItem = event.target;
			if (elementItem.tagName == 'LI') {
				self.setSelectedIndex(self.elementItems.indexOf(elementItem), 200);
			}
			//elementItem = event.target;
			//console.log(self.elementItems.indexOf(elementItem));
		}, false);
	};

	Filter.prototype.initInertiaParams = function() {
		var self = this;
		self.selectedIndex = 0;
	};

	Filter.prototype.updateInertiaParams = function(event, isStart) {
		var self = this;
		var point = event.changedTouches ? event.changedTouches[0] : event;
		if (isStart) {
			self.lastMoveStart = point.pageY;
			self.lastMoveTime = event.timeStamp || Date.now();
			self.startAngle = self.list.angle;
		} else {
			var nowTime = event.timeStamp || Date.now();
			if (nowTime - self.lastMoveTime > 300) {
				self.lastMoveTime = nowTime;
				self.lastMoveStart = point.pageY;
			}
		}
		self.stopInertiaMove = true;
	};

	Filter.prototype.triggerChange = function(force) {
		var self = this;
		setTimeout(function() {
			var index = self.getSelectedIndex();
			var item = self.items[index];
			if ($.trigger && (index != self.lastIndex || force)) {
				$.trigger(self.holder, 'change', {
					"index": index,
					"item": item
				});
				//console.log('change:' + force);
			}
			self.lastIndex = index;
			//console.log(index); 
		}, 0);
	};

	Filter.prototype.setItems = function(items) {
		var self = this;
		self.items = items || [];
		var buffer = [];
		self.items.forEach(function(item) {
			if (item !== null && item !== undefined) {
				buffer.push('<li class="mui-table-view-cell">' + (item.text || item) + '</li>');
			}
		});
		//console.log(buffer.join(''));
		self.list.innerHTML = buffer.join('');
		self.findElementItems();
//		self.calcElementItemPostion(); 
//		self.setAngle(self.correctAngle(self.list.angle));
		self.triggerChange(true);
	};

	Filter.prototype.getItems = function() {
		var self = this;
		return self.items;
	};

	Filter.prototype.getSelectedIndex = function() {
		var self = this;
		return self.selectedIndex;
		//return parseInt((self.list.angle / self.itemAngle).toFixed(0));
	};

	Filter.prototype.setSelectedIndex = function(index, duration) {
		var self = this;
		self.selectedIndex = index;
		//console.log(index); 
		self.triggerChange();
		//self.triggerChange(true);
	};

	Filter.prototype.getSelectedItem = function() {
		var self = this;
		return self.items[self.getSelectedIndex()];
	};

	Filter.prototype.getSelectedValue = function() {
		var self = this;
		return (self.items[self.getSelectedIndex()] || {}).value;
	};

	Filter.prototype.getSelectedText = function() {
		var self = this;
		return (self.items[self.getSelectedIndex()] || {}).text;
	};

	Filter.prototype.setSelectedValue = function(value, duration) {
		var self = this;
		for (var index in self.items) {
			var item = self.items[index];
			if (item.value == value) {
				self.setSelectedIndex(index, duration);
				return;
			}
		}
	};

	if ($.fn) {
		$.fn.Filter = function(options) {
			//遍历选择的元素
			this.each(function(i, element) {
				if (element.Filter) return;
				if (options) {
					element.Filter = new Filter(element, options);
				} else {
					var optionsText = element.getAttribute('data-Filter-options');
					var _options = optionsText ? JSON.parse(optionsText) : {};
					element.Filter = new Filter(element, _options);
				}
			});
			return this[0] ? this[0].Filter : null;
		};

		//自动初始化
		$.ready(function() {
			$('.mui-Filter').Filter();
		});
	}

})(window.mui || window, window, document, undefined);
//end
/**
*
 */

(function($, document) {

	//创建 DOM
	$.dom = function(str) {
		if (typeof(str) !== 'string') {
			if ((str instanceof Array) || (str[0] && str.length)) {
				return [].slice.call(str);
			} else {
				return [str];
			}
		}
		if (!$.__create_dom_div__) {
			$.__create_dom_div__ = document.createElement('div');
		}
		$.__create_dom_div__.innerHTML = str;
		return [].slice.call($.__create_dom_div__.childNodes);
	};

	var panelBuffer = '<div class="mui-popFilter">\
		<div class="mui-popFilter-header">\
			<button class="mui-btn mui-popFilter-btn-cancel">取消</button>\
			<button class="mui-btn mui-btn-blue mui-popFilter-btn-ok">确定</button>\
			<div class="mui-popFilter-clear"></div>\
		</div>\
		<div class="mui-popFilter-body">\
		</div>\
	</div>';

	var FilterBuffer = '<div class="mui-Filter">\
		<div class="mui-Filter-inner">\
			<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
			<ul class="mui-pciker-list">\
			</ul>\
			<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
		</div>\
	</div>';
	
	var popoverBuffer = '<div id="proListTypePopover" class="mui-popover ">\
		<div class="mui-popover-arrow"></div>\
		<div class="mui-scroll-wrapper">\
			<div class="mui-scroll" >\
				<ul class="mui-table-view" id="proListType">\
				</ul>\
			</div>\
		</div>\
	</div>';
	
	var midfilterBuffer = '<nav class="midfilternav" >\
			<ul class="mui-table-view midfilter">\
			</ul>\
	</nav>';
	
	var rightfilterBuffer = '<div class="mui-scroll-wrapper">\
			<div class="mui-scroll">\
				<div class="content">\
					<header class="mui-bar">\
						<button class="mui-btn mui-btn-link mui-pull-right" id="offCanvasHide">关闭</button>\
					</header>\
					<ul class="mui-table-view mui-table-view-radio">\
					</ul>\
				</div>\
			</div>\
		</div>';

	//定义弹出选择器类
	var ListFilter = $.ListFilter = $.Class.extend({
		//构造函数
		init: function(options) {
			var self = this;
			self.options = options || {};
			
			//self.layer = options.layer || [];
			
//			self.options.buttons = self.options.buttons || ['取消', '确定'];
			/*self.panel = $.dom(panelBuffer)[0];
			document.body.appendChild(self.panel);
			self.ok = self.panel.querySelector('.mui-popFilter-btn-ok');
			self.cancel = self.panel.querySelector('.mui-popFilter-btn-cancel');
			self.body = self.panel.querySelector('.mui-popFilter-body');
			self.mask = $.createMask();
			self.cancel.innerText = self.options.buttons[0];
			self.ok.innerText = self.options.buttons[1];
			self.cancel.addEventListener('tap', function(event) {
				self.hide();
			}, false);
			self.ok.addEventListener('tap', function(event) {
				if (self.callback) {
					var rs = self.callback(self.getSelectedItems());
					if (rs !== false) {
						self.hide();
					}
				}
			}, false);
			self.mask[0].addEventListener('tap', function() {
				self.hide();
			}, false);*/
			self._createFilter();
			//防止滚动穿透
			/*self.panel.addEventListener('touchstart', function(event) {
				event.preventDefault();
			}, false);
			self.panel.addEventListener('touchmove', function(event) {
				event.preventDefault();
			}, false);*/
		},
		_createFilter: function() {
			var self = this;
			
			//var layer = self.options.layer || [];
			var layers = self.options.layer || [{
				id:'topfilter',
				dataArg:0,
				buffer:popoverBuffer
			},{
				id:'midfilter',
				dataArg:1,
				buffer:midfilterBuffer,
				appendto:'.mui-inner-wrap'
			},{
				id:'offCanvasSideScroll',
				dataArg:2,
				buffer:rightfilterBuffer,
				appendto:'#offCanvasSide'
			}];
			
			self.Layers = layers || [];
			self.Filters = [];
			
			self.Layers.forEach(function(item) {
				if (item !== null && item !== undefined) {
					var FilterElement = $.dom(item.buffer)[0];
					FilterElement.id = item.id;
					if(item.appendto){ 
						$(item.appendto)[0].appendChild(FilterElement);
					}else{
						document.body.appendChild(FilterElement);
					}
					var Filter = $(FilterElement).Filter();
					self.Filters.push(Filter); 
					self[item.id] = {
						layer:FilterElement,
						filter:Filter
					};
					 
					//var index = layer.indexOf(item);
					//console.log(self[item.id]);

					FilterElement.addEventListener('change', function(event) {
						var nextLayerIndex  = self.getNextLayer(this,layers)
						var nextLayer = layers[nextLayerIndex];
						
						if(nextLayer && self[nextLayer.id] && self[nextLayer.id].filter){
							//nextLayer = self[nextLayer.id];
							var eventData = event.detail || {};
							var preItem = eventData.item || {};
							
							self[nextLayer.id].filter.setItems(preItem.children);
						}
						console.log('AA');
						/*if (self.callback) {
							var rs = self.callback(self.getSelectedItems());
							if (rs !== false) {
								self.hide();
							}
						}*/
					}, false);  
				} 
			});
			
			
			/*var layer = self.options.layer || 1;
			var width = (100 / layer) + '%';
			self.Filters = [];
			for (var i = 1; i <= layer; i++) {
				var FilterElement = $.dom(FilterBuffer)[0];
				FilterElement.style.width = width;
				self.body.appendChild(FilterElement);
				var Filter = $(FilterElement).Filter();
				self.Filters.push(Filter);
				FilterElement.addEventListener('change', function(event) {
					var nextFilterElement = this.nextSibling;
					if (nextFilterElement && nextFilterElement.Filter) {
						var eventData = event.detail || {};
						var preItem = eventData.item || {};
						nextFilterElement.Filter.setItems(preItem.children);
					}
				}, false);
			}*/
		},
		getIndexOfLayer:function(current,layers){
			var index;
			for (var index in layers){
				var item = layers[index];
				if (item.id == current.id) {
					index = layers.indexOf(item); 
					return index;
				}
			}
		},
		getNextLayer:function(current,layers){
			var index;
			for (var index in layers){
				var item = layers[index];
				if (item.id == current.id) {
					index = layers.indexOf(item)+1; 
					return index;
				}
			}
		},
		//填充数据
		setData: function(data) {
			var self = this;
			data = data || [];
			self.Filters[0].setItems(data);
		},
		//获取选中的项（数组）
		getSelectedItems: function() {
			var self = this;
			var items = [];
			for (var i in self.Filters) {
				var Filter = self.Filters[i];
				items.push(Filter.getSelectedItem() || {});
			}
			return items;
		},
		//显示
		show: function(callback) {
			var self = this;
			self.callback = callback;
			self.mask.show();
			document.body.classList.add($.className('popFilter-active-for-page'));
			self.panel.classList.add($.className('active'));
			//处理物理返回键
			self.__back = $.back;
			$.back = function() {
				self.hide();
			};
		},
		//隐藏
		hide: function() {
			var self = this;
			if (self.disposed) return;
			self.panel.classList.remove($.className('active'));
			self.mask.close();
			document.body.classList.remove($.className('popFilter-active-for-page'));
			//处理物理返回键
			$.back=self.__back;
		},
		dispose: function() {
			var self = this;
			self.hide();
			setTimeout(function() {
				self.panel.parentNode.removeChild(self.panel);
				for (var name in self) {
					self[name] = null;
					delete self[name];
				};
				self.disposed = true;
			}, 300);
		}
	});

})(mui, document);
