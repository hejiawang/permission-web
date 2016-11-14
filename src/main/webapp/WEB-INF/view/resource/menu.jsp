<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<ul class="nav nav-list" id="menu_ul_js">
    <li id="xxx" class="">
        <a href="/index">
            <i class="menu-icon fa fa-tachometer"></i>
            <span class="menu-text" style="font-family: 微软雅黑">单一菜单</span>
        </a>
        <b class="arrow"></b>
    </li>
    
    <li id="baseYYY" class="">
        <a href="javascript:void(0)" class="dropdown-toggle">
            <i class="menu-icon fa fa-list"></i>
            <span class="menu-text" style="font-family: 微软雅黑">集合菜单</span>
            <b class="arrow fa fa-angle-down"></b>
        </a>
        <b class="arrow"></b>
        <ul class="submenu">
            <li id="y1" class="">
                <a href="/sss">
                    <i class="menu-icon fa fa-caret-right"></i>
                    <font style="font-family: 微软雅黑">菜单1</font>
                </a>
                <b class="arrow"></b>
            </li>
            <li id="y2" class="">
                <a href="/ggg">
                    <i class="menu-icon fa fa-caret-right"></i>
                  <font style="font-family: 微软雅黑">菜单2</font>
                </a>
                <b class="arrow"></b>
            </li>
        </ul>
    </li>
</ul><!-- /.nav-list -->

<script type="text/javascript">
	$(function(){
		
		//初始化头部app信息
//		var appID_menu = UrlParm.parm("param_app_id");
		var appID_menu = <%= session.getAttribute("defaultApp")%>;
		$.ajax({
			url : permission.domainUrl.baseDomain + "/permission/core/initMenu",
			data : {"appID":appID_menu},
			type: "get",
			dataType : 'json',
			success:function(result) {
				$("#menu_ul_js").html(result.result);
			}
		});
	});
</script>