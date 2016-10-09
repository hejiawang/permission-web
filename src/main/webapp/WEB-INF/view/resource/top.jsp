<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
    String systemPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/";
%>
<div id="navbar" class="navbar navbar-default">
	<script type="text/javascript">
		try{ace.settings.check('navbar' , 'fixed');}catch(e){}
		
	</script>

	<div class="navbar-container" id="navbar-container">
		<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler">
			<span class="sr-only">Toggle sidebar</span>

			<span class="icon-bar"></span>

			<span class="icon-bar"></span>

			<span class="icon-bar"></span>
		</button>

		<div class="navbar-header pull-left">
			<a  class="navbar-brand">
				<small>
					<i class="fa fa-leaf"></i>
					权限管理系统
				</small>
			</a>
		</div>

		<div class="navbar-buttons navbar-header pull-right" role="navigation">
			<ul class="nav ace-nav">
				<li class="light-blue">
					<a data-toggle="dropdown" href="#" class="dropdown-toggle">
						<img class="nav-user-photo" src="${domainUrlUtil.BASEURL_DOMAIN}/resources/avatars/user.jpg" alt="Jason's Photo" />
						<span class="user-info" style="font-family: 微软雅黑">
							<small>欢迎您,</small>
							<!--%=session.getAttribute("userName") %-->
							<small id="user_user_name">sdf</small>
						</span>
	
						<i class="ace-icon fa fa-caret-down"></i>
					</a>
	
					<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-menus dropdown-yellow dropdown-caret dropdown-close" style="width:126px;">
						<li class="divider"></li>
	
						<li>
							<a href="${domainUrlUtil.BASEURL_DOMAIN}/logout">
								<i class="ace-icon fa fa-power-off"></i>
								退出
							</a>
						</li>
					</ul>
				</li>
			</ul> 
		</div>
	</div><!-- /.navbar-container -->
</div>