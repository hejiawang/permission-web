<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="zh">
<head>
	<base href="<%=basePath%>">
 	<title>权限管理系统</title>
	<meta name="keywords" content="权限管理" />
  	<meta name="description" content="权限管理" />
	<%@include file="../resource/resource.jsp"%>
	<style type="text/css">
			  .dataTables_length {
                   width: 160px !important;
                   height: 25px;
                   float: right;
                   margin-top:13px;                 
              }
              
              .dataTables_length label{
                   height: 25px;
                   
                   text-align: left;
              }              
              .dataTables_info{
                   position: relative;
                   float: left;
                   top: 13px;
              }
             .dataTables_paginate .pagination{
                  position:relative;
                  float: right;
                  right: 20px;
                  top:10px; 
              }
		      .validation-form table tr td{
		          width: 50%;
		          padding-bottom: 10px;
		      }

		      .validation-form table select{
		          height:33px;
		      }
	
		      .validation-form table tr td label{
		          width: 130px;
		          height: 34px;
		          text-align: right;
		          line-height: 34px;     
		      }
		      
 		      .validation-form table tr td{
		          width: 50%; 
		      }		      
 		      .validation-form table tr td input,select,textarea{
		          width: 55%;
		          height: 34px;
		          text-align: left;
		          line-height: 34px;
		          border-radius: 5px !important;     
		      }
		      .content{
		          position: relative;
		          width: 980px;
		          height: auto;
		          margin: 0 auto;
		      }
		      .clearfix input[type=text],input[type=email],input[type=password]{
                  width: 75% !important;
              }			    
              .clearfix textarea{
                  width: 75% !important;
              }

              .ui-front{
               	z-index: 9999 !important;
              }  
              .help-block{
                 color:#a94442 !important;
             	 margin: 0 !important;
             	 width: 100% !important;
             	 height: 15px !important;
             	 line-height: 15px !important;
             	 overflow: hidden !important;
             	 margin-left: 140px !important;
             }
	         .tools {
	             list-style:none;
	         }
	         .tools li{float:right;}
		     .onMouseOver{ border:2px solid #333; }   
		     
		     .name-right{
			     position : absolute !important;
			     margin-top : -35px !important;
			     margin-left : 490px !important;
		     }		
	</style>	
	<script type="text/javascript">
		
	</script>	
</head>

<body class="no-skin">
	<!-- top start -->
	<%@include file="../resource/top.jsp"%>
	<!-- top end -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try{ace.settings.check('main-container' , 'fixed');}catch(e){}
		</script>

		<div class="main-content">
			<div class="breadcrumbs" id="breadcrumbs">
				<script type="text/javascript">
					try{ace.settings.check('breadcrumbs' , 'fixed');}catch(e){}
				</script>

				<ul class="breadcrumb">
					<li>
						<i class="ace-icon fa fa-home home-icon"></i>
						<a href="index">我的工作台</a>
					</li>
					<li class="active">测试页</li>
				</ul><!-- /.breadcrumb -->

				<!-- search start -->
				<%@include file="../resource/search.jsp"%>
				<!-- search end -->
			</div>

			<div class="page-content">

				<button id="raiseSubmit" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px;" >确定</button>
				<button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >取消</button>

				<div class="tabbable tabs-left ">
					<ul class="nav nav-tabs" style="padding-top: 0px">
						<li class="tab-pane active" style="text-align: center"><a href="#infoPage" data-toggle="tab">基<br>本<br>信<br>息 </a></li>
						<li style="text-align: center"><a href="#detailPage" data-toggle="tab">详<br>细<br>信<br>息  </a></li>
						<li style="text-align: center"><a href="#imgPage" data-toggle="tab">照<br>片<br>信<br>息  </a></li>
						<li style="text-align: center"><a href="#parentPage" data-toggle="tab">父<br>母<br>信<br>息  </a></li>
						<li style="text-align: center"><a href="#childrenPage" data-toggle="tab">子<br>女<br>信<br>息  </a></li>
						<li style="text-align: center"><a href="#hobbyPage" data-toggle="tab">兴<br>趣<br>爱<br>好  </a></li>
						<li style="text-align: center"><a href="#matePage" data-toggle="tab">择<br>偶<br>信<br>息  </a></li>
					</ul>
					<div class="tab-content">
						 <div class="tab-pane active" id="infoPage">
						 	<form class="form-horizontal validation-form" id="baseInfo-form" role="form">
							 	<table style="width:100%">
									<tr>
										 <td>
						                     <label for="loginName"><span style="color:red">*</span>注册手机号:</label>
						                     <span > <input type="text" id="loginName" name="loginName" readonly="readonly"> </span>
										 </td>
										 <td> 
										 	<label for="userLevel"><span style="color:red">*</span>用户级别:</label>
						                     <span> <input type="text" id="userLevel" name="userLevel" readonly="readonly"> </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="registerDate"><span style="color:red">*</span>注册日期:</label>
						                     <span > <input type="text" id="registerDate" name="registerDate" readonly="readonly"> </span>
										 </td>
										 <td>
						                     <label for="registerType"><span style="color:red">*</span>注册类型:</label>
						                     <span> <input type="text" id="registerType" name="registerType" readonly="readonly"> </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="getChoiceNum"><span style="color:red">*</span>获赞数:</label>
						                     <span > <input type="text" id="getChoiceNum" name="getChoiceNum" readonly="readonly"> </span>
										 </td>
										 <td>
						                     <label for="setChoiceNum"><span style="color:red">*</span>点赞数:</label>
						                     <span> <input type="text" id="setChoiceNum" name="setChoiceNum" readonly="readonly"> </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userChoiceTotal"><span style="color:red">*</span>可看条数:</label>
						                     <span > <input type="text" id="userChoiceTotal" name="userChoiceTotal"> </span>
										 </td>
										 <td>
						                     <label for="userChoiceNum"><span style="color:red">*</span>已看条数:</label>
						                     <span> <input type="text" id="userChoiceNum" name="userChoiceNum" readonly="readonly"> </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userIntegralTotal"><span style="color:red">*</span>积分总和:</label>
						                     <span > <input type="text" id="userIntegralTotal" name="userIntegralTotal"> </span>
										 </td>
										 <td>
						                     <label for="userMaritalSuccess"><span style="color:red">*</span>是否脱单:</label>
						                     <span> 
						                     	<select id="userMaritalSuccess" name="userMaritalSuccess">
							 						<option value="no">否</option>
							 						<option value="yes">是</option>
							 					</select>
							 				</span>
										 </td>		
								     </tr>
							     </table>
						     </form>
						 </div>
						 <div class="tab-pane" id="detailPage">
						 	<form class="form-horizontal validation-form" id="detailInfo-form" role="form">
							 	<table style="width:100%">
								     <tr>
										 <td>
						                     <label for="userCard"><span style="color:red">*</span>身份证号:</label>
						                     <span > <input type="text" id="userCard" name="userCard"> </span>
										 </td>
										 <td>
						                     <label for="userPhone"><span style="color:red">*</span>联系电话:</label>
						                     <span> <input type="text" id="userPhone" name="userPhone" > </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userSex"><span style="color:red">*</span>性别:</label>
						                     <span> 
						                     	<select id="userSex" name="userSex">
							 						<option value="man">男</option>
							 						<option value="woman">女</option>
							 					</select>
							 				</span>
										 </td>
										 <td>
						                     <label for="userAge"><span style="color:red">*</span>年龄:</label>
						                     <span> <input type="text" id="userAge" name="userAge" > </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userName"><span style="color:red">*</span>真实姓名:</label>
						                     <span > <input type="text" id="userName" name="userName"> </span>
										 </td>
										 <td>
						                     <label for="userNick"><span style="color:red">*</span>昵称:</label>
						                     <span> <input type="text" id="userNick" name="userNick" > </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userQQ"><span style="color:red">*</span>QQ号码:</label>
						                     <span > <input type="text" id="userQQ" name="userQQ"> </span>
										 </td>
										 <td>
						                     <label for="userWeixin"><span style="color:red">*</span>微信号码:</label>
						                     <span> <input type="text" id="userWeixin" name="userWeixin" > </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userNation"><span style="color:red">*</span>民族:</label>
						                     <span > <input type="text" id="userNation" name="userNation"> </span>
										 </td>
										 <td>
						                     <label for="userFaith"><span style="color:red">*</span>宗教信仰:</label>
						                     <span> <input type="text" id="userFaith" name="userFaith" > </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userWork"><span style="color:red">*</span>工作性质:</label>
						                     <span > <input type="text" id="userWork" name="userWork"> </span>
										 </td>
										 <td>
						                     <label for="userIncomeLevel"><span style="color:red">*</span>月收入范围:</label>
						                     <span> 
						                     	<select id="userIncomeLevel" name="userIncomeLevel">
							 						<option value="0">2000及以下</option>
							 						<option value="1">2001——10000</option>
							 						<option value="2">10000及以上</option>
							 					</select>
							 				</span>
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userHeight"><span style="color:red">*</span>身高(cm):</label>
						                     <span > <input type="text" id="userHeight" name="userHeight"> </span>
										 </td>
										 <td>
						                     <label for="userWeight"><span style="color:red">*</span>体重(公斤):</label>
						                     <span> <input type="text" id="userWeight" name="userWeight" > </span>	
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userBirthday"><span style="color:red">*</span>生日:</label>
						                     <span > <input type="text" id="userBirthday" name="userBirthday"> </span>
										 </td>
										 <td>
										 	<label for="userBlood"><span style="color:red">*</span>血型:</label>
						                    <span> 
						                     	<select id="userBlood" name="userBlood">
							 						<option value="A">A</option>
							 						<option value="B">B</option>
							 						<option value="AB">AB</option>
							 						<option value="O">O</option>
							 					</select>
							 				</span>
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userEducation"><span style="color:red">*</span>学历:</label>
						                     <span>
						                     	<select id="userEducation" name="userEducation">
							 						<option value="0">无</option>
							 						<option value="1">小学</option>
							 						<option value="2">初中</option>
							 						<option value="3">高中</option>
							 						<option value="4">大专</option>
							 						<option value="5">专科</option>
							 						<option value="6">本科</option>
							 						<option value="7">硕士</option>
							 						<option value="8">博士</option>
							 					</select>
							 				</span>
										 </td>
										 <td>
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userSchool"><span style="color:red">*</span>毕业学校:</label>
						                     <span > <input type="text" id="userSchool" name="userSchool"> </span>
										 </td>
										 <td>
										 	<label for="userMagor"><span style="color:red">*</span>所学专业:</label>
						                    <span> <input type="text" id="userMagor" name="userMagor" > </span>
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userMaritalStatus"><span style="color:red">*</span>婚姻状况:</label>
						                     <span>
						                     	<select id="userMaritalStatus" name="userMaritalStatus">
							 						<option value="unmarried">未婚</option>
							 						<option value="remarried">离异</option>
							 					</select>
							 				 </span>
										 </td>
										 <td>
										 	<label for="userMaritalCard"><span style="color:red">*</span>离婚证号:</label>
						                    <span> <input type="text" id="userMaritalCard" name="userMaritalCard" > </span>
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="userHaveCar"><span style="color:red">*</span>购车情况:</label>
						                     <span>
						                     	<select id="userHaveCar" name="userHaveCar">
							 						<option value="no">无</option>
							 						<option value="yes">有</option>
							 					</select>
							 				 </span>
										 </td>
										 <td>
										 	<label for="userHaveHome"><span style="color:red">*</span>购房情况:</label>
						                    <span>
						                     	<select id="userHaveHome" name="userHaveHome">
							 						<option value="no">无</option>
							 						<option value="yes">有</option>
							 					</select>
							 				 </span>
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="provinceName"><span style="color:red">*</span>省:</label>
						                     <span>
						                     	<select id="provinceID" name="provinceID">
							 						<option value=""></option>
							 					</select>
							 				 </span>
						                     <input type="hidden" id="provinceName" name="provinceName" >
										 </td>
										 <td>
										 	<label for="cityName"><span style="color:red">*</span>市:</label>
										 	<span>
						                     	<select id="cityID" name="cityID">
							 						<option value=""></option>
							 					</select>
							 				 </span>
						                    <input type="hidden" id="cityName" name="cityName" >
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="countyName"><span style="color:red">*</span>区/县:</label>
						                     <span>
						                     	<select id="countyID" name="countyID">
							 						<option value=""></option>
							 					</select>
							 				 </span>
						                     <input type="hidden" id="countyName" name="countyName">
										 </td>
										 <td>
										 	<label for="townName"><span style="color:red">*</span>乡/街道:</label>
										 	<span>
						                     	<select id="townID" name="townID">
							 						<option value=""></option>
							 					</select>
							 				 </span>
						                     <input type="hidden" id="townName" name="townName" >
										 </td>		
								     </tr>
								     <tr>
									     <td>
									        <label  for="userEvaluation" style="position:relative; top:-48px; height: 200px;">自我评价:</label>
										    <textarea id="userEvaluation" name="userEvaluation" maxlength="255" style="height: 200px;"></textarea>
										 </td>						      
									     <td>
									        <label for="userLovePlan" style="position:relative; top:-48px; height: 200px;">爱情规划:</label>
											<textarea id="userLovePlan" name="userLovePlan" maxlength="255" style="height: 200px;"></textarea>
									     </td>
								 	</tr>
								 	<tr>
									     <td>
									        <label  for="theNode" style="position:relative; top:-48px; height: 200px;">备注:</label>
										    <textarea id="theNode" name="theNode" maxlength="255" style="height: 200px;"></textarea>
										 </td>						      
									     <td>
									     </td>
								 	</tr>
							     </table>
						     </form>
						 </div>
						 <div class="tab-pane" id="imgPage">
						 	<form class="form-horizontal validation-form" id="imgInfo-form" role="form" action="javascript:void(0)">
							 	<table style="width:100%">
							 		<tr>
									     <td style="text-align:center;width:20%">
									     	<img id="userImage1" name="userImage1" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
									     	<input type="file" style="display:none"/>
									     	<button onclick="" disabled="disabled" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;">删除</button>
										 </td>						      
									     <td style="text-align:center;width:20%">
									     	<img id="userImage2" name="userImage3" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
									     	<button onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;">删除</button>
									     </td>
									     <td style="text-align:center;width:20%">
									     	<img id="userImage3" name="userImage3" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
									     	<button class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;">删除</button>
										 </td>						      
									     <td style="text-align:center;width:20%">
									     	<img id="userImage4" name="userImage4" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
									     </td>
									     <td style="text-align:center;width:20%">
									     	<img id="userImage5" name="userImage5" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
										 </td>						      
								 	</tr>
								 	<tr>
									     <td style="text-align:center;width:20%">
									     	<img id="userImage6" name="userImage6" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
										 </td>						      
									     <td style="text-align:center;width:20%">
									     	<img id="userImage7" name="userImage7" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
									     </td>
									     <td style="text-align:center;width:20%">
									     	<img id="userImage8" name="userImage8" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
										 </td>						      
									     <td style="text-align:center;width:20%">
									     	<img id="userImage9" name="userImage9" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
									     </td>
									     <td style="text-align:center;width:20%">
									     	<img id="userImage10" name="userImage10" src="<%= basePath%>resources/upload/default_img.png" style="width:200px; height:270px;">
										 </td>						      
								 	</tr>
							 	</table>
							 </form>
						 	
						 </div>
						 <div class="tab-pane" id="parentPage">
						 	<button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >增加信息</button>
						 	<form class="form-horizontal validation-form" id="parentInfo-form" role="form">
							 	<table style="width:100%">
							 		<tr>
							 			<td > 
							 				<label for="parentRelation"><span style="color:red">*</span>关系:</label>
							 				<span>
							 					<select id="parentRelation" name="parentRelation">
							 						<option value="man">父亲</option>
							 						<option value="woman">母亲</option>
							 					</select>
							 				</span>
							 			</td>
							 		</tr>
							 		<tr>
						 				<td>
						                	<label for="parentAge"><span style="color:red">*</span>年龄:</label>
						                	<span > <input type="text" id="parentAge" name="parentAge"> </span>
										</td>
							 		</tr>
							 		<tr style="height: 200px;">
							 			<td style="height: 200px;">
									        <label for="parentRecommend" style="position:relative; top:-180px; ">简介:</label>
											<textarea id="parentRecommend" name="parentRecommend" maxlength="255" style="height: 200px;"></textarea>
									    </td>
									</tr>
									<tr>
										<td>
											<label></label>
											<span><button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >删除信息</button></span>
										</td>
									</tr>
							 	</table>
							 </form>
						 </div>
						 <div class="tab-pane" id="childrenPage">
						 	<button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >增加信息</button>
						 	<form class="form-horizontal validation-form" id="childrenInfo-form" role="form">
							 	<table style="width:100%">
							 		<div>
								 		<tr>
								 			<td > 
								 				<label for="childrenRelation"><span style="color:red">*</span>关系:</label>
								 				<span>
								 					<select id="childrenRelation" name="childrenRelation">
								 						<option value="man">儿子</option>
								 						<option value="woman">女儿</option>
								 					</select>
								 				</span>
								 			</td>
								 		</tr>
								 		<tr>
							 				<td>
							                	<label for="childrenAge"><span style="color:red">*</span>年龄:</label>
							                	<span > <input type="text" id="childrenAge" name="childrenAge"> </span>
											</td>
								 		</tr>
								 		<tr>
								 			<td>
										        <label for="childrenRecommend" style="position:relative; top:-180px;">简介:</label>
												<textarea id="childrenRecommend" name="childrenRecommend" maxlength="255" style="height: 200px;"></textarea>
										    </td>
										</tr>
										<tr>
											<td>
												<label></label>
												<span><button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >删除信息</button></span>
											</td>
										</tr>
									</div>
									<div>
								 		<tr>
								 			<td > 
								 				<label for="childrenRelation"><span style="color:red">*</span>关系:</label>
								 				<span>
								 					<select id="childrenRelation" name="childrenRelation">
								 						<option value="man">儿子</option>
								 						<option value="woman">女儿</option>
								 					</select>
								 				</span>
								 			</td>
								 		</tr>
								 		<tr>
							 				<td>
							                	<label for="childrenAge"><span style="color:red">*</span>年龄:</label>
							                	<span > <input type="text" id="childrenAge" name="childrenAge"> </span>
											</td>
								 		</tr>
								 		<tr>
								 			<td>
										        <label for="childrenRecommend" style="position:relative; top:-180px;">简介:</label>
												<textarea id="childrenRecommend" name="childrenRecommend" maxlength="255" style="height: 200px;"></textarea>
										    </td>
										</tr>
										<tr>
											<td>
												<label></label>
												<span><button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >删除信息</button></span>
											</td>
										</tr>
									</div>
							 	</table>
							 </form>
						 </div>
						 <div class="tab-pane" id="hobbyPage">
						 	<button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >增加信息</button>
						 	<form class="form-horizontal validation-form" id="hobbyInfo-form" role="form">
							 	<table style="width:100%">
							 		<tr> 
							 			<td> 
							 				<label style="text-align:left;"><button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >删除信息</button></label>
							 				<span>
							 					<select id="content1" name="content">
							 						<option value="1">爱好1</option>
							 					</select>
							 				</span>
							 			</td> 
							 		</tr>
							 		<tr> 
							 			<td> 
							 				<label style="text-align:left;"><button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >删除信息</button></label>
							 				<span>
							 					<select id="content1" name="content">
							 						<option value="1">爱好1</option>
							 					</select>
							 				</span>
							 			</td> 
							 		</tr>
							 		<tr> 
							 			<td> 
							 				<label style="text-align:left;"><button id="raiseClose" onclick="" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >删除信息</button></label>
							 				<span>
							 					<select id="content1" name="content">
							 						<option value="1">爱好1</option>
							 					</select>
							 				</span>
							 			</td> 
							 		</tr>
							 	</table>
							 </form>
						 </div>
						 <div class="tab-pane" id="matePage">
						 	<form class="form-horizontal validation-form" id="mateInfo-form" role="form">
							 	<table style="width:100%">
									<tr>
										 <td>
						                     <label for="mateSex"><span style="color:red">*</span>性别:</label>
						                     <span>
							 					<select id="mateSex" name="mateSex">
							 						<option value="man">男</option>
							 						<option value="woman">女</option>
							 					</select>
							 				</span>
										 </td>
										 <td>
										 </td>		
								    </tr>
									<tr>
										 <td>
						                     <label for="mateAgeLevel"><span style="color:red">*</span>年龄:</label>
						                     <span>
							 					<select id="mateAgeLevel" name="mateAgeLevel">
							 						<option value="0">25及以下</option>
							 						<option value="1">26-30</option>
							 						<option value="2">31-35</option>
							 						<option value="3">36-40</option>
							 						<option value="4">41-50</option>
							 						<option value="5">50及以上</option>
							 					</select>
							 				</span>
										 </td>
										 <td>
										 	<label for="mateHeightLevel"><span style="color:red">*</span>身高:</label>
						                    <span>
							 					<select id="mateHeightLevel" name="mateHeightLevel">
							 						<option value="0">-160</option>
							 						<option value="1">160-165</option>
							 						<option value="2">165-170</option>
							 						<option value="3">170-175</option>
							 						<option value="4">175-180</option>
							 						<option value="5">180+</option>
							 					</select>
							 				</span>
										 </td>		
								    </tr>
									<tr>
										 <td>
						                     <label for="mateEducation"><span style="color:red">*</span>学历:</label>
						                     <span>
						                     	<select id="mateEducation" name="mateEducation">
							 						<option value="0">无</option>
							 						<option value="1">小学</option>
							 						<option value="2">初中</option>
							 						<option value="3">高中</option>
							 						<option value="4">大专</option>
							 						<option value="5">专科</option>
							 						<option value="6">本科</option>
							 						<option value="7">硕士</option>
							 						<option value="8">博士</option>
							 					</select>
							 				</span>
										 </td>
										 <td>
										 	<label for="mateIncomeLevel"><span style="color:red">*</span>月收入情况:</label>
						                    <span> 
						                     	<select id="mateIncomeLevel" name="mateIncomeLevel">
							 						<option value="0">2000及以下</option>
							 						<option value="1">2001——10000</option>
							 						<option value="2">10000及以上</option>
							 					</select>
							 				</span>
										 </td>		
								    </tr>
									<tr>
										 <td>
						                     <label for="mateMaritalStatus"><span style="color:red">*</span>婚姻状况:</label>
						                     <span>
						                     	<select id="mateMaritalStatus" name="mateMaritalStatus">
							 						<option value="unmarried">未婚</option>
							 						<option value="remarried">离异</option>
							 					</select>
							 				 </span>
										 </td>
										 <td>
										 	<label for="mateHaveChildren"><span style="color:red">*</span>子女状况:</label>
						                    <span>
						                     	<select id="mateHaveChildren" name="mateHaveChildren">
							 						<option value="no">无</option>
							 						<option value="yes">有</option>
							 					</select>
							 				 </span>
										 </td>		
								     </tr>
									<tr>
										 <td>
						                     <label for="mateHaveCar"><span style="color:red">*</span>购车情况:</label>
						                     <span>
						                     	<select id="mateHaveCar" name="mateHaveCar">
							 						<option value="no">无</option>
							 						<option value="yes">有</option>
							 					</select>
							 				 </span>
										 </td>
										 <td>
										 	<label for="mateHaveHome"><span style="color:red">*</span>购房情况:</label>
						                    <span>
						                     	<select id="mateHaveHome" name="mateHaveHome">
							 						<option value="no">无</option>
							 						<option value="yes">有</option>
							 					</select>
							 				 </span>
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="provinceName"><span style="color:red">*</span>省:</label>
						                     <span>
						                     	<select id="provinceID" name="provinceID">
							 						<option value=""></option>
							 					</select>
							 				 </span>
						                     <input type="hidden" id="provinceName" name="provinceName" >
										 </td>
										 <td>
										 	<label for="cityName"><span style="color:red">*</span>市:</label>
										 	<span>
						                     	<select id="cityID" name="cityID">
							 						<option value=""></option>
							 					</select>
							 				 </span>
						                    <input type="hidden" id="cityName" name="cityName" >
										 </td>		
								     </tr>
								     <tr>
										 <td>
						                     <label for="countyName"><span style="color:red">*</span>区/县:</label>
						                     <span>
						                     	<select id="countyID" name="countyID">
							 						<option value=""></option>
							 					</select>
							 				 </span>
						                     <input type="hidden" id="countyName" name="countyName">
										 </td>
										 <td>
										 	<label for="townName"><span style="color:red">*</span>乡/街道:</label>
										 	<span>
						                     	<select id="townID" name="townID">
							 						<option value=""></option>
							 					</select>
							 				 </span>
						                     <input type="hidden" id="townName" name="townName" >
										 </td>		
								     </tr>
									 <tr>
									     <td>
									        <label  for="theNode" style="position:relative; top:-48px; height: 200px;">备注:</label>
										    <textarea id="theNode" name="theNode" maxlength="255" style="height: 200px;"></textarea>
										 </td>						      
									     <td>
									     </td>
								 	</tr>
							 	</table>
							 </form>
						 </div>
					</div>
				</div>


				<%@include file="../resource/footer.jsp"%>
	            <!-- footer end -->
	            <!-- upper start -->
	            <%@include file="../resource/upper.jsp"%>
	            <!-- upper end -->							
			</div><!-- /.row -->						
		</div><!-- /.page-content-area -->
	</div>
<!-- inline scripts related to this page -->
<script type="text/javascript" src="<%= basePath%>resources/js/permission/testWebPage/index.js"></script>
<script type="text/javascript">
	permission.index.init();
</script>
</body>
</html>

