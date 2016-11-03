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
					<li class="active">用户管理</li>
				</ul><!-- /.breadcrumb -->

				<!-- search start -->
				<%@include file="resource/search.jsp"%>
				<!-- search end -->
			</div>

			<div class="page-content  col-lg-12 col-md-12 col-sm-12 col-xs-12" >
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
	                <div class="row">
	                
	                	<!-- 列表页 -->
						<div class="col-xs-12" id="selectAll">
							<div class="col-xs-12">
								<div id="elementbut" style="padding-bottom: 10px;">
									<button id="goRaise" onclick="permission.userInfo.goRaise();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >新增</button>
									<button id="goModify" onclick="permission.userInfo.goModify();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >修改</button>
									<button id="goView" onclick="permission.userInfo.goView();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >查看</button>
									<button id="goErase" onclick="permission.userInfo.goErase();" class="btn btn-success btn-next" data-last="Finish" style="margin-left:5px;" >删除</button>
								</div>
						    </div>	
							<div class="col-xs-12" style="background-color: #F0F0F0; padding-top: 10px; padding-bottom: 10px;">
							    <input class="input-sm" id="userNameSerch"  placeholder="查询用户名称"   type="text">
						        <input class="btn btn-info" type="button" value="检索" id="goSearch" onclick="permission.userInfo.goSearch();" style="margin-left: 20px;"/>	
						        <input class="btn btn-info" type="button" value="清空" id="goReset" onclick="permission.userInfo.goReset();" style="margin-left: 20px;"/>
								<div class="table-responsive" style="margin-top: 10px;">
									<table id="example" class="table table-striped table-bordered table-hover">
									
									</table>  
								</div><!-- /.table-responsive -->
							</div><!-- /span -->			  
						</div>
						
						<!-- 新增用户页 -->
						<div  id="saveForm" style="display:none">
							<div class="col-xs-12 col-sm-12" style="border:#ccc solid 1px; height: auto;">
									<div class="widget-box"  style="border:none;">
										<div class="widget-header">
											<h4>用户信息</h4>
										</div>	
										<div class="widget-body">
											<div class="widget-main">
												<div class="form-group  col-xs-12 col-sm-3 col-md-3 col-lg-3">
													<h5 class="text-center">用户头像预览</h5>
													<label class="control-label col-xs-12 col-sm-12 text-center" for="phone">
													   <img id="previewImg"  style="width:120px;height:120px;border-radius:1em;border:3px grey ridge;"/>
													</label>	
													<div class="col-xs-12 col-sm-12">
															<div style="max-width:300px;">
																<form id="dzform" action="<%= basePath%>file/dropzone/upload" enctype="multipart/form-data" class="dropzone">
																	<div id="preImg" class="dropzone-previews" style="max-width:200px;"></div> 
																	<div class="dz-message" style="text-align:center;">点击或将图片<br/>拖动到此区域<br/>（图片小于5MB）</div> 
																	<div class="fallback">
																		<input name="file" type="file"/>
																	</div>
																	<input id="userPhotoFile" type="hidden" name="userPhotoFile"/>
																</form>
															</div>
															<div style="margin:1em 5em;">
															   <input type="button" class="btn btn-primary btn-xs" id="submit-all" value="上传"/>
															</div>
														<!-- </div>	 -->
													</div> 
											    </div>
														
												
												<form class="form-horizontal col-xs-12 col-sm-8 col-md-8 col-lg-8" id="validation-form" method="post">
												
													<div id="form-userinfoAndAccount">
													<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="padding: 0;">	
													<div class="form-group hide" >
														<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="userCode"><span style="color:red">*</span>编码:</label>
			
														<div class="col-xs-12 col-sm-9">
															<div class="clearfix">
																<input type="text" id="userCode" name="userCode" class="col-xs-12 col-sm-7" />
															</div>
														</div>
													</div>
													<div class="space-2"></div>
													
													<div class="form-group">
														<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="userName"><span style="color:red">*</span>姓名:</label>
			
														<div class="col-xs-12 col-sm-9">
															<div class="clearfix">
																<input type="text" id="userName" name="userName" class="col-xs-12 col-sm-7" />
															</div>
														</div>
													</div>
													
													<div class="space-2"></div>
													
													<div class="form-group">
														<label class="control-label col-xs-12 col-sm-3 no-padding-right"><span style="color:red">*</span>性别</label>
			
														<div class="col-xs-12 col-sm-9">
															<div>
																<label class="blue">
																	<input name="userSex" value="男" type="radio" class="ace"  checked="checked"/>
																	<span class="lbl"> 男</span>
																</label>
																<label class="blue">
																	<input name="userSex" value="女" type="radio" class="ace" />
																	<span class="lbl"> 女</span>
																
																</label>
																
															</div>
														</div>
													</div>
													<div class="space-2"></div>
													
													<div class="form-group">
														<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="userTel"><span style="color:red">*</span>手机:</label>
														<div class="col-xs-12 col-sm-9">
															<div class="input-group">
																<span class="input-group-addon">
																	<i class="ace-icon fa fa-phone"></i>
																</span>
																
																<input type="tel" id="userTel" name="userTel" style="width:150px;"/>
															</div>
														</div>
													</div>
													<div class="space-2"></div>
													
													
													<div class="form-group">
														<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="userEmail"><span style="color:red">*</span>邮箱:</label>
			
														<div class="col-xs-12 col-sm-9">
															<div class="clearfix">
																<input type="email" name="userEmail" id="userEmail" class="col-xs-12 col-sm-7" />
															</div>
														</div>
													</div>
													<div class="space-2"></div>
													<div class="form-group">
														<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="userBirthday">生日:</label>
			
														<div class="col-xs-12 col-sm-9">
															<div class="clearfix">
																<input type="text" id="userBirthday" readonly="readonly" name="userBirthday" class="col-xs-10 col-sm-7" style="background-color:#EEEEEE;" />
															</div>
														</div>
													</div>
													<div class="form-group">
														<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="userNation">民族:</label>
			
														<div class="col-xs-12 col-sm-9">
															<div class="clearfix">
																<input type="text" id="userNation" name="userNation" class="col-xs-10 col-sm-7" />
															</div>
														</div>
													</div>
													<div class="form-group">
														<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="sortNum"><span style="color:red">*</span>排序:</label>
			
														<div class="col-xs-12 col-sm-9">
															<div class="clearfix">
																<input type="text" id="sortNum" name="sortNum" class="col-xs-10 col-sm-7" />
															</div>
														</div>
													</div>
													<div class="space-2"></div>
													
													<div class="form-group">
														<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="theNote">备注</label>
			
														<div class="col-xs-12 col-sm-9">
															<div class="clearfix">
																<textarea class="input-xlarge" name="theNote" id="theNote"></textarea>
															</div>
														</div>
													</div>
												</div>
												
												<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="padding: 0;">
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="loginName"><span style="color:red">*</span>登录账号:</label>
		
													<div class="col-xs-12 col-sm-9">
														<div class="clearfix">
															<input type="text" id="loginName" name="loginName" class="col-xs-12 col-sm-7" /><span id="checkedLoginName"></span>
														</div>
													</div>
											    </div>
												<div class="space-2"></div>
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="passWord"><span style="color:red">*</span>密码:</label>
		
													<div class="col-xs-12 col-sm-9">
														<div class="clearfix">
															<input type="password" name="passWord" id="passWord" class="col-xs-12 col-sm-7" />
														</div>
													</div>
												</div>
												<div class="space-2"></div>
			
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="passWordR"><span style="color:red">*</span>确认密码:</label>
		
													<div class="col-xs-12 col-sm-9">
														<div class="clearfix">
															<input type="password" name="passWordR" id="passWordR" class="col-xs-12 col-sm-7" />
														</div>
													</div>
												</div>
												<div class="space-2"></div>
													
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="orgName"><span style="color:red">*</span>机构:</label>
													<div class="col-xs-12 col-sm-9">
															
														<div class="clearfix">
														    <input type="text" id="orgName" name="orgName" class="col-xs-12 col-sm-9" />
															<input type="hidden" id="orgID" name="orgID" class="col-xs-12 col-sm-7" />
														</div>
													</div>
												</div>
												<div class="space-2"></div>
													
												<div class="form-group" id="postgroup">
													<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="postNames"><span style="color:red">*</span>岗位:</label>
		
													<div class="col-xs-12 col-sm-9">
														<div class="clearfix">
															<input type="text" id="postNames" name="postNames" class="col-xs-12 col-sm-7" />
															<input type="hidden" id="postIDs" name="postIDs" class="col-xs-12 col-sm-7" />
														</div>
													</div>
												</div>
												<div class="space-2"></div>
													
												<div class="form-group" id="titlegroup">
													<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="rankNames"><span style="color:red">*</span>职级:</label>
		
													<div class="col-xs-12 col-sm-9">
														<div class="clearfix">
															<input type="text" id="rankNames" name="rankNames" class="col-xs-12 col-sm-7" />
															<input type="hidden" id="rankIDs" name="rankIDs" class="col-xs-12 col-sm-7" />
														</div>
													</div>
												</div>
												<div class="space-2"></div>
													
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="roleNames"><span style="color:red">*</span>角色:</label>
		
													<div class="col-xs-12 col-sm-9">
														<div class="clearfix">
															<input type="text" id="roleNames" name="roleNames" class="col-xs-12 col-sm-7" />
															<input type="hidden" id="roleIDs" name="roleIDs" class="col-xs-12 col-sm-7" />
														</div>
													</div>
												</div>
												<div class="space-2"></div>
												</div>		
												</div>
												</div>
												
												<div class="clearfix form-actions col-xs-12 col-sm-12 col-md-12 col-lg-12">
													<div class="col-md-offset-3 col-md-9">
														<input class="btn btn-info" type="button" id="btn" value="提交" onclick="permission.userInfo.submitUserInfo()"/>&nbsp; &nbsp; &nbsp;
														<input class="btn btn-info" type="button" id="res" value="重置" onclick="permission.userInfo.resetUserInfo()"/>&nbsp; &nbsp; &nbsp;
														<input class="btn btn-info" type="button" id="history" value="返回" onclick="permission.userInfo.goBack()"/>
														<input id="able" type="hidden" value="raise">
														<input id="userID" name="userID" type="hidden" />
													</div>
												</div>
											</form>
										</div>
									</div> 
							 </div>					
		 				</div>
						<!-- PAGE CONTENT ENDS -->
					</div><!-- /.col -->
				</div>
				
				<!-- 隐藏的弹出框 -->
				<div id="orgTree-message" class="hide">
					<div class="zTreeDemoBackground left"  >
						<ul id="orgTree" class="ztree"></ul>
					</div>
				</div>
			
				<div id="roleTree-message" class="hide">
					<div class="zTreeDemoBackground left"  >
						<ul id="roleTree" class="ztree"></ul>
					</div>
				</div>
				
				<div id="postTree-message" class="hide">
					<div class="zTreeDemoBackground left"  >
						<ul id="postTree" class="ztree"></ul>
					</div>
				</div>
				
				<div id="rankTree-message" class="hide">
					<div class="zTreeDemoBackground left"  >
						<ul id="rankTree" class="ztree"></ul>
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
<script type="text/javascript" src="<%= basePath%>resources/js/permission/userInfo.js"></script>
<script type="text/javascript">
	permission.userInfo.init();
</script>
</body>
</html>

