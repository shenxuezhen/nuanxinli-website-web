/**
 * Created by Administrator on 2016/3/22.
 */
//登录注册和个人主页的转换
//    function PERSONAl(){
//        var personalMessage= $('<div class="personal" ><div class="personalImg"><img class="personalIamge" src=""/></div><div class="personalName"><a href="guestPage.html">谬论老师</a></div></div>');
//        $('.login').html(personalMessage);
//    }
//    //读取cookies
//    function getCookie(name){
//        var arr=unescape(document.cookie).split('; ');
//        for (var i = 0; i < arr.length; i++) {
//            var arr2=arr[i].split('=');
//            if (arr2[0]==name) {
//                return arr2[1];
//            };
//        };
//        return null;
//    }
//    var sid= getCookie(sid);
//    if(sid!=null){
//        PERSONAl();
//    }else{};
(function(doc, exports){
    exports.preloadingImages = function(images){
        var i,
            img,
            images = images || [];
        for(i = 0; i < images.length; i++){
            img = new Image();
            img.src = images[i];
        }
    };
})(document, this);
function viewLocalImg(fileId, imgId){
    return function(){
        document.getElementById(fileId).onchange = function(evt) {
            // 如果浏览器不支持FileReader，则不处理
            if (!window.FileReader) return;
            var files = evt.target.files;
            for (var i = 0, f; f = files[i]; i++) {
                if (!f.type.match('image.*')) {
                    continue;
                }
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {
                        // img 元素
                        document.getElementById(imgId).src = e.target.result;
                    };
                })(f);
                reader.readAsDataURL(f);
            }
        }
    };
}






(function (dom, exports) {
    function Event() {
    }
    Event.prototype.auto = function () {
        //导航栏点击样式
        $(".tab_ul li").on("click",function () {
            $(".tab_ul li").removeClass("active");
            $(this).addClass("active");
        });
        //放大a标签的可点击区域
        $(".event-auto-click").on("click", function (e) {
            //防止点击a标签时重复跳转
            if (e.target.tagName != "A") {
                //这里写[0]的目的并不是为了取第一个，而是将jquery dom转换成js原生dom，这样才能触发click事件
                //$(this).find("a.event-auto-click-target:first")[0].click();
            }
        });
        //日历控件
        //在需要使用日历的地方增加event-date-selector样式，然后随便添加一个id属性，和其他日历的id不重复即可
        $(".event-date-selector").each(function (i, n) {
            laydate({
                elem: '#'.concat(n.id), //需显示日期的元素选择器
                event: 'click', //触发事件
                format: 'YYYY-MM-DD hh:mm:ss', //日期格式
                istime: true, //是否开启时间选择
                isclear: false, //是否显示清空
                istoday: true, //是否显示今天
                issure: true, //是否显示确认
                festival: true, //是否显示节日
                validate: false, //是否进行格式检查
                min: '1900-01-01 00:00:00', //最小日期
                max: '2099-12-31 23:59:59', //最大日期
                start: laydate.now(),    //开始日期
                fixed: false, //是否固定在可视区域
                zIndex: 99999999, //css z-index
                choose: function (dates) { //选择好日期的回调
                    console.log(dates);
                }
            });
        });
        //选择框
        $(".nxl-lib-tips").each(function (i, n) {
            var pn = this.parentNode,
                s = this;
            //切换元素
            $(n).find("td").on("click", function (e) {
                pn.childNodes[0].nodeValue = this.innerText;
                //请求路径
                console.log(n.dataset.api);
                //请求参数
                console.log(this.dataset.params);
            });
            //显示/隐藏选择框
            $(pn).on("click", function (e) {
                if (s.getAttribute("style") == "display: none;") {
                    s.setAttribute("style", "display: table;");
                } else {
                    s.setAttribute("style", "display: none;");
                }
            });
        });
        //登录/注册tab切换
        var $prevTab = $(".login-content .right div.tab");  //记录上一个选中的tab
        var $tabContent = $(".login-content .right>.wrap>div.opt");  //tab内容区域
        $(".login-content .right div.tab").on("click", function (e) {
            //已经选中直接跳过
            //if (this.className.indexOf(" on")>0) {
            //    return;
            //}
            //移除上一个选中的tab样式
            $prevTab.removeClass("on");
            //记录当前选中tab
            $prevTab = $(this);
            //添加选中样式
            $prevTab.addClass("on");
            //tab内容区域调整
            if (this.className.indexOf(" login") > 0) {
                //登录
                $tabContent.removeClass("register");
            } else {
                //注册
                $tabContent.addClass("register");
            }
        });
       /* //解梦
        $(".admonition>.dream").on("click",function(){
            debugger;
            var This=$(this);
            //判断是否登录
            if($("#login").html()=="登录"){
                var $wid=$(window).width();
                var $hei=$(window).height();
                var str="<div id='userLogin' class='login_window'><p class='tip'><span class='a1'>登录</span><span class='a2 close'>×</span></p><table><tr class='t1'> <td colspan='3'> <img src='../img/dream/username.png'> <input class='username' type='text' placeholder='邮箱/手机号'> </td> </tr> <tr class='t1'> <td colspan='3'> <img src='../img/dream/password.png'> <input class='pwd' type='password' placeholder='密码'> </td> </tr> <tr class='t2'> <td class='d1' colspan='3'>忘记密码 </td> </tr> <tr class='t2'> <td class='d2' colspan='3'> <div id='userLogin'>登录</div> </td> </tr> <tr class='t2'> <td class='d3' colspan='3'> <span></span> <div>第三方登录 </div> <span></span> </td> </tr> <tr class='t3'> <td> <img src='../img/dream/weixin.png'> </td> <td> <img src='../img/dream/qq.png'> </td> <td> <img src='../img/dream/weibo.png'> </td> </tr> </table></div>";
                $("body").append(str);
                //遮板
                var box="<div id='cover'></div>";
                $("body").append(box);
                $("#cover").css("width",$wid);
                $("#cover").css("height",$hei);
                //遮板禁止滑动
                $(document.body).toggleClass("html-body-overflow");
                //标志该用户已不是第一次登陆
                //$.cookie("username","obj.username");
                //究竟是判断手机号还是判断红包，无语了
                //先判断是否用手机号登陆的
                /!*$.ajax({
                    url:"/public/coupon/checkstate",
                    type:"get",
                    dataType:"json",
                    contentType: "application/json",
                    success:function(data){
                    }
                });*!/
            }/!*else {
                //说明已经登录
                //判断用户是不是手机号登录是不是用手机号登录
                /!*$.ajax({
                    url:"/public/coupon/checkstate",
                    type:"get",
                    dataType:"json",
                    contentType: "application/json",
                    success:function(data){
                        ///public/coupon/checkstate 该接口判断的是是否领过红包
                        if(data.code=='false'){

                        }
                    }
                });*!/
            }*!/
        });
        //领取红包
        $("#openEnvelope").on("click",function(){
            var This=$(this);
            This.parentNode.css("display","none");
            var $wid=$(window).width();
            var $hei=$(window).height();
            var str="<div class='receive'><p><span class='close'>×</span></p><img src='../img/dream/receive.png'><div>￥19</div><div><p>解梦券！</p><p>有效期：7天</p></div><div>领取成功</div></div>";
            $("body").append(str);
            //遮板
            var box="<div id='cover'></div>";
            $("body").append(box);
            $("#cover").css("width",$wid);
            $("#cover").css("height",$hei);
        })
        //跳转解梦输入页
        $(".close").on("click",function(){
            var This=$("this");
            This.parentNode.css("display","none");
            This.parentNode.nextSibling.css("display","none");
            window.location.href="solutionDream_input.html";
        });
        //提交梦
        $("#submit").on("click",function(){
            var $wid=$(window).width();
            var $hei=$(window).height();
            var str="<div id='submit' class='submit_window'><div class='popup_window'>是否提交订单</div><div class='popup_yes'>是</div><a class='popup_no' href='solutionDream_input.html'>否</a></div>";
            $("body").append(str);
            //遮板
            var box="<div id='cover'></div>";
            $("body").append(box);
            $("#cover").css("width",$wid);
            $("#cover").css("height",$hei);
            //遮板禁止滑动
            $(document.body).toggleClass("html-body-overflow");
            $(".popup_yes").on("click",function(){
                //创建去支付页面
                //缺一个ajax
                var $wid=$(window).width();
                var $hei=$(window).height();
                var str="<div class='pay'> <img src='../img/dream/dream.png'> <p><span class='close'>×</span></p> <div>梦是通往内心深处最好的途径哦~ </div> <table> <tr> <td>昵称：</td> <td>小毛</td> </tr> <tr> <td>服务类型：</td> <td>解梦</td> </tr> <tr> <td>原价：</td> <td>20元</td> </tr> <tr> <td>优惠券：</td> <td> <select> <option>19元解梦评论有礼券</option> </select> </td> </tr> <tr> <td>应付金额：</td> <td>1元</td> </tr> </table> <div id='toPay'>去支付</div> <div>订单需在十分钟内完成支付</div> </div>";
                $("body").append(str);
                //遮板
                var box="<div id='cover'></div>";
                $("body").append(box);
                $("#cover").css("width",$wid);
                $("#cover").css("height",$hei);
                //遮板禁止滑动
                $(document.body).toggleClass("html-body-overflow");
                $("#toPay").on("click",function(){
                    var $wid=$(window).width();
                    var $hei=$(window).height();
                    var str="<div class='qrCode'> <p><span class='close'>×</span></p><h2>一、微信支付扫码</h2><div id='code'></div> <h2>二、支付宝支付扫码</h2><div id='code'></div></div>";
                    $("body").append(str);
                    //遮板
                    var box="<div id='cover'></div>";
                    $("body").append(box);
                    $("#cover").css("width",$wid);
                    $("#cover").css("height",$hei);
                })
            });
        });
        //二维码生成
        (function(){
            $("#code").qrcode({
                render: "table", //table方式
                width: 200, //宽度
                height:200, //高度
                text: "www.helloweba.com" //任意内容
            });
        })();*/
        //单选框
        $(".nxl-check-box.single").on("click", function (e) {
            var $s = $(this),
                $status = $s.find("div.status");
            if (!$status.hasClass("on")) {
                //清除选中状态
                $s.siblings(".nxl-check-box.single").each(function (i, n) {
                    $(n).find("div.status").removeClass("on");
                });
                //选中当前
                $status.addClass("on");
            }
        });
        //复选框
        $(".nxl-check-box.multi").on("click", function (e) {
            $(this).find("div.status").toggleClass("on");
        });
        //消息框
        $("[data-toggle=nxl-message]").on("click", function (e) {
            var $s = $(this),
                $message = $($s.attr("data-target"));

            //关闭事件
            $message.find(".content .title div.close").on("click", function (e) {
                //动画
                $message.removeClass("show");
                setTimeout(function () {
                    //隐藏
                    $message.css("display", "none");
                }, 500);
            });

            //显示
            $message.css("display", "block");
            setTimeout(function () {
                //动画
                $message.addClass("show");
            }, 0);
        });
        //文本输入长度限制
        $("[data-toggle=input-limit]").each(function (i, n) {
            var $s = $(this),
                $target = $s.find($s.attr("data-target")),
                $words = $s.find(".words"),
                limit = parseInt($s.attr("data-limit"));

            $target.on("input", function (e) {
                var $s = $(this),
                    v = $s.val();

                //是否超长
                if (v.length > limit) {
                    //截断
                    v = v.substr(0, limit);
                    $s.val(v);
                }

                //字数更新
                $words.text(v.length + "/" + limit);
            });
        });
        //点击打开百度商桥对话框
        $(".openBDSQ").click(function () {
            //window.open('http://p6.qiao.baidu.com/im/index?siteid=3526888&ucid=6681471&lastsubid=1067322&from=%E5%8C%97%E4%BA%AC%E6%B5%B7%E6%B7%80&bid=92e19dbb3dcb182c08cbf5ac&tok=1abpgetfj&chatType=3&chat=&groupid=&groupname=&subid=&subname=&ref=http%3A%2F%2Fwww.zhongdixinli.net%2F', 'newwindow', 'height=600, width=800')
            //var   url="http://p6.qiao.baidu.com/im/index?siteid=3526888&ucid=6681471&lastsubid=1067322&from=%E5%8C%97%E4%BA%AC%E6%B5%B7%E6%B7%80&bid=92e19dbb3dcb182c08cbf5ac&tok=1abpgetfj&chatType=3&chat=&groupid=&groupname=&subid=&subname=&ref=http%3A%2F%2Fwww.zhongdixinli.net%2F";
            var url = "http://p.qiao.baidu.com/im/index?siteid=9000636&ucid=5229045&cp=&cr=&cw=";
            if (screen.width == "640") {
                window.open(url, "newwindow", "height=600,   width=800,   top=100,   left=225,   toolbar=no,   menubar=no,   scrollbars=yes,   resizable=no,location=no,   status=no")
            }
            else if (screen.width >= "800" || screen.width <= "1024") {
                window.open(url, "newwindow", "height=600,   width=800,   top=125,   left=385,   toolbar=no,   menubar=no,   scrollbars=yes,   resizable=no,location=no,   status=no")
            }
            else if (screen.width >= "1024") {
                window.open(url, "newwindow", "height=600,   width=800,   top=225,   left=610,   toolbar=no,   menubar=no,   scrollbars=yes,   resizable=no,location=no,   status=no")
            }
        });
        //分页确定调转页面
        $(".pageBtn").click(function () {
            var pageNumber = $(".pageIpt").val();
            var url = window.location.pathname;
            var urlLast = window.location.search;
            var qunqunKind = getUrlParam(urlLast, 'kind');
            var maxPageNumber = $('.pageUl>li:last').prev().children().html();
            if (pageNumber > maxPageNumber || pageNumber <= 0) {
                alert("输入页数错误");
                $(".pageIpt").val("");
            } else {
                //open("counselor.html?page="+pageNumber+"&size=8");
                location.href = "" + url + "?page=" + pageNumber + "&size=8&kind=" + qunqunKind + "";
            }

        });
        //从连接中提取其中的数值
        function getUrlParam(url, name) {
            var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
            var matcher = pattern.exec(url);
            var items = null;
            if (matcher != null) {
                try {
                    items = decodeURIComponent(decodeURIComponent(matcher[1]));
                } catch (e) {
                    try {
                        items = decodeURIComponent(matcher[1]);
                    } catch (e) {
                        items = matcher[1];
                    }
                }
            }
            return items;
        }
        //点击收藏
        $(".btn-favorite").click(function () {
            var This = $(this);
            var url = This.parent().children(":first").children(":first").attr("href");
            var siftId = getUrlParam(url, "siftId");
            var isCollected = This.next().html();
            var pandaun = This.prev().html();
            if (isCollected == 0) {
                $.ajax({
                    url: "public/sift/" + siftId + "/collect",
                    type: "post",
                    dataType: "json",
                    data: "{'isCollected':'1'}",
                    success: function (object) {
                        This.html("已收藏");
                        This.css({width: "55px", backgroundImage: "url(../img/icon_favorite.png)"});
                        This.next().html(1);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (XMLHttpRequest.status == 401) {
                            alert("亲！登陆后才能收藏的")
                        } else {
                            alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);

                        }
                    }
                });
            } else {
                $.ajax({
                    url: "public/sift/" + siftId + "/collect",
                    type: "post",
                    dataType: "json",
                    data: "{'isCollected':'0'}",
                    success: function (object) {
                        This.html("收藏");
                        if (pandaun == 1) {
                            This.css({width: "40px", backgroundImage: "url(../img/icon_favorite3.png)"});
                        } else {
                            This.css({width: "40px", backgroundImage: "url(../img/icon_favorite0.png)"});
                        }
                        This.next().html(0);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (XMLHttpRequest.status == 401) {
                            alert("亲！登陆后才能收藏的")
                        } else {
                            alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);

                        }
                    }
                });
            }
        });
        //分享
        $('.btn-share').mouseover(function () {
            var This = $(this);
            This.children(":first").show();
        });
        $('.btn-share').mouseout(function () {
            $('.sharePopup').hide();
        });
        //微信分享
        $('.weixinsmall').click(function () {
            var This = $(this);
            var qr_coder = null;
            qr_coder = new QRCoder($('.qr_container'));
            $('.qr_container').html("");
            var watch_start = new Date();
            var wangzhi = This.parent().children(":last").children(":first").val();
            var winxinTittle = This.parent().children(":last").children(":last").html();
            $(".winxinTittle").html(winxinTittle);
            qr_coder.setMode(1);
            qr_coder.draw(
                wangzhi,
                $("[name='qr_capacity']:checked").val(),
                'img/16.png',
                function (data) {
                    var watch_end = new Date();
                    console.log("cost:" + (watch_end - watch_start) + "ms");
                });
        });
        //分享到qq
        //qq空间地址：http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?
        $('.qqsmall').click(function () {
            var This = $(this);
            var wangzhi = This.parent().children(":last").children(":first").val();
            var Tittle = This.parent().children(":last").children(":last").html();
            var picurl = This.parent().children(":last").children(":last").prev().html();

            sharetoqq(Tittle, wangzhi, picurl)
        });
        var sharetoqq = function (title, url, picurl) {
            var shareqqzonestring = 'http://connect.qq.com/widget/shareqq/index.html??summary=' + title + '&url=' + url + '&pics=' + picurl;
            window.open(shareqqzonestring, 'newwindow');
        };
        //分享到新浪微博
        //腾讯微博地址：http://v.t.qq.com/share/share.php?
        $('.weibosmall').click(function () {
            var This = $(this);
            var wangzhi = This.parent().children(":last").children(":first").val();
            var Tittle = This.parent().children(":last").children(":last").html();
            var picurl = This.parent().children(":last").children(":last").prev().html();

            sharetosina(Tittle, wangzhi, picurl)
        });
        var sharetosina = function (title, url, picurl) {
            var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;
            window.open(sharesinastring, 'newwindow');
        };
        //送暖
        $('.praise').click(function () {
            var This = $(this);
            var postId = This.prev().html();
            var number = This.children(":first").html();
            var hasPraise = This.parent().children(":last").html();
            if (hasPraise == "YES") {
                $.ajax({
                    url: "/public/bbs-post/" + postId + "/warming",
                    type: "post",
                    dataType: "json",
                    data: "{'warming':'0'}",
                    success: function (object) {
                        console.log(object)
                        number--;
                        This.children(":first").html(number)
                        This.css({color: "#aab2bd", backgroundColor: "#ffffff", borderColor: "#cdd0d9"});
                        This.parent().children(":last").html("NO");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (XMLHttpRequest.status == 401) {
                            alert("亲！登陆后才能送暖的")
                        } else {
                            alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);

                        }
                    }
                });
            } else {
                $.ajax({
                    url: "/public/bbs-post/" + postId + "/warming",
                    type: "post",
                    dataType: "json",
                    data: "{'warming':'1'}",
                    success: function (object) {
                        console.log(object)
                        number++;
                        This.children(":first").html(number)
                        This.css({color: "#fff", backgroundColor: "#fcab55", borderColor: "#fff"});
                        This.parent().children(":last").html("YES");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (XMLHttpRequest.status == 401) {
                            alert("亲！登陆后才能送暖的")
                        } else {
                            alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);

                        }
                    }
                });
            }

        });
        //感谢
        $('.thank').click(function () {
            var This = $(this);
            var postId = This.prev().html();
            var replyId = This.prev().prev().html();
            var number = This.children(":first").html();
            var hasPraise = This.parent().children(":last").html();
            if (hasPraise == "YES") {
                $.ajax({
                    url: "/public/bbs-post/" + postId + "/bbs-reply/" + replyId + "/thanks",
                    type: "post",
                    dataType: "json",
                    data: "{'thanks':'0'}",
                    success: function (object) {
                        console.log(object)
                        number--;
                        This.children(":first").html(number)
                        This.css({color: "#aab2bd", backgroundColor: "#ffffff", borderColor: "#cdd0d9"});
                        This.parent().children(":last").html("NO");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
                    }
                });
            } else {
                $.ajax({
                    url: "/public/bbs-post/" + postId + "/bbs-reply/" + replyId + "/thanks",
                    type: "post",
                    dataType: "json",
                    data: "{'thanks':'1'}",
                    success: function (object) {
                        console.log(object)
                        number++;
                        This.children(":first").html(number)
                        This.css({color: "#fff", backgroundColor: "#fcab55", borderColor: "#fff"});
                        This.parent().children(":last").html("YES");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
                    }
                });
            }

        });
        //回复某人的回复
        $('.reply').click(function () {
            var This = $(this);
            var data = {};
            var postId = This.next().next().html();
            data.postId = postId;
            data.replyId = This.next().html();
            data.partCode = This.prev().prev().html();
            data.replyToUser = This.prev().html();
            data.sid = $('#cookie').html;
            console.log(postId,data.replyId,data.partCode,data.replyToUser);
            $('#releaseCONT').click(function () {
                var content = $('#replySomeoneText').val();
                data.content = content;
                data = JSON.stringify(data);
                $.ajax({
                    url: "/public/bbs-post/" + postId + "/reply",
                    type: "post",
                    dataType: "json",
                    data: data,
                    success: function (object) {
                        window.location.reload();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (XMLHttpRequest.status == 401) {
                            alert("亲！登陆后才能回复的")
                        } else {
                            alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);

                        }
                    },
                    headers: {
                        "sid": "sid",
                    }
                });
            })
        });
        //回复帖子
        $('#reply').click(function () {
            var data = {};
            var postId = $('#releaseDisplayId').html();
            var content = $('#textReply').val();
            data.content = content;
            data.partCode = $('#releaseDisplayPartCode').html();
            data.replyToUser = $('#releaseDisplayCreateUser').html();
            data.postId = postId;
            data = JSON.stringify(data);
            $.ajax({
                url: "/public/bbs-post/" + postId + "/reply",
                type: "post",
                dataType: "json",
                data: data,
                success: function (obj) {
                    //提示发布成功（动态创建元素就好）
                    setTimeout(function () {
                        debugger;
                        $('<div />', {
                            id: 'tip',
                            text: "发布成功",
                            "class": "text"
                        }).appendTo($('#reply').parentNode.parentNode);
                    }, 500);
                    window.location.reload();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status == 401) {
                        alert("亲！登陆后才能回复的")
                    } else {
                        alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);

                    }
                },
                headers: {
                    "sid": "sid"
                }
            });
        });
        //发布帖子
        $('.post_Release').click(function () {
            var data = {};
            var partCode = "danteng";
            var This = $(this);
            var partCode0 = This.parent().find('.post_partCode')[0].childNodes[0].nodeValue;
            data.title = This.parent().find('.post_title .text').val();
            data.content = This.parent().find('.post_content').val();
            switch (partCode0) {
                case "人际关系":
                    partCode = "relationship";
                    break;
                case "自我成长":
                    partCode = "growing";
                    break;
                case "婚恋情感":
                    partCode = "intimacy";
                    break;
                case "知识讨论":
                    partCode = "knowledge";
                    break;
                case "健身心康":
                    partCode = "health";
                    break;
                case "学业职场":
                    partCode = "working";
                    break;
                case "性心理":
                    partCode = "sex";
                    break;
                case "亲子关系":
                    partCode = "parenting";
                    break;
                default:
                    break;
            }
            //if(partCode0=="人际关系"){partCode="relationship"}
            //if(partCode0=="自我成长"){partCode="growing"}
            //if(partCode0=="婚恋情感"){partCode="intimacy"}
            //if(partCode0=="知识讨论"){partCode="knowledge"}
            //if(partCode0=="健身心康"){partCode="health"}
            //if(partCode0=="学业职场"){partCode="working"}
            //if(partCode0=="性心理"){partCode="sex"}
            //if(partCode0=="亲子关系"){partCode="parenting"}
            data.partCode = partCode;
            //data.createUser=;
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
            console.log(data);
            if (data.title==''){
                alert("请输入标题");
                return;
            }else if (data.content==''){
                alert("请输入内容");
                return;
            }else {
                alert("请选择话题");
                return;
            }
            data = JSON.stringify(data);
            $.ajax({
                url: "/public/bbs-post/post",
                type: "post",
                dataType: "json",
                data: data,
                contentType: "application/json",
                success: function () {
                    alert("发帖成功！");
                    $('#message_release').css("display", "none");
                    data.title = This.parent().find('.post_title .text').val("");
                    data.content = This.parent().find('.post_content').val("");

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status == 401) {
                        alert("您需要登录才能发布信息！")
                    } else {
                        alert(XMLHttpRequest.responseText);
                    }
                },
            });
        });
        //删除我的帖子
        $('.postDelete1').click(function () {
            var This = $(this);
            var postId = This.parent().children(":first").html();
            $.ajax({
                url: "/public/bbs-post/" + postId + "/delete",
                type: "post",
                dataType: "json",
                success: function () {
                    alert("删除成功！");
                    This.parent().parent().remove();
                    var a = $(".postRecordCount").html();
                    a -= 1
                    $(".postRecordCount").html(a);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
                },
            });
        });
        //删除我回复的帖子
        $('.postDelete2').click(function () {
            var This = $(this);
            var replyId = This.parent().children(":first").html();
            $.ajax({
                url: "/public/bbs-reply/" + replyId + "/delete",
                type: "post",
                dataType: "json",
                success: function () {
                    alert("删除成功！");
                    This.parent().parent().remove();
                    var a = $(".postRecordCount").html();
                    a -= 1;
                    $(".postRecordCount").html(a);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
                },
            });
        });
        //删除咨询
        $('.consultationDelete').click(function () {
            var This = $(this);
            var serviceId = This.parent().children(":first").html();
            $.ajax({
                url: "/public/consulting-service/" + serviceId + "/delete",
                type: "post",
                dataType: "json",
                success: function () {
                    alert("删除成功！");
                    This.parent().parent().remove();
                    var a = $(".consultationRecordCount").html();
                    a -= 1
                    $(".consultationRecordCount").html(a);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
                },
            });
        });
        //删除释梦
        $('.dreamDelete').click(function () {
            var This = $(this);
            var dreamServiceId = This.parent().children(":first").html();
            $.ajax({
                url: "/public/dream-service/" + dreamServiceId + "/delete",
                type: "post",
                dataType: "json",
                success: function () {
                    alert("删除成功！");
                    This.parent().parent().remove();
                    var a = $(".dreamRecordCount").html();
                    a -= 1
                    $(".dreamRecordCount").html(a);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status + "：" + XMLHttpRequest.responseText);
                },
            });
        });
        //显示评价
        $('.evaluated').mouseover(function () {
            var This = $(this);
            This.children().show();
        });
        $('.evaluated').mouseout(function () {
            var This = $(this);
            This.children().hide();
        });
        //资料修改
        $('.preservation').click(function () {
            var This = $(this);
            var user = This.prev().html();
            user = JSON.parse(user);
            var sid = This.prev().prev().html();
            user.alias = $('.nicknameContent .text').val();
            user.sex = $('.single .on').next().html();
            user.sexDisplay = $('.single .on').next().next().html();
            user.age = $('.age .selector')[0].childNodes[0].nodeValue;
            var src = $('#portrait_show').attr('src');
            var str = src.split(","); //字符分割
            user.photo = str[1];
            user.descr = $('.des .text').val();
            user.userType = $('.model .selector')[0].childNodes[0].nodeValue;
            var email = $('.email .text').val();
            user.email = email;
            user.cellPhone = $('.phone .text').val();
            user = JSON.stringify(user);
            var regyx = /^\w{6,24}@[a-z0-9]{1,12}(\.[a-z]{2,4}){1,4}$/;//邮箱
            if (regyx.test(email) || email == "") {
                $.ajax({
                    url: "/public/user/modify",
                    type: "post",
                    dataType: "json",
                    data: user,
                    success: function (obj) {
                        alert("保存成功。");
                        //window.location.url
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.responseText);
                    },
                    headers: {
                        "sid": "sid"
                    }
                });
            } else {
                alert("邮箱格式不正确！");
            }

        });
        //咨询师主页teb切换
        $('.tabs li').click(function () {
            var This = $(this);
            This.addClass("on").siblings().removeClass("on");
        });
    };
    exports.nxlEvent = new Event();

})(document, this);
(function(){
    //首页幻灯片初始化 start
    if(window.chrome) {
        $('.unslider-banner li').css('background-size', '100% 100%');
    }
    $(function() {
        var unslider = $('.unslider-banner').unslider({
            arrows: false,
            fluid: true,
            dots: true
        });
        $('.arrow').click(function() {
            var fn = this.className.split(' ')[1];
            unslider.data('unslider')[fn]();
        });
    });
    //首页幻灯片初始化 end 
    //图片预加载 start
    preloadingImages([
        "../img/search_hover.png"
    ]);
    //图片预加载 end

    //自动事件初始化 start
    nxlEvent.auto();
    //自动事件初始化 end
})();
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

