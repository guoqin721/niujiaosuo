//显示等待画面
function waiting(text){
   var waitDom = $('<div class="waiting_box"><div class=""></div><p>'+text+'</p></div>');
   $("body").append(waitDom);
   var killMe = function(){
     waitDom.remove();
   }
   //返回删除方法
   return killMe;
}
