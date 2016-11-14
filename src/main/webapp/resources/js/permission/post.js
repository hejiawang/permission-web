var permission = permission || {};

/**
 * 岗位js
 * 
 * @author HeJiawang
 * @date   2016.10.12
 */
permission.post = {
	
	/**
	 * 消息
	 */
	message    : {
		netWorkError: '网络异常,请稍后重试!'
	},
		
	common	:	{
		/**
		 * 岗位url
		 */
		myurl	:	permission.domainUrl.baseDomain + '/post',
		
		/**
		 * 岗位列表选中项
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
				postName: {
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
				postName: {
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
	 * 初始化岗位表单
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
					"data" : "postID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectPostID" value="' + data + '"/>';
					},
				}, {
					"title" : "岗位名称",
					"data" : "postName",
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
				$("#example input[name=selectPostID]:eq("+index+")").prop("checked",true);
				$(this).addClass("selected");
				lastSelectItem = index;
			}else{//如果选中
				if(lastSelectItem==index){//如果选的是上一个
			        $("#example input[name=selectPostID]:eq("+lastSelectItem+")").prop("checked",false);
			        $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
			        lastSelectItem = -1;
				}else{
					$("#example input[name=selectPostID]:eq("+lastSelectItem+")").prop("checked",false);
					 $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
					$("#example input[name=selectPostID]:eq("+index+")").prop("checked",true);
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
		var ids = document.getElementsByName("selectPostID");
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
		$("#postNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var postName = $("#postNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?postName=" + postName ).load();
	},
	
	/**
	 * 删除岗位
	 */
	goErase	:	function(){
		var _that = this;
		var postID = _that.goCheck();
		if( postID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase/' + postID;
			
			layer.confirm('确认删除岗位信息！', {
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
	 * 查看岗位
	 */
	goView	:	function(){
		var _that = this;
		var postID = _that.goCheck();
		if( postID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + postID;
			
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
		 $("#postName").val(data.postName);
		 $("#sortNum").val(data.sortNum);
		 $("#theNote").val(data.theNote);
		
		$("#dialog-message").removeClass('hide').dialog({
			modal : true,
			title : "岗位查看",
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
	 * 新增岗位
	 */
	goRaise	:	function(){
		var _that = this;
		
		 $("#validation-form input").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 $("#validation-form textarea").each(function(index){
			 $(this).removeAttr("disabled","");
		 });
		 
		 $("#postID").val("");
		 $("#postName").val("");
		 $("#sortNum").val("");
		 $("#theNote").val("");
		 
		 $("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "新增岗位",
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
	 * 修改机构
	 */
	goModify	:	function(){
		var _that = this;
		var postID = _that.goCheck();
		if( postID != 0 ){
			var goViewUrl = _that.common.myurl + '/view/' + postID;
			
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
		var _that = permission.post;
		
		var data = result.result;
		$("#postID").val(data.postID);
		$("#postName").val(data.postName);
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
		     title: "修改岗位",
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
	}
	
}