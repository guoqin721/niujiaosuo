$(function () {
  var _href = window.location.href;
  var insurance = _href.split('?')[1].split('=')[1].split('&')[0];
  var customerSex = $('.radioSex:checked').val();
  var customerSmoke = "无关";
  var coverAge = $('.radioMoney:checked').val();
  var customerYears =$('.radioYears:checked').val();
  var slideOption = $('#customerAge option').clone(false);
  var selectLength = 75;
  createSelect(selectLength);
  var customerAge = $('#customerAge').val();
  if(insurance == "bpp2") {
    $('.companyInfo').html('友邦充裕未来储蓄计划');
    $('title').html('友邦充裕未来储蓄计划');
  } else if (insurance == "egs") {
    $('.companyInfo').html('保诚隽升储蓄计划');
    $('title').html('保诚隽升储蓄计划');
  }  else {
    $('.companyInfo').html('安盛安进储蓄计划');
    $('title').html('安盛安进储蓄计划');
  }
  total();
  //输入
  $('#customerAge').on('change',function(){
    customerAge = $('#customerAge option:selected').val();
    console.log("333",customerAge);
  })
  $('.radioSex').on('change',function(){
    customerSex = $('.radioSex:checked').val();
    total();
  })
  $('.radioMoney').on('change',function(){
    coverAge = $('.radioMoney:checked').val();
    total();
  })
  $('.radioYears').on('change',function(){
    customerYears =$('.radioYears:checked').val();
    if (customerYears == 5) {
       selectLength = 75;
    } else {
      selectLength = 70;
    }
    createSelect(selectLength);
    customerAge = $('#customerAge option:selected').val();
    total();
  })
  $('.doPlan').click(function(event) {
    window.location.href = "planbook.html?customerSex=" + customerSex + "&customerSmoke=" + customerSmoke + "&customerYears=" + customerYears + "&customerAge=" + customerAge + "&insurance=" + insurance  +'&coverage=' + coverAge;
  });
  //更新数据
  function total(){
    var type = '';
    if (customerSex == "女") {
      type = "FN";
    } else {
      type = "MN";
    }
    $.ajax({
      url: 'http://api.fundusd.com/v1/insurance/plans/' + insurance +'?coverage=' + coverAge + '&period='+ customerYears + '&type=' + type + '&age=' + customerAge,
      type: 'GET',
      success:function(data){
        console.log(data);
        $('#premium').html(data[parseInt(customerAge) + 1].money);
      },
      error:function(){
        console.log("error");
      }
    });
  }
  //select的长度
  function createSelect(selectLength){
    var slideOptionDom = "";
    $('#customerAge').empty();
    for(var i = 0; i <= selectLength; i++){
      slideOptionDom = slideOption.clone(false);
      slideOptionDom.val(i);
      slideOptionDom.html(i);
      $('#customerAge').append(slideOptionDom);
    }
    $('#customerAge option').eq(20).attr('selected','selected');
  }
})
