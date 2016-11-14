var permission = permission || {};

/**
 * 应用系统js
 * 
 * @author HeJiawang
 * @date   2016.10.17
 */
permission.index = {
	/**
	 * 数据初始化
	 */
	init	:	function(){
		var _that = this;
		
		_that.initMenuResource();
	},
	
	/**
	 * 初始化权限菜单
	 * @date 2016.11.14
	 */
	initMenuResource	:	function(){
		var mid = UrlParm.parm("sid");
		$("#menu_"+UrlParm.parm("sid")).attr("class","active");
		
		$.ajax({
			url : permission.domainUrl.baseDomain + "/permission/core/initElement",
			data : {"menuID" : mid},
			type: "get",
			dataType : 'json',
			success:function(result) {
				$("#elementbut").html(result.result);
			}
		});
	},
}