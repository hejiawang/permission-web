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
		</div>
	</div><!-- /.navbar-container -->
</div>