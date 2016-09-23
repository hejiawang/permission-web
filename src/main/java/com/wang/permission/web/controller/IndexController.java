package com.wang.permission.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 主页Controller
 * 
 * @author HeJiawang
 * @date   2016.09.23
 */
@Controller
public class IndexController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(IndexController.class);
	
	/**
	 * 跳转登录
	 */
	@RequestMapping(value = "/index", method = {RequestMethod.GET})
	public String login() {
		return "index";
	}
	
}
