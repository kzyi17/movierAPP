(function($){
  	$.hasClass = function(obj, cls) { 
  		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  	}
    $.addClass = function(obj, cls) {
    	if (!$.hasClass(obj, cls)) obj.className += " " + cls;
    }
    $.removeClass =function(obj, cls) {
	    if ($.hasClass(obj, cls)) {
    		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
	    }
    }
    $.DateUtil={};
    $.DateUtil.addDate = function(date, inc){
		var d = new Date(date);
		d.setTime(date.getTime() + inc*24*3600*1000);
		return d;
	}
	$.DateUtil.getDateDiff= function(base, target){
		return (target.getTime() - base.getTime())/(24*3600*1000);
	}
	$.DateUtil.getToday= function(){
		var d = new Date();
		d.setHours(0,0,0,0);
		return d;
	}
}(mui));
/*日历控件*/
(function($){
	var MonthView =(function($){
		var MonthViewTemplate='';
		MonthViewTemplate += '<div class="mCalendar-title">';
		MonthViewTemplate += '<div class="mCalendar-prevyear"><<</div>';
		MonthViewTemplate += '<div class="mCalendar-prevmonth"><</div>';
		MonthViewTemplate += '<div class="mCalendar-year"></div>';
		MonthViewTemplate += '<div class="mCalendar-month"></div>';
		MonthViewTemplate += '<div class="mCalendar-nextmonth">></div>';
		MonthViewTemplate += '<div class="mCalendar-nextyear">>></div>';
		MonthViewTemplate += '</div>';
		MonthViewTemplate += '<div class="mCalendar-week"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div>';
		MonthViewTemplate += '<div class="mCalendar-content clearfix"></div>';
		
		var cldbox = document.createElement("div");
		cldbox.className = "mCalendar-container"
		cldbox.innerHTML = MonthViewTemplate;
		
		var CellViewTemplate = '<div>1</div>';
		var cell_selected;
		var date_selected;
		var firstDateinMonthView;
		
		// dom 对象
		var omonth = cldbox.querySelector(".mCalendar-month");
		var oyear = cldbox.querySelector(".mCalendar-year");
		var prevyear = cldbox.querySelector(".mCalendar-prevyear");
		var prevmonth = cldbox.querySelector(".mCalendar-prevmonth");
		var nextyear = cldbox.querySelector(".mCalendar-nextyear");
		var nextmonth = cldbox.querySelector(".mCalendar-nextmonth");
		var content = cldbox.querySelector(".mCalendar-content");
	
		var isSupportMUI = (typeof mui === 'function');
		var evt = {
			type: isSupportMUI?'tap':'click'
		}
		
		var renderSkelekon = function(container){
			container.appendChild(cldbox);
			var html ="";
			for (var i=0; i<options.row_len; i++){
				for(var j=0; j<7; j++){
					html += CellViewTemplate;
				}
			}
			content.innerHTML = html;
			for(var i = content.childNodes.length - 1; i >= 0; i--){
				child = content.childNodes[i];
				child.setAttribute("mc-cell-index",i);
			}
		};
		var changeMonth= function(date){
			var firstDate = getFirstDateInMonth(date);
			firstDateinMonthView = firstDate;
			
			for(var i = content.childNodes.length - 1; i >= 0; i--){
				child = content.childNodes[i];
				var d =  $.DateUtil.addDate(firstDate, i);
				child.innerHTML = "" + d.getDate();
				if(d.getMonth() != date.getMonth()){
					child.setAttribute("disabled","disabled");
					$.removeClass(child, "canChoose")
				}else{
					child.removeAttribute("disabled");
					$.addClass(child,"canChoose");
				}
				if(d.getTime() == date.getTime()){
					$.addClass(child,"mc-cell-selected");
					cell_selected = child;
					date_selected = d;
				}
				if(d.getTime() == $.DateUtil.getToday().getTime()){
					$.addClass(child, "today")
				}else{
					$.removeClass(child, "today")
				}
			}
		};
		var changeDate = function(date){
		  	date && date.setHours(0,0,0,0)
			if(cell_selected){
				$.removeClass(cell_selected,"mc-cell-selected");
				if(date_selected.getFullYear() == date.getFullYear()
				   && date_selected.getMonth() == date.getMonth()){
					var index = 1*cell_selected.getAttribute("mc-cell-index") + $.DateUtil.getDateDiff(date_selected, date);
			   		cell_selected = content.childNodes[index];
			   	  	$.addClass(cell_selected,"mc-cell-selected");
			   	  	date_selected = date;
			    }else{
					changeMonth(date);
				}
			}else{
				changeMonth(date);
			}
			omonth.innerHTML = (date_selected.getMonth()+1) +'月';
			oyear.innerHTML = date_selected.getFullYear() +'年';
				
		};
		
		var swipeMonth = function(direction){
			var d = new Date(date_selected);
			var m = d.getMonth() + direction;
			if(m==12){
				d.setMonth(0);
				d.setFullYear(d.getFullYear() + 1);
			}
			else if(m==-1){
				d.setMonth(11);
				d.setFullYear(d.getFullYear() - 1);
			}
			else{
				d.setMonth(m) ;
			}
			changeDate(d);
		};
		
		function getFirstDateInMonth(date){
			var d = new Date(date);
			d.setDate(1)
			var fd = $.DateUtil.addDate(d, (0-d.getDay()));
			return fd;
		}
		
		return{
			date_selected: function(){return date_selected},
			init: function(o,c){
				options = o
				renderSkelekon(o.container);
				this.changeDate(o.date || $.DateUtil.getToday());
				
				/*监听上一月*/
				prevmonth.addEventListener(evt.type,function(e){
					swipeMonth(-1);
				},false);
				
				/*监听下一月*/
				nextmonth.addEventListener(evt.type,function(e){
					swipeMonth(1);
				},false);
				
				/*监听手势*/
				options.container.addEventListener('swipeleft', function(){
					swipeMonth(1);
				});
				options.container.addEventListener('swiperight', function(){
					swipeMonth(-1);
				});
				
				for(var i = content.childNodes.length - 1; i >= 0; i--){
					child = content.childNodes[i];
					child.addEventListener(evt.type,function(e){
						var idx = this.getAttribute("mc-cell-index");
						var dateObj = $.DateUtil.addDate(firstDateinMonthView,idx)
						var a = this.getAttribute("mc-cell-index");
						if(!$.hasClass(this,"mc-cell-selected")){
							changeDate(dateObj);
							options.fn(dateObj);
						}
					},false);
				}
			},
			changeDate:changeDate,
		}
		
	}($));
	
	var WeekView =(function($){
		
		var isSupportMUI = (typeof mui === 'function');
		var evt = {type: isSupportMUI?'tap':'click'};
		
		var WeekViewTemplate='';
		WeekViewTemplate += '<div class="mWeek-title">可提供服务时间</div>';
		WeekViewTemplate += '<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mWeek">';
		WeekViewTemplate += '<div class="mui-scroll mWeek-content">';
		WeekViewTemplate += '</div>';
		WeekViewTemplate += '</div>';
		
		var CellViewTemplate = '<a class="mui-control-item">';
		CellViewTemplate += '<div class="mWeek-day">日期</div>';
		CellViewTemplate += '<div class="mWeek-week">星期</div>';
		CellViewTemplate += '</a>';
		
		var cldbox = document.createElement("div");
		cldbox.innerHTML = WeekViewTemplate;
		
		//dom
		var content = cldbox.querySelector(".mWeek-content");
		
		var cell_selected;
		var date_selected;
		
		//渲染
		var renderSkelekon = function(container,date,row){
			date && date.setHours(0,0,0,0);
			
			var dayNames = new Array("周日","周一","周二","周三","周四","周五","周六");
			var html = '';
			
			container.appendChild(cldbox);
			for (var i=0; i<row; i++){
				html += CellViewTemplate;
			}
			content.innerHTML = html;
			
			for(var i = content.childNodes.length - 1; i >= 0; i--){
				child = content.childNodes[i];
				child.setAttribute("mcweek-cell-index",i);
				var d =  $.DateUtil.addDate(date, i);
				child.querySelector(".mWeek-day").innerHTML = "" + (d.getMonth()+1) +"-"+d.getDate();
				child.querySelector(".mWeek-week").innerHTML = "" + dayNames[d.getDay()];
				if(d.getTime() == $.DateUtil.getToday().getTime()){
					child.querySelector(".mWeek-week").innerHTML = "今天";
				}else{
					child.querySelector(".mWeek-week").innerHTML = "" + dayNames[d.getDay()];
				}
			}
		};
		
		var changeDate = function(date){
		  	date && date.setHours(0,0,0,0);
		  	
		  	if(date_selected&&cell_selected){
		  		$.removeClass(cell_selected,"mWeek-cell-selected");
		  		var index = $.DateUtil.getDateDiff(date_selected, date);
		  		cell_selected = content.childNodes[index];
		  		$.addClass(cell_selected,'mWeek-cell-selected');
		  	}else{
				var index = $.DateUtil.getDateDiff(date_selected, date);
				cell_selected = content.childNodes[index];
				$.addClass(cell_selected,'mWeek-cell-selected mui-active');
		  	}
		  	
		};
		
		return{
			init: function(o){
				date_start = o.date || $.DateUtil.getToday();
				//渲染视图
				renderSkelekon(o.container,date_start,o.row);
				date_selected = date_start;
				changeDate(o.date_selected || date_start);
				
				for(var i = content.childNodes.length - 1; i >= 0; i--){
					child = content.childNodes[i];
					child.addEventListener(evt.type,function(e){
						var idx = this.getAttribute("mcweek-cell-index");
						var dateObj = $.DateUtil.addDate(date_start,idx);
						if(!$.hasClass(this,"mWeek-cell-selected")){
							changeDate(dateObj);
							o.fn(dateObj);
						}
					},false);
				}
				
			},
			changeDate:changeDate,
		}
		
	}($));	
	
	$.fn.MWeek = function(option){
		//默认配置
		var options = {
			container : this[0],			//
			date:undefined,					//开始日期
			date_selected:undefined,		//默认选中日期
			row:7,							//显示单位
			fn:function(){},				//点击回调函数
		};
		//合并配置
		$.extend(options, option||{});
		
		options.date && options.date.setHours(0,0,0,0);
		var wk ={
			options:{},
			init:function(){
				this.options = options;
				WeekView.init(options);
			},
		};
		wk.init();
		return wk;
	};
	

	$.fn.MCalendar = function(option){
		var options = {
			container : this[0],
			row_len:5,
			date:undefined,
			fn:function(){}
		}
		$.extend(options, option||{});
		options.date && options.date.setHours(0,0,0,0);
		
		var mc ={
			options:{},
			getDate: function(){
				return MonthView.date_selected();
			},
			init:function(){
				this.options = options;
				MonthView.init(options);
			},
			show:function(){
				options.container.style.display = "initial";
			},
			hide:function(){
				options.container.style.display = 'none';
			},
		};
		mc.init();
		return mc;
	};
}(mui));