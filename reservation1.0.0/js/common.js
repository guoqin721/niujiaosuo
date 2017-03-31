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
//title改变
function wxSetTitle(title) {
    document.title = title;
    var mobile = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(mobile)) {
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.setAttribute('src', '../img/favicon.ico');
        var iframeCallback = function() {
            setTimeout(function() {
                iframe.removeEventListener('load', iframeCallback);
                document.body.removeChild(iframe);
            }, 0);
        };
        iframe.addEventListener('load', iframeCallback);
        document.body.appendChild(iframe);
    }
}
