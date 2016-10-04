/*过滤器数据源*/
var jobData = [{
	value: '1',
	text: '生聚会'
}, {
	value: '2',
	text: '主题聚会'
}, {
	value: '3',
	text: '读书聚会'
}, {
	value: '4',
	text: '聚会'	
}];


var proListFilterData = [{
	value: '1',
	text: '精彩作品',
	children:[{
		value: '5',
		text: '服务类型',
		children:[{
			value: '6',
			text: '个人'
		}, {
			value: '7',
			text: '团队'
		}]
	}, {
		value: '8',
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
		text: '风格',
		children:[{
			value: '9',
			text: '婚礼摄影'
		}, {
			value: '10',
			text: '淘宝摄相'
		}]
	}]
}, {
	value: '2',
	text: '影人活动',
	children:[{
		value: '5',
		text: '服务类型',
		children:[{
			value: '6',
			text: '个人'
		}, {
			value: '7',
			text: '团队'
		}]
	}, {
		value: '8',
		text: '风格',
		children:[{
			value: '9',
			text: '婚礼摄影'
		}, {
			value: '10',
			text: '淘宝摄相'
		}]
	}]
}, {
	value: '3',
	text: '紧急需求',
	children:[{
		value: '5',
		text: '服务类型',
		children:[{
			value: '6',
			text: '个人'
		}, {
			value: '7',
			text: '团队'
		}]
	}, {
		value: '8',
		text: '风格',
		children:[{
			value: '9',
			text: '婚礼摄影'
		}, {
			value: '10',
			text: '淘宝摄相'
		}]
	}]
}, {
	value: '4',
	text: '附近交易',
	children:[{
		value: '5',
		text: '服务类型',
		children:[{
			value: '6',
			text: '个人'
		}, {
			value: '7',
			text: '团队'
		}]
	}, {
		value: '8',
		text: '风格',
		children:[{
			value: '9',
			text: '婚礼摄影'
		}, {
			value: '10',
			text: '淘宝摄相'
		}]
	}]
}];

var areaData = [{
	value: "110101",
	text: "东城区"
}, {
	value: "110102",
	text: "西城区"
}, {
	value: "110103",
	text: "崇文区"
}, {
	value: "110104",
	text: "宣武区"
}, {
	value: "110105",
	text: "朝阳区"
}, {
	value: "110106",
	text: "丰台区"
}, {
	value: "110107",
	text: "石景山区"
}, {
	value: "110108",
	text: "海淀区"
}, {
	value: "110109",
	text: "门头沟区"
}, {
	value: "110111",
	text: "房山区"
}, {
	value: "110112",
	text: "通州区"
}, {
	value: "110113",
	text: "顺义区"
}, {
	value: "110114",
	text: "昌平区"
}, {
	value: "110115",
	text: "大兴区"
}, {
	value: "110116",
	text: "怀柔区"
}, {
	value: "110117",
	text: "平谷区"
}, {
	value: "110228",
	text: "密云县"
}, {
	value: "110229",
	text: "延庆县"
}, {
	value: "110230",
	text: "其它区"
}];



var listFilterData = [{
	value: '11',
	text: '精彩作品',
	children: [{
		value: "110101",
		text: "服务类型",
		children: [{
			value: "110101",
			text: "个人"
		}, {
			value: "110102",
			text: "团队"
		}]
	},{	
		value: "110101",
		text: "地区",
		children: [{
			value: "110101",
			text: "东城区"
		}, {
			value: "110102",
			text: "西城区"
		}, {
			value: "110103",
			text: "崇文区"
		}]		
	}]
},{
	value: '12',
	text: '影人活动',
	children: [{
		value: "110101",
		text: "服务类型",
		children: [{
			value: "110101",
			text: "个人"
		}, {
			value: "110102",
			text: "团队"
		}]
	},{	
		value: "110101",
		text: "地区",
		children: [{
			value: "110101",
			text: "东城区"
		}, {
			value: "110102",
			text: "西城区"
		}, {
			value: "110103",
			text: "崇文区"
		}]		
	}]	
}];

