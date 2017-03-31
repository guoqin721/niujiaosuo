$(function(){
  //受益人与受保人不为同一人
  var favoFormNum =$('.favoreeForm').get().length;
  $('.favoree').on('change',function() {
    if ( $('.favoree:checked').val() == 'favoreeY' ) {
      $('.favoreeY').css('display','none');
    }else {
      $('.favoreeY').css('display','block');
    }
  });

  //增加受益人
  $('.moreFavo').click(function(event) {
    console.log(favoFormNum);
  });

})
