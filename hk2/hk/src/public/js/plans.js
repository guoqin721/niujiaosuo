$(function(){
  //customerInfo
  var _href = window.location.href;
  var _hrefArr = _href.split('?')[1].split('&');
  var hrefArr = [];
  var dataKey = [];
  var currentPosition = 0;
  var percent = 0;
  var slider = $("#spanSlide").get(0);
  var sliderDiv = $("#sliderDiv").get(0);
  var sliderBox = $("#slider").get(0);
    //对应数轴数的百分比
  var percentPer = 1 / ((sliderBox.offsetWidth - slider.offsetWidth) / sliderBox.offsetWidth) ;
  _hrefArr.forEach(function(c){
    c = c.split("=")[1]
    hrefArr.push(decodeURIComponent(c));
  });
  $('.customerSex').html(hrefArr[0]);
  $('.customerSmoke').html(hrefArr[1]);
  $('.customerAge').html(hrefArr[3] + '周岁');
  $('.guarDetaAges').html(hrefArr[2]);
  var insurance = hrefArr[4];
  var coverAge = hrefArr[5];
  var age = parseInt(hrefArr[3]);
  var period = parseInt(hrefArr[2]);

  //储蓄险的颜色
  if(insurance !== "pep" & insurance !== "pe") {
    $('.slideDown').css('display','none');
    $('.planbook').css('backgroundColor','#ff8f8f');
    $('.tele').css('background','#68bdf2');
    $('.footerTip').css('background','#ff8f8f');
    $('.guarantee1').css('display','none');
    $('.totalPrem').html('总保费');
    $('.sgpcbz').html('身故赔偿保证金额');
    $('.sgpczje').html('身故赔偿总金额');
    $('.xjjzbz').html('现金价值保证金额');
    $('.xjjzzje').html('现金价值总金额');
    $('.guarDetaCoverage').html((period * coverAge ).toFixed(2));
    $('.guarantee2 .customerSex').css('display','none');
  }else{
    $('.guarantee2').css('display','none');
    $('.guarDetaCoverage').html(100000);
  }
  //title改变
  if(insurance == "pep") {
    $('.companyInfo').html('友邦加裕倍安保加强版');
    wxSetTitle('友邦加裕倍安保加强版');
  } else if (insurance == "pe") {
    $('.companyInfo').html('友邦加裕倍安保');
    wxSetTitle('友邦加裕倍安保');
  } else if (insurance == "bpp2") {
    $('.companyInfo').html('友邦充裕未来储蓄计划');
    wxSetTitle('友邦充裕未来储蓄计划');
  } else if (insurance == "egs") {
    $('.companyInfo').html('保诚隽升储蓄计划');
    wxSetTitle('保诚隽升储蓄计划');
  }  else {
    $('.companyInfo').html('安盛安进储蓄计划');
    wxSetTitle('安盛安进储蓄计划');
  }

  var type = '';
  var ytpeSmoke = '';
  var typeSex = '';
  if (hrefArr[0] == "女") {
    typeSex = "F";
  } else {
    typeSex = "M";
  }
  if (hrefArr[1] == "吸烟") {
    ytpeSmoke = "Y";
  } else {
    ytpeSmoke = "N";
  }
  type  = typeSex + ytpeSmoke;

  //下拉年龄
  var slideStartAge = parseInt(hrefArr[3]) + 1 ;
  var slideStartYears = 0;

  $.ajax({
    url: 'http://api.fundusd.com/v1/insurance/plans/'+ insurance + '?period='+ period + '&age=' + age + '&type=' + type + '&coverage=' + coverAge ,
    type: 'GET',
    success:function(data){
      var b64 = new Base64();
      data = b64.decode(data.substring(2));
      data = JSON.parse(data);
      //确定初始年龄
      for(var key in data){
        dataKey.push(key);
        if (dataKey[0] == key) {
          slideStartAge = dataKey[0];
        }
      }
      slideStartYears = dataKey.length - 1;

      if (insurance !== "pep" & insurance !== "pe") {
        $('.guarDetaPremium').html(coverAge);
      } else {
        $('.guarDetaPremium').html(data[slideStartAge].total);
      }
      //判断是否小于18岁
      if (hrefArr[3] < 18) {
        $('.child').css('display','block');
      } else {
        $('.child').css('display','none');
      }
      //如果是加裕倍安保非加强版
      if (insurance == "pep") {
        $('.pep').css('display','block');
      } else {
        $('.pep').css('display','none');
      }

      selectCreate(data);
      dataChange(data);
      addReduce(slideStartYears,data);
      drag(data);

      //改变下拉数字
      downChange(dataKey,data);

    },
    error: function() {
      console.log('error')
    }
  });


  //加减滑块位置
  function addReduce (lengthNum,data) {
    var speed = 100 / lengthNum;
    //点击加号右滑
    $('.controller_bar_2').click(function(){
      if (percent < 100) {
        currentPosition++;
      } else {
        currentPosition = lengthNum;
      };
      slidePosition(currentPosition,data)
    })
    $('.controller_bar_1').click(function(){
      if (percent > 0) {
        currentPosition --;
      }else {
        currentPosition =  0;
      };
      slidePosition(currentPosition,data)
    });
  }
 //下拉列表数字改变滑块位置改变
  function slidePosition(currentPosition,data) {
    var speed = 100 / slideStartYears;
    percent = currentPosition * speed;
    percentPo = percent / percentPer;
    $('.ui-slider-range').css('width',percentPo + "%");
    $('.ui-slider-handle').css('left',percentPo + "%");
    dataChange(data);
  }


  //滑块变化数变,被保人你年龄变,数变
  function dataChange(data) {
    for (var key in data) {
      if (key == dataKey[currentPosition]) {
        $('#customerAge option').removeAttr('selected')
        //这里是有问题的
        $('#customerAge').val(key);
        if(insurance !== "pep" & insurance !== "pe") {
          $('#zj').html(data[key].bz2);
          $('#qj').html(data[key].total);
          $('#sg').html(data[key].bz1);
          $('#xj').html(data[key].total1);
        }else{
          $('#zj').html(data[key].total1);
          $('#qj').html(data[key].fbz1*0.2 + 20000);
          $('#sg').html(data[key].total1);
          $('#xj').html(data[key].total2);
        }
      }
    }
  }

  //拖动滑块
  function drag(data) {
    slider.addEventListener('touchstart',function(event){
      var touch = event.targetTouches[0];
      var pos = slider.offsetLeft;
      startX = touch.pageX;
      slider.addEventListener('touchmove', function(evt) {
        //var percent = 0;
        var touch2 = evt.targetTouches[0];
        endX = touch2.pageX;
        var X = pos + (endX - startX);
        if(X < 0) {
          X = 0;
        }
        if(X > sliderBox.offsetWidth - slider.offsetWidth) {
          X = sliderBox.offsetWidth - slider.offsetWidth;
        }
        percent = X / sliderBox.offsetWidth * 100;
        percentSlide = percent /100 * percentPer;
        slider.style.left = percent + '%';
        sliderDiv.style.width = percent + '%';
        //次数
        currentPosition = parseInt(slideStartYears * percentSlide);
          dataChange(data);

      },false);
      document.addEventListener('touchend',function(event){
      },false);
    },false);
  };
  //下拉改变数字
  function downChange(dataKey,data) {
    $('#customerAge').on('change',function(){
      currentValue = $(this).val();
      for (var i in dataKey) {
        if(dataKey[i] == currentValue) {
          currentPosition = i;
        }
      }
      slidePosition(currentPosition,data);
    })
  }
//生成select
  function selectCreate(data){
    var slideOption = $('#customerAge option').clone(false);
    var slideOptionDom = "";
    $('#customerAge').empty();
    for(var i in data){
      slideOptionDom = slideOption.clone(false);
      slideOptionDom.val(i);
      slideOptionDom.html(i);
      $('#customerAge').append(slideOptionDom);
    }
  }
});
