/*过滤器数据源*/
//影人活动列表筛选器数据
var FD_nearbyMovier = [{ 
	value: '5',
	type:'severtype',
	text: '服务类型',
	children:[{
		value: '1',
		text: '个人'
	}, {
		value: '2',
		text: '团队'
	}]
}, {
	value: '8',
	type:'style',
	text: '地区',
	children:[{
		value: '9',
		text: '婚礼摄影' 
	}, {
		value: '10',
		text: '淘宝摄相'
	}]	
}, {
	value: '8',
	type:'severtype',
	text: '时间',
	children:[{
		value: '9',
		text: '婚礼摄影2'
	}, {
		value: '10',
		text: '淘宝摄相2'
	}]
}];


////////////////////////////////////////////////////


var filterdata_works = [{
	value: '5',
	type:'severtype',
	text: '服务类型',
	children:[{
		value: '1',
		text: '个人'
	}, {
		value: '2',
		text: '团队'
	}]
}, {
	value: '8',
	type:'style',
	text: '风格',
	children:[{
		value: '9',
		text: '婚礼摄影' 
	}, {
		value: '10',
		text: '淘宝摄相'
	}]	
}, {
	value: '8',
	type:'severtype',
	text: '风格2',
	children:[{
		value: '9',
		text: '婚礼摄影2'
	}, {
		value: '10',
		text: '淘宝摄相2'
	}]
}];

//影人活动列表筛选器数据
var filterdata_event = [{
	value: '5',
	type:'severtype',
	text: '服务类型',
	children:[{
		value: '1',
		text: '个人'
	}, {
		value: '2',
		text: '团队'
	}]
}, {
	value: '8',
	type:'style',
	text: '地区',
	children:[{
		value: '9',
		text: '婚礼摄影' 
	}, {
		value: '10',
		text: '淘宝摄相'
	}]	
}, {
	value: '8',
	type:'severtype',
	text: '时间',
	children:[{
		value: '9',
		text: '婚礼摄影2'
	}, {
		value: '10',
		text: '淘宝摄相2'
	}]
}];
 
var LISTFILTERDATA = {
	man:{},//影人,团队
	works:{
		tpl:'',
		title:'附近作品',
		filter:[{
			value: '5',
			type:'severtype',
			text: '服务类型',
			children:[{
				value: '1',
				text: '个人'
			}, {
				value: '2',
				text: '团队'
			}]
		}, {
			value: '8',
			type:'style',
			text: '风格',
			children:[{
				value: '9',
				text: '婚礼摄影'
			}, {
				value: '10',
				text: '淘宝摄相'
			}]	
		}, {
			value: '8',
			type:'severtype',
			text: '风格2',
			children:[{
				value: '9',
				text: '婚礼摄影2'
			}, {
				value: '10',
				text: '淘宝摄相2'
			}]
		}]
	},//作品
	event:{},//活动
	demand:{},//紧急需求
	tradezl:{},//交易：租赁，以活易物，以物易物
	trademm:{},//交易：买卖
};