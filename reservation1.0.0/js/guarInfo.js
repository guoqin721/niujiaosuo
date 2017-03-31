$(function(){
  //受保人选择
  $('.readed').click(function(event) {
    $('.state-box').css('display','none');
  });
  $('.appli-box').click(function(event) {
    $('.appli-box').css('color','#9B9B9B');
    $('.appli-box').css('background','#fff');
    $(this).css('background','#69B2F2');
    $(this).css('color','#fff');
  });
  //点击确定
  $('.comfirm-box').click(function(event) {
    var appliPerson = $('.appli-box input:checked').val();
    if (typeof(appliPerson) == 'undefined') {
      //运行
      var dd = waiting("请选择受保人！");
      //自杀
      setTimeout(function () {
        dd();
      }, 3000);
    }else {
      window.location.href = 'appliPerson.html';
    }
  });
  //点击下一步
  $('.next-btn').click(function(event) {
    var appliPerson = $('.appli-box input:checked').val();
    console.log(appliPerson)
    if (typeof(appliPerson) == 'undefined') {
      //运行
      var dd = waiting("请选择受保人！");
      //自杀
      setTimeout(function () {
        dd();
      }, 3000);
    }else {
      window.location.href = 'appliPerson.html';
    }
  });
})
