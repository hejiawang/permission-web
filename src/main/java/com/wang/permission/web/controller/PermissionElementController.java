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
import com.wang.service.param.permission.PermissionElementParam;
import com.wang.service.service.permission.PermissionElementService;

/**
 * 页面元素Controller
 * 
 * @author HeJiawang
 * @date   2016.10.24
 */
@Controller
@RequestMapping(value = "/element")
public class PermissionElementController extends BaseController {

	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionElementController.class);
	
	/**
	 * permissionMenuService
	 */
	@Autowired
	private PermissionElementService permissionElementService;
	
	/**
	 * 跳转页面元素页
	 * @author HeJiawang
	 * @date   2016.10.24
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "element";
	}
	
	/**
	 * 获取分页页面元素
	 * @param element 页面元素参数
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @param draw 分页
	 * @return 页面元素集合及分页信息
	 * @author HeJiawang
	 * @date   2016.10.24
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageElement( PermissionElementParam element,Integer start,Integer length ){
		Map<String,Object> map =null;
		try {
			element.setPageStart(start);
			element.setPageEnd(start+length);
			
			map = permissionElementService.pageElement(element).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageElement方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
	}
	
	
	/**
	 * 新增页面元素
	 * @param  element 页面元素信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.24
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseElement( PermissionElementParam element ){
		ServiceResult<Void> result = null;
		try {
			result = permissionElementService.addElement(element);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseElement方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 页面元素查看
	 * @param elementID elementID
	 * @return 信息
	 * @author HeJiawang
	 * @date   2016.10.24
	 */
	@RequestMapping(value="/view/{elementID}",method=RequestMethod.GET)
	@ResponseBody 
	public ServiceResult<PermissionElementParam> getElement(@PathVariable("elementID") Integer elementID){
		ServiceResult<PermissionElementParam> result = null;
		try {
			result = permissionElementService.getElementByID(elementID);
		} catch (Exception e) {
			logger.info("异常发生在"+this.getClass().getName()+"类的getElement方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 删除页面元素
	 * @param elementID elementID
	 * @return 返回信息
	 * @author HeJiawang
	 * @date   2016.10.21
	 */
	@RequestMapping(value="/erase/{elementID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> deleteElementByID( @PathVariable("elementID") Integer elementID ){
		ServiceResult<Void> result = null;
		try {
			result = permissionElementService.deleteElementByID(elementID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的deleteElementByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 修改页面元素
	 * @param element 页面元素信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.24
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyElement( PermissionElementParam element ){
		ServiceResult<Void> result = null;
		try {
			result = permissionElementService.updateElement(element);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyElement方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}

}
