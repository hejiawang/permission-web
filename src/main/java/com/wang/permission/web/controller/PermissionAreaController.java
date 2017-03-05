package com.wang.permission.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.service.entity.permission.PermissionAreaEntity;
import com.wang.service.param.permission.PermissionAreaParam;
import com.wang.service.service.permission.PermissionAreaService;

/**
 * 地区controller
 * 
 * @author HeJiawang
 * @date   2016.12.08
 */
@Controller
@RequestMapping(value = "/area")
public class PermissionAreaController extends BaseController {

	/**
	 * logger
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionAreaController.class);
	
	/**
	 * PermissionAreaService
	 */
	@Autowired
	private PermissionAreaService PermissionAreaService;
	
	/**
	 * 根据父级地址获取子地址集合
	 * 
	 * @param parentID 地址父ID
	 * @return 地址信息集合
	 */
	@RequestMapping(value = "/list", method = {RequestMethod.GET})
	@ResponseBody
	public ServiceResult<List<PermissionAreaEntity>> getAreaListByParentID( HttpServletRequest request, Integer parentID ){
		ServiceResult<List<PermissionAreaEntity>> result = new ServiceResult<List<PermissionAreaEntity>>();
		try{
			if( parentID == null ) parentID = 1001;
			result = PermissionAreaService.getAreaListByParentID(parentID);
		}catch( Exception e ){
			logger.error("异常发生在"+this.getClass().getName()+"类的getAreaListByParentID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 根据地区ID获取地区信息
	 * @param areaID 地区ID
	 * @return 地区信息
	 */
	@RequestMapping(value = "/getArea", method = {RequestMethod.GET})
	@ResponseBody
	public ServiceResult<PermissionAreaParam> getArea( HttpServletRequest request, Integer araeID ){
		ServiceResult<PermissionAreaParam> result = new ServiceResult<PermissionAreaParam>();
		try{
			result = PermissionAreaService.getAreaByID(araeID);
		}catch( Exception e ){
			logger.error("异常发生在"+this.getClass().getName()+"类的getArea方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
}
