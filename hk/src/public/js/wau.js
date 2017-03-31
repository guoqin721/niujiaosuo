$(function () {
  var _href = window.location.href;
  var insurance = _href.split('?')[1].split('=')[1].split('&')[0];
  var customerSex = 'FN';
  var customerSmoke = "无关";
  var coverAge = $('.radioMoney').val();
  $('#premium').html(coverAge);
  var customerYears =$('.radioYears:checked').val();
  var slideOption = $('#customerAge option').clone(false);
  var selectLength = 60;
  createSelect(selectLength);
  var customerAge = $('#customerAge').val();
  //输入
  $('#customerAge').on('change',function(){
    customerAge = $('#customerAge option:selected').val();
  })
  $('.radioSex').on('change',function(){
    customerSex = $('.radioSex:checked').val();
  })
  $('.radioMoney').on('change',function(){
    coverAge = $('.radioMoney').val();
    if (coverAge < 2000) {
      //运行
      var dd = waiting("金额不能少于2000");
      //自杀
      setTimeout(function () {
        dd();
      }, 3000);
    }
    if (coverAge > 10000000) {
      //运行
      var dd = waiting("金额应<=10000000");
      //自杀
      setTimeout(function () {
        dd();
      }, 3000);
    }
    if (isNaN(coverAge)) {
      //运行
      var dd = waiting("请输入有效数字");
      //自杀
      setTimeout(function () {
        dd();
      }, 3000);
    }
    coverAge=parseInt(coverAge).toFixed(2);
    $(this).val(coverAge);
    $('#premium').html(coverAge);
  })
  $('.radioYears').on('change',function(){
    customerYears =$('.radioYears:checked').val();
    if (customerYears == 5) {
       selectLength = 60;
    } else {
      selectLength = 60;
    }
    createSelect(selectLength);
    customerAge = $('#customerAge option:selected').val();
  })
  $('.doPlan').click(function(event) {
    if (coverAge < 2000 || isNaN(coverAge) || coverAge > 10000000) {
      //运行
      var dd = waiting("应为2000~10000000数字");
      //自杀
      setTimeout(function () {
        dd();
      }, 3000);
    } else {
      window.location.href = "planbook.html?customerSex=" + customerSex + "&customerSmoke=" + customerSmoke + "&customerYears=" + customerYears + "&customerAge=" + customerAge + "&insurance=" + insurance  +'&coverage=' + coverAge;
    }
  });
  //更新数据
  function total(){
    $.ajax({
      url: 'http://api.fundusd.com/v1/insurance/plans/' + insurance +'?coverage=' + coverAge + '&period='+ customerYears + '&type=' + customerSex + '&age=' + customerAge,
      type: 'GET',
      success:function(data){
        if (insurance !== "pep" & insurance !== "pe") {
          $('#premium').html(coverAge);
        } else {
          $('#premium').html(data[parseInt(customerAge) + 1].money);
        }
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
