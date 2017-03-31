$(function(){
  //常用通讯地址
  $('.pregnancy').on('change',function() {
    if ( $('.pregnancy:checked').val() == 'pregnancyY' ) {
      $('.confinementLi').css('display','block');
    }else {
      $('.confinementLi').css('display','none');
    }
  });

})
