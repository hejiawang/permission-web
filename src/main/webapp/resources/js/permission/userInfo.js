var permission = permission || {}

/**
 * 用户js
 * 
 * @author HeJiawang
 * @date   2016.10.25
 */
permission.userInfo = {
	
	/**
	 * 消息
	 */
	message    : {
		netWorkError: '网络异常,请稍后重试!'
	},
	
	common	:	{
		/**
		 * 用户管理url
		 */
		myurl	:	permission.domainUrl.baseDomain + '/userInfo',
		
		/**
		 * 用户列表选中项
		 */
		tableRowDateObj	:	Object,
		
	},
	
	/**
	 * 数据初始化
	 */
	init	:	function(){
		var _that = this;
		jQuery.ajaxSetup({cache:false});
		
		_that.initTable();
	},
	
	/**
	 * 初始化用户表单
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
	            	"data": "userID",
	          	 	"orderable": false,
	            	"visible": true,
	            	"width":"3%",
			        "render":function ( data, type, full, meta ) {
	                return '<input type="checkbox" name="selectID" value="'+data+'"/>';
	              },	 
	            },
	            {   
	            	"title":"姓名",
	            	"data": "userName",
	            	"width":"12%",
	            	"orderable": false,
	            },
	            {   
	            	"title":"所属机构",
	            	"data": "orgName",
	            	"width":"18%",
	            	"orderable": false,
	            },
	            {
	            	"title":"性别",
	            	"data": "userSex",
	            	"width":"10%",
	            	"orderable": false,
	            },
	            {   
	            	"title":"电话",
	            	"data": "userTel",
	            	"width":"15%",
	            	"orderable": false,
	            },
	            {   
	            	"title":"邮箱",
	            	"data": "userEmail",
	            	"width":"20%",
	            	"orderable": false,
	            },
	            {   
	            	"title":"生日",
	            	"data": "birthday",
	            	"width":"15%",
	            	"orderable": false,
	            },
	            {   
	            	"title":"民族",
	            	"data": "nation",
	            	"width":"10%",
	            	"orderable": false,
	            }],
		});

		_that.singleSelectFun();
		_that.pageLengthChangeFun();
		_that.getTableRowData();
	},
	
	/**
	 * 为表单绑定点击事件
	 */
	getTableRowData	:	function(){
		var _that = this;
	    var table = $('#example').DataTable();
	    $('#example tbody').on( 'click', 'tr', function () {
	    	_that.common.tableRowDateObj = table.row( this ).data();
	    } );
	},
	
	/**
	 * 为表单复选框绑定单选
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
	 * 为表单绑定翻页事件
	 */
	pageLengthChangeFun	:	function(){
		var _that = this;
		$('#example').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables();
		} );
	},
	
	/**
	 * 重新加载表单
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
		$("#userNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var userName = $("#userNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?userName=" + userName ).load();
	},
	
	/**
	 * 新增用户页面——提交
	 */
	submitUserInfo	:	function(){
		var able = $("#able").val();
		if( able == 'raise' ){	//新增用户
			
		} else {  //able == 'modify'  修改用户
			
		} 
	},
	
	/**
	 * 新增用户页面——返回
	 */
	goBack	:	function(){
		$("#saveForm").hide();
		$("#selectAll").show();
	},
	
	/**
	 * 新增用户页面——重置用户信息
	 */
	resetUserInfo	:	function(){
		$("#userCode").val("");
 		$("#userName").val("");
 		$("#userTel").val("");
 		$("#userEmail").val("");
 		$("#userBirthday").val("");
 		$("#userNation").val("");
 		//$("#photoFile").val("");
 		$("#theNote").val("");
 		$("#sortNum").val("");
 		$("#loginName").val("");
 		$("#passWord").val("").removeAttr("placeholder");
 		$("#passWordR").val("").removeAttr("placeholder");
 		
 		$("#orgName").val("");
		$("#orgID").val("");
		$("#postNames").val("");
		$("#postIDs").val("");
		$("#rankNames").val("");
		$("#rankIDs").val("");
		$("#roleNames").val("");
		$("#roleIDs").val("");
		permission.userInfo.photoReset();
	},
	
	/**
	 * 清空验证提示信息
	 */
	clearValidation	:	function(){
		$(".form-group").removeClass("has-error");
		$(".help-block").css("display","none");
	},
	
	/**
	 * 重置上传头像
	 */
	clearDropzone	:	function(){
		//注意这种写法，获得dropzone的对象，不用再init里设置
		var myDropzone = Dropzone.forElement("#dzform");
		myDropzone.removeAllFiles();
	},
	
	/**
	 * 上传头像可用
	 */
	enableDropzone	:	function(){
		var myDropzone = Dropzone.forElement("#dzform");
		myDropzone.enable() ;
	},
	
	/**
	 * 上传头像不可用
	 */
	disableDropzone	:	function(){
		var myDropzone = Dropzone.forElement("#dzform");
		myDropzone.disable() ;
	},
	
	/**
	 * 清空头像图片
	 */
	photoReset	:	function(){
		var myDropzone = Dropzone.forElement("#dzform");
		myDropzone.removeAllFiles() ;
	},
	
	/**
	 * 机构树参数
	 */
	orgTreeSetting	:	{
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
	 * 
	 */
	OrgTrees	:	function(){
		var _that = this;
		
		$.fn.zTree.init($("#orgTree"), _that.orgTreeSetting);
		$("#orgTree-message").removeClass('hide').dialog({
			modal : true,
			title : "所属机构",
			title_html : true,
			width : 300,
			buttons : [{
				text : "确定",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var zTree = $.fn.zTree.getZTreeObj("orgTree");
					nodes = zTree.getCheckedNodes(true);
					if( nodes.length == 0 ){
						layer.msg("请选择所属机构");
					}
					var parId = nodes[0].id;
					var parName = nodes[0].name;
					$("#orgID").val(parId);
					$("#orgName").val(parName);
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
	 * 岗位树参数
	 */
	postTreeSetting : {
		view: {
			selectedMulti: false, 
		},
		check: {
			enable: true
		}
	},
	
	/**
	 * 岗位树
	 */
	postTrees	:	function(){
		$.ajax({
			url : permission.domainUrl.baseDomain + '/post/trees',
			data : {},
			type: "get",
			dataType : 'text',
			success: function( data ){
				$.fn.zTree.init($("#postTree"), permission.userInfo.postTreeSetting, eval(data));
			}
		});
		
		$("#postTree-message").removeClass('hide').dialog({
			modal : true,
			title : "岗位",
			title_html : true,
			width : 300,
			buttons : [{
				text : "确定",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var zTree = $.fn.zTree.getZTreeObj("postTree");
					nodes = zTree.getCheckedNodes(true);
					if( nodes.length == 0 ){
						layer.msg("请选择岗位");
					}
					
					var postIDs = "";
					for (var i=0, l=nodes.length; i<l; i++) {
						postIDs = postIDs+ nodes[i].id+",";
					} 
					postIDs = postIDs.substring(0, postIDs.length-1);
					$("#postIDs").val(postIDs);
					
					var postNames = "";
					for (var i=0, l=nodes.length; i<l; i++) {
						postNames = postNames+ nodes[i].name+",";
					} 
					postNames = postNames.substring(0, postNames.length-1);
					$("#postNames").val(postNames);
					
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
	 * 职级树参数
	 */
	rankTreeSetting	:	{
		
		view: {
			dblClickExpand: false
		},
		check: {
			enable: true,
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		async: {
			enable: true,
			url : permission.domainUrl.baseDomain + '/rank/trees',
			dataType: "text",
			type:"post",
			autoParam: ["id"]
		}, 
		/*callback: {
			onAsyncSuccess: onAsyncSuccessTitleTree,
		},*/
	},
	
	/**
	 * 职级树
	 */
	rankTrees	:	function(){
		var _that = this;
		
		$.fn.zTree.init($("#rankTree"), _that.rankTreeSetting);
		$("#rankTree-message").removeClass('hide').dialog({
			modal : true,
			title : "职级",
			title_html : true,
			width : 300,
			buttons : [{
				text : "确定",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var zTree = $.fn.zTree.getZTreeObj("rankTree");
					nodes = zTree.getCheckedNodes(true);
					if( nodes.length == 0 ){
						layer.msg("请选择职级");
					}
					/*var parId = nodes[0].id;
					var parName = nodes[0].name;
					$("#rankIDs").val(parId);
					$("#rankNames").val(parName);*/
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
	 * 新增用户
	 */
	goRaise	:	function(){
		permission.userInfo.resetUserInfo();
		permission.userInfo.clearDropzone();
		permission.userInfo.enableDropzone();
		permission.userInfo.clearValidation();
		
		$("#orgName").delegate("","click",function (){
			permission.userInfo.OrgTrees();
		});
		$("#postNames").delegate("","click",function (){
			permission.userInfo.postTrees();
		});
		$("#rankNames").delegate("","click",function (){
			permission.userInfo.rankTrees();
		});
		$("#roleNames").delegate("","click",function (){
			permission.userInfo.roleTrees();
		});
		
		$("#update").val("raise");
 		$("#selectAll").hide();
 		$("#saveForm").show();
	},
}