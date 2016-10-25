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
	            	"data": "userID",
	          	 	"orderable": false,
	            	"visible": true,
	            	"width":"3%",
			        "render":function ( data, type, full, meta ) {
	                return '<input type="checkbox" name="selectID" value="'+data+'"/>';
	              },	 
	            },
				{   
	            	"title":"",
	            	"data": "accountID",
	            	"orderable": false,
	            	"visible": false
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
	
}