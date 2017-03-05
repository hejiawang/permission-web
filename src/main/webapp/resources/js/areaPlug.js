/**
 * 地区三级联动插件
 * 使用说明:
 * 	1、需引入css文件：areaPlug.css
 *  2、页面规则：<ul id="area-list">
 *				<li id="summary-stock">
 *					<div class="dt">配&nbsp;送&nbsp;至：</div>
 *					<div class="dd">
 *						<div id="area-selector">
 *							<div class="text" style="width: 200px;"><div id="areaPlug_value" data-value="已选择地址的ID">已选择地址名称</div><b></b></div>                   
 *							<div onclick="$('#area-selector').removeClass('hover')" class="close"></div>
 *						</div><!--area-selector end-->
 *						<div id="store-prompt"><strong></strong></div><!--store-prompt end--->
 * 					</div>
 *				</li>
 *			</ul>
 * @author HeJiawang
 * @date   2017.03.05
 */
 	
var result_name_p = "";
var result_id_p = null;
var result_name_c = "";
var result_id_c = null;
var result_name_a = "";
var result_id_a = null;

var result_name = "";
var result_id = null;

function getAreaListByParentID( parentID ){
	var areaList = {};
	$.ajax({
		url : permission.domainUrl.baseDomain + "/area/list",
		async:false,
		data : {"parentID" : parentID},
		type: "get",
		dataType : 'json',
		success:function(result) {
			areaList = result.result;
		}
	});
	return areaList;
}

//根据省份ID获取名称
function getNameById(araeID){
	var areaName = "";
	$.ajax({
		url : permission.domainUrl.baseDomain + "/area/getArea",
		async:false,
		data : {"araeID" : araeID},
		type: "get",
		dataType : 'json',
		success:function(result) {
			areaName = result.result.areaName;
		}
	});
	return areaName;
}

var isUseServiceLoc = true; //是否默认使用服务端地址
var provinceHtml = '<div class="content"><div data-widget="tabs" class="m area-content" id="area-content">'
								+'<div class="mt">'
								+'    <ul class="tab">'
								+'        <li data-index="0" data-widget="tab-item" class="curr"><a href="javascript:void(0)" class="hover"><em>请选择</em><i></i></a></li>'
								+'        <li data-index="1" data-widget="tab-item" style="display:none;"><a href="javascript:void(0)" class=""><em>请选择</em><i></i></a></li>'
								+'        <li data-index="2" data-widget="tab-item" style="display:none;"><a href="javascript:void(0)" class=""><em>请选择</em><i></i></a></li>'
								+'    </ul>'
								+'    <div class="stock-line"></div>'
								+'</div>'
								+'<div class="mc" data-area="0" data-widget="tab-content" id="stock_province_item">'
								+ getAreaList(getAreaListByParentID(1001), true)
								+'</div>'
								+'<div class="mc" data-area="1" data-widget="tab-content" id="stock_city_item"></div>'
								+'<div class="mc" data-area="2" data-widget="tab-content" id="stock_area_item"></div>'
								+'</div></div>';
function getAreaList(result, isFirst){
	var html = [];
	if(isFirst){
		var html = ["<ul class='area-list'>"];
	} else {
		var html = ["<ul class='area-list'><li><a href='javascript:void(0)' data-value='0'>请选择</a></li>"];
	}
	var longhtml = [];
	var longerhtml = [];
	if (result&&result.length > 0){
		for (var i=0,j=result.length;i<j ;i++ ){
			result[i].areaName = result[i].areaName.replace(" ","");
			if(result[i].areaName.length > 12){
				longerhtml.push("<li class='longer-area'><a href='javascript:void(0)' data-value='"+result[i].areaID+"'>"+result[i].areaName+"</a></li>");
			}
			else if(result[i].areaName.length > 5){
				longhtml.push("<li class='long-area'><a href='javascript:void(0)' data-value='"+result[i].areaID+"'>"+result[i].areaName+"</a></li>");
			}
			else{
				html.push("<li><a href='javascript:void(0)' data-value='"+result[i].areaID+"'>"+result[i].areaName+"</a></li>");
			}
		}
	}
	else{
		html.push("<li><a href='javascript:void(0)' data-value='"+currentAreaInfo.currentFid+"'> </a></li>");
	}
	html.push(longhtml.join(""));
	html.push(longerhtml.join(""));
	html.push("</ul>");
	return html.join("");
}
function cleanKuohao(str){
	if(str&&str.indexOf("(")>0){
		str = str.substring(0,str.indexOf("("));
	}
	if(str&&str.indexOf("（")>0){
		str = str.substring(0,str.indexOf("（"));
	}
	return str;
}

function getStockOpt(id,name){
	if(currentAreaInfo.currentLevel==3){
		currentAreaInfo.currentAreaId = id;
		currentAreaInfo.currentAreaName = name;
		if(!page_load){
			currentAreaInfo.currentTownId = 0;
			currentAreaInfo.currentTownName = "";
		}
	}
	else if(currentAreaInfo.currentLevel==4){
		currentAreaInfo.currentTownId = id;
		currentAreaInfo.currentTownName = name;
	}
	//添加20140224
	$('#area-selector').removeClass('hover');
	if(page_load){
		page_load = false;
	}
	//替换gSC
	var address = currentAreaInfo.currentProvinceName+currentAreaInfo.currentCityName+currentAreaInfo.currentAreaName+currentAreaInfo.currentTownName;
	$("#area-selector .text div").html(currentAreaInfo.currentProvinceName+cleanKuohao(currentAreaInfo.currentCityName)+cleanKuohao(currentAreaInfo.currentAreaName)+cleanKuohao(currentAreaInfo.currentTownName)).attr("title",address);
}

function chooseProvince(provinceId){
	
	provinceContainer.hide();
	currentAreaInfo.currentLevel = 1;
	currentAreaInfo.currentProvinceId = provinceId;
	currentAreaInfo.currentProvinceName = getNameById(provinceId);

	result_name_p = currentAreaInfo.currentProvinceName;
	result_id_p = provinceId;
	result_name_c = "";
	result_id_c = null;
	result_name_a = "";
	result_id_a = null;
	
	if(!page_load){
		currentAreaInfo.currentCityId = 0;
		currentAreaInfo.currentCityName = "";
		currentAreaInfo.currentAreaId = 0;
		currentAreaInfo.currentAreaName = "";
		currentAreaInfo.currentTownId = 0;
		currentAreaInfo.currentTownName = "";
	}
	areaTabContainer.eq(0).removeClass("curr").find("em").html(currentAreaInfo.currentProvinceName?currentAreaInfo.currentProvinceName:"请选择");
	areaTabContainer.eq(1).addClass("curr").show().find("em").html("请选择");
	areaTabContainer.eq(2).hide();
	cityContainer.show();
	areaContainer.hide();
	var cityResult = getAreaListByParentID(provinceId);
	if(cityResult){
		cityContainer.html(getAreaList(cityResult,false));
		cityContainer.find("a").click(function(){
			if(page_load){
				page_load = false;
			}
			$("#area-selector").unbind("mouseout");
			chooseCity($(this).attr("data-value"),$(this).html());
		});
		if(page_load){ //初始化加载
			if(currentAreaInfo.currentCityId&&new Number(currentAreaInfo.currentCityId)>0){
				chooseCity(currentAreaInfo.currentCityId,cityContainer.find("a[data-value='"+currentAreaInfo.currentCityId+"']").html());
			} else {
				//chooseCity(cityContainer.find("a").eq(0).attr("data-value"),cityContainer.find("a").eq(0).html());
			}
		}
	}
}
function chooseCity(cityId,cityName){
	result_name_c = cityName;
	result_id_c = cityId;
	result_name_a = "";
	result_id_a = null;
	
	provinceContainer.hide();
	cityContainer.hide();
	currentAreaInfo.currentLevel = 2;
	currentAreaInfo.currentCityId = cityId;
	currentAreaInfo.currentCityName = cityName;
	if(!page_load){
		currentAreaInfo.currentAreaId = 0;
		currentAreaInfo.currentAreaName = "";
	}
	areaTabContainer.eq(1).removeClass("curr").find("em").html(cityName);
	areaTabContainer.eq(2).addClass("curr").show().find("em").html("请选择");
	areaTabContainer.eq(3).hide();
	areaContainer.show();
	var areaResult = getAreaListByParentID(cityId);
	if(areaResult){
		areaContainer.html(getAreaList(areaResult, false));
		areaContainer.find("a").click(function(){
			if(page_load){
				page_load = false;
			}
			$("#area-selector").unbind("mouseout");
			chooseArea($(this).attr("data-value"),$(this).html());
		});
		if(page_load){ //初始化加载
			if(currentAreaInfo.currentAreaId&&new Number(currentAreaInfo.currentAreaId)>0){
				chooseArea(currentAreaInfo.currentAreaId,cityContainer.find("a[data-value='"+currentAreaInfo.currentAreaId+"']").html());
			} else {
				//chooseArea(areaContainer.find("a").eq(0).attr("data-value"),areaContainer.find("a").eq(0).html());
			}
		}
	}

}

function chooseArea(areaId,areaName){
	result_name_a = areaName;
	result_id_a = areaId;
	
	if( result_name_p == "请选择" ){
		result_name_p = "";
	}
	if( result_name_c == "请选择" ){
		result_name_c = "";
	}
	if( result_name_a == "请选择" ){
		result_name_a = "";
	}
	result_name = result_name_p + " " + result_name_c + " " + result_name_a;

	if( result_id_p != 0 ){
		result_id = result_id_p;
	}
	if( result_id_c != 0 ){
		result_id = result_id_c;
	}
	if( result_id_a != 0 ){
		result_id = result_id_a;
	}
	
	$("#areaPlug_value").html(result_name);
	$("#areaPlug_value").attr("data-value", result_id);
	$('#area-selector').removeClass('hover');
}

$("#area-selector .text").after(provinceHtml);
var areaTabContainer=$("#area-content .tab li");
var provinceContainer=$("#stock_province_item");
var cityContainer=$("#stock_city_item");
var areaContainer=$("#stock_area_item");
var currentDom = provinceContainer;
//当前地域信息
var currentAreaInfo;
//初始化当前地域信息
function CurrentAreaInfoInit(){
	var choseAreaID = $("#areaPlug_value").attr("data-value");
	
	currentAreaInfo =  {"currentLevel": 1,"currentProvinceId": 0,"currentProvinceName":"","currentCityId": 0,"currentCityName":"","currentAreaId": 0,"currentAreaName":""};
	currentAreaInfo.currentProvinceId = 119143;
	currentAreaInfo.currentProvinceName = '辽宁省';
	currentAreaInfo.currentCityId = 0;//121566;
	currentAreaInfo.currentCityName = "";//"沈阳市";
	currentAreaInfo.currentAreaId = 0;
	currentAreaInfo.currentAreaName = "";
	/*$.ajax({
		url : permission.domainUrl.baseDomain + "/area/getAreaPlugInfo",
		async:false,
		data : {"choseAreaID" : choseAreaID},
		type: "get",
		dataType : 'json',
		success:function(result) {
			var result = result.result;
			currentAreaInfo.currentProvinceId = result.provinceId;
			currentAreaInfo.currentProvinceName = result.provinceName;
			currentAreaInfo.currentCityId = result.CityId;
			currentAreaInfo.currentCityName = result.CityName;
			currentAreaInfo.currentAreaId = result.AreaId;
			currentAreaInfo.currentAreaName = result.AreaName;
		}
	});	*/
}
var page_load = true;
(function(){
	$("#area-selector").unbind("mouseover").bind("mouseover",function(){
		$('#area-selector').addClass('hover');
		$("#area-selector .content,#area-content").show();
	}).find("dl").remove();
	CurrentAreaInfoInit();
	areaTabContainer.eq(0).find("a").click(function(){
		areaTabContainer.removeClass("curr");
		areaTabContainer.eq(0).addClass("curr").show();
		provinceContainer.show();
		cityContainer.hide();
		areaContainer.hide();
		areaTabContainer.eq(1).hide();
		areaTabContainer.eq(2).hide();
	});
	areaTabContainer.eq(1).find("a").click(function(){
		areaTabContainer.removeClass("curr");
		areaTabContainer.eq(1).addClass("curr").show();
		provinceContainer.hide();
		cityContainer.show();
		areaContainer.hide();
		areaTabContainer.eq(2).hide();
	});
	areaTabContainer.eq(2).find("a").click(function(){
		areaTabContainer.removeClass("curr");
		areaTabContainer.eq(2).addClass("curr").show();
		provinceContainer.hide();
		cityContainer.hide();
		areaContainer.show();
	});
	provinceContainer.find("a").click(function() {
		if(page_load){
			page_load = false;
		}
		$("#area-selector").unbind("mouseout");
		chooseProvince($(this).attr("data-value"));
	}).end();
	
	chooseProvince(currentAreaInfo.currentProvinceId);
})();
