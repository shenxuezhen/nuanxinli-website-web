/**
 * Created by Administrator on 2016/3/17.
 */

var isThirdLogin = false;
//提交用户信息
$("#userLogin").click(function () {
    //构造数据
    var user = {};
    user["username"] = $(".username").val().trim();
    user["password"] = $(".pwd").val();
    login(user)
});
//调登录接口
function login(user) {
    $.ajax({
        url: "public/user/login",
        type: "post",
        dataType: "json",
        data: JSON.stringify(user),
        contentType: "application/json",
        success: function (obj) {
            /*if($.cookie){
                //不是新用户
                window.location.href="solutionDream_detail.html";
            }else {
                //新用户
                $.cookie("username","obj.username");
                var username=obj.username;
                //判断用户名是否是是手机号登录
                if((typeof username)=="Number"){
                    var $wid=$(window).width();
                    var $hei=$(window).height();
                    var str="<div id='' class='tel-login'><p><span class='close'>×</span></p> <img src='../img/dream/logining.png'> <div>小暖爱你！</div> <div><p>手机号：</p> <p class='tel'>15075325453</p></div> <div>小暖绝对不会向他人透露您的手机号，仅用于发送通知</div> <div id='openEnvelope'>领取红包</div></div>";
                    $("body").append(str);
                    //遮板
                    var box="<div id='cover'></div>";
                    $("body").append(box);
                    $("#cover").css("width",$wid);
                    $("#cover").css("height",$hei);
                }else {
                    var $wid=$(window).width();
                    var $hei=$(window).height();
                    var str="<div class='redLoading'><p><span class='close'>×</span></p> <div class='img'><img src='../img/dream/redLoading.png'><span>小暖爱你！</span></div> <input type='text' placeholder='请输入手机号码'> <div id='openEnvelope' class='text'>领取红包</div> </div>";
                    $("body").append(str);
                    //遮板
                    var box="<div id='cover'></div>";
                    $("body").append(box);
                    $("#cover").css("width",$wid);
                    $("#cover").css("height",$hei);
                }
            }*/
            //究竟是判断手机号还是判断红包，无语了
            /*//先判断是否用手机号登陆的
            $.ajax({
                url:"/public/coupon/checkstate",
                type:"get",
                dataType:"json",
                contentType: "application/json",
                success:function(data){
                    if(data.code=='false'){

                    }
                }
            });*/
            self.location = document.referrer;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText);
        }
    })
}
//第三方登录
function thirdLogin(user) {
    console.log(JSON.stringify(user));
    $.ajax({
        url: "public/user/login",
        type: "post",
        dataType: "json",
        data: JSON.stringify(user),
        contentType: "application/json",
        success: function (obj) {
            self.location = document.referrer;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //登录不成功去注册
            isThirdLogin = true;
            zf();
        }
    })
}

//第三方登录注册
function thirdRegist(dateUserName){
    var dataa = {};
    dataa.openId =
    dataa.username = dataUserName;
    dataa = JSON.stringify(dataa);

    console.log("*******************")
    console.log(dataa)
    $.ajax({
        url: "/public/user/regist",
        type: "post",
        dataType: "json",
        data: dataa,
        success: function (obj) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
        }
    })
}

//注册
var code = {};
//获取用户信息
function userInfo() {
    $.ajax({
        url: "/public/user/info",
        type: "get",
        dataType: "json",
        success: function (obj) {
            console.log("################");
            console.log(obj);
            var dataUserName = obj.username;
            if(isThirdLogin){
                thirdRegist(dateUserName);
            }else{
                tj(dataUserName);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
        },
        headers: {
            "sid": "sid"
        }
    })
}
//注册获取验证码
function huoquyanzheng() {
    $("#send-code").click(function () {
        var This = $(this);
        var data = {};
        var time1 = null, time2 = null;
        var number = 30;
        data.contact = $("#userPhone").val();
        data = JSON.stringify(data);
        $.ajax({
            url: "/public/user/verification/regist",
            type: "post",
            dataType: "json",
            data: data,
            contentType: "application/json",
            success: function (obj) {
                $("#send-code").unbind("click");
                code.code = obj.verifycode;
                This.css({borderColor: "#ccc", color: "#ccc"});
                time1 = setInterval(function () {
                    number -= 1;
                    if (number <= 0) {
                        clearInterval(time1);
                        This.css({borderColor: "fd9281", color: "fd9281"});
                        This.val(30 + "s");
                        huoquyanzheng();
                    } else {

                        This.val(number + "s");
                    }
                }, 1000);
                console.log("((((((((((((((((")
                console.log(obj)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
            }
        })
    })
}
huoquyanzheng();
//登录自动分配的用户
function zf() {
    $.ajax({
        url: "/public/user/generate",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        success: function (obj) {
            var data = {};
            data.username = obj.username;
            data.password = obj.password;
            data = JSON.stringify(data);
            zd(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
        }
    })
}
//自动登录
function zd(data) {
    $.ajax({
        url: "/public/user/login",
        type: "post",
        dataType: "json",
        data: data,
        contentType: "application/json",
        success: function (obj) {
            userInfo()
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
        }
    })
}
//提交信息
function tj(dataUserName) {
    var dataa = {};
    var code0 = $("#userCode").val();
    dataa.registName = $("#userPhone").val();
    dataa.password = $("#userpassword").val();
    dataa.username = dataUserName;
    dataa.source = "web";
    dataa = JSON.stringify(dataa);
    console.log("*******************");
    console.log(dataa)
    if (code.code == code0) {
        $.ajax({
            url: "/public/user/regist",
            type: "post",
            dataType: "json",
            data: dataa,
            success: function (obj) {
                alert("注册成功！")
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
            }
        })
    } else {
        alert("验证码不正确");
    }
}

//点击注册
$("#userRegister").click(function () {
    zf();
})
//退出登录
$("#outLongin").click(function () {
    $.ajax({
        url:"/public/logout",
        type:"post",
        dataType:"json",
        success:function(obj){
            window.location.href='index.html';
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert(XMLHttpRequest.status+"："+XMLHttpRequest.responseText);
        }
    });
})
//QQ第三方登录
function QQLogin(){
    var param = window.location.hash.substring(1);
    var accessToken = toParamMap(param).access_token;
    if(accessToken){
        $.ajax({
            url:"https://graph.qq.com/oauth2.0/me?access_token="+accessToken,
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "callback",//自定义的jsonp回调函数名，默认未jquery自动生成的随机函数名，也可以写“?”jquery会自动处理
            success: function (date) {
                //获取到openid去登陆，如果登录失败去注册
                var user = {};
                user.username = date.openid;
                thirdLogin(user);
            }
        });
    }
}

//weixin第三方登录
$('#weixinLogin').click(function () {
    open("https://open.weixin.qq.com/connect/qrconnect?appid=wx3a71f0cf529bd251&redirect_uri=wwwtest.nuanxinli.com&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect")
})

function toParamMap(str){
    var map = {};
    var segs = str.split("&");
    for(var i in segs){
        var seg = segs[i];
        var idx = seg.indexOf('=');
        if(idx < 0){
            continue;
        }
        var name = seg.substring(0, idx);
        var value = seg.substring(idx+1);
        map[name] = value;
    }
    return map;
}

