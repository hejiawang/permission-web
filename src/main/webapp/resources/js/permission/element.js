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
		myurl	:	permission.domainUrl.baseDomain + '/element',
		
		/**
		 * 菜单树
		 */
		menuTreesUrl	:	permission.domainUrl.baseDomain + '/menu/trees',
		
		/**
		 * 操作信息树
		 */
		operationUrl	:	permission.domainUrl.baseDomain + '/operation/trees/element',
		
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
		if( treeNode.stype == 'SYS_APP' ){
			layer.msg("请选择菜单");
			return;
		}
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page?resourceID=' + treeNode.id).load();
		return true;
	},
	
	/**
	 * 初始化页面元素表单
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
					"data" : "elementID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectID" value="' + data + '"/>';
					},
				}, {
					"title" : "名称",
					"data" : "elementName",
					"orderable" : false,
				}, {
					"title" : "方法名称",
					"data" : "elementFunction",
					"orderable" : false,
				}, {
					"title" : "样式",
					"data" : "elementStyle",
					"orderable" : false,
				}, {
					"title" : "排序",
					"data" : "sortNum",
					"orderable" : false,
			} ],
		});

		_that.singleSelectFun();
		_that.pageLengthChangeFun();
		_that.getTableRowData();
	},
	
	/**
	 * 为页面元素表单绑定点击事件
	 */
	getTableRowData	:	function(){
		var _that = this;
	    var table = $('#example').DataTable();
	    $('#example tbody').on( 'click', 'tr', function () {
	    	_that.common.tableRowDateObj = table.row( this ).data();
	    } );
	},
	
	/**
	 * 为页面元素表单复选框绑定单选
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
	 * 为页面元素表单绑定翻页事件
	 */
	pageLengthChangeFun	:	function(){
		var _that = this;
		$('#example').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables();
		} );
	},
	
	/**
	 * 重新加载页面元素表单
	 */
	reloadDatatables	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page').load();
	},
	
	/**
	 * 判断是否选中列表数据
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
		$("#elementNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page?resourceID=" + _that.common.menuTreeNodeID).load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var elementName = $("#elementNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?resourceID=" + _that.common.menuTreeNodeID + "&elementName=" + elementName ).load();
	},
	
	/**
	 * 新增页面元素
	 */
	goRaise	:	function(){
		var _that = this;
		
		 $("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#elementName").val("");
         $("#sortNum").val("");
		 $("#elementFunction").val("");
		 $("#elementStyle").val("");
		 $("#parentName").val("");
		 $("#parentID").val("");
		 $("#operationNames").val("");	
		 $("#operationIDs").val("");	
		 $("#theNote").val("");	
		 $("#elementID").val("");	
		 
		 $("#parentName").delegate("","click",function (){
			 _that.parentMenuTrees();
		 });
		 $("#operationNames").delegate("","click",function (){
			 _that.operationTrees();
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "新增页面元素",
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
	 * 查看页面元素
	 */
	goView	:	function(){
		var _that = this;
		var elementID = _that.goCheck();
		if( elementID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + elementID;
			
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
	 * 查看页面元素成功的回调函数
	 */
	goViewSuccess	:	function(result){
		 $("#validation-form input").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 
		 var data = result.result;
		 $("#elementName").val(data.elementName);
         $("#sortNum").val(data.sortNum);
		 $("#elementFunction").val(data.elementFunction);
		 $("#elementStyle").val(data.elementStyle);
		 $("#parentName").val(data.parentName);
		 $("#parentID").val(data.parentID);
		 $("#operationNames").val(data.operationNames);	
		 $("#operationIDs").val(data.operationIDs);	
		 $("#theNote").val(data.theNote);	
		 $("#elementID").val(data.elementID);	
		
		$("#dialog-message").removeClass('hide').dialog({
			modal : true,
			title : "页面元素查看",
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
	 * 删除页面元素
	 */
	goErase	:	function(){
		var _that = this;
		var elementID = _that.goCheck();
		if( elementID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase/' + elementID;
			
			layer.confirm('确认删除页面元素！', {
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
	 * 修改页面元素
	 */
	goModify	:	function(){
		var _that = this;
		var elementID = _that.goCheck();
		if( elementID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + elementID;
			
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
	 * 修改页面元素——方法
	 */
	goViewSuccessForModify	:	function(result){
		var _that = permission.element;
		
		var data = result.result;
		 $("#elementName").val(data.elementName);
         $("#sortNum").val(data.sortNum);
		 $("#elementFunction").val(data.elementFunction);
		 $("#elementStyle").val(data.elementStyle);
		 $("#parentName").val(data.parentName);
		 $("#parentID").val(data.parentID);
		 $("#operationNames").val(data.operationNames);	
		 $("#operationIDs").val(data.operationIDs);	
		 $("#theNote").val(data.theNote);	
		 $("#elementID").val(data.elementID);
		
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
		     title: "修改页面元素",
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
					
					if( parentType == 'SYS_APP' ){
						layer.msg("请选择菜单");
					}
					$("#parentID").val(parId);
					$("#parentName").val(parName);
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
		
		var elementID = $("#elementID").val();
		$.get( _that.common.operationUrl, {'elementID':elementID}, function(data) {
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
