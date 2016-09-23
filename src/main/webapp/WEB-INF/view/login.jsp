<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="zh">
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>权限管理系统</title>
	<meta name="keywords" content="权限管理" />
  	<meta name="description" content="权限管理" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <!-- bootstrap & fontawesome -->
    <link rel="stylesheet" href="<%=basePath%>resources/css/bootstrap.css" />
    <link rel="stylesheet" href="<%=basePath%>resources/css/font-awesome.css" />
    <!-- text fonts -->
    <link rel="stylesheet" href="<%=basePath%>resources/css/openSans.css" />
    <!-- ace styles -->
    <link rel="stylesheet" href="<%=basePath%>resources/css/ace.css" />

    <!--[if lte IE 9]>
    <link rel="stylesheet" href="<%=basePath%>resources/css/ace-part2.min.css" />
    <![endif]-->
    <link rel="stylesheet" href="<%=basePath%>resources/css/ace-rtl.css" />
          
    <!--[if lte IE 9]>
    <link rel="stylesheet" href="<%=basePath%>resources/css/ace-ie.min.css" />
    <![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

    <!--[if lt IE 9]>
    <script src="<%=basePath%>resources/js/html5shiv.js"></script>
    <script src="<%=basePath%>resources/js/respond.js"></script>
    <![endif]-->   
    <link rel="stylesheet" href="<%=basePath%>resources/css/loginBrower.css" />   
</head>
<body class="login-layout light-login">
<div class="main-container">
<div class="main-content">
<div class="row">
<div class="col-sm-10 col-sm-offset-1">
<div class="login-container">
<div class="center">
    <h2>
		<i class="icon-leaf green"></i>
		<span class="red">权限管理</span>
	</h2>
</div>

<div class="space-6"></div>

<div class="position-relative">
    <div id="login-box" class="login-box visible widget-box no-border">
        <div class="widget-body">
            <div class="widget-main">
                <h4 class="header blue lighter bigger">
                    <i class="ace-icon fa fa-coffee green"></i>
                   	请输入登录信息
                </h4>

                <div class="space-6"></div>

                <form action="main/blank.jsp" method="POST" id="validation-form">
                    <fieldset>
                        <label class="block clearfix form-group">

							<span class="block input-icon input-icon-right">
								<input id="loginName" name="loginName" type="text" class="form-control" placeholder="用户名" />
								<i class="ace-icon fa fa-user" style="display: block;"></i>
							</span>
                        </label>

                        <label class="block clearfix form-group">
							<span class="block input-icon input-icon-right">
								<input id="passWord" name="passWord" type="password" class="form-control" placeholder="密码" />
								<i class="ace-icon fa fa-lock" style="display: block;"></i>
							</span>
                        </label>
                        <label class="block clearfix form-group">
							<span class="block input-icon input-icon-right">
								<input type="text" class="form-control" id="validateImage" name="validateImage" maxlength="4"  placeholder="验证码" />
          						<img src="validateImage.image"  width="100" height="30"  id="chkNum"  title="单击重新加载验证码"  style="position: absolute;top: 2px; right:0; cursor: pointer;"/>
							</span>
                        </label> 
             
                        <label class="block clearfix form-group" style="text-align: center; display: none;" id="error-info">
                        </label> 
                        
                        <div class="space"></div>

                        <div class="clearfix">

                            <button type="button" class="width-35 pull-right btn btn-sm btn-primary" onclick="javascript:login();">
                                <i class="ace-icon fa fa-key"></i>
                                <span class="bigger-110">登录</span>
                            </button>
                            <button type="button" class="width-35 pull-lift btn btn-sm btn-primary" onclick="resets()" >
                                <i class="ace-icon fa fa-undo"></i>
                                <span class="bigger-110" >重置</span>
                            </button>
                        </div>
           
                        <div class="space-4"></div>
                    </fieldset>
                </form>
            </div><!-- /.widget-main -->

        </div><!-- /.widget-body -->
    </div><!-- /.login-box -->
</div><!-- /.position-relative -->
</div>
</div><!-- /.col -->
</div><!-- /.row -->
</div><!-- /.main-content -->
</div><!-- /.main-container -->
<div class="bottom_browser">登录权限管理系统时，请使用推荐浏览器</div>
<!-- basic scripts -->

<!--[if !IE]> -->
<script src="<%=basePath%>resources/js/jquery/jquery-2.1.1.js"></script>
<!-- <![endif]-->

<!--[if IE]>
<script src="<%=basePath%>resources/js/jquery/jquery-1.11.1.js"></script>
<![endif]-->

<script src="<%=basePath%>resources/js/jquery.validate.js"></script>



<!--[if !IE]> -->
<script type="text/javascript">
    window.jQuery || document.write("<script src='<%=basePath%>resources/js/jquery.js'>"+"<"+"/script>");
</script>
<!-- <![endif]-->

<!--[if IE]>
<script type="text/javascript">
    window.jQuery || document.write("<script src='<%=basePath%>resources/js/jquery1x.js'>"+"<"+"/script>");
</script>
<![endif]-->

<script type="text/javascript">
    if('ontouchstart' in document.documentElement) document.write("<script src='<%=basePath%>resources/js/jquery.mobile.custom.js'>"+"<"+"/script>");
</script>

<!-- inline scripts related to this page -->
<script type="text/javascript">
    jQuery(function($) {
        $(document).on('click', '.toolbar a[data-target]', function(e) {
            e.preventDefault();
            var target = $(this).data('target');
            $('.widget-box.visible').removeClass('visible');//hide others
            $(target).addClass('visible');//show target
        });
    });

    //you don't need this, just used for changing background
    jQuery(function($) {
        $('#btn-login-blur').on('click', function(e) {
            $('body').attr('class', 'login-layout blur-login');
            $('#id-text2').attr('class', 'white');
            $('#id-company-text').attr('class', 'light-blue');

            e.preventDefault();
        });
        $('#btn-login-dark').on('click', function(e) {
            $('body').attr('class', 'login-layout');
            $('#id-text2').attr('class', 'white');
            $('#id-company-text').attr('class', 'blue');

            e.preventDefault();
        });
        $('#btn-login-light').on('click', function(e) {
            $('body').attr('class', 'login-layout light-login');
            $('#id-text2').attr('class', 'grey');
            $('#id-company-text').attr('class', 'blue');

            e.preventDefault();
        });
        
        validation();
        $("#error-info").hide();
    });
    
   var login = function(){
	   if($("#validation-form").valid()){
		   var loginName=$("#loginName").val();
		   var passWord=$("#passWord").val();
		   var validateImage=$("#validateImage").val();
		   var url="<%=basePath%>login";
		   $.post(url,{loginName:loginName,password:passWord,validateImage:validateImage},function(data){
				if(data.state=="ok"){
					$("#error-info").text("");
					$("#error-info").hide();
					window.location.href='<%=basePath%>index';
				}else if(data.state=="error"){
					$("#error-info").text(data.info);
					$("#error-info").show();
					getRandomImage();
					$("#passWord").val("");
					$("#validateImage").val("");
				}
			});
	   }
    };
    
    //重新加载验证码
    $('#chkNum').click(function(){
       getRandomImage();
    });

    //更新验证码
    function getRandomImage(){
         $('#chkNum').attr('src',"validateImage.image?a=" + Math.random());
    }
    
    $(window).keydown(function(event){
    	if(event.keyCode == 13){
    		login();
    	}
    });
    
    function resets(){
    	$("#loginName").val("");
		$("#passWord").val("");
		$("#validateImage").val("");
 		$(".form-group").removeClass("has-error");
		$(".help-block").css("display","none");
    }
    
    $.validator.addMethod("onlyLetterAndDigit",function(value, element, params){  
        var regex=new RegExp('^[0-9a-zA-Z]+$');  
        return regex.test(value);  
    },"只能输入字母或数字");   
    
    function validation(){
	    $("#validation-form").validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			rules: {
				loginName: {
					required: true,
					minlength:3,
					maxlength:18,
					onlyLetterAndDigit:true
				},
				passWord: {
					required: true,
					minlength:6,
					maxlength:30,
					onlyLetterAndDigit:true
				},
				validateImage:{
					required: true,
					onlyLetterAndDigit:true
				}
			},
	
			messages:  {
				loginName: {
					required: "请输入登录账号",
					maxlength:"登录名不得少于3位",
					maxlength:"登录名不得超过18位"
				},
				passWord: {
					required: "请输入密码",
					minlength:"密码不得少于6位",
					maxlength:"密码不得超过30位"
				},
				validateImage: {
					required: "请输入验证码",
				}
			},
	
			invalidHandler: function (event, validator) { //display error alert on form submit   
				$('.alert-danger', $('.login-form')).show();
			},
	
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
	
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
				$(e).remove();
			},
			submitHandler: function (form) {
			},
			invalidHandler: function (form) {
			}
		});
    }
    
</script>
</body>
</html>