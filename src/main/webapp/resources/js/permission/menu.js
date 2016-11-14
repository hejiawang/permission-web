var permission = permission || {};

/**
 * 菜单js
 * 
 * @author HeJiawang
 * @date   2016.10.18
 */
permission.menu = {

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
		 * 菜单url
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
		 * 菜单列表选中项
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
				menuName: {
					required: true,
					maxlength: 100,
				},
				url: {
					required: true,
					maxlength: 100,
				},
				iconStyle: {
					required: true,
					maxlength: 100,
				},
				menuLevel: {
					required: true,
					number: true,
					maxlength: 6,
				},
				parentName: {
					required: true
				},
				operationName: {
					required: true
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
				menuName: {
					required: "必填!",
					maxlength: "最多填写100位字符!"
				},
				url: {
					required: "必填!",
					maxlength: "最多填写100位字符!"
				},
				iconStyle: {
					required: "必填!",
					maxlength: "最多填写100位字符!"
				},
				menuLevel: {
					required: "必填!",
					number: "必须为正整数!",
					maxlength: "最多填写6位数字!"
				},
				parentName: {
					required: "必选!",
				},
				operationName: {
					required: "必选!",
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
				permission.menu.menuTreeBeforeClick(treeId, treeNode);
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
		
		_that.initMenuResource();
		_that.initTable();
		_that.initTree();
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
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page?resourceID=' + treeNode.id).load();
		return true;
	},
	
	/**
	 * 初始化机构表单
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
					"data" : "menuID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectID" value="' + data + '"/>';
					},
				}, {
					"data" : "resourceID",
					"orderable" : false,
					"visible" : false,
				},{
					"title" : "菜单名称",
					"data" : "menuName",
					"orderable" : false,
				}, {
					"title" : "菜单地址",
					"data" : "url",
					"orderable" : false,
				}, {
					"title" : "菜单样式",
					"data" : "iconStyle",
					"orderable" : false,
				}, {
					"title" : "所属系统菜单",
					"data" : "parentMenuName",
					"orderable" : false,
				}, {
					"title" : "级别",
					"data" : "menuLevel",
					"orderable" : false,
				}, {
					"title" : "顺序",
					"data" : "sortNum",
					"orderable" : false,
			} ],
		});

		_that.singleSelectFun();
		_that.pageLengthChangeFun();
		_that.getTableRowData();
	},
	
	/**
	 * 为机构表单绑定点击事件
	 */
	getTableRowData	:	function(){
		var _that = this;
	    var table = $('#example').DataTable();
	    $('#example tbody').on( 'click', 'tr', function () {
	    	_that.common.tableRowDateObj = table.row( this ).data();
	    } );
	},
	
	/**
	 * 为机构表单复选框绑定单选
	 */
	singleSelectFun	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		var lastSelectItem = -1;//-1表示未选中  
		$('#example tbody').on( 'click', 'tr', function () {
			var index = table.row( this ).index();
			if(lastSelectItem<0){//如果未选中
				$("#example input[name=selectID]:eq("+index+")").prop("checked",true);
				$(this).addClass("selected");
				lastSelectItem = index;
			}else{//如果选中
				if(lastSelectItem==index){//如果选的是上一个
			        $("#example input[name=selectID]:eq("+lastSelectItem+")").prop("checked",false);
			        $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
			        lastSelectItem = -1;
				}else{
					$("#example input[name=selectID]:eq("+lastSelectItem+")").prop("checked",false);
					 $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
					$("#example input[name=selectID]:eq("+index+")").prop("checked",true);
					$(this).addClass("selected");
					lastSelectItem = index;	
				}
			}
	    } );
	}, 

	/**
	 * 为机构表单绑定翻页事件
	 */
	pageLengthChangeFun	:	function(){
		var _that = this;
		$('#example').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables();
		} );
	},
	
	/**
	 * 重新加载机构表单
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
		var ids = document.getElementsByName("selectID");
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
		$("#menuNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page?resourceID=" + _that.common.menuTreeNodeID).load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var menuName = $("#menuNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?resourceID=" + _that.common.menuTreeNodeID + "&menuName=" + menuName ).load();
	},
	
	/**
	 * 新增菜单
	 */
	goRaise	:	function(){
		var _that = this;
		
		 $("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#menuName").val("");
         $("#url").val("");
		 $("#iconStyle").val("");
		 $("#sortNum").val("");
		 $("#parentName").val("");
		 $("#parentID").val("");
		 $("#parentType").val("");
		 $("#menuLevel").val("");
		 $("#operationNames").val("");	
		 $("#operationIDs").val("");	
		 $("#theNote").val("");	
		 $("#menuID").val("");	
		 
		 $("#parentName").delegate("","click",function (){
			 _that.parentMenuTrees();
		 });
		 $("#operationNames").delegate("","click",function (){
			 _that.operationTrees();
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "新增菜单",
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

										$.fn.zTree.init($("#treeDemo"), _that.menuTreeSetting);
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
	 * 查看菜单
	 */
	goView	:	function(){
		var _that = this;
		var menuID = _that.goCheck();
		if( menuID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + menuID;
			
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
	 * 查看机构成功的回调函数
	 */
	goViewSuccess	:	function(result){
		 $("#validation-form input").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 
		 var data = result.result;
		 $("#menuName").val(data.menuName);
         $("#url").val(data.url);
		 $("#iconStyle").val(data.iconStyle);
		 $("#sortNum").val(data.sortNum);
		 $("#parentName").val(data.parentName);
		 $("#parentID").val(data.parentID);
		 $("#parentType").val(data.parentType);
		 $("#menuLevel").val(data.menuLevel);
		 $("#operationNames").val(data.operationNames);	
		 $("#operationIDs").val(data.operationIDs);	
		 $("#theNote").val(data.theNote);	
		 $("#menuID").val(data.menuID);	
		
		$("#dialog-message").removeClass('hide').dialog({
			modal : true,
			title : "菜单查看",
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
	 * 删除菜单
	 */
	goErase	:	function(){
		var _that = this;
		var menuID = _that.goCheck();
		if( menuID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase/' + menuID;
			
			layer.confirm('确认删除菜单信息！', {
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
						
						$.fn.zTree.init($("#treeDemo"), _that.menuTreeSetting);
						var table = $('#example').DataTable();
						table.ajax.url(_that.common.myurl + '/page').load();
					}
				});
			}, function(){
			});
		}
	},
	
	/**
	 * 修改菜单
	 */
	goModify	:	function(){
		var _that = this;
		var menuID = _that.goCheck();
		if( menuID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + menuID;
			
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
	 * 修改机构——方法
	 */
	goViewSuccessForModify	:	function(result){
		var _that = permission.org;
		
		var data = result.result;
		 $("#menuName").val(data.menuName);
         $("#url").val(data.url);
		 $("#iconStyle").val(data.iconStyle);
		 $("#sortNum").val(data.sortNum);
		 $("#parentName").val(data.parentName);
		 $("#parentID").val(data.parentID);
		 $("#parentType").val(data.parentType);
		 $("#menuLevel").val(data.menuLevel);
		 $("#operationNames").val(data.operationNames);	
		 $("#operationIDs").val(data.operationIDs);	
		 $("#theNote").val(data.theNote);	
		 $("#menuID").val(data.menuID);	
		
		$("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#parentName").delegate("","click",function (){
			 _that.parentMenuTrees();
		 });
		 $("#operationNames").delegate("","click",function (){
			 _that.operationTrees();
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "修改菜单",
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
										
										$.fn.zTree.init($("#treeDemo"), _that.menuTreeSetting);
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
	 * 所属菜单树
	 */
	parentMenuTrees	:	function() {
		var _that = this;
		
		$.fn.zTree.init($("#parentTree"), _that.parentTreeSetting);
		$("#parentTree-message").removeClass('hide').dialog({
			modal : true,
			title : "所属菜单",
			title_html : true,
			width : 300,
			buttons : [{
				text : "确定",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var zTree = $.fn.zTree.getZTreeObj("parentTree");
					nodes = zTree.getCheckedNodes(true);
					if( nodes.length == 0 ){
						layer.msg("请选择所属菜单");
					}
					var parId = nodes[0].id;
					var parName = nodes[0].name;
					var parentType = nodes[0].stype;
					$("#parentID").val(parId);
					$("#parentName").val(parName);
					$("#parentType").val(parentType);
					if ($(this).dialog("close").length > 0) {
						if( parentType == 'SYS_APP' ){
							 $("#menuLevel").val(1);
						} else {
							var getParentOrgUrl = _that.common.myurl + '/getMenuByResourceID/' + parId;
							$.ajax({
								url : getParentOrgUrl,
								data : {},
								type: "get",
								dataType : 'json',
								success: function(result){
									var data = result.result;
									$("#menuLevel").val(data.menuLevel + 1);
								}
							});
						}
					}
					$(this).dialog("close");
				}
			}, {
				text : "关闭",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					$(this).dialog("close");
				}
			}]
		});
	},
	
	/**
	 * 操作信息
	 */
	operationTrees	:	function(){
		var _that = this;
		
		var menuID = $("#menuID").val();
		$.get( _that.common.operationUrl, {'menuID':menuID}, function(data) {
			var  zNodesRaises = eval(data);
			$.fn.zTree.init($("#operationTree"), _that.operationTreesSettings,zNodesRaises);
		});
		
		var dialogTypes = $("#operationTree-message" ).removeClass('hide').dialog({
			modal: true,
			title: "操作",
			title_html: true,
			width:300,
			buttons: [ 
					{
						text: "取消",
						"class" : "btn btn-primary btn-xs",
						click: function() {
							$(dialogTypes).dialog("close");
						} 
					},
					{
						text: "确认",
						"class" : "btn btn-primary btn-xs",
						click: function() {
							var zTree = $.fn.zTree.getZTreeObj("operationTree");
							nodes = zTree.getCheckedNodes(true);
							if(nodes.length>0){
								var opeIds = "";
								var opeNames ="";
								for (var i=0, l=nodes.length; i<l; i++) {
									opeIds = opeIds+ nodes[i].id+",";
									opeNames = opeNames + nodes[i].name+",";
								} 
								opeIds = opeIds.substring(0, opeIds.length-1);
								opeNames = opeNames.substring(0, opeNames.length-1);
								$("#operationIDs").val(opeIds);
								$("#operationNames").val(opeNames);
								$(dialogTypes).dialog("close");
							}else{
								layer.msg("操作必选！");
							}
						} 
					}
    		]
		});
	}
	
}
