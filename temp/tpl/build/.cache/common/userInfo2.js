/*TMODJS:{"version":2,"md5":"ad58a828e0b9d561395383876dee9fff"}*/
template('common/userInfo2',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,user=$data.user,$out='';$out+='<ul class="mui-table-view" style="margin-top: 0px;"> <li class="mui-table-view-cell mui-media userinfobar"> <a class="" id="myinfo"> <div class="mui-media-object mui-pull-left"><img src="images/demo/usericon_01.png"></div> <div class="mui-media-body"> <p class="mui-ellipsis"><span class="username">';
$out+=$escape(user.nickname);
$out+='</span><span class="progress ml10">完善度46%</span></p> <p class="mui-ellipsis ml10"><img src="images/icon_camera.png" style="width: 20px;"/> 3星</p> <p class="mui-ellipsis ml10"><span class="mui-icon mui-icon-person usericon_01"></span>摄影师、摄像师、化妆师</p> <p class="mui-ellipsis ml10"><span class="mui-icon mui-icon-phone usericon_02"></span>';
$out+=$escape(user.mobile);
$out+='</p> <p class="mui-ellipsis ml10"><span class="mui-icon mui-icon-location usericon_03"></span>北京 西城区</p> </div> </a> </li> </ul>';
return new String($out);
});