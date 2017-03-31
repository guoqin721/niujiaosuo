$(function () {
  var _href = window.location.href;
  var insurance = _href.split('?')[1].split('=')[1].split('&')[0];
  var customerSex = $('.radioSex:checked').val();
  var customerSmoke = $('.radioSmoke:checked').val();
  var customerYears =$('.radioYears:checked').val();
  var slideOption = $('#customerAge option').clone(false);
  var selectLength = 65;
  selLength (customerYears);
  createSelect(selLength (customerYears));
  var customerAge = $('#customerAge').val();
  total();
  //储蓄险的颜色
  if(insurance == "pep") {
    $('.companyInfo').html('友邦加裕倍安保加强版');
    $('title').html('友邦加裕倍安保加强版');
  } else if (insurance == "pe") {
    $('.companyInfo').html('友邦加裕倍安保');
    $('.insuranceInfo').html('友邦加裕倍安保');
    $('title').html('友邦加裕倍安保');
    $('.stronger').css('display','none');
  }
  if (customerAge <= 16) {
    console.log(33333);
    $('.radioSmokeN').attr('checked','checked');
    $('.radioSmokeY').attr('disabled','disabled');
    $('.radioSmokeY').parent().click(function(){
    });
  } else {
    $('.radioSmokeY').removeAttr('disabled','disabled');
  }
  //输入
  $('#customerAge').on('change',function(){
    customerAge = $('#customerAge option:selected').val();
    if (customerAge <= 16) {
      $('.radioSmokeN').attr('checked','checked');
      $('.radioSmokeY').attr('disabled','disabled');
      $('.radioSmokeY').parent().click(function(){
      });
    } else {
      $('.radioSmokeY').removeAttr('disabled','disabled');
    }
    total();
  })
  $('.radioSex').on('change',function(){
    customerSex = $('.radioSex:checked').val();
    total();
  })
  $('.radioSmoke').on('change',function(){
    customerSmoke = $('.radioSmoke:checked').val();
    total();
  })
  $('.radioYears').on('change',function(){
    customerYears =$('.radioYears:checked').val();
    createSelect(selLength (customerYears));
    customerAge = $('#customerAge option:selected').val();
    total();
  })
  $('.doPlan').click(function(event) {
    if (customerSmoke =="吸烟" & customerAge <= 16) {
      //运行
      var dd = waiting("未成年人不能吸烟");
      //自杀
      setTimeout(function () {
        dd();
      }, 2000);
    } else {
      window.location.href = "planbook.html?customerSex=" + customerSex + "&customerSmoke=" + customerSmoke + "&customerYears=" + customerYears + "&customerAge=" + customerAge + "&insurance=" + insurance;
    }
  });
  $('.footer1').click(function(event) {
    if(insurance == "pep") {
      window.location.href = "advantageZJ.html";
    } else if (insurance == "pe") {
      window.location.href = "advantageQJ.html";
    }

  });
  //更新数据
  function total(){
    var type = '';
    var ytpeSmoke = '';
    var typeSex = '';
    if (customerSex == "女") {
      typeSex = "F";
    } else {
      typeSex = "M";
    }
    if (customerSmoke == "吸烟") {
      ytpeSmoke = "Y";
    } else {
      ytpeSmoke = "N";
    }
    type  = typeSex + ytpeSmoke;
    $.ajax({
      url: 'http://api.fundusd.com/v1/insurance/plans/' + insurance +'?period='+ customerYears + '&age=' + customerAge + '&type=' + type,
      type: 'GET',
      success:function(data){
        var b64 = new Base64();
        data = b64.decode(data.substring(2));
        data = JSON.parse(data);
        $('#premium').html(data[parseInt(customerAge) + 1].total);
      },
      error:function(){
        console.log("error");
      }
    });
  }
  $('.coverageTip').click(function(event) {
    $('.covTipCont').css('display','block');
    $('.close').click(function(event) {
      /* Act on the event */
      $('.covTipCont').css('display','none');
    });
  });
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
  //selectLength的默认值
  function selLength (customerYears) {
    if (customerYears == 10) {
      selectLength = 65;
    } else if (customerYears == 18){
      selectLength = 62;
    } else {
      selectLength = 55;
    }
    return selectLength;
  }
})
