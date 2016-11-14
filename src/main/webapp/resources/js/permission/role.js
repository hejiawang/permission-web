var permission = permission || {};

/**
 * 角色js
 * 
 * @author HeJiawang
 * @date   2016.10.14
 */
permission.role = {
	
	/**
	 * 消息
	 */
	message    : {
		netWorkError: '网络异常,请稍后重试!'
	},
		
	common	:	{
		/**
		 * 角色url
		 */
		myurl	:	permission.domainUrl.baseDomain + '/role',
		
		resourceTreeUrl	:	permission.domainUrl.baseDomain + '/resource/trees',
		
		/**
		 * 角色列表选中项
		 */
		tableRowDateObj	: Object,
		
		/**
		 * 表单验证
		 */
		validate : $('#validation-form').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			rules: {
				roleName: {
					required: true,
					maxlength: 100,
				},
				sortNum: {
					required: true,
					number: true,
					maxlength: 6
				},
				theNote: {
					required: false,
					maxlength: 300
				}
			},
			
			messages: {
				roleName: {
					required: "必填!",
					maxlength: "最多填写100位字符!"
				},
				sortNum: {
					required: "必填！",
					number: "必须为正整数!",
					maxlength: "最多填写6位数字!"
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
	 * 资源树参数
	 */
	resourceSetting : {
		view: {
			selectedMulti: false
		},
		async: {
			enable : true,
			url : permission.domainUrl.baseDomain + '/resource/trees',
			dataType : "text",
			type : "get",
			autoParam : ["id","parentType"],
		},
		 callback: {
			beforeClick : function(treeId, treeNode){
				permission.role.resourceTreeBeforeClick(treeId, treeNode);
			} 
		} 
     },
     
     /**
      * 操作树信息
      */
     OperationSetting : {
		view: {
			selectedMulti: false, 
		},
		check: {
			enable: true
		},
		callback: {
			onCheck: function(event, treeId, treeNode){
				permission.role.onCheckOperationTree(event, treeId, treeNode);
			},
		} 
	},
     
	/**
	 * 数据初始化
	 */
	init	:	function(){
		var _that = this;
		
		_that.initMenuResource();
		_that.initTable();
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
	
	/**
	 * 初始化角色表单
	 */
	initTable	:	function(){
		var _that = this;
		$('#example').dataTable({
			"processing" : true,
			"serverSide" : true,
			"ajax" : {
				"url" : _that.common.myurl + '/page',
				"type" : "GET",
			},
			"dom" : 'rtilp',
			"language" : {
				"url" : "resources/i18n/Chinese.json"
			},
			"columns" : [
				{
					"data" : "roleID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectRoleID" value="' + data + '"/>';
					},
				}, {
					"title" : "角色名称",
					"data" : "roleName",
					"orderable" : false,
				}, {
					"title" : "顺序",
					"data" : "sortNum",
					"orderable" : false,
				} , {
					"title" : "备注",
					"data" : "theNote",
					"orderable" : false,
				} ],
		});

		_that.singleSelectFun();
		_that.pageLengthChangeFun();
		_that.getTableRowData();
	},
	
	
	/**
	 * 为角色表单绑定点击事件
	 */
	getTableRowData	:	function(){
		var _that = this;
	    var table = $('#example').DataTable();
	    $('#example tbody').on( 'click', 'tr', function () {
	    	_that.common.tableRowDateObj = table.row( this ).data();
	    } );
	},
	
	/**
	 * 为角色表单复选框绑定单选
	 */
	singleSelectFun	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		var lastSelectItem = -1;//-1表示未选中  
		$('#example tbody').on( 'click', 'tr', function () {
			var index = table.row( this ).index();
			if(lastSelectItem<0){//如果未选中
				$("#example input[name=selectRoleID]:eq("+index+")").prop("checked",true);
				$(this).addClass("selected");
				lastSelectItem = index;
			}else{//如果选中
				if(lastSelectItem==index){//如果选的是上一个
			        $("#example input[name=selectRoleID]:eq("+lastSelectItem+")").prop("checked",false);
			        $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
			        lastSelectItem = -1;
				}else{
					$("#example input[name=selectRoleID]:eq("+lastSelectItem+")").prop("checked",false);
					 $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
					$("#example input[name=selectRoleID]:eq("+index+")").prop("checked",true);
					$(this).addClass("selected");
					lastSelectItem = index;	
				}
			}
	    } );
	}, 

	/**
	 * 为角色表单绑定翻页事件
	 */
	pageLengthChangeFun	:	function(){
		var _that = this;
		$('#example').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables();
		} );
	},
	
	/**
	 * 重新加载角色表单
	 */
	reloadDatatables	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page').load();
	},
	
	/**
	 * 判断是否选中组织列表数据
	 */
	goCheck	:	function(){
		var ids = document.getElementsByName("selectRoleID");
   		var count = 0;
   		var id =0;
   		for (var i=0;i<ids.length;i++ ){
   			if(ids[i].checked){ //判断复选框是否选中
   				count=count+1;
   			}
   		}
   		if(count==0){
   			layer.msg("请选择要操作的行！");
   			return id;
   		}else if(count>1){
   			layer.msg("只能操作一行数据！");
   			return id;
   		}else if(count==1){
   			for (var i=0;i<ids.length;i++ ){
			    if(ids[i].checked){ 
		           id=ids[i].value;
			    }
      		}
   			return id;
   		}
	},
	
	/**
	 * 重置检索框
	 */
	goReset	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		$("#roleNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var roleName = $("#roleNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?roleName=" + roleName ).load();
	},
	
	/**
	 * 删除角色
	 */
	goErase	:	function(){
		var _that = this;
		var roleID = _that.goCheck();
		if( roleID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase/' + roleID;
			
			layer.confirm('确认删除角色信息！', {
				  btn: ['删除','取消'], //按钮
				  shade: false //不显示遮罩
			}, function(){
				$.ajax({
					url : goEraseUrl,
					data : {},
					type: "get",
					dataType : 'json',
					success:function(result) {
						layer.msg(result.message);
						
						var table = $('#example').DataTable();
						table.ajax.url(_that.common.myurl + '/page').load();
					}
				});
			}, function(){
			});
		}
	},
	
	/**
	 * 查看角色
	 */
	goView	:	function(){
		var _that = this;
		var roleID = _that.goCheck();
		if( roleID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + roleID;
			
			$.ajax({
				url : goViewUrl,
				data : {},
				type: "get",
				dataType : 'json',
				success: _that.goViewSuccess
			});
		}
	},
	
	/**
	 * 查看角色成功的回调函数
	 */
	goViewSuccess	:	function(result){
		 $("#validation-form input").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 
		 var data = result.result;
		 $("#roleName").val(data.roleName);
		 $("#sortNum").val(data.sortNum);
		 $("#theNote").val(data.theNote);
		
		$("#dialog-message").removeClass('hide').dialog({
			modal : true,
			title : "角色查看",
			title_html : true,
			width : 600,
			buttons : [ {
				text : "关闭",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$(this).dialog("close");
				}
			} ]
		});
	},
	
	/**
	 * 新增角色
	 */
	goRaise	:	function(){
		var _that = this;
		
		 $("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#roleID").val("");
		 $("#roleName").val("");
		 $("#sortNum").val("");
		 $("#theNote").val("");
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "新增角色",
		     title_html: true,
			 width:600,
		     buttons: [ {
					text: "确定",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						var dialog_that = this;
						if($("#validation-form").valid()){
							var goRaiseUrl = _that.common.myurl + '/raise';
							$.ajax({
								url : goRaiseUrl,
								data : $("#validation-form").serialize(),
								type: "post",
								dataType : 'json',
								success: function( result ){
									layer.msg(result.message);

									if(result.success){
										$( dialog_that ).dialog( "close" ); 

										var table = $('#example').DataTable();
										table.ajax.url(_that.common.myurl + '/page').load();
									}
								}
							});
						}
					} 
				},
				{
					text: "关闭",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						$( this ).dialog( "close" ); 
					} 
				}]
		 });
	},
	
	/**
	 * 修改角色
	 */
	goModify	:	function(){
		var _that = this;
		var roleID = _that.goCheck();
		if( roleID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + roleID;
			
			$.ajax({
				url : goViewUrl,
				data : {},
				type: "get",
				dataType : 'json',
				success: _that.goViewSuccessForModify
			});
		}
	},
	
	/**
	 * 修改角色——方法
	 */
	goViewSuccessForModify	:	function(result){
		var _that = permission.role;
		
		var data = result.result;
		$("#roleID").val(data.roleID);
		$("#roleName").val(data.roleName);
		$("#sortNum").val(data.sortNum);
		$("#theNote").val(data.theNote);
		
		$("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "修改角色",
		     title_html: true,
			 width:600,
		     buttons: [ {
					text: "确定",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						var dialog_that = this;
						if($("#validation-form").valid()){
							var goModifyUrl = _that.common.myurl + '/modify';
							$.ajax({
								url : goModifyUrl,
								data : $("#validation-form").serialize(),
								type: "post",
								dataType : 'json',
								success: function( result ){
									layer.msg(result.message);

									if(result.success){
										$( dialog_that ).dialog( "close" ); 
										
										var table = $('#example').DataTable();
										table.ajax.url(_that.common.myurl + '/page').load();
									}
								}
							});
						}
					} 
				},
				{
					text: "关闭",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						$( this ).dialog( "close" ); 
					} 
				}]
		 });
	},
	
	/**
	 * 权限维护
	 * @author HeJiawang
	 * @date   2016.10.24
	 */
	goPermission	:	function(){
		var _that = this;
		var roleID = _that.goCheck();
		if( roleID != 0 ){
			$("#optr").addClass('hide');
		    $.fn.zTree.init($("#resoureTree"), permission.role.resourceSetting);
			
		    var dialog = $("#trees-message").removeClass('hide').dialog({
				modal: true,
				title: "权限维护",
				title_html: true,
				width:400,
				buttons: [ 
					{
						text: "取消",
						"class" : "btn btn-xs",
						click: function() {
							$( this ).dialog( "close" ); 
						} 
					},{
						text: "授权",
						"class" : "btn btn-primary btn-xs",
						click: function() {
							
							var zTree = $.fn.zTree.getZTreeObj("operationTree");
							nodes = zTree.getCheckedNodes(true);
							var opeIds = "";
							for (var i=0, l=nodes.length; i<l; i++) {
								opeIds = opeIds+ nodes[i].id+",";
							} 
							opeIds = opeIds.substring(0, opeIds.length-1);
							var rTree = $.fn.zTree.getZTreeObj("resoureTree");
							rnodes = rTree.getSelectedNodes(true);
							var resourceID = rnodes[0].id;
							
							$.ajax({
								url : permission.domainUrl.baseDomain + '/role/raisePermission',
								data : {"roleID":roleID,"resourceID":resourceID, 'permissionIDs':opeIds},
								type: "post",
								dataType : 'json',
								success: function( data ){
									alert(data.message);
								}
							});
						}
					}]
			});
		}
	},
	
	/**
	 * app、菜单、页面元素树点击事件
	 * @param treeId
	 * @param treeNode
	 */
	resourceTreeBeforeClick	:	function(treeId, treeNode){
		var _that = this;
		var roleID = _that.goCheck();
		var resourceID = treeNode.id;
		$("#optr").removeClass('hide');
		$.ajax({
			url : permission.domainUrl.baseDomain + '/operation/trees/resource',
			data : {"roleID":roleID,"resourceID":resourceID},
			type: "get",
			dataType : 'text',
			success: function( data ){
				$.fn.zTree.init($("#operationTree"), permission.role.OperationSetting, eval(data));
			}
		});
	},
	
	/**
	 * 操作树选中事件</br>
	 * 当选中删除、修改时，一定会选中可用
	 */
	onCheckOperationTree	:	function(event, treeId, treeNode){
		var zTree = $.fn.zTree.getZTreeObj("operationTree");
		if(treeNode.name == "可用" && treeNode.checked == false){
			zTree.checkAllNodes(false);
		}else if(treeNode.name != "可用" && treeNode.name != "授权" && treeNode.checked == true){
			var node = zTree.getNodeByParam("name","可用");
			if(node!=null){
				zTree.checkNode(node, true);
			}
		}
	},
	
}