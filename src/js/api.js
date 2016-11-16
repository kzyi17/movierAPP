/**
 * API接口调用
 * @author www.mywork99.com
 */
(function($, owner) {
	var debug = true; // 调试模式
	var ServerDomainRoot = "http://192.168.1.5/movierAPI/";//接口服务器地址
	//var ServerDomainRoot = "http://120.24.249.120/movier/api/";//接口服务器地址
	//var ServerDomainRoot = "http://172.24.65.1/movier/api/";//接口服务器地址
	
	/** 
	 * API接口调用底层
	 * @param {Object} URL
	 * @param {Object} RequestObject
	 * @param {Object} ResponseObject
	 */
	owner.RESTRequest = function(URL,RequestObject, ResponseObject){
		plus.nativeUI.showWaiting();
		var MyXMLHttpRequest = new plus.net.XMLHttpRequest();
		RequestObject = RequestObject || {};
		MyXMLHttpRequest.onreadystatechange = function() {
			switch (MyXMLHttpRequest.readyState) {
				case 0:
					debug && console.log( "xhr请求已初始化" );
					break;
				case 1:
					debug && console.log( "xhr请求已打开" );
					break;
				case 2:
					debug && console.log( "xhr请求已发送" );
					break;
				case 3:
					debug && console.log( "xhr请求已响应");
					break;
				case 4:
					plus.nativeUI.closeWaiting();
					if (MyXMLHttpRequest.status == 200) {
						var responseObject = JSON.parse(MyXMLHttpRequest.responseText || '[]');
						//console.log(JSON.stringify(responseObject));
						//TODO 这里返回值判断处理需要再优化
						if(typeof(responseObject.errcode) == "undefined"){
							ResponseObject.Success(responseObject);
						}else{
							ResponseObject.Error(responseObject);
						}
					} else {
						setTimeout(function(){
							owner.ShowError("网络不佳，请检查您的网络");
						},1000);
					}
					break;
				default:	
					plus.nativeUI.closeWaiting();
					break;
			}
		}
		
		MyXMLHttpRequest.onerror = function(){
			plus.nativeUI.closeWaiting();
			console.log( "xhr请求错误");
		}
		
		MyXMLHttpRequest.timeout=10000; 
		/*
		//这里ontimeout事件不起作用
		MyXMLHttpRequest.ontimeout = function(){
			console.log( "xhr请求超时");
		}
		*/
		
		MyXMLHttpRequest.open("POST", URL);
		MyXMLHttpRequest.setRequestHeader('Content-Type','application/json');
		MyXMLHttpRequest.send(JSON.stringify(RequestObject)); 
		
	};
	
	/**
	 * 显示错误
	 */
	owner.ShowError = function(msg){
		plus.nativeUI.toast(msg);
	};
	
	/**
	 * API接口调用底层(Mui Ajax)
	 * @param {Object} URL
	 * @param {Object} params
	 * @param {Object} onSuccess
	 * @param {Object} onError
	 * @param {Int} retry
	 */
	owner.MuiAjax = function(URL, params, onSuccess, onError, retry){
		var onSuccess = onSuccess || $.noop;
		var onError = onError || $.noop;
		var retry = arguments[4]?arguments[4]:3;
		$.ajax(URL, {
	        data:JSON.stringify(params),
	        dataType:'json',
	        type:'post',
	        timeout:3000,
	        success:function(data){
	        	if(typeof(data.errcode) == "undefined"){
					onSuccess(data);
				}else{
					onError(data);
				}
	        },
	        error:function(xhr,type,errorThrown){
	            retry--;
	            if(retry > 0) {
	            	console.log('try again connect：' + retry);
	            	return owner.MuiAjax(URL, params, onSuccess, onError, retry);
	            }	
	            owner.onError('FAILED_NETWORK');
	        }
	    })
	};
	
	owner.onError = function(errcode){
	    switch(errcode){
		    case 'FAILED_NETWORK':
		        $.toast('网络不佳');
		        break;
		    case 'INVALID_TOKEN':
		        wv_login.show();
		        break;
		    default:
		        console.log(errcode);
	    }
	};

	/**
	 * API调用工具
	 * @param {Object} API
	 * @param {Object} params
	 * @param {Object} successCallback
	 * @param {Object} errCallback
	 * @param {Object} driver 驱动
	 */
	owner.getApi = function(API,params,successCallback,errCallback,driver){
		var driver = driver || 'PLUSNET';
		var APIURL = ServerDomainRoot + API + "?token=asdqwe";
		successCallback = successCallback || $.noop;
		errCallback = errCallback || $.noop;
		params = params || {};
		
		//调试用
		debug && console.log(APIURL);
		debug && console.log(JSON.stringify(params));
		
		if(driver == 'PLUSNET'){
			var Response = new Object();
			Response.Success = function(responseObject) {
				debug && console.log('Api request Success: ' + JSON.stringify(responseObject));
				successCallback(responseObject);
			}
			Response.Error = function(responseObject) {
				debug && console.log('Api request Error: '+ JSON.stringify(responseObject));
				errCallback(responseObject);
			}
			
			owner.RESTRequest(APIURL,params, Response);
		}else if(driver == 'MUIAJAX'){
			owner.MuiAjax(APIURL,params,successCallback,errCallback,3);
		}
		
		
	};
	
	/*var onError = function(errcode){
	    switch(errcode){
	    case 'FAILED_NETWORK':
	        mui.toast('网络不佳');
	        break;
	    case 'INVALID_TOKEN':
	        wv_login.show();
	        break;
	    default:
	        console.log(errcode);
	    }
	};
	var params = {per:10, pageno:coms_current_pageno};
	mui.web_query('get_com_list', params, onSuccess, onError, 3);*/
	
//////////////////////////////////////////////////////////////
//-+-+-+-+-+-+-+-+-接口实现+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//////////////////////////////////////////////////////////////
	/**
	 * 获取短信验证码【通用】
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.getSmsCode = function(params,successCallback,errCallback){
		owner.getApi('public/getsmscode',params,successCallback,errCallback);
	};
	
	/**
	 * 获取注册短信验证码
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.getRegSmsCode = function(params,successCallback,errCallback){
		owner.getApi('user/regSmsCode',params,successCallback,errCallback);
	};
	
	/**
	 * 校验短信验证码
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.checkSmsCode = function(params,successCallback,errCallback){
		owner.getApi('public/checkSmsCode',params,successCallback,errCallback);
	};
	
	/**
	 * 用户注册
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.register = function(params,successCallback,errCallback){
		owner.getApi('User/register',params,successCallback,errCallback);
	};
	
	/**
	 * 注册用户信息
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.updateInfo = function(params,successCallback,errCallback){
		owner.getApi('user/updateinfo',params,successCallback,errCallback);
	};
	
	/**
	 * 用户登陆
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.login = function(params,successCallback,errCallback){
		owner.getApi('User/login',params,successCallback,errCallback);
	};
	
	/**
	 * 自动登陆
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.autoLogin = function(params,successCallback,errCallback){
		owner.getApi('User/autoLogin',params,successCallback,errCallback);
	};
	
	/**
	 * 获取用户基本信息
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.getUserInfo = function(params,successCallback,errCallback){
		owner.getApi('User/userinfo',params,successCallback,errCallback);
	};
	
	/**
	 * 发布作品
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.publishWorks = function(params,successCallback,errCallback){
		owner.getApi('Publish/works',params,successCallback,errCallback); 
	};
	
	/**
	 * 发布交易
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.publishTrade = function(params,successCallback,errCallback){
		owner.getApi('Publish/trade',params,successCallback,errCallback); 
	};
	
	/**
	 * 发布活动
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.publishEvent = function(params,successCallback,errCallback){
		owner.getApi('Publish/event',params,successCallback,errCallback); 
	};
	
	/**
	 * 发布需求
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.publishDemand = function(params,successCallback,errCallback){
		owner.getApi('Publish/demand',params,successCallback,errCallback); 
	};
	
	/**
	 * 获取发布列表
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.getPublishList = function(params,successCallback,errCallback){
		owner.getApi('Publish/getlist',params,successCallback,errCallback); 
	};
	
	/**
	 * 获取发布详情
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.getPublishDetail = function(params,successCallback,errCallback){
		owner.getApi('Publish/getdetail',params,successCallback,errCallback); 
	};
	
	/**
	 * 发布内容
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.addPublish = function(params,successCallback,errCallback){
		owner.getApi('Publish/create',params,successCallback,errCallback); 
	}; 
	
	/**
	 * 更新用户坐标
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.updateUserPos = function(params,successCallback,errCallback){
		owner.getApi('User/updatepos',params,successCallback,errCallback); 
	}; 
	
	/**
	 * 获取附近影人
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.NearbyMovier = function(params,successCallback,errCallback){
		owner.getApi('Nearby/movier',params,successCallback,errCallback); 
	}; 
	
	/**
	 * 获取附近影人--地图
	 * @param {Object} params POST参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} errCallback	失败回调函数
	 */
	owner.NearbyMovierMap = function(params,successCallback,errCallback){
		owner.getApi('Nearby/movierMap',params,successCallback,errCallback); 
	}; 
	
}(mui, window.Api= {}));