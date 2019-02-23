

$(window).resize(function () {

    if ($('#All-box').width() <= 1980 && $('#All-box').width() >= 1200) {
        var num1 = $('#All-box').width();
        var num = (num1 - 1980) / 2;
        $('.autoCenter1').css("marginLeft", num + "px");
    }
});


$(function () {
    if (($('#All-box').width()) <= 1200) {
        $('.autoCenter1').css("marginLeft", ((1200 - 1980) / 2) + "px");
        // $('.autoCenter1').css("overflow", "hidden");
    } else if (($('#All-box').width()) <= 1980) {
        var num1 = $('#All-box').width();
        var num = (num1 - 1980) / 2;
        $('.autoCenter1').css("marginLeft", num + "px");
    }
});

//2 阶段切换
$('.mslider').each(function (i,e) {
    $(e).click(function () {
        $('.mslider').removeClass('mactive');
        $(e).addClass('mactive');
        $('.mcont').css('display','none');
        $('.mcont').eq(i).css('display','block');
    });
});


// //获取手机号码
// var phone = $(".dianhua").val();
// var student = $('.stu-name').val();
// var code = $('.code').val();
// var source = $('.source').val();
// 手机dianhua 姓名:stu-name 验证码:code
// 获取验证码按钮函数senddata()  提交函数tiaojiao()
// 倒计时 #btnSend

var InterValObj1; //timer变量，控制时间
var count1 = 60; //间隔函数，1秒执行
var num;//当前剩余秒数
var code1 = ""; //验证码
var codeLength = 6;//验证码长度
function senddata() {
    var phone = $(".dianhua").val();
    var student = $('.stu-name').val();

    if (student != "") {
        if (phone != "") {
            //获取手机号码
            var phone = $(".dianhua").val();
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: '/v1/sms/sendSms', //目标地址
                data: {"phone": phone},
                // error: function (res) { },
                success: function (res) {
                    // alert("发送成功");
                    layer.open({
                        type: 1
                        ,offset: 'auto' //具体配置参考：offset参数项
                        ,content: '<div style="padding: 20px 80px;">' +res.msg+ '</div>'
                        ,btn: '关闭'
                        ,btnAlign: 'c' //按钮居中
                        ,shade: 0 //不显示遮罩
                        ,yes: function(){
                            layer.closeAll();
                        }
                    });
                }
            });
            num = count1;
            // var dealType; //验证方式
            // var uid=$("#uid").val();//用户uid
            // if ($("#phone").attr("checked") == true) {
            //     dealType = "phone";
            // }
            // else {
            //     dealType = "email";
            // }
//产生验证码
            for (var i = 0; i < codeLength; i++) {
                code1 += parseInt(Math.random() * 9).toString();
            }
//设置button效果，开始计时
            $("#btnSend").attr("disabled", "true");
            $("#btnSend").val(+num + "秒再获取");
            InterValObj1 = window.setInterval(shijian, 1000); //启动计时器，1秒执行一次
        } else {
            layer.open({
                type: 1
                ,offset: 'auto' //具体配置参考：offset参数项
                ,content: '<div style="padding: 20px 80px;">请输入你的手机号</div>'
                ,btn: '关闭'
                ,btnAlign: 'c' //按钮居中
                ,shade: 0.3 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    } else {
        layer.open({
            type: 1
            ,offset: 'auto' //具体配置参考：offset参数项
            ,content: '<div style="padding: 20px 80px;">请输入你的姓名</div>'
            ,btn: '关闭'
            ,btnAlign: 'c' //按钮居中
            ,shade: 0.3 //不显示遮罩
            ,yes: function(){
                layer.closeAll();
            }
        });
    }
}
//timer处理函数
function shijian() {
    if (num == 0) {
        window.clearInterval(InterValObj1);//停止计时器
        $("#btnSend").removeAttr("disabled");//启用按钮
        $("#btnSend").val("重新发送验证码");
        code1 = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
    }
    else {
        num--;
        $("#btnSend").val(+num + "秒再获取");
    }
}



//提交
function tijiao() {
    // if()
    var phone = $(".dianhua").val();
    var student = $('.stu-name').val();
    var code = $('.code').val();
    var source = $('.source').val();


    if (student != "") {
        if (code != "") {
            if (phone != "") {
                $('.btn-ti').attr("disabled");
                $('.btn-box').css("background","#ccc");

                $.ajax({
                    type: "POST", //用POST方式传输
                    dataType: "JSON", //数据格式:JSON
                    url: '/v1/customer/addCustomer', //目标地址
                    // data: "dealType=" + dealType +"&uid=" + uid + "&code=" + code,
                    data: {
                        "name": student,
                        "phone": phone,
                        "code": code,
                        "source": source,
                    },
                    error: function (error) {
                        console.log(error);
                        $('.btn-ti').removeAttr("disabled");
                        $('.btn-box').css("background","#3ca6f8");
                    },
                    success: function (msg) {
                        // alert("发送成功");

                        $('.btn-ti').removeAttr("disabled");
                        $('.btn-box').css("background","#3ca6f8");

                        layer.open({
                            type: 1
                            ,offset: 'auto' //具体配置参考：offset参数项
                            ,content: '<div style="padding: 20px 80px;">'+ msg.msg+ '</div>'
                            ,btn: '关闭'
                            ,btnAlign: 'c' //按钮居中
                            ,shade: 0.3 //不显示遮罩
                            ,yes: function(){
                                layer.closeAll();
                            }
                        });
                    }
                });
            } else {
                layer.open({
                    type: 1
                    ,offset: 'auto' //具体配置参考：offset参数项
                    ,content: '<div style="padding: 20px 80px;">手机号码不能为空哦!</div>'
                    ,btn: '关闭'
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0.3 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
        } else {
            layer.open({
                type: 1
                ,offset: 'auto' //具体配置参考：offset参数项
                ,content: '<div style="padding: 20px 80px;">请输入验证码!</div>'
                ,btn: '关闭'
                ,btnAlign: 'c' //按钮居中
                ,shade: 0.3 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
    } else {
        layer.open({
            type: 1
            ,offset: 'auto' //具体配置参考：offset参数项
            ,content: '<div style="padding: 20px 80px;">请输入您的姓名!</div>'
            ,btn: '关闭'
            ,btnAlign: 'c' //按钮居中
            ,shade: 0.3 //不显示遮罩
            ,yes: function(){
                layer.closeAll();
            }
        });
    }


}















