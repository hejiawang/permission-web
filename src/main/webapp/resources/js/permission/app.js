var permission = permission || {};

/**
 * 应用系统js
 * 
 * @author HeJiawang
 * @date   2016.10.17
 */
permission.app = {
		
	/**
	 * 消息
	 */
	message    : {
		netWorkError: '网络异常,请稍后重试!'
	},
		
	common	:	{
		/**
		 * 应用系统url
		 */
		myurl	:	permission.domainUrl.baseDomain + '/app',
		
		/**
		 * 系统类型树
		 */
		appTypeTreesUrl	:	permission.domainUrl.baseDomain + '/appType/trees',
		
		/**
		 * 操作信息树
		 */
		operationUrl	:	permission.domainUrl.baseDomain + '/operation/trees/app',
		
		/**
		 * 应用系统列表选中项
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
				appTypeID: {
					required: true,
				},
				appName: {
					required: true,
					maxlength: 50
				},
				operationID: {
					required: true,
				},
				url: {
					required: true,
					maxlength: 100
				},
				iconStyle: {
					maxlength: 100
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
				appTypeID: {
					required: "类型必选!",
				},
				appName: {
					required: "名称必填",
					maxlength: "最多填写50位字符!"
				},
				operationID: {
					required: "操作必选!",
				},
				url: {
					required: "链接必填",
					maxlength: "最多填写100位字符!"
				},
				iconStyle: {
					maxlength: "最多填写100位字符!"
				},
				sortNum: {
					required: "排序必填!",
					number: "必须为正整数!",
					maxlength:"最多填写6位数字!"
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
	 * 系统类型树设置参数
	 */
	appTypeTreesSetting	:	{
		check: {
				enable: true,
				chkStyle: "radio",
				radioType: "all"
		},
		view: {
				dblClickExpand: false
		},
		data: {
				simpleData: {
					enable: true
				}
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
		
		_that.initTable();
	},
	
	/**
	 * 初始化应用系统表单
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
	            	"data": "appID",
	          	 	"orderable": false,
	            	"visible": true,
	            	"width":"5%",
			        "render":function ( data, type, full, meta ) {
			        	return '<input type="checkbox" name="selectAppID" value="'+data+'"/>';
			        },	 
	            },
	             {   
	            	"title":"",
	            	"data": "appTypeID",
	            	"orderable": false,
	            	"visible": false
	            },
	            { 
	            	"title":"类型", 
	            	"data": "appTypeName", 
	            	"orderable": false,
	            	"visible": true
	            },
	            { 
	            	"title":"名称", 
	            	"data": "appName", 
	            	"orderable": false,
	            	"visible": true
	            },
	            {   
	            	"title":"链接",
	            	"data": "url",
	            	"orderable": false,
	            	"visible": true
	            },
	             {   
	            	"title":"",
	            	"data": "iconStyle",
	            	"orderable": false,
	            	"visible": false
	            },
	            {   
	            	"title":"排序",
	            	"data": "sortNum",
	            	"orderable": false,
	            	"visible": true
	            },
	            {   
	            	"title":"",
	            	"data": "isDelete",
	            	"orderable": false,
	            	"visible": false
	            },
	            {   
	            	"title":"",
	            	"data": "isCurrent",
	            	"orderable": false,
	            	"visible": false
	            },
	            {   
	            	"title":"",
	            	"data": "theNote",
	            	"orderable": false,
	            	"visible": false
	            }
	      ],
		});

		_that.singleSelectFun();
		_that.pageLengthChangeFun();
		_that.getTableRowData();
	},
	
	
	/**
	 * 为应用系统表单绑定点击事件
	 */
	getTableRowData	:	function(){
		var _that = this;
	    var table = $('#example').DataTable();
	    $('#example tbody').on( 'click', 'tr', function () {
	    	_that.common.tableRowDateObj = table.row( this ).data();
	    } );
	},
	
	/**
	 * 为应用系统表单复选框绑定单选
	 */
	singleSelectFun	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		var lastSelectItem = -1;//-1表示未选中  
		$('#example tbody').on( 'click', 'tr', function () {
			var index = table.row( this ).index();
			if(lastSelectItem<0){//如果未选中
				$("#example input[name=selectAppID]:eq("+index+")").prop("checked",true);
				$(this).addClass("selected");
				lastSelectItem = index;
			}else{//如果选中
				if(lastSelectItem==index){//如果选的是上一个
			        $("#example input[name=selectAppID]:eq("+lastSelectItem+")").prop("checked",false);
			        $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
			        lastSelectItem = -1;
				}else{
					$("#example input[name=selectAppID]:eq("+lastSelectItem+")").prop("checked",false);
					 $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
					$("#example input[name=selectAppID]:eq("+index+")").prop("checked",true);
					$(this).addClass("selected");
					lastSelectItem = index;	
				}
			}
	    } );
	}, 

	/**
	 * 为系统类型表单绑定翻页事件
	 */
	pageLengthChangeFun	:	function(){
		var _that = this;
		$('#example').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables();
		} );
	},
	
	/**
	 * 重新加载系统类型表单
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
		var ids = document.getElementsByName("selectAppID");
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
		$("#appNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var appName = $("#appNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?appName=" + appName ).load();
	},
	
	/**
	 * 删除系统类型
	 */
	goErase	:	function(){
		var _that = this;
		var appID = _that.goCheck();
		if( appID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase/' + appID;
			
			layer.confirm('确认删除应用系统信息！', {
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
	 * 查看应用系统
	 */
	goView	:	function(){
		var _that = this;
		var appID = _that.goCheck();
		if( appID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + appID;
			
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
	 * 查看应用系统成功的回调函数
	 */
	goViewSuccess	:	function(result){
		 $("#validation-form input").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 
		 var data = result.result;
		 $("#appTypeID").val(data.appTypeID);
         $("#appTypeName").val(data.appTypeName);
		 $("#appName").val(data.appName);
		 $("#operationName").val(data.operationNames);
		 $("#operationID").val(data.operationIDs);
		 $("#url").val(data.url);
		 $("#iconStyle").val(data.iconStyle);
		 $("#sortNum").val(data.sortNum);
		 $("#theNote").val(data.theNote);	
		 $("#appID").val(data.appID);	
		
		$("#dialog-message").removeClass('hide').dialog({
			modal : true,
			title : "系统类型查看",
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
	 * 新增应用系统
	 */
	goRaise	:	function(){
		var _that = this;
		
		 $("#validation-form input").each(function(index){
			 
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#appTypeID").val("");
         $("#appTypeName").val("");
		 $("#appName").val("");
		 $("#operationName").val("");
		 $("#operationID").val("");
		 $("#url").val("");
		 $("#iconStyle").val("");
		 $("#sortNum").val("");
		 $("#theNote").val("");	
		 $("#appID").val("");	
		 
		 $("#appTypeName").delegate("","click",function (){
			 _that.appTypeTrees();
		 });
		 $("#operationName").delegate("","click",function (){
			 _that.operationTrees();
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "新增应用系统",
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
	 * 修改应用系统
	 */
	goModify	:	function(){
		var _that = this;
		var appID = _that.goCheck();
		if( appID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + appID;
			
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
		var _that = permission.app;
		
		var data = result.result;
		 $("#appTypeID").val(data.appTypeID);
         $("#appTypeName").val(data.appTypeName);
		 $("#appName").val(data.appName);
		 $("#operationName").val(data.operationNames);
		 $("#operationID").val(data.operationIDs);
		 $("#url").val(data.url);
		 $("#iconStyle").val(data.iconStyle);
		 $("#sortNum").val(data.sortNum);
		 $("#theNote").val(data.theNote);	
		 $("#appID").val(data.appID);
		
		$("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#appTypeName").delegate("","click",function (){
			 _that.appTypeTrees();
		 });
		 $("#operationName").delegate("","click",function (){
			 _that.operationTrees();
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "所属应用系统",
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
	 * 应用系统所属类型
	 */
	appTypeTrees	:	function(){
		var _that = this;
		
		var appTypeID = $("#appTypeID").val();
		$.get(_that.common.appTypeTreesUrl, {'id':appTypeID}, function(data) {
			var zNodesRaise = eval(data);
			$.fn.zTree.init($("#appTypeTree"), _that.appTypeTreesSetting, zNodesRaise);
		});
		
		var dialogType = $("#appTypeTree-message" ).removeClass('hide').dialog({
				modal: true,
				title: "系统类型",
				title_html: true,
				width:300,
				buttons: [ 
						{
							text: "取消",
							"class" : "btn btn-primary btn-xs",
							click: function() {
								$(dialogType).dialog("close");
							} 
						},
						{
							text: "确认",
							"class" : "btn btn-primary btn-xs",
							click: function() {
								var zTree = $.fn.zTree.getZTreeObj("appTypeTree");
								nodes = zTree.getCheckedNodes(true);
								if(nodes.length>0){
									var typeID = nodes[0].id;
 									var typeName = nodes[0].name;
 									$("#appTypeID").val(typeID);
 									$("#appTypeName").val(typeName);
 									$(dialogType).dialog("close");
								}else{
									layer.msg("类型必选！");
								}
							} 
						}
    		]
 		});
	},
	
	/**
	 * 操作信息
	 */
	operationTrees	:	function(){
		var _that = this;
		
		var appID = $("#appID").val();
		$.get( _that.common.operationUrl, {'appID':appID}, function(data) {
			var  zNodesRaises = eval(data);
			$.fn.zTree.init($("#appopTree"), _that.operationTreesSettings,zNodesRaises);
		});
		
		var dialogTypes = $("#appopTree-message" ).removeClass('hide').dialog({
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
							var zTree = $.fn.zTree.getZTreeObj("appopTree");
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
								$("#operationID").val(opeIds);
								$("#operationName").val(opeNames);
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