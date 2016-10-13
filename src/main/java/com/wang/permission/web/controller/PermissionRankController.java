package com.wang.permission.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.wang.service.service.permission.PermissionRankService;

/**
 * 职级Controller
 * 
 * @author HeJiawang
 * @date   2016.10.13
 */
@Controller
@RequestMapping(value = "/rank")
public class PermissionRankController extends BaseController  {

	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionRankController.class);
	
	/**
	 * 岗位service
	 */
	@Autowired
	private PermissionRankService permissionRankService; 
	
	/**
	 * 跳转职级页
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "rank";
	}
}
