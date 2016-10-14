var permission = permission || {};

/**
 * 职级js
 * 
 * @author HeJiawang
 * @date   2016.10.12
 */
permission.rank = {

	/**
	 * 消息
	 */
	message    : {
		netWorkError: '网络异常,请稍后重试!'
	},
	
	common	:	{
		/**
		 * 职级url
		 */
		myurl	:	permission.domainUrl.baseDomain + '/rank',
		
		/**
		 * 职级列表选中项
		 */
		tableRowDateObj	: Object,
		
		/**
		 * 职级节点
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
				rankName: {
					required: true,
					maxlength: 100,
				},
				parentID: {
					required: true
				},
				rankLevel: {
					required: true,
					number: true,
					maxlength: 6,
				},
				parentRankID: {
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
				rankName: {
					required: "必填!",
					maxlength: "最多填写100位字符!"
				},
				parentID: {
					required: "必填!"
				},
				rankLevel: {
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
	 * 职级树参数
	 */
	treeSetting	:	{
		view: {
			selectedMulti: false
		},
		async: {
			enable		:	true,
			url			:	permission.domainUrl.baseDomain + '/rank/trees',
			dataType	:	"text",
			type		:	"get",
			autoParam	:	["id"]
		},
		callback: {
			beforeClick	: 	function(treeId, treeNode){
				permission.rank.treeBeforeClick(treeId, treeNode);
			}
		} 
	},
	
	/**
	 * 父职级树参数
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
			url : permission.domainUrl.baseDomain + '/rank/trees',
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
		
		_that.initTree();
		_that.initTable();
	},
	
	/**
	 * 初始化职级树
	 */
	initTree	:	function(){
		var _that = this;
		$.fn.zTree.init($("#treeDemo"), _that.treeSetting);
	},
	
	/**
	 * 职级树点击事件
	 */
	treeBeforeClick	:	function( treeId, treeNode ){
		var _that = this
		_that.common.nodeId = treeNode.id;
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page?rankID=' + treeNode.id).load();
		return true;
	},
	
	/**
	 * 初始化职级表单
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
					"data" : "rankID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectRankID" value="' + data + '"/>';
					},
				}, {
					"title" : "职级名称",
					"data" : "rankName",
					"orderable" : false,
				}, {
					"title" : "等级",
					"data" : "rankLevel",
					"orderable" : false,
				}, {
					"title" : "所属职级",
					"data" : "parentRankName",
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
	 * 为职级表单绑定点击事件
	 */
	getTableRowData	:	function(){
		var _that = this;
	    var table = $('#example').DataTable();
	    $('#example tbody').on( 'click', 'tr', function () {
	    	_that.common.tableRowDateObj = table.row( this ).data();
	    } );
	},
	
	/**
	 * 为职级表单复选框绑定单选
	 */
	singleSelectFun	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		var lastSelectItem = -1;//-1表示未选中  
		$('#example tbody').on( 'click', 'tr', function () {
			var index = table.row( this ).index();
			if(lastSelectItem<0){//如果未选中
				$("#example input[name=selectRankID]:eq("+index+")").prop("checked",true);
				$(this).addClass("selected");
				lastSelectItem = index;
			}else{//如果选中
				if(lastSelectItem==index){//如果选的是上一个
			        $("#example input[name=selectRankID]:eq("+lastSelectItem+")").prop("checked",false);
			        $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
			        lastSelectItem = -1;
				}else{
					$("#example input[name=selectRankID]:eq("+lastSelectItem+")").prop("checked",false);
					 $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
					$("#example input[name=selectRankID]:eq("+index+")").prop("checked",true);
					$(this).addClass("selected");
					lastSelectItem = index;	
				}
			}
	    } );
	}, 

	/**
	 * 为职级表单绑定翻页事件
	 */
	pageLengthChangeFun	:	function(){
		var _that = this;
		$('#example').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables();
		} );
	},
	
	/**
	 * 重新加载职级表单
	 */
	reloadDatatables	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page').load();
	},
	
	/**
	 * 判断是否选中职级列表数据
	 */
	goCheck	:	function(){
		var ids = document.getElementsByName("selectRankID");
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
		$("#rankNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page?rankID=" + _that.common.nodeId).load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var rankName = $("#rankNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?rankID=" + _that.common.nodeId + "&rankName=" + rankName ).load();
	},
	
	/**
	 * 所属职级树
	 */
	parentRankTrees : function() {
		var _that = this;
		
		$.fn.zTree.init($("#parentTree"), _that.parentTreeSetting);
		$("#parentTree-message").removeClass('hide').dialog({
			modal : true,
			title : "所属职级",
			title_html : true,
			width : 300,
			buttons : [{
				text : "确定",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var zTree = $.fn.zTree.getZTreeObj("parentTree");
					nodes = zTree.getCheckedNodes(true);
					if( nodes.length == 0 ){
						layer.msg("请选择所属职级");
					}
					var parId = nodes[0].id;
					var parName = nodes[0].name;
					$("#parentRankID").val(parId);
					$("#parentID").val(parName);
					if ($(this).dialog("close").length > 0) {
						
						var getParentRankUrl = _that.common.myurl + '/view/' + parId;
						$.ajax({
							url : getParentRankUrl,
							data : {},
							type: "get",
							dataType : 'json',
							success: function(result){
								 var data = result.result;
								 $("#rankLevel").val(data.rankLevel + 1);
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
	 * 新增职级
	 */
	goRaise	:	function(){
		var _that = this;
		
		 $("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#rankID").val("");
		 $("#rankName").val("");
		 $("#rankLevel").val("");
		 $("#parentID").val("");
		 $("#parentRankID").val("");
		 $("#sortNum").val("");
		 $("#theNote").val("");
		 
		 $("#parentID").delegate("","click",function (){
			 _that.parentRankTrees();
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "新增职级",
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
	 * 修改职级
	 */
	goModify	:	function(){
		var _that = this;
		var rankID = _that.goCheck();
		if( rankID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + rankID;
			
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
	 * 修改职级——方法
	 */
	goViewSuccessForModify	:	function(result){
		var _that = permission.rank;
		
		var data = result.result;
		$("#rankID").val(data.rankID);
		$("#rankName").val(data.rankName);
		$("#rankLevel").val(data.rankLevel);
		$("#parentID").val(data.parentRankName);
		$("#parentRankID").val(data.parentRankID);
		$("#sortNum").val(data.sortNum);
		$("#theNote").val(data.theNote);
		
		$("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#parentID").delegate("","click",function (){
			 _that.parentRankTrees();
		 });
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "修改职级",
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
	 * 查看职级
	 */
	goView	:	function(){
		var _that = this;
		var rankID = _that.goCheck();
		if( rankID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + rankID;
			
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
	 * 查看职级成功的回调函数
	 */
	goViewSuccess	:	function(result){
		 $("#validation-form input").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).attr("disabled","disabled");
		 });
		 
		 var data = result.result;
		 $("#rankName").val(data.rankName);
		 $("#rankLevel").val(data.rankLevel);
		 $("#parentID").val(data.parentRankName);
		 $("#sortNum").val(data.sortNum);
		 $("#theNote").val(data.theNote);
		
		$("#dialog-message").removeClass('hide').dialog({
			modal : true,
			title : "职级查看",
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
	 * 删除职级
	 */
	goErase	:	function(){
		var _that = this;
		var rankID = _that.goCheck();
		if( rankID != 0 ){
			if( rankID == 1001 ){
				layer.msg("职级树信息不可删除");
			}
			
			var goEraseUrl = _that.common.myurl + '/erase/' + rankID;
			
			layer.confirm('确认删除职级信息！', {
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