package com.wang.permission.web.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
	public Map<String,Object> pageOrg( PermissionOrgParam org,Integer start,Integer length/*,Integer draw*/ ){
		Map<String,Object> map =null;
		try {
			org.setPageSize(length);
			org.setPageNumber(start/length+1);
			//org.setDraw(draw);
			
			map = permissionOrgService.pageOrg(org).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageOrg方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
	}
}
