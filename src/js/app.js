/**
 * 系统设置，用户相关
 *  
 * 
 **/
(function($, owner) {
	/**
	 * 获取城市
	 */
	owner.getCity = function() {
		var stateText = localStorage.getItem('$movier_city') || "{}";
		return JSON.parse(stateText);
	};
	
	/**
	 * 设置城市
	 * @param {Object} state
	 */
	owner.setCity= function(state) {
		state = state || {};
		localStorage.setItem('$movier_city', JSON.stringify(state));
	};
	
	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$movier_state') || "{}";
		return JSON.parse(stateText);
	};
	
	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$movier_state', JSON.stringify(state));
	};
	
	/**
	 * 获取用户ID
	 * 
	 */
	owner.getUserId = function() {
		var state = owner.getState();
		var user = state.userInfo || "{}";
		return user.user_id;
	};
	
	/**
	 * 注销用户
	 */
	owner.clearState = function(state) {
		state = {};
		localStorage.setItem('$movier_state', JSON.stringify(state));
	};
	
	/**
	 * 检查是否登录
	 */
	owner.checkLogin = function(){
		var state = owner.getState();
		if(state.userId){
			return true;
		}else{
			return false;
		}
	};
	
	/**
	 * 需要登录权限
	 * ---如果没有登录则调用登录窗口，登录完成后回到原来窗口
	 * ---如果已登陆则执行原有逻辑，即回调函数
	 */
	owner.loginAuth = function(callback){
		callback = callback || $.noop;
		var state = owner.getState();
		if(state.userId){
			callback();
		}else{
			$.alert('您还未登录,请先登录','影人根据地','确定',function(){
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
	 * 设置当前定位
	 **/
	owner.setLocation = function() {
		var location =  {};
		plus.geolocation.getCurrentPosition( function(position){
			location.longt = position.coords.longitude;
			location.lat = position.coords.latitude;
			location.info = position;
			localStorage.setItem('$movier_location', JSON.stringify(location));
		}, function ( e ) {
			console.log( "获取定位位置信息失败："+e.message );
		},{geocode:true,provider:'amap'});
	}; 
	
	/**
	 * 获取当前定位
	 **/
	owner.getLocation = function() {
		var stateText = localStorage.getItem('$movier_location') || "{}";
		return JSON.parse(stateText);
	};
	
	
}(mui, window.App = {}));