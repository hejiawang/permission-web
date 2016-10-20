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
import com.wang.service.param.permission.PermissionAppParam;
import com.wang.service.service.permission.PermissionAppService;

/**
 * 应用系统Controller
 * 
 * @author HeJiawang
 * @date   2016.10.17
 */
@Controller
@RequestMapping(value = "/app")
public class PermissionAppController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionAppController.class);
	
	/**
	 * 应用系统service
	 */
	@Autowired
	private PermissionAppService permissionAppService; 
	
	/**
	 * 跳转系统类型页
	 * @author HeJiawang
	 * @date   2016.10.17
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "app";
	}
	
	/**
	 * 获取分页应用系统
	 * @param app 应用系统参数
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @param draw 分页
	 * @return 应用系统集合及分页信息
	 * @author HeJiawang
	 * @date   2016.10.17
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageApp( PermissionAppParam app,Integer start,Integer length ){
		Map<String,Object> map =null;
		try {
			app.setPageStart(start);
			app.setPageEnd(start+length);
			
			map = permissionAppService.pageApp(app).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageApp方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
	}
	
	/**
	 * 新增应用系统
	 * @param app 应用系统信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.17
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseApp( PermissionAppParam app ){
		ServiceResult<Void> result = null;
		try {
			result = permissionAppService.addApp(app);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseApp方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 修改应用系统
	 * @param app 应用系统信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.17
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyApp( PermissionAppParam app ){
		ServiceResult<Void> result = null;
		try {
			result = permissionAppService.updateApp(app);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyApp方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 删除应用系统
	 * @param appID 应用系统ID
	 * @return 返回信息
	 * @author HeJiawang
	 * @date   2016.10.16
	 */
	@RequestMapping(value="/erase/{appID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> deleteAppByID( @PathVariable("appID") Integer appID ){
		ServiceResult<Void> result = null;
		try {
			result = permissionAppService.deleteAppByID(appID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的deleteAppByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 应用系统查看
	 * @param appID 应用系统ID
	 * @return 应用系统信息
	 * @author HeJiawang
	 * @date   2016.10.16
	 */
	@RequestMapping(value="/view/{appID}",method=RequestMethod.GET)
	@ResponseBody 
	public ServiceResult<PermissionAppParam> getApp(@PathVariable("appID") Integer appID){
		ServiceResult<PermissionAppParam> result = null;
		try {
			result = permissionAppService.getApp(appID);
		} catch (Exception e) {
			logger.info("异常发生在"+this.getClass().getName()+"类的getApp方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}

}
