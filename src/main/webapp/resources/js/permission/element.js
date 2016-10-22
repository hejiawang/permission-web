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
					"data" : "elementID",
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
					"data" : "elementName",
					"orderable" : false,
				}, {
					"title" : "菜单地址",
					"data" : "url",
					"orderable" : false,
				}, {
					"title" : "菜单样式",
					"data" : "elementStyle",
					"orderable" : false,
				}, {
					"title" : "所属系统菜单",
					"data" : "parentName",
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
		$("#elementNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page?resourceID=" + _that.common.menuTreeNodeID).load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var menuName = $("#elementNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?resourceID=" + _that.common.menuTreeNodeID + "&elementName=" + element ).load();
	},
	
}
