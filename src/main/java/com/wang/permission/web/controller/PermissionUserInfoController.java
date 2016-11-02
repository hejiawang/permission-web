package com.wang.permission.web.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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
	 * 获取分页用户信息
	 * @param userInfo 用户信息
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @return 分页数据
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> pageUserInfo( PermissionUserInfoParam userInfo, Integer start,Integer length ){
		Map<String,Object> map =null;
		try {
			userInfo.setPageStart(start);
			userInfo.setPageEnd(start+length);
			
			map = permissionUserInfoService.pageUserInfo(userInfo).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageUserInfo方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
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
	
	/**
	 * 删除用户
	 * @param userID 用户ID
	 * @return 返回信息
	 * @author HeJiawang
	 * @date   2016.11.02
	 */
	@RequestMapping(value="/erase/{userID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> deleteUserByID( @PathVariable("userID") Integer userID ){
		ServiceResult<Void> result = null;
		try {
			result = permissionUserInfoService.deleteUserByID(userID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的deleteUserByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
}
