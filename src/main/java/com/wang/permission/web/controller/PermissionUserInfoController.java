package com.wang.permission.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.service.param.permission.PermissionUserInfoParam;
import com.wang.service.service.permission.PermissionUserInfoService;

/**
 * 用户信息Controller
 * 
 * @author HeJiawang
 * @date   2016.10.25
 */
@Controller
@RequestMapping(value = "/userInfo")
public class PermissionUserInfoController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionUserInfoController.class);
	
	/**
	 * permissionUserInfoService
	 */
	private PermissionUserInfoService permissionUserInfoService;
	
	/**
	 * 跳转用户信息页
	 * @author HeJiawang
	 * @date   2016.10.25
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "userInfo";
	}
	
	
	
	
	
	
	
	
	
	/**
	 * 新增用户信息
	 * @param userInfo 用户信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.25
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseUserInfo( PermissionUserInfoParam userInfo ){
		ServiceResult<Void> result = null;
		try {
			result = permissionUserInfoService.addUserInfo(userInfo);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseUserInfo方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
}
