package com.wang.permission.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.permission.web.util.SessionUtil;
import com.wang.service.entity.permission.PermissionUserInfoEntity;
import com.wang.service.param.permission.PermissionAppParam;
import com.wang.service.service.permission.PermissionAppService;
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
	 * permissionAppService
	 */
	@Autowired
	private PermissionAppService permissionAppService;
	
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
	@RequestMapping(value = "initApp", method = RequestMethod.GET)
	@ResponseBody
	public ServiceResult<String> initApp(HttpServletRequest request, HttpSession session) {
		
		ServiceResult<String> result = null;
		try {
			/**
			 * 获取当前登录用户
			 */
			PermissionUserInfoEntity userCurrent = SessionUtil.getFrontUserByRequest(request);
			Integer currentUserID = userCurrent.getUserID();
			
			/**
			 * 获取当前登陆者的APP
			 */
			PermissionAppParam defaultApp = null;
			Integer appID = (Integer) session.getAttribute("defaultApp");
			if( appID == null ){	//刚登陆，默认的APP
				defaultApp = permissionUserInfoService.getDefaultAppByUserID(currentUserID).getResult();
			} else {
				defaultApp = permissionAppService.getApp(appID).getResult();
			}
			session.setAttribute("defaultApp", defaultApp.getAppID());
			
			result = permissionCoreService.changeApp(userCurrent, defaultApp);
		} catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的initApp方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 选择应用系统
	 * @param appID 应用系统ID
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.11.14
	 */
	@RequestMapping(value = "changeApp", method = RequestMethod.GET)
	@ResponseBody
	public ServiceResult<PermissionAppParam> changeApp(HttpServletRequest request, HttpSession session, Integer appID) {
		ServiceResult<PermissionAppParam> result = null;
		
		try {
			result = permissionAppService.getApp(appID);
			session.setAttribute("defaultApp", result.getResult().getAppID());
		} catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的initApp方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	
	/**
	 * 初始化当前登录者所在系统的菜单列表
	 * @param request request
	 * @return 菜单列表HTML
	 * @author HeJiawang
	 * @date   2016.11.05
	 */
	@RequestMapping(value = "initMenu", method = {RequestMethod.GET})
	@ResponseBody
	public ServiceResult<String> initMenu(HttpServletRequest request, HttpSession session){
		ServiceResult<String> result = null;
		try {
			/**
			 * 获取当前登录用户
			 */
			PermissionUserInfoEntity userCurrent = SessionUtil.getFrontUserByRequest(request);
			Integer currentUserID = userCurrent.getUserID();
			
			/**
			 * 获取当前登陆者的APP
			 */
			PermissionAppParam defaultApp = null;
			Integer appID = (Integer) session.getAttribute("defaultApp");
			if( appID == null ){	//刚登陆，默认的APP
				defaultApp = permissionUserInfoService.getDefaultAppByUserID(currentUserID).getResult();
			} else {
				defaultApp = permissionAppService.getApp(appID).getResult();
			}
			
			result = permissionCoreService.changeMenu(userCurrent, defaultApp);
		} catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的initMenu方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 根据当前登录者所选择的菜单获取有使用权限的页面元素
	 * @param request request
	 * @param menuID 菜单ID
	 * @return 菜单列表HTML
	 * @author HeJiawang
	 * @date   2016.11.05
	 */
	@RequestMapping(value = "initElement", method = {RequestMethod.GET})
	@ResponseBody
	public ServiceResult<String> initElement(HttpServletRequest request, Integer menuID){
		ServiceResult<String> result = null;
		try {
			/**
			 * 获取当前登录用户
			 */
			PermissionUserInfoEntity userCurrent = SessionUtil.getFrontUserByRequest(request);
			Integer currentUserID = userCurrent.getUserID();
			
			result = permissionCoreService.getElementFromMenuByUserID(currentUserID, menuID);
		} catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的initElement方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
}
