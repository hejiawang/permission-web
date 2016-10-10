var permission = permission || {};

/**
 * 机构js
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
		myurl	:	permission.domainUrl.baseDomain + '/org',
		tableRowDateObj	: Object,
	},
		
	/**
	 * 数据初始化
	 */
	init	:	function(){
		var _that = this;
		jQuery.ajaxSetup({cache:false});
		
		_that.bindEvent();
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
	 * 为按钮绑定事件
	 */
	bindEvent	:	function(){
		
	}

}