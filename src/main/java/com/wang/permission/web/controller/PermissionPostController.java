package com.wang.permission.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.wang.service.service.permission.PermissionPostService;

/**
 * 岗位Controller
 * 
 * @author HeJiawang
 * @date   2016.10.12
 */
@Controller
@RequestMapping(value = "/post")
public class PermissionPostController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionPostController.class);
	
	/**
	 * 岗位service
	 */
	@Autowired
	private PermissionPostService permissionPostService; 
	
	/**
	 * 跳转岗位页
	 * @author HeJiawang
	 * @date   2016.10.12
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "post";
	}
	
}
