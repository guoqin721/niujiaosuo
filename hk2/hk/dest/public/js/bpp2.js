$(function(){function e(e){var o="";$("#customerAge").empty();for(var t=0;t<=e;t++)o=c.clone(!1),o.val(t),o.html(t),$("#customerAge").append(o);$("#customerAge option").eq(20).attr("selected","selected")}var o=window.location.href,t=o.split("?")[1].split("=")[1].split("&")[0],i="FN",n=$(".radioMoney").val();$("#premium").html(n);var a=$(".radioYears:checked").val(),c=$("#customerAge option").clone(!1),r=75;e(r);var s=$("#customerAge").val();$("#customerAge").on("change",function(){s=$("#customerAge option:selected").val(),console.log("333",s)}),$(".radioMoney").on("input",function(){n=$(".radioMoney").val(),$("#premium").html(n)}),$(".radioMoney").on("change",function(){if((n=$(".radioMoney").val())<2e3){var e=waiting("金额不能少于2000");setTimeout(function(){e()},3e3)}if(n>1e7){var e=waiting("金额应<=10000000");setTimeout(function(){e()},3e3)}if(isNaN(n)){var e=waiting("请输入有效数字");setTimeout(function(){e()},3e3)}n=parseInt(n).toFixed(2),$(this).val(n),$("#premium").html(n)}),$(".radioYears").on("change",function(){a=$(".radioYears:checked").val(),r=5==a?75:70,e(r),s=$("#customerAge option:selected").val()}),$(".doPlan").click(function(e){if(n<2e3||isNaN(n)||n>1e7){var o=waiting("应为2000~10000000数字");setTimeout(function(){o()},3e3)}else window.location.href="planbook.html?customerSex="+i+"&customerSmoke=无关&customerYears="+a+"&customerAge="+s+"&insurance="+t+"&coverage="+n})});