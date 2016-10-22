var permission = permission || {};

/**
 * 页面元素js
 * 
 * @author HeJiawang
 * @date   2016.10.22
 */
permission.element = {
	
	/**
	 * 消息
	 */
	message    : {
		netWorkError: '网络异常,请稍后重试!'
	},
	
	/**
	 * 常量
	 */
	common	:	{
		/**
		 * 机构url
		 */
		myurl	:	permission.domainUrl.baseDomain + '/menu',
		
		/**
		 * 菜单树
		 */
		menuTreesUrl	:	permission.domainUrl.baseDomain + '/menu/trees',
		
		/**
		 * 操作信息树
		 */
		operationUrl	:	permission.domainUrl.baseDomain + '/operation/trees/menu',
		
		/**
		 * 机构列表选中项
		 */
		tableRowDateObj	:	Object,
		
		/**
		 * 单击选中的菜单树节点ID
		 */
		menuTreeNodeID	:	-1,
		
		/**
		 * 表单验证
		 */
		validate : $("#validation-form").validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			rules: {
				elementName: {
					required: true,
					maxlength: 50,
				},
				sortNum: {
					required: true,
					number: true,
					maxlength: 6
				},
				elementFunction: {
					required: true,
					maxlength: 50
				},
				elementStyle: {
					required: true,
					maxlength: 50
				},
				parentName: {
					required: true
				},
				operationNames: {
					required: true
				},
				theNote: {
					required: false,
					maxlength: 300
				}
			},
	
			messages: {
				elementName: {
					required: "必填!",
					maxlength: "最多填写50位字符!",
				},
				sortNum: {
					required: "必填!",
					number: "必须为正整数!"
				},
				elementFunction: {
					required: "必填!",
					maxlength: "最多填写50位字符!"
				},
				elementStyle: {
					required: "必填!",
					maxlength: "最多填写50位字符!"
				},
				parentName:{
					required: "必选！"
				},
				operationNames: {
					required: "必选！"
				},
				theNote: {
					maxlength:"最多填写300位字符!"
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
		}),
	},
	
	/**
	 * 菜单树参数
	 */
	menuTreeSetting	:	{
		view: {
			selectedMulti: false
		},
		async: {
			enable: true,
			url:permission.domainUrl.baseDomain + '/menu/trees',
			dataType: "text",
			type:"get",
			autoParam: ["id"]
		},
		callback: {
			beforeClick: function(treeId, treeNode){
				permission.element.menuTreeBeforeClick(treeId, treeNode);
			}
		} 
	},
	
	/**
	 * 父菜单树参数
	 */
	parentTreeSetting	:	{
		view : {
			dblClickExpand : false
		},
		check : {
			enable : true,
			chkStyle : "radio",
			radioType : "all"
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		async : {
			enable : true,
			url : permission.domainUrl.baseDomain + '/menu/trees',
			dataType : "text",
			type : "get",
			autoParam : [ "id" ]
		}
	},
	
	/**
	 * 操作信息树参数
	 */
	operationTreesSettings	:	{
		check: {
			enable: true
		},
		view: {
			selectedMulti: false,
		},
		data: {
			simpleData: {
				enable: true
			}
		}
	},
	
	/**
	 * 数据初始化
	 */
	init	:	function(){
		var _that = this;
		jQuery.ajaxSetup({cache:false});
		
		_that.initTable();
		_that.initTree();
	},
	
	/**
	 * 初始化菜单树
	 */
	initTree	:	function(){
		var _that = this;
		$.fn.zTree.init($("#treeDemo"), _that.menuTreeSetting);
	},
	
	/**
	 * 菜单树点击事件
	 */
	menuTreeBeforeClick	:	function(treeId, treeNode){
		var _that = this
		_that.common.menuTreeNodeID = treeNode.id;
		if( treeNode.stype == 'SYS_APP' ){
			layer.msg("请选择菜单");
			return;
		}
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page?resourceID=' + treeNode.id).load();
		return true;
	},
}
