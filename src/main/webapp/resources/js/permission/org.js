var permission = permission || {};

/**
 * 机构js
 * 
 * @author HeJiawang
 * @date   2016.10.10
 */
permission.org = {
	
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
		myurl	:	permission.domainUrl.baseDomain + '/org',
		
		/**
		 * 机构列表选中项
		 */
		tableRowDateObj	: Object,
		
		/**
		 * 机构节点
		 */
		nodeId	: 1001,
		
		/**
		 * 表单验证
		 */
		validate : $('#validation-form').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			rules: {
				orgCode: {
					required: true,
					maxlength: 50,
				},
				orgName: {
					required: true,
					maxlength: 100,
				},
				orgShortName: {
					required: false,
					maxlength: 30,
				},
				parentID: {
					required: true
				},
				orgLevel: {
					required: true,
					number: true,
					maxlength: 6,
				},
				parentOrgID: {
					required: false
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
				orgCode: {
					required: "必填!",
					maxlength: "最多填写50位字符!"
				},
				orgName: {
					required: "必填!",
					maxlength: "最多填写100位字符!"
				},
				orgShortName: {
					maxlength: "最多填写30位字符!"
				},
				parentID: {
					required: "必填!"
				},
				orgLevel: {
					required: "必填!",
					number: "必须为正整数!",
					maxlength: "最多填写6位数字!"
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
	 * 机构树参数
	 */
	treeSetting	:	{
		view: {
			selectedMulti: false
		},
		async: {
			enable		:	true,
			url			:	permission.domainUrl.baseDomain + '/org/trees',
			dataType	:	"text",
			type		:	"get",
			autoParam	:	["id"]
		},
		callback: {
			beforeClick	: 	function(treeId, treeNode){
				permission.org.treeBeforeClick(treeId, treeNode);
			}
		} 
	},
	
	/**
	 * 父机构树参数
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
			url : permission.domainUrl.baseDomain + '/org/trees',
			dataType : "text",
			type : "get",
			autoParam : [ "id" ]
		}
	},
	
	/**
	 * 数据初始化
	 */
	init	:	function(){
		var _that = this;
		jQuery.ajaxSetup({cache:false});
		
		_that.initTree();
		_that.initTable();
	},
	
	
	
	/**
	 * 初始化机构树
	 */
	initTree	:	function(){
		var _that = this;
		$.fn.zTree.init($("#treeDemo"), _that.treeSetting);
	},
	
	/**
	 * 机构树点击事件
	 */
	treeBeforeClick	:	function( treeId, treeNode ){
		var _that = this
		_that.common.nodeId = treeNode.id;
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page?orgID=' + treeNode.id).load();
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
					"data" : "orgID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectOrgID" value="' + data + '"/>';
					},
				}, {
					"title" : "机构编码",
					"data" : "orgCode",
					"orderable" : false,
				}, {
					"title" : "机构名称",
					"data" : "orgName",
					"orderable" : false,
				}, {
					"title" : "机构简写",
					"data" : "orgShortName",
					"orderable" : false,
				}, {
					"title" : "等级",
					"data" : "orgLevel",
					"orderable" : false,
				}, {
					"title" : "所属机构",
					"data" : "parentOrgName",
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
				$("#example input[name=selectOrgID]:eq("+index+")").prop("checked",true);
				$(this).addClass("selected");
				lastSelectItem = index;
			}else{//如果选中
				if(lastSelectItem==index){//如果选的是上一个
			        $("#example input[name=selectOrgID]:eq("+lastSelectItem+")").prop("checked",false);
			        $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
			        lastSelectItem = -1;
				}else{
					$("#example input[name=selectOrgID]:eq("+lastSelectItem+")").prop("checked",false);
					 $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
					$("#example input[name=selectOrgID]:eq("+index+")").prop("checked",true);
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
		var ids = document.getElementsByName("selectOrgID");
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
		$("#orgCodeSerch").val("");
		$("#orgNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page?orgID=" + _that.common.nodeId).load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var orgCode = $("#orgCodeSerch").val();
		var orgName = $("#orgNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?orgID=" + _that.common.nodeId + "&orgCode=" + orgCode + "&orgName=" + orgName ).load();
	},
	
	/**
	 * 所属机构树
	 */
	parentOrgTrees : function() {
		var _that = this;
		
		$.fn.zTree.init($("#parentTree"), _that.parentTreeSetting);
		$("#parentTree-message").removeClass('hide').dialog({
			modal : true,
			title : "所属机构",
			title_html : true,
			width : 300,
			buttons : [{
				text : "确定",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var zTree = $.fn.zTree.getZTreeObj("parentTree");
					nodes = zTree.getCheckedNodes(true);
					if( nodes.length == 0 ){
						layer.msg("请选择所属机构");
					}
					var parId = nodes[0].id;
					var parName = nodes[0].name;
					$("#parentOrgID").val(parId);
					$("#parentID").val(parName);
					if ($(this).dialog("close").length > 0) {
						
						var getParentOrgUrl = _that.common.myurl + '/view/' + parId;
						$.ajax({
							url : getParentOrgUrl,
							data : {},
							type: "get",
							dataType : 'json',
							success: function(result){
								 var data = result.result;
								 $("#orgLevel").val(data.orgLevel + 1);
							}
						});
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
	 * 新增机构
	 */
	goRaise	:	function(){
		var _that = this;
		
		 $("#validation-form input").each(function(index){
			 
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#orgID").val("");
		 $("#orgCode").val("");
		 $("#orgName").val("");
		 $("#orgShortName").val("");
		 $("#orgLevel").val("");
		 $("#parentID").val("");
		 $("#parentOrgID").val("");
		 $("#sortNum").val("");
		 $("#theNote").val("");
		 
		 $("#parentID").delegate("","click",function (){
			 _that.parentOrgTrees();
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "所属机构新增",
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

										$.fn.zTree.init($("#treeDemo"), _that.treeSetting);
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
	 * 修改机构
	 */
	goModify	:	function(){
		var _that = this;
		var orgID = _that.goCheck();
		if( orgID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + orgID;
			
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
		$("#orgID").val(data.orgID);
		$("#orgCode").val(data.orgCode);
		$("#orgName").val(data.orgName);
		$("#orgShortName").val(data.orgShortName);
		$("#orgLevel").val(data.orgLevel);
		$("#parentID").val(data.parentOrgName);
		$("#parentOrgID").val(data.parentOrgID);
		$("#sortNum").val(data.sortNum);
		$("#theNote").val(data.theNote);
		
		$("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#parentID").delegate("","click",function (){
			 _that.parentOrgTrees();
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "所属机构修改",
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
										
										$.fn.zTree.init($("#treeDemo"), _that.treeSetting);
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
	 * 查看机构
	 */
	goView	:	function(){
		var _that = this;
		var orgID = _that.goCheck();
		if( orgID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + orgID;
			
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
		 $("#orgCode").val(data.orgCode);
		 $("#orgName").val(data.orgName);
		 $("#orgShortName").val(data.orgShortName);
		 $("#orgLevel").val(data.orgLevel);
		 $("#parentID").val(data.parentOrgName);
		 $("#sortNum").val(data.sortNum);
		 $("#theNote").val(data.theNote);
		
		$("#dialog-message").removeClass('hide').dialog({
			modal : true,
			title : "机构查看",
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
	 * 删除机构
	 */
	goErase	:	function(){
		var _that = this;
		var orgID = _that.goCheck();
		if( orgID != 0 ){
			if( orgID == 1001 ){
				layer.msg("机构树信息不可删除");
			}
			
			var goEraseUrl = _that.common.myurl + '/erase/' + orgID;
			
			layer.confirm('确认删除机构信息！', {
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
						
						$.fn.zTree.init($("#treeDemo"), _that.treeSetting);
						
						var table = $('#example').DataTable();
						table.ajax.url(_that.common.myurl + '/page').load();
					}
				});
			}, function(){
			});
		}
	}

}