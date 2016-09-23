<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="zh" style="background-color: #F2F2F2 !important;">
	<head>
		<base href="<%=basePath%>">
		<title>逛大集</title>
		<meta name="keywords" content="逛大集" />
	  	<meta name="description" content="逛大集" />
	    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<%@include file="resource/resource.jsp"%>
		
		<style type="text/css">
		
              .dataTables_length {
                   width: 150px !important;
                   float: right;
                   margin-top:3px;                 
              }
              .tree-btn{
                    position: relative;
                    width: auto;
                    height: auto;
                    float: left;
              }
              .tree-btn-width2{
                    width: 80%;
                    margin-left: 15px;
              }               
              @media (max-width:375px){
                 #row-btn{
                     position: relative;
                     margin-top: 30px;
                     margin-right: 0;
                     margin-left: 8%;
                 }
                 .hr-12, .hr12{
                     margin-left: -40px;
                 }
                 .content_wrap{
                    position: relative;
                    width: 100%;
                    height: auto;
                 }
                 .tree-btn{
                    position: relative;
                    width: 100%;
                    height: auto;
                    float: none;
                    margin-left: 8%;
                 }                            
              }
              .clearfix input[type=text]{
                  width: 75% !important;
              }			    
              .clearfix textarea{
                  width: 75% !important;
              }			    
		</style>
		<script type="text/javascript">
			$(document).ready(function(){
				$("#menu_root").attr("class","");
				$("#menu_"+UrlParm.parm("pid")).attr("class","active open");
				$("#menu_"+UrlParm.parm("sid")).attr("class","active");
				var mid = UrlParm.parm("sid");
				$.post("<%=basePath%>sso/login/listHasElement",{'menuID':mid}, function(data) {
					    $(data).appendTo("#elementbut");					
				});
			});
		</script>
	</head>

	<body class="no-skin">
		<!-- top start -->
		<%@include file="resource/top.jsp"%>
		<!-- top end -->
		<div class="main-container" id="main-container">
			<script type="text/javascript">
				try{ace.settings.check('main-container' , 'fixed');}catch(e){}
			</script>

			<div id="sidebar" class="sidebar                  responsive">
				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'fixed');}catch(e){}
				</script>
				<!-- menu start -->
				<ul id="menu_ul" class="nav nav-list">
				<%=session.getAttribute("menus") %>
				</ul><!-- /.nav-list -->
				<!-- menu end -->
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>

				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'collapsed');}catch(e){}
				</script>
			</div>

			<div class="main-content">
				<div class="breadcrumbs" id="breadcrumbs">
					<script type="text/javascript">
						try{ace.settings.check('breadcrumbs' , 'fixed');}catch(e){}
					</script>

					<ul class="breadcrumb">
						<li>
							<i class="ace-icon fa fa-home home-icon"></i>
							<a href="main/index.jsp">我的工作台</a>
						</li>
						<li>系统管理</li>
						<li class="active">机构管理</li>
					</ul><!-- /.breadcrumb -->

					<!-- search start -->
					<%@include file="resource/search.jsp"%>
					<!-- search end -->
				</div>

				<div class="page-content col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0;">
	
										<div class="zTreeDemoBackground left col-lg-3 col-md-3 col-sm-12 col-xs-12">
											<ul id="treeDemo" class="ztree"></ul>
										</div>
										<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
											 <div class="row">
												<div class="col-xs-12">
													<div id="elementbut" style="padding-bottom: 10px;">
													</div>
											        		        									        
											    </div>	
												<div class="col-xs-12" style="background-color: #F0F0F0; padding-top: 10px; padding-bottom: 10px;">
												    <input class="input-sm" id="orgCodeSerch"  placeholder="查询机构代码"   type="text">
											        <input class="input-sm" id="orgNameSerch" placeholder="查询机构名称" type="text" >
											        <input class="btn btn-info" type="button" value="检索" onclick="goSearch();" style="margin-left: 20px;"/>	
											        <input class="btn btn-info" type="button" value="清空" onclick="goReset();" style="margin-left: 20px;"/>
													<div class="table-responsive">
														<table id="example" class="table table-striped table-bordered table-hover">
														
														</table>  
													</div><!-- /.table-responsive -->
												</div><!-- /span -->
											 </div>
										 </div>
										<div id="parentTree-message" class="hide">
											<div class="zTreeDemoBackground left"  >
													<ul id="parentTree" class="ztree"></ul>
											</div>
										</div>
								<div style="float:left;width:85%;display:none;" id="display">
									<div id="dialog-message"  class="hide">
											<form  class="form-horizontal" id="validation-form" role="form" action="">
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="orgCode"><span style="color:red">*</span>机构编码:</label>
													<div class="col-sm-9">
														<div class="clearfix">
															<input type="text" id="orgCode" name="orgCode"  class="col-xs-10 col-sm-3" />
														</div>	
													</div>
												</div>
												<div class="space-2"></div>
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="orgName"><span style="color:red">*</span>机构名称:</label>
													<div class="col-sm-9">
														<div class="clearfix">
															<input type="text" id="orgName" name="orgName"  class="col-xs-10 col-sm-3" />
															<span for="postName" class="help-block" style="color:red;display:none;" id="orgNameSpan">机构名称重复!</span>
														</div>	
													</div>
												</div>
												<div class="space-2"></div>
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="orgShortName">机构简写:</label>
													<div class="col-sm-9">
														<div class="clearfix">
															<input type="text" id="orgShortName" name="orgShortName"  class="col-xs-10 col-sm-3" />
														</div>	
													</div>
												</div>
												<div class="space-2"></div>
												<div class="form-group" id="orgLevelDiv">
													<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="orgLevel"><span style="color:red">*</span>等级:</label>
													<div class="col-sm-9">
														<div class="clearfix">
															<input type="text" id="orgLevel" name="orgLevel"  class="col-xs-10 col-sm-3" />
														</div>	
													</div>
												</div>
												<div class="space-2"></div>
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="parentID"><span style="color:red">*</span>所属机构:</label>
													<div class="col-sm-9">
														<div class="clearfix">
															<input type="text" id="parentID" name="parentID" readonly="readonly" class="col-xs-10 col-sm-3" />
															<input type="hidden" id="parentOrgID" name="parentOrgID" value=""  class="col-xs-10 col-sm-3" />
														</div>	
													</div>
												</div>
												<div class="space-2"></div>
												<div class="form-group" id="sortNumDiv" style="display:none;">
													<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="sortNum"><span style="color:red">*</span>顺序:</label>
													<div class="col-sm-9">
														<div class="clearfix">
															<input type="text" id="sortNum" name="sortNum"  class="col-xs-10 col-sm-3" />
														</div>	
													</div>		
												</div>	
												<div class="space-2"></div>
												<div class="form-group">
													<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="theNote">备注:</label>
													<div class="col-sm-9">
														<div class="clearfix">
															<textarea class="input-xlarge" id="theNote" name="theNote" maxlength="50"></textarea>
														</div>	
													</div>		
												</div>	
												<input type="hidden" id="orgID" name="orgID"  class="col-xs-10 col-sm-3" />
												<input type="hidden"  id="update" >	
											</form>
									</div><!-- #dialog-message -->
								</div><!-- /row -->
														
														
							</div><!-- /.col -->
						</div><!-- /.row -->
						
						<%@include file="resource/footer.jsp"%>
			            <!-- footer end -->
			            <!-- upper start -->
			            <%@include file="resource/upper.jsp"%>
			            <!-- upper end -->
					</div><!-- /.page-content-area -->
		<!-- inline scripts related to this page -->
<script type="text/javascript">
jQuery.ajaxSetup({cache:false});//ajax不缓存 

var myurl = "<%=basePath%>sysbase/org/page";

var setting = {
	view: {
		selectedMulti: false
	},
	async: {
		enable: true,
		url:"<%=basePath%>sysbase/org/trees",
		dataType: "text",
		type:"post",
		autoParam: ["id"]
	},
	 callback: {
		beforeClick: beforeClick
	} 
};
var nodeId="1001"
function beforeClick(treeId, treeNode) {
		  nodeId = treeNode.id;
		 var table = $('#example').DataTable();
		 table.ajax.url(myurl+"?orgID="+nodeId).load();
		return true;
}
function loads(){
	$.fn.zTree.init($("#treeDemo"), setting);
	/* btn(); */
}

//	window.onload=loads;
$(function(){
	loads();
	initTable();
});



function initTable(){
		$('#example').dataTable({
			  "processing": true,
		      "serverSide": true,
		      "ajax": {
		            "url": myurl,
		            "type": "POST",
		      },
			 "dom": 'rtilp',
			  "language": {
			                "url": "assets/i18n/Chinese.json"
			            },
		      "columns": [
		            { 
		            	"data": "orgID",
		          	 	"orderable": false,
		            	"visible": true,
		            	"width":"5%",
				        "render":function ( data, type, full, meta ) {
		                return '<input type="checkbox" name="selectOrgID" value="'+data+'"/>';
		              },	 
		            },
		            {   
		            	"title":"机构编码",
		            	"data": "orgCode",
		            	"orderable": false,
		            },
		            { 
		            	"title":"机构名称",
		            	"data": "orgName",
		            	"orderable": false,	
		            },
		            { 
		            	"title":"机构简写",
		            	"data": "orgShortName",
		            	"orderable": false,	
		            },
		            { 
		            	"title":"等级",
		            	"data": "orgLevel",
		            	"orderable": false,	
		            },
		            { 
		            	"title":"所属机构",
		            	"data": "parentOrgName",
		            	"orderable": false,	
		            }
		            ,
		            { 
		            	"title":"顺序",
		            	"data": "sortNum",
		            	"orderable": false,	
		            }
		      ],
		});	
	
		singleSelectFun(); 
		pageLengthChangeFun();
		getTableRowData();
}
var tableRowDateObj;
function getTableRowData(){
    var table = $('#example').DataTable();
    $('#example tbody').on( 'click', 'tr', function () {
        tableRowDateObj = table.row( this ).data();
    } );
}
function singleSelectFun(){
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
}

function pageLengthChangeFun(){
	$('#example').on( 'length.dt', function ( e, settings, len ) {
	    reloadDatatables();
	} );
}

function reloadDatatables(){
	 var table = $('#example').DataTable();
	 table.ajax.url(myurl).load();
}


function goRaise(){
	 $("#orgLevelDiv").hide();
	 $("#sortNumDiv").show();
	 $("#update").val("save");
	 $("#buttonDiv").show();
	 $("#orgCode").val("");
	 $("#orgCode").removeAttr("disabled","");
	 $("#orgName").val("");
	 $("#orgName").removeAttr("disabled","");
	 $("#orgShortName").val("");
	 $("#orgShortName").removeAttr("disabled","");
	 $("#parentID").val("");
	 $("#parentID").removeAttr("disabled","");
	 $("#sortNum").val("");
	 $("#sortNum").removeAttr("disabled","");
	 $("#theNote").val("");
	 $("#theNote").removeAttr("disabled","");
	 $("#theNote").css("background-color","");
	 $("#orgLevel").val("");
	 $("#orgLevel").removeAttr("disabled","");
	 $("#parentID").delegate("","click",function (){
		 parentOrgID();
			});
	  
	 $("#dialog-message").removeClass('hide').dialog({
		 modal: true,
	     title: "所属机构新增",
	     title_html: true,
		 width:600,
	     buttons: [ 
					{
						text: "确定",
						"class" : "btn btn-primary btn-xs",
						click: function() {
							if(btn()){
								$( this ).dialog( "close" ); 
							}							
						} 
					},
					{
						text: "关闭",
						"class" : "btn btn-primary btn-xs",
						click: function() {
							$( this ).dialog( "close" ); 
						} 
					}
					
				]
		 });
	 
	}

function parentOrgID(){
	 var settingPar = {
				view: {
					dblClickExpand: false
				},
				check: {
					enable: true,
					chkStyle: "radio",
					radioType: "all"
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				async: {
					enable: true,
					url:"<%=basePath%>sysbase/org/trees",
					dataType: "text",
					type:"post",
					autoParam: ["id"]
				} 
		};
	 $.fn.zTree.init($("#parentTree"), settingPar);
	
	 $("#parentTree-message").removeClass('hide').dialog({
		 modal: true,
	     title: "所属机构",
	     title_html: true,
		 width:300,
	     buttons: [ 
					{
						text: "确定",
						"class" : "btn btn-primary btn-xs",
						click: function() {
								var zTree = $.fn.zTree.getZTreeObj("parentTree");
								nodes = zTree.getCheckedNodes(true);
								var parId = nodes[0].id;
								var parName = nodes[0].name;
							$("#parentOrgID").val(parId);
							$("#parentID").val(parName);
							if($( this ).dialog( "close" ).length>0){
								var url2="<%= basePath%>sysbase/org/acquire/"+parId;
								$.get(url2,{},function(data){
									$("#orgLevel").val(data.orgLevel+1);
								});
							}
								$( this ).dialog( "close" ); 
						} 
					},
					{
						text: "关闭",
						"class" : "btn btn-primary btn-xs",
						click: function() {
							$( this ).dialog( "close" ); 
						} 
					}
					
				]
		 });
	}
	function goModify(){
		 var id = goCheck();
		   if(id=="1001"){
			   alert("根节点，不能允许修改。");
			   return;
		   }
			if(id!=0){
				$("#orgLevelDiv").hide();
				 $("#update").val("update");
				 var url="<%= basePath%>sysbase/org/acquire/"+id;
				 $.get(url,{},function(data){
					// $("#orgCode").removeAttr("disabled","");
					 $("#orgCode").val(data.orgCode);
					// $("#orgName").removeAttr("disabled","");
					 $("#orgName").val(data.orgName);
					// $("#orgShortName").removeAttr("disabled","");
					 $("#orgShortName").val(data.orgShortName);
					// $("#sortNum").removeAttr("disabled","");
					 $("#sortNum").val(data.sortNum);
					// $("#theNote").removeAttr("disabled","");
					 $("#theNote").val(data.theNote);
					// $("#orgLevel").removeAttr("disabled","");
					 $("#orgLevel").val(data.orgLevel);
					 $("#orgID").val(data.orgID);
					 var parentName;
					// $("#parentID").removeAttr("disabled","");
					 
					 $("#validation-form input").each(function(index){
	                     $(this).removeAttr("disabled" ,"" );
	                 });
	                 $( "#validation-form textarea").each(function(index){
	                     $(this).removeAttr("disabled" ,"" );
	                 });
					 if(data.parentOrgID==0){
						 parentName="无";
						 $("#parentID").val(parentName);
						 $("#parentOrgID").val(0);
					}else{
							var url2="<%= basePath%>sysbase/org/acquire/"+data.parentOrgID;
							$.get(url2,{},function(datas){
								 $("#parentID").val(datas.orgName);
								 $("#parentOrgID").val(datas.orgID);
							}); 
						 }
				});
				 $("#parentID").delegate("","click",function (){
					 parentOrgID();
					});
				 $("#dialog-message").removeClass('hide').dialog({
					 modal: true,
				     title: "所属机构修改",
				     title_html: true,
					 width:600,
				     buttons: [ 
								{
									text: "确定",
									"class" : "btn btn-primary btn-xs",
									click: function() {
										
											if(btn()){
												$( this ).dialog( "close" ); 
											}
									} 
								},
								{
									text: "关闭",
									"class" : "btn btn-primary btn-xs",
									click: function() {
										$( this ).dialog( "close" ); 
									} 
								}
								
							]
					 });
			}
	}
	
	function goErase(){
		$("#validation-form .help-block").css("display","none");
		$("#validation-form .form-group").removeClass('has-error').addClass('has-info');
		$("#orgName").css("border-color","#b5b5b5");
        $("#orgNameSpan").css("display","none");
		
		if(confirm("是否确定删除？")){
			$("#display").hide();
			var id = tableRowDateObj.orgID;
			$.post("<%=basePath%>sysbase/org/citation",{'orgID':id}, function(data) {
				if(data.result>0){
					alert("该机关被其他信息引用，不能直接删除");
				}else{
					var url="<%= basePath%>sysbase/org/erase/"+id;
					$.get(url,{orgID:id},function(data){
						$.fn.zTree.init($("#treeDemo"), setting);
						$("#display").hide();
						
						var table = $('#example').DataTable();
		    			table.ajax.url(myurl).load();
					});
				}
			});
	 	}
	}
	
	function goView(){
		var id = goCheck();
		if(id!=0){
			$("#orgLevelDiv").hide();
			var url="<%= basePath%>sysbase/org/acquire/"+id;
			$.get(url,{},function(data){
				 $("#buttonDiv").hide();
				 $("#sortNumDiv").hide();
				 $("#orgCode").val(data.orgCode);
				// $("#orgCode").attr("disabled","disabled");
				 $("#orgName").val(data.orgName);
				// $("#orgName").attr("disabled","disabled");
				 $("#orgShortName").val(data.orgShortName);
				// $("#orgShortName").attr("disabled","disabled");
				// $("#parentID").attr("disabled","disabled");
				 $("#sortNum").val(data.sortNum);
				// $("#sortNum").attr("disabled","disabled");
				 $("#theNote").val(data.theNote);
				// $("#theNote").attr("disabled","disabled");
				// $("#theNote").css("background-color","#ededed");
				 $("#orgLevel").val(data.orgLevel);
				// $("#orgLevel").attr("disabled","disabled");
				 $("#orgID").val(data.orgID);
				 
				 $("#validation-form input").each(function(index){
					 $(this).attr("disabled","disabled");
				 });
				 $("#validation-form textarea").each(function(index){
					 $(this).attr("disabled","disabled");
				 });
				 
				 var parentName;
				 if(data.parentOrgID==0){
					 parentName="无";
					 $("#parentID").val(parentName);
					 }else{
						var url2="<%= basePath%>sysbase/org/acquire/"+data.parentOrgID;
						$.get(url2,{},function(data){
							parentName=data.orgName;
							$("#parentID").val(parentName);
						});
					 }
			});
			
			$("#dialog-message").removeClass('hide').dialog({
				 modal: true,
			     title: "所属机构查看",
			     title_html: true,
				 width:600,
			     buttons: [ 
							{
								text: "关闭",
								"class" : "btn btn-primary btn-xs",
								click: function() {
									$( this ).dialog( "close" ); 
								} 
							}
							
						]
				 });
		}
	}
	
	function btn(){
		console.info($("#validation-form").valid());
			 if($("#validation-form").valid()){				
				var orgCode=$("#orgCode").val();
				var orgName=$("#orgName").val();
				var orgShortName=$("#orgShortName").val();
				if($("#parentID").val()==0){
					$("#parentOrgID").val("0");
					$("#orgLevel").val("1");
				}
				var orgLevel=$("#orgLevel").val();
				var parentOrgID=$("#parentOrgID").val();
				var sortNum=$("#sortNum").val();
				var theNote=$("#theNote").val();
				var update=$("#update").val();
				var verifyURL = "<%=basePath%>sysbase/org/verify";
				if("update"==update){
				  var orgID=$("#orgID").val();	
				  var url="<%=basePath%>sysbase/org/modify"; 
				  $.post(verifyURL,{'orgID':orgID,'orgName':orgName,'parentOrgID':parentOrgID},function(data){
						if(data.result){
							if(confirm("确定要修改吗？")){
					  		$.post(url,{'orgID':orgID,'orgCode':orgCode,'orgName':orgName,'orgShortName':orgShortName,'orgLevel':orgLevel,'parentOrgID':parentOrgID,'sortNum':sortNum,'theNote':theNote},function(data){
					    		if(data.result==1){
					    			alert("修改成功");
					    			$.fn.zTree.init($("#treeDemo"), setting); 
					    			 var table = $('#example').DataTable();
					    			 table.ajax.url(myurl+"?orgID="+parentOrgID).load();
					    		}else{
					    			alert("修改失败");
					    		}
					    		$("#orgName").css("border-color","#b5b5b5");
					            $("#orgNameSpan").css("display","none");
			 				 });
							}
						}else{
							$("#orgName").css("border-color","red");
				            $("#orgNameSpan").css("display","block");
						}
				  });	
						
				}else{
					var url="<%=basePath%>sysbase/org/raise"; 
					$.post(verifyURL,{'orgName':orgName,'parentOrgID':parentOrgID},function(data){
						if(data.result){
					    	$.post(url,{'orgCode':orgCode,'orgName':orgName,'orgShortName':orgShortName,'orgLevel':orgLevel,'parentOrgID':parentOrgID,'sortNum':sortNum,'theNote':theNote},function(data){
					    		if(data.result==1){
					    			alert("添加成功");
					    			$.fn.zTree.init($("#treeDemo"), setting); 
					    			 var table = $('#example').DataTable();
					    			 table.ajax.url(myurl+"?orgID="+parentOrgID).load();
					    			$("#display").hide();
					    		}else{
					    			alert("添加失败");
					    		}
			 				 });
						}
					});
				}
				return true;
			}else{
				return false;
			}
	}	
	
	
	$('#validation-form').validate({
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
	});
	
	  function goCheck(){
			 var ids = document.getElementsByName("selectOrgID");
	   		 var count = 0;
	   		 var id =0;
	   		 for (var i=0;i<ids.length;i++ ){
	   		     if(ids[i].checked){ //判断复选框是否选中
	   		     	count=count+1;
	   		     }
	   		 }
	   		 if(count==0){
//	   			 $("#selectAll").show();
//			  	 $("#saveForm").hide();
	   			 alert("请选择要操作的行！");
	   			 return id;
	   		 }else if(count>1){
//	   			 $("#selectAll").show();
//			  	 $("#saveForm").hide();
	   			 alert("只能操作一行数据！");
	   			 return id;
	   		 }else if(count==1){
	   			for (var i=0;i<ids.length;i++ ){
	   				
	      		     if(ids[i].checked){ 
	      		            id=ids[i].value;
	      		     }
	      		 }
	   			return id;
	   		 }
		}  
	  
	  function goSearch(){
		 var table = $('#example').DataTable();
		 var orgCode = $("#orgCodeSerch").val();
		 var orgName = $("#orgNameSerch").val();
		 table.ajax.url(myurl+"?orgID="+nodeId).load();
		 table.ajax.url( myurl+"?orgID="+nodeId+"&orgCode="+orgCode+"&orgName="+orgName ).load();
	}
	  function goReset(){
		  var table = $('#example').DataTable();
			 $("#orgCodeSerch").val("");
			 $("#orgNameSerch").val("");
			 table.ajax.url( myurl+"?orgID="+nodeId).load();
	  }
  	   $(document).on("keyup","#orgName",function(){       		   
				 $("#orgName").css("border-color","#b5b5b5");
                 $("#orgNameSpan").css("display","none");
  	   });        	   
	
</script>
	</body>
</html>
