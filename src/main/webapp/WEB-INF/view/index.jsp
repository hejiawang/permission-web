<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="zh" style="background-color: #F2F2F2 !important;">
<head>
	<base href="<%=basePath%>">
	<title>权限管理系统</title>
	<meta name="keywords" content="权限管理" />
  	<meta name="description" content="权限管理" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<%@include file="resource/resource.jsp"%>
	
	<style type="text/css">
	
             .dataTables_length {
                  width: 150px !important;
                  float: right;
                  margin-top:3px;                 
             }
             .tree-btn{
                   position: relative;
                   width: auto;
                   height: auto;
                   float: left;
             }
             .tree-btn-width2{
                   width: 80%;
                   margin-left: 15px;
             }               
             @media (max-width:375px){
                #row-btn{
                    position: relative;
                    margin-top: 30px;
                    margin-right: 0;
                    margin-left: 8%;
                }
                .hr-12, .hr12{
                    margin-left: -40px;
                }
                .content_wrap{
                   position: relative;
                   width: 100%;
                   height: auto;
                }
                .tree-btn{
                   position: relative;
                   width: 100%;
                   height: auto;
                   float: none;
                   margin-left: 8%;
                }                            
             }
             .clearfix input[type=text]{
                 width: 75% !important;
             }			    
             .clearfix textarea{
                 width: 75% !important;
             }			    
	</style>
</head>

<body class="no-skin">
	<!-- top start -->
	<%@include file="resource/top.jsp"%>
	<!-- top end -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try{ace.settings.check('main-container' , 'fixed');}catch(e){}
		</script>

		<div id="sidebar" class="sidebar responsive">
			<script type="text/javascript">
				try{ace.settings.check('sidebar' , 'fixed');}catch(e){}
			</script>
			<!-- menu start -->
			<%@include file="resource/menu.jsp"%>
			<!-- menu end -->
			<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
				<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
			</div>

			<script type="text/javascript">
				try{ace.settings.check('sidebar' , 'collapsed');}catch(e){}
			</script>
		</div>

		<div class="main-content">
			<div class="breadcrumbs" id="breadcrumbs">
				<script type="text/javascript">
					try{ace.settings.check('breadcrumbs' , 'fixed');}catch(e){}
				</script>

				<ul class="breadcrumb">
					<li>
						<i class="ace-icon fa fa-home home-icon"></i>
						<a href="main/index.jsp">我的工作台</a>
					</li>
					<li>系统管理</li>
					<li class="active">机构管理</li>
				</ul><!-- /.breadcrumb -->

				<!-- search start -->
				<%@include file="resource/search.jsp"%>
				<!-- search end -->
			</div>

			<div class="page-content col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0;">

			</div><!-- /.col -->
			</div><!-- /.row -->
			
			<%@include file="resource/footer.jsp"%>
            <!-- footer end -->
            <!-- upper start -->
            <%@include file="resource/upper.jsp"%>
            <!-- upper end -->
		</div><!-- /.page-content-area -->
	<!-- inline scripts related to this page -->
<script type="text/javascript">
	
</script>
</body>
</html>
