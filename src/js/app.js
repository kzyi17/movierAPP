/**
 * 系统设置，用户相关
 *  
 * 
 **/
var APP_NAME = "影人根据地";
//var APP_HOMEVIEW = plus.webview.getLaunchWebview();
						
(function($, owner) {
	
	/**
	 * APP启动初始化，只在首页调用
	 * 
	 */
	owner.appInit = function() {
		console.log('appInit....');
		//localStorage.setItem('$currentCity', JSON.stringify({name:"上海市",code:null}));
		//获取定位，提取城市、坐标信息
		owner.getGeo(function(p){
			var currentPosition = {};
			var currCity = owner.getCurrentCity();
			
			//保存当前定位
			currentPosition.province = p.address.province;
			currentPosition.city = p.address.city;
			currentPosition.district = p.address.district;
			currentPosition.address = p.addresses;
			currentPosition.lng = p.coords.longitude;
			currentPosition.lat = p.coords.latitude;
			currentPosition.timestamp = p.timestamp;
			owner.setCurrentPosition(currentPosition);
			
			//如未设置当前城市，自动为其设置为当前定位
			if(typeof(currCity.name)=="undefined"){
				var currentCity = {};
				currentCity.name = p.address.city;
				currentCity.code = p.address.cityCode;
				owner.setCurrentCity(currentCity);
			}
			
			//如果当前城市不是定位城市，则弹窗提示操作
			var tmpCity = p.address.city;
			if(currCity.name !== tmpCity){
				plus.nativeUI.confirm("系统定位到您在"+tmpCity+"，需要切换到"+tmpCity+"吗？", function(e){
					if(0==e.index){
						//切换城市
						owner.setCurrentCity({name:tmpCity});
						mui.fire(plus.webview.getLaunchWebview(),'changCity');
						console.log("当前城市："+ tmpCity); 
					} 
				}, "", ["切换","不了"] ); 
			}

		});
	};
	
	/**
	 * 自动登录
	 * @param {Object} onSuccess
	 * @param {Object} onError
	 * @param {Object} retry
	 */
	owner.autoLogin = function(onSuccess, onError, retry){
		console.log('自动登录。。。。。。');
	};
	
	/**
	 * 获取当前定位
	 * ##获取不到定位时自动重新获取，默认5次
	 * 
	 * @param {Object} onSuccess
	 * @param {Object} onError
	 * @param {Object} retry
	 */
	owner.getGeo = function(onSuccess, onError, retry){
		var onSuccess = onSuccess || $.noop;
		var onError = onError || $.noop;
		var retry = arguments[3]?arguments[3]:5;
		
		plus.geolocation.getCurrentPosition( function(p){
			onSuccess(p);
		}, function ( e ) {
			retry--;
			if(retry > 0) {
				$.toast('获取位置失败，正在重新获取...');
            	return owner.getGeo(onSuccess, onError,retry);
            }else{
            	onError();
            	$.alert('无法获取您的位置');
            	console.log( "获取定位位置信息失败："+e.message ); 
            }
		},{geocode:true,provider:'amap'});
	};
	
	/**
	 * 获取城市
	 */
	owner.getCurrentCity = function() {
		var stateText = localStorage.getItem('$currentCity') || "{}";
		return JSON.parse(stateText);
	};
	
	/**
	 * 设置城市
	 * @param {Object} state
	 */
	owner.setCurrentCity= function(state) {
		state = state || {};
		localStorage.setItem('$currentCity', JSON.stringify(state));
	};
	
	/**
	 * 获取当前定位信息
	 */
	owner.getCurrentPosition = function() {
		var stateText = localStorage.getItem('$currentPosition') || "{}";
		return JSON.parse(stateText);
	};
	
	/**
	 * 设置当前定位信息
	 * @param {Object} state
	 */
	owner.setCurrentPosition= function(state) {
		state = state || {};
		localStorage.setItem('$currentPosition', JSON.stringify(state));
	};
	
	
	/**
	 * 检查是否登录
	 * 
	 * @return boolean
	 */
	owner.checkLogin = function(){
		var stateText = localStorage.getItem('$state') || "{}";
		var state = JSON.parse(stateText);
		if(state.userID){
			return true;
		}else{
			return false;
		}
	};
	
	/**
	 * 设置登录状态
	 * 
	 * @param 
	 */
	owner.setLogin = function(userid,token){
		var state = {userID:userid};
		var token = token || {};
		token.userid = userid;
		localStorage.setItem('$state', JSON.stringify(state));
		localStorage.setItem('$token', JSON.stringify(token));
	};
	
	/**
	 * 退出登录状态
	 * 
	 */
	owner.setLogout = function(){
		var state = {};
		var token = {};
		localStorage.setItem('$state', JSON.stringify(state));
		localStorage.setItem('$token', JSON.stringify(token));
	}
	
	/**
	 * 获取userID
	 * 
	 * @return String
	 */
	owner.getUserID = function(){
		var stateText = localStorage.getItem('$state') || "{}";
		var state = JSON.parse(stateText);
		return state.userID;
	}
	
	/**
	 * 需要登录权限
	 * ---如果没有登录则调用登录窗口，登录完成后回到原来窗口
	 * ---如果已登陆则执行原有逻辑，即回调函数
	 */
	owner.loginAuth = function(callback){
		callback = callback || $.noop;
		if(owner.checkLogin()){
			callback();
		}else{
			$.alert('您还未登录,请先登录',APP_NAME,'确定',function(){
				$.openWindow({
					url: 'login.html',
					id: 'login',
					show: {
						aniShow: 'slide-in-bottom'
					}
				});
				
			}); 
		}
	};
	
	/**
	 * 打开新页面
	 * ---登录状态下打开指定窗口
	 * ---未登录则调用登录窗口，登录完成后回到该窗口
	 */
	owner.openWithLogin = function(url,id){
		if(!url) return;
		id = id || url;
		
		if(owner.checkLogin()){
			$.openWindow({
				url: url,
				id: id,
			});
		}else{
			$.openWindow({
				url: 'login.html',
				id: 'login',
				extras:{targetUrl:url,targetId:id},
				show: {
					aniShow: 'slide-in-bottom'
				}
			});
		}
	};
	
	/**
	 * 保存token
	 * 
	 * @param {Object}
	 */
	owner.setToken = function(token) {
		token = token || {};
		localStorage.setItem('$token', JSON.stringify(token));
	};	
	
	/**
	 * 获取token
	 * 
	 * @return {Object}
	 */
	owner.getToken = function() {
		var tokenText = localStorage.getItem('$token') || "{}";
		return JSON.parse(tokenText);
	};

	/**
	 * 保存用户信息
	 * 
	 * @param {Object}
	 */
	owner.setUserInfo = function(userInfo) {
		userInfo = userInfo || {};
		localStorage.setItem('$userInfo', JSON.stringify(userInfo));
	};
	
	
	/**
	 * 获取用户信息
	 * 
	 * @return {Object}
	 */
	owner.getUserInfo = function() {
		var userInfoText = localStorage.getItem('$userInfo') || "{}";
		return JSON.parse(userInfoText);
	};
	
	/**
	 * 图像缓存
	 * 
	 */
	function imgCache(){
		
	}
	
}(mui, window.App = {}));
