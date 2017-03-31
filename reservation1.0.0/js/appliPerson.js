$(function(){
  var natOptiDom = $('#nationOption').clone(false);
  $.ajax({
      url: "../json/country.json",
      type: "post",
      dataType:"json",
      async:true,
      success: function (data) {
        nationSelect(data);
    }
  });
  //国籍的确定
  function nationSelect(data) {
    var _length = data.length;
    var country = [];
    var _optionDom ='';
    $('#nationSelect').empty();
    for ( var i = 0 ; i < _length ; i++) {
        country.push(data[i].cn);
        _optionDom = natOptiDom.clone(false);
        _optionDom.html(data[i].cn);
        _optionDom.val(data[i].cn);
        $('#nationSelect').append(_optionDom);
    }
    $('#nationSelect option').eq(0).val('');
  }
  //常用通讯地址
  $('.IDadress').on('change',function() {
    if ( $('.IDadress:checked').val() == 'IDadressN' ) {
      $('#postIDadress').css('display','block');
    }else {
      $('#postIDadress').css('display','none');
    }
  });
  $('.otherInsurance').on('change',function() {
    if ( $('.otherInsurance:checked').val() == 'Y' ) {
      $('.othInsurCont').css('display','block');
    }else {
      $('.othInsurCont').css('display','none');
    }
  });

})
