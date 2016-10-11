package com.wang.permission.web.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.service.param.permission.PermissionOrgParam;
import com.wang.service.service.permission.PermissionOrgService;

/**
 * 机构Controller
 * 
 * @author HeJiawang
 * @date   2016.10.10
 */
@Controller
@RequestMapping(value = "/org")
public class PermissionOrgController extends BaseController {

	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionOrgController.class);
	
	/**
	 * 机构service
	 */
	@Autowired
	private PermissionOrgService permissionOrgService; 
	
	/**
	 * 跳转机构页
	 * @author HeJiawang
	 * @date   2016.10.10
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "org";
	}
	
	/**
	 * 获取分页机构
	 * @param org 机构参数
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @param draw 分页
	 * @return 机构集合及分页信息
	 * @author HeJiawang
	 * @date   2016.10.10
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageOrg( PermissionOrgParam org,Integer start,Integer length ){
		Map<String,Object> map =null;
		try {
			org.setPageSize(length);
			org.setPageNumber(start/length+1);
			
			map = permissionOrgService.pageOrg(org).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageOrg方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
	}
	
	/**
	 * 查看机构
	 * @param orgID 机构ID
	 * @return 机构信息
	 * @author HeJiawang
	 * @date   2016.10.10
	 */
	@RequestMapping(value="/view/{orgID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Map<String, Object>> getOrgByID( @PathVariable("orgID") Integer orgID ){
		ServiceResult<Map<String, Object>> result = null;
		try {
			result = permissionOrgService.getOrgByID(orgID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的getOrgByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 删除机构
	 * @param orgID 机构ID
	 * @return 返回信息
	 * @author HeJiawang
	 * @date   2016.10.11
	 */
	@RequestMapping(value="/erase/{orgID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> deleteOrgByID( @PathVariable("orgID") Integer orgID ){
		ServiceResult<Void> result = null;
		try {
			result = permissionOrgService.deleteOrgByID(orgID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的deleteOrgByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 新增机构
	 * @param org 机构信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.11
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseOrg( PermissionOrgParam org ){
		ServiceResult<Void> result = null;
		try {
			result = permissionOrgService.addOrg(org);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseOrg方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 修改机构
	 * @param org 机构信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.11
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyOrg( PermissionOrgParam org ){
		ServiceResult<Void> result = null;
		try {
			result = permissionOrgService.updateOrg(org);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyOrg方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
}
