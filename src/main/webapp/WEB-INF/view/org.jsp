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
					<li class="active">机构管理</li>
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
									<!-- button id="goRaise" onclick="permission.org.goRaise();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >新增</button>
									<button id="goModify" onclick="permission.org.goModify();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >修改</button>
									<button id="goView" onclick="permission.org.goView();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >查看</button>
									<button id="goErase" onclick="permission.org.goErase();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >删除</button-->
								</div>
						    </div>	
							<div class="col-xs-12" style="background-color: #F0F0F0; padding-top: 10px; padding-bottom: 10px;">
							    <input class="input-sm" id="orgCodeSerch"  placeholder="查询机构代码"   type="text">
						        <input class="input-sm" id="orgNameSerch" placeholder="查询机构名称" type="text" >
						        <input class="btn btn-info" type="button" value="检索" id="goSearch" onclick="permission.org.goSearch();" style="margin-left: 20px;"/>	
						        <input class="btn btn-info" type="button" value="清空" id="goReset" onclick="permission.org.goReset();" style="margin-left: 20px;"/>
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
					<form  class="form-horizontal" id="validation-form" role="form" action="">
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="orgCode"><span style="color:red">*</span>机构编码:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="orgCode" name="orgCode"  class="col-xs-10 col-sm-3" />
									<span for="orgCode" class="help-block" style="color:red;display:none;" id="orgCodeSpan">机构编码重复!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="orgName"><span style="color:red">*</span>机构名称:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="orgName" name="orgName"  class="col-xs-10 col-sm-3" />
									<span for="orgName" class="help-block" style="color:red;display:none;" id="orgNameSpan">机构名称重复!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="orgShortName">机构简写:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="orgShortName" name="orgShortName"  class="col-xs-10 col-sm-3" />
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group" id="orgLevelDiv">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="orgLevel"><span style="color:red">*</span>等级:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="orgLevel" name="orgLevel" readonly="readonly" class="col-xs-10 col-sm-3" />
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="parentID"><span style="color:red">*</span>所属机构:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="parentID" name="parentID" readonly="readonly" class="col-xs-10 col-sm-3" />
									<input type="hidden" id="parentOrgID" name="parentOrgID" value=""  class="col-xs-10 col-sm-3" />
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group" id="sortNumDiv">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="sortNum"><span style="color:red">*</span>顺序:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="sortNum" name="sortNum"  class="col-xs-10 col-sm-3" />
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
						<input type="hidden" id="orgID" name="orgID"/>
					</form>
				</div>
				<div id="parentTree-message" class="hide">
					<div class="zTreeDemoBackground left"  >
							<ul id="parentTree" class="ztree"></ul>
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
<script type="text/javascript" src="<%= basePath%>resources/js/permission/org.js"></script>
<script type="text/javascript">
	permission.org.init();
</script>
</body>
</html>

