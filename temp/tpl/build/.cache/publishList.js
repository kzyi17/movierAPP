/*TMODJS:{"version":23,"md5":"24e79722fecadf285fc8f91cc1213207"}*/
template('publishList',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,publish_id=$data.publish_id,nickname=$data.nickname,title=$data.title,description=$data.description,i=$data.i,photos=$data.photos,_url=$data._url,hits=$data.hits,collects=$data.collects,comments=$data.comments,$out='';$out+='<li class="mui-table-view-cell" id="';
$out+=$escape(publish_id);
$out+='"> <div class="userbar"> <div class="mui-pull-left u_icon"> <img src="images/demo/icon_msg_01.png"> </div> <div class="mui-pull-left ml05 mt05"><span class="mui-icon iconfont icon-sex-woman"></span></div> <div class="mui-pull-left ml05 mt05"> <p class="mui-ellipsis u_name">';
$out+=$escape(nickname);
$out+='</p> <p class=""><img src="images/icon_camera.png" style="width: 20px;"/> <span class="mui-icon icon-star"></span><span class="mui-icon icon-star"></span><span class="mui-icon icon-star"></span></p> </div> <div class="mui-pull-right mui-text-right"> <p class="mui-ellipsis"><span class="u_cost">100</span> 元/天</p> <p class="mui-ellipsis">朝阳区 距您2334km</p> </div> </div> <div class="infobar"> <p class="mui-ellipsis i_title">';
$out+=$escape(title);
$out+='</p> <p class="mui-ellipsis-2">';
$out+=$escape(description);
$out+='</p> </div> <ul class="photobar mt10"> ';
for(i = 0; i < photos.length; i ++) {
$out+=' <li><img src="images/60x60.gif" data-lazyload="';
$out+=$escape(_url + photos[i].photo_folder + photos[i].photo_name + '.' + photos[i].photo_type);
$out+='" onload="lazyload(this)"/></li> ';
}
$out+=' </ul> <div class="visitorbar mt05"> <div class="mui-pull-left v_ucion"> <img src="images/demo/icon_user_01.png"/> <img src="images/demo/icon_user_01.png"/> <img src="images/demo/icon_user_01.png"/> <img src="images/demo/icon_user_01.png"/> <img src="images/demo/icon_user_01.png"/> <img src="images/demo/icon_user_01.png"/> <img src="images/demo/icon_user_01.png"/> <img src="images/demo/icon_user_01.png"/> <img src="images/demo/icon_user_01.png"/> </div> <div class="mui-pull-right">';
$out+=$escape(hits);
$out+='人看过 <span class="mui-icon mui-icon-eye"></span></div> </div> <div class="linkbar mt10"> <button class="mui-btn mui-btn-link hitsinfo"><span class="mui-icon iconfont icon-like-2"></span> ';
$out+=$escape(collects);
$out+='</button> <button class="mui-btn mui-btn-link hitsinfo ml10"><span class="mui-icon iconfont icon-comment"></span> ';
$out+=$escape(comments);
$out+='</button> <button class="mui-btn mui-btn-link hitsinfo ml10"><span class="mui-icon iconfont icon-share"></span></button> <button class="mui-btn my-btn-im mui-pull-right">聊一聊</button> </div> </li>';
return new String($out);
});