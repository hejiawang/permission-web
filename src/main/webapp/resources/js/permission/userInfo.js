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
		
		validate	:	$('#validation-form').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			rules: {
				userCode: {
					required: true,
				},
				userName: {
					required: true,
				},
				userSex: {
					required: true,
				},
				userTel: {
					required: true,
					mobile:true
				},
				userEmail: {
					required: true,
					email:true
				}, 
				userBirthday: {
					required: false,
				},
				userNation: {
					required: false,
					maxlength:15
				},
				sortNum: {
					required: true,
					number: true,
				},
				loginName: {
					required: true,
					onlyLetterAndDigit:true,
					minlength:3,
					maxlength:18
				},
				passWord: {
					required: true,
					onlyLetterAndDigit:true,
					minlength:6,
					maxlength:30
				},
				passWordR: {
					onlyLetterAndDigit:true,
					equalTo:"input[name=passWord]"
				},
				orgName: {
					required: true,
				},
				postNames: {
					required: true,
				},
				roleNames: {
					required: true,
				},
				rankNames: {
					required: true,
				},
				theNote: {
					required: false,
					maxlength: 300
				}
			},
	
			messages:  {
				userCode: {
					required: "请输入用户编码",
				},
				userName: {
					required: "请输入姓名",
				},
				userSex: {
					required: "性别必选",
				},
				userTel: {
					required: "请输入手机号",
					isMobile:"请正确填写手机号"
				},
				userEmail: {
					required: "请输入邮箱",
					email:"邮箱格式错误"
				},
				userNation: {
					maxlength: "民族不得超过15位"
				},
				sortNum: {
					required: "请输入顺序",
					number: "必须输入数字"
				},
				loginName: {
					required: "请输入登录账号",
					minlength:"登录名不得少于3位",
					maxlength:"登录名不得超过18位"
				},
				passWord: {
					required: "请输入密码",
					minlength:"密码不得少于6位",
					maxlength:"密码不得超过30位"
				},
				passWordR: {
					equalTo:"两次密码不一致"
				},
				
				orgName: {
					required: "请选择机构",
				},
				postNames: {
					required: "请选择岗位",
				},
				roleNames: {
					required: "请选择权限",
				},
				rankNames: {
					required: "请选择职级",
				},
				theNote: {
					maxlength:"最多填写300位字符!"
				}
			},
	
			invalidHandler: function (event, validator) {   
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
		jQuery.ajaxSetup({cache:false});

		$("#userBirthday").datepicker({
			showOtherMonths: true,
			selectOtherMonths: false,			
			changeMonth: true,
			changeYear: true,
		});
		
		_that.initValidator();
		_that.initTable();
		//_that.initUpload();
	},
	
	/**
	 * 新增验证规则
	 */
	initValidator	:	function(){
		jQuery.validator.addMethod("isMobile", function(value, element) {       
		     var length = value.length;   
		    var mobile = /^(((1[3|5|8|4][0-9]{1}))+\d{8})$/;   
		   return this.optional(element) || (length == 11 && mobile.test(value));       
		}, "请正确填写您的手机号码");   
		
		$.validator.addMethod("onlyLetterAndDigit",function(value, element, params){  
			if(value==""){
				return this.optional(element)
			}else{
				var regex=new RegExp('^[0-9a-zA-Z]+$');  
		        return regex.test(value); 
			}
	         
	    },"只能输入字母或数字"); 
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
	            	"data": "userBirthday",
	            	"width":"15%",
	            	"orderable": false,
	            },
	            {   
	            	"title":"民族",
	            	"data": "userNation",
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
		if($("#validation-form").valid()){
			
			/*var param = {
					userCode : $("#userCode").val(),
					userName : $("#userName").val(),
					userName : $("#userName").val(),
			};*/
			
			var able = $("#able").val();
			if( able == 'raise' ){	//新增用户
				var goRaiseUrl = permission.userInfo.common.myurl + '/raise';
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
			} else {  //able == 'modify'  修改用户
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
		$("#userID").val("");
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
	 * 新增用户页，控件不可用
	 */
	resourceDisable	:	function(){
		$("#form-userinfoAndAccount input").attr("disabled","disabled");
	  	$("#theNote").attr("disabled","disabled");
	  	$("#btn").attr("disabled","disabled");
	  	$("#res").attr("disabled","disabled");
	},
	
	/**
	 * 新增用户页，控件可用
	 */
	resourceRemoveDisable	:	function(){
		$("#form-userinfoAndAccount input").removeAttr("disabled");
	  	$("#theNote").removeAttr("disabled");
	  	$("#btn").removeAttr("disabled");
	  	$("#res").removeAttr("disabled");
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
	 * 上传头像图片
	 */
	initUpload	:	function(){
		 $("#dzform").dropzone({
			 	url : permission.domainUrl.baseDomain + "/file/dropzone/upload" ,
			    paramName: "file", // The name that will be used to transfer the file
			    maxFilesize: 5, // MB
			    maxFiles:1, //最新版本已经修改 如果最大文件为1 则input没有Multiple属性 https://github.com/enyo/dropzone/pull/386/files
			    method:"post",//Defaults to "post" and can be changed to "put" if necessary.
			    
				dictRemoveFile : "删除",
				dictDefaultMessage: "点击或将图片拖动到此区域",
				dictFallbackMessage: "你的浏览器不支持拖动上传",
				dictMaxFilesExceeded: "超过最大图片数量(1张)",
				dictCancelUpload: "取消上传",
				dictCancelUploadConfirmation: "确认要取消上传吗？",
				dictFileTooBig: "上传文件过大(小于0.5MB)",
				dictInvalidFileType: "不支持这种类型的文件",
				dictResponseError: "上传文件时出错",
				
				addRemoveLinks : true,
//				acceptedFiles: ".jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF",
				acceptedFiles: "image/*",
				uploadMultiple: false,
				thumbnailWidth:	100,//if null, the ratio of the image will be used to calculate it.
				thumbnailHeight: 100,//the same as thumbnailWidth. If both are null, images will not be resized.
				
				
				autoProcessQueue: false, // Make sure the files aren't queued until manually added
				previewsContainer: "#preImg", // Define the container to display the previews
				
				 init: function () {
					 	$("#submit-all").hide();
		                var submitButton = document.querySelector("#submit-all");
		                myDropzone = this; // closure

		                //为上传按钮添加点击事件
		                submitButton.addEventListener("click", function () {
		                    //手动上传所有图片
		                    myDropzone.processQueue();
		                });
		                
		                
		                myDropzone.on("maxfilesexceeded", function(file){
		                	myDropzone.removeFile(file);
		                });
		                
		                myDropzone.on("success", function(file,successMessage){
							$("#photoFile").val(successMessage.url);
							$("#previewImg").attr("src","<%=basePath%>"+successMessage.url);
							$("#previewImg").show();
							$("#submit-all").hide();
		                });
		                
		                myDropzone.on("error", function(file,errorMessage){
							if(errorMessage.error!=undefined){
								alert(errorMessage.error);
							}
		                });
		                
		              //当添加图片后的事件，上传按钮恢复可用
		                myDropzone.on("addedfile", function () {
							//如果已经有图片了则删掉已经存在的图片
//							var qFiles = myDropzone.getQueuedFiles();//这个函数是获得处于队列中的文件
							var aFiles = myDropzone.getAcceptedFiles();
							var rFiles = myDropzone.getRejectedFiles();
							if(aFiles.length>0){
								myDropzone.removeFile(aFiles[0]);
							}
							if(rFiles.length>1){
								myDropzone.removeFile(rFiles[0]);
							}
		                    $("#submit-all").show();
		                });
		              
		                //删除图片的事件，当上传的图片为空时，使上传按钮不可用状态
		                myDropzone.on("removedfile", function () {
		                    if (this.getAcceptedFiles().length == 0) {
		                        $("#submit-all").hide();
		                    }
		                });
				 },       
		 });
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
						return false;
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
						return false;
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
			type:"get",
			autoParam: ["id"]
		}
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
					
					var rankIDs = "";
					var rankNames = "";
					for( var i=0; i<nodes.length; i++ ){
						if( ! nodes[i].isParent ){//不存父级职级
							rankIDs = rankIDs + nodes[i].id + ",";
							rankNames = rankNames + nodes[i].name + ",";
						}
					}
					rankIDs = rankIDs.substring(0, rankIDs.length-1);
					rankNames = rankNames.substring(0, rankNames.length-1);
					
					$("#rankIDs").val(rankIDs);
					$("#rankNames").val(rankNames);
					
					if( rankIDs == "" ){	//未选中一个子职级
						layer.msg("请选择职级");
						return false;
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
	 * 角色树参数
	 */
	roleTreeSetting : {
		view: {
			selectedMulti: false, 
		},
		check: {
			enable: true
		}
	},
	
	/**
	 * 角色树
	 */
	roleTrees	:	function(){
		$.ajax({
			url : permission.domainUrl.baseDomain + '/role/trees',
			data : {},
			type: "get",
			dataType : 'text',
			success: function( data ){
				$.fn.zTree.init($("#roleTree"), permission.userInfo.roleTreeSetting, eval(data));
			}
		});
		
		$("#roleTree-message").removeClass('hide').dialog({
			modal : true,
			title : "角色",
			title_html : true,
			width : 300,
			buttons : [{
				text : "确定",
				"class" : "btn btn-primary btn-xs",
				click : function() {
					var zTree = $.fn.zTree.getZTreeObj("roleTree");
					nodes = zTree.getCheckedNodes(true);
					if( nodes.length == 0 ){
						layer.msg("请选择角色");
						return false;
					}
					
					var roleIDs = "";
					var roleNames = "";
					for (var i=0, l=nodes.length; i<l; i++) {
						roleIDs = roleIDs+ nodes[i].id+",";
						roleNames = roleNames+ nodes[i].name+",";
					} 
					roleIDs = roleIDs.substring(0, roleIDs.length-1);
					roleNames = roleNames.substring(0, roleNames.length-1);
					$("#roleIDs").val(roleIDs);
					$("#roleNames").val(roleNames);
					
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
	 * 查看用户回调,显示数据
	 */
	viewCallBack	:	function(data){
		$("#userID").val(data.userID);
		$("#userCode").val(data.userCode);
 		$("#userName").val(data.userName);
 		$("#userTel").val(data.userTel);
 		$("#userEmail").val(data.userEmail);
 		$("#userBirthday").val(data.userBirthday);
 		$("#userNation").val(data.userNation);
 		//$("#photoFile").val("");
 		$("#theNote").val(data.theNote);
 		$("#sortNum").val(data.sortNum);
 		$("#loginName").val(data.loginName);
 		$("#passWord").val("");
 		$("#passWordR").val("");
 		
 		$("#orgName").val(data.orgName);
		$("#orgID").val(data.orgID);
		$("#postNames").val(data.postNames);
		$("#postIDs").val(data.postIDs);
		$("#rankNames").val(data.rankNames);
		$("#rankIDs").val(data.rankIDs);
		$("#roleNames").val(data.roleNames);
		$("#roleIDs").val(data.roleIDs);
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
		
		permission.userInfo.resourceRemoveDisable();
		
		$("#update").val("raise");
 		$("#selectAll").hide();
 		$("#saveForm").show();
	},
	
	/**
	 * 修改用户
	 */
	goModify	:	function(){
		
		var userID = permission.userInfo.goCheck();
		if( userID != 0 ){
			
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
			
			var goViewUrl = permission.userInfo.common.myurl + '/view/' + userID;
			$.ajax({
				url : goViewUrl,
				data : {},
				type: "get",
				dataType : 'json',
				success:function(result) {
					if( result.success ){
						permission.userInfo.viewCallBack(result.result);
						permission.userInfo.resourceRemoveDisable();
						
						$("#update").val("modify");
				 		$("#selectAll").hide();
				 		$("#saveForm").show();
					}
				}
			});
		}
	},
	
	/**
	 * 删除用户
	 */
	goErase	:	function(){
		var userInfoID = permission.userInfo.goCheck();
		if( userInfoID != 0 ){
			var goEraseUrl = permission.userInfo.common.myurl + '/erase/' + userInfoID;
			
			layer.confirm('确认删除该用户！', {
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
						if( result.seccess ){
							table.ajax.url(permission.userInfo.common.myurl + '/page').load();
						}
					}
				});
			}, function(){
			});
		}
	},
	
	/**
	 * 查看用户信息
	 */
	goView	:	function(){
		var userID = permission.userInfo.goCheck();
		if( userID != 0 ){
			var goViewUrl = permission.userInfo.common.myurl + '/view/' + userID;
			$.ajax({
				url : goViewUrl,
				data : {},
				type: "get",
				dataType : 'json',
				success:function(result) {
					if( result.success ){
						permission.userInfo.viewCallBack(result.result);
						permission.userInfo.resourceDisable();
						
					  	$("#selectAll").hide();
					  	$("#saveForm").show();
					}
				}
			});
		}
	},
}
