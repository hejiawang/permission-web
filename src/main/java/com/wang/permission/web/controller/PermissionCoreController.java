package com.wang.permission.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.wang.core.ServiceResult;
import com.wang.permission.web.util.SessionUtil;
import com.wang.service.entity.permission.PermissionUserInfoEntity;
import com.wang.service.param.permission.PermissionAppParam;
import com.wang.service.service.permission.PermissionCoreService;
import com.wang.service.service.permission.PermissionUserInfoService;

/**
 * 菜单、页面元素权限 Controller
 * 
 * @author HeJiawang
 * @date   2016.11.04
 */
@Controller
@RequestMapping(value = "/permission/core")
public class PermissionCoreController extends BaseController {

	/**
	 * permissionCoreService
	 */
	@Autowired
	private PermissionCoreService permissionCoreService;
	
	/**
	 * permissionUserInfoService
	 */
	@Autowired
	private PermissionUserInfoService permissionUserInfoService;
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionCoreController.class);
	
	/**
	 * 初始化当前登录者的APP列表
	 * @param request request
	 * @return APP列表HTML
	 * @author HeJiawang
	 * @date   2016.11.04
	 */
	@RequestMapping(value = "initApp", method = {RequestMethod.GET})
	public ServiceResult<String> initApp(HttpServletRequest request) {
		
		ServiceResult<String> result = null;
		try {
			/**
			 * 获取当前登录用户
			 */
			PermissionUserInfoEntity userCurrent = SessionUtil.getFrontUserByRequest(request);
			Integer currentUserID = userCurrent.getUserID();
			
			/**
			 * 获取当前登陆者的默认APP
			 */
			PermissionAppParam defaultApp = permissionUserInfoService.getDefaultAppByUserID(currentUserID).getResult();
			
			result = permissionCoreService.changeApp(userCurrent, defaultApp);
		} catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的initApp方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
}
