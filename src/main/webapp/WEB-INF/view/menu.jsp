<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="zh">
<head>
	<base href="<%=basePath%>">
 	<title>权限管理系统</title>
	<meta name="keywords" content="权限管理" />
  	<meta name="description" content="权限管理" />
	<%@include file="resource/resource.jsp"%>
	<style type="text/css">
	    .dataTables_length {
	         width: 150px !important;
	         float: right;
	         margin-top:10px;                 
	    }
	    .dataTables_info {
		    position: relative;
		    float: left;
		    top: 10px;
		}
		.dataTables_paginate {
		    text-align: right;
		    margin-top:10px;    
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

		<div id="sidebar" class="sidebar                  responsive">
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
						<a href="index">我的工作台</a>
					</li>
					<li class="active">权限管理</li>
					<li class="active">菜单管理</li>
				</ul><!-- /.breadcrumb -->

				<!-- search start -->
				<%@include file="resource/search.jsp"%>
				<!-- search end -->
			</div>

			<div class="page-content  col-lg-12 col-md-12 col-sm-12 col-xs-12" >
				<div class="zTreeDemoBackground left col-lg-3 col-md-3 col-sm-12 col-xs-12">
					<ul id="treeDemo" class="ztree">
					</ul>
				</div>
				<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
	                <div class="row">
						<div class="col-xs-12">
							<div class="col-xs-12">
								<div id="elementbut" style="padding-bottom: 10px;">
									<button id="goRaise" onclick="permission.menu.goRaise();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >新增</button>
									<button id="goModify" onclick="permission.menu.goModify();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >修改</button>
									<button id="goView" onclick="permission.menu.goView();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >查看</button>
									<button id="goErase" onclick="permission.menu.goErase();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >删除</button>
								</div>
						    </div>	
							<div class="col-xs-12" style="background-color: #F0F0F0; padding-top: 10px; padding-bottom: 10px;">
						        <input class="input-sm" id="menuNameSerch" placeholder="查询菜单名称" type="text" >
						        <input class="btn btn-info" type="button" value="检索" id="goSearch" onclick="permission.menu.goSearch();" style="margin-left: 20px;"/>	
						        <input class="btn btn-info" type="button" value="清空" id="goReset" onclick="permission.menu.goReset();" style="margin-left: 20px;"/>
								<div class="table-responsive" style="margin-top: 10px;">
									<table id="example" class="table table-striped table-bordered table-hover">
									
									</table>  
								</div><!-- /.table-responsive -->
							</div><!-- /span -->			  
						</div>
						<!-- PAGE CONTENT ENDS -->
					</div><!-- /.col -->
				</div>
				
				<!-- 隐藏的弹出框 -->
				<div id="dialog-message"  class="hide">
					<form class="form-horizontal" id="validation-form" role="form">
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="menuName"><span style="color:red">*</span>菜单名称:</label>
							<div class="col-xs-12 col-sm-9">
								<div class="clearfix">
									<input type="text" id="menuName" name="menuName"  class="col-xs-12 col-sm-6" />
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="url"><span style="color:red">*</span>菜单地址:</label>
							<div class="col-xs-12 col-sm-9">
								<div class="clearfix">
									<input type="text" id="url" name="url"  class="col-xs-12 col-sm-6" />
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="iconStyle"><span style="color:red">*</span>菜单样式:</label>
							<div class="col-xs-12 col-sm-9">
								<div class="clearfix">
									<input type="text" id="iconStyle" name="iconStyle"  class="col-xs-12 col-sm-6" />
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="sortNum"><span style="color:red">*</span>菜单排序:</label>
							<div class="col-xs-12 col-sm-9">
								<div class="clearfix">
									<input type="text" id="sortNum" name="sortNum"  class="col-xs-12 col-sm-6" />
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="parentName"><span style="color:red">*</span>所属系统菜单:</label>
							<div class="col-xs-12 col-sm-9">
								<div class="clearfix">
									<input type="text" id="parentName" readonly="readonly" name="parentName" class="col-xs-12 col-sm-6" />
									<input type="hidden" id="parentID"  name="parentID"  class="col-xs-12 col-sm-6"/>
									<input type="hidden" id="parentType"  name="parentType"  class="col-xs-12 col-sm-6"/>	
								</div>
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="menuLevel"><span style="color:red">*</span>菜单级别:</label>
							<div class="col-xs-12 col-sm-9">
								<div class="clearfix">
									<input type="text" id="menuLevel" name="menuLevel" readonly="readonly" class="col-xs-12 col-sm-6" />
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="operationName"><span style="color:red">*</span>权限:</label>
							<div class="col-xs-12 col-sm-9">
								<div class="clearfix">
									<input type="text" id="operationNames" readonly="readonly" name="operationNames" class="col-xs-12 col-sm-6" />
									<input type="hidden" id="operationIDs"  name="operationIDs"  class="col-xs-12 col-sm-6"/>
								</div>
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="theNote">备注:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<textarea class="input-xlarge" id="theNote" name="theNote" maxlength="50"></textarea>
								</div>	
							</div>	
						</div>	
						<div class="space-2"></div>		
						<input type="hidden" id="menuID" name="menuID"/>			
					</form>
				</div>
				<div id="parentTree-message" class="hide">
					<div class="zTreeDemoBackground left"  >
							<ul id="parentTree" class="ztree"></ul>
					</div>
				</div>
				<div id="operationTree-message" class="hide">
					<div>
						<ul id="operationTree" class="ztree"></ul>
					</div>
				</div>
				
				<%@include file="resource/footer.jsp"%>
	            <!-- footer end -->
	            <!-- upper start -->
	            <%@include file="resource/upper.jsp"%>
	            <!-- upper end -->							
			</div><!-- /.row -->						
		</div><!-- /.page-content-area -->
	</div>
<!-- inline scripts related to this page -->
<script type="text/javascript" src="<%= basePath%>resources/js/permission/menu.js"></script>
<script type="text/javascript">
	permission.menu.init();
</script>
</body>
</html>

