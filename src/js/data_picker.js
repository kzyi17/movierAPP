/*选择器选择项数据源*/
//活动性质
var eventAttrData = [{
	value: '1',
	text: '生日聚会'
}, {
	value: '2',
	text: '主题聚会'
}, {
	value: '3',
	text: '读书聚会'
}, {
	value: '4',
	text: '观影聚会'
}, {
	value: '5',
	text: '研讨聚会' 
}, {
	value: '6',
	text: '培训聚会'
}, {
	value: '7',
	text: '拍摄活动'
}, {
	value: '8',
	text: '相亲活动'
}];

//性别要求
var eventSexData = [{
	value: '1',
	text: '只限男性'
}, {
	value: '2',
	text: '只限女性'
}, {
	value: '0',
	text: '男女皆可'
}];

//会员要求
var eventMemberData = [{
	value: '1',
	text: '一级会员'
}, {
	value: '2',
	text: '二级会员'
}, {
	value: '3',
	text: '三级会员'
}, {
	value: '4',
	text: '四级会员'
}, {
	value: '5',
	text: '五级会员'
}, {
	value: '6',
	text: '六级会员'
}, {
	value: '7',
	text: '七级会员'
}, {
	value: '8',
	text: '各等级均可'
}];

//职业要求
var eventJobData = [{
	value: '1',
	text: '摄影师'
}, {
	value: '2',
	text: '摄像师'
}, {
	value: '3',
	text: '导演'
}, {
	value: '4',
	text: '3D指导'
}, {
	value: '5',
	text: '摄影指导'
}, {
	value: '6',
	text: '灯光师'
}, {
	value: '7',
	text: '道具师'
}, {
	value: '8',
	text: '服装师'
}, {
	value: '9',
	text: '化妆师'
}, {
	value: '10',
	text: '编剧'
}, {
	value: '11',
	text: '制片人'
}, {
	value: '12',
	text: '制片主任'
}, {
	value: '13',
	text: '生活制片'
}, {
	value: '14',
	text: '外联制片'
}, {
	value: '15',
	text: '男演员'
}, {
	value: '16',
	text: '女演员'
}, {
	value: '17',
	text: '摄影助理'
}];

//交易市场
var marketData = [{
	value: '1',
	text: '买卖'
}, {
	value: '2',
	text: '租赁'
}, {
	value: '3',
	text: '以活易物'
}, {
	value: '4',
	text: '以物易物'	
}];

//成色
var depreciationData = [{
	value: '1',
	text: '9成新'
}, {
	value: '2',
	text: '8成新'
}, {
	value: '3',
	text: '7成新'
}, {
	value: '4',
	text: '6成新'	
}];

//摄影器材分类及品牌
var cateAndBrandData = [{
	value: '110000',
	text: '脚架',
	children: [{
		value: "110101",
		text: "东城区"
	}, {
		value: "110102",
		text: "西城区"
	}]
}, {	
	value: '120000',
	text: '摄影机',
	children: [{
		value: "120101",
		text: "佳能"
	}, {
		value: "120102",
		text: "尼康"
	}]
}];