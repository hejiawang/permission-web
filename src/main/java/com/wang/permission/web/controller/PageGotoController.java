package com.wang.permission.web.controller;

import java.net.URLDecoder;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 页面跳转Controller
 * 
 * @author HeJiawang
 * @date   2016.11.02
 */
@Controller
@RequestMapping(value = "/pageGoto")
public class PageGotoController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PageGotoController.class);
	
	/**
	 * 跳转页面</br>
	 * 使用示范：http://127.0.0.1:7998/pageGoto/role?param=123  </br>
	 * 即,跳转到角色管理页,并带着参数
	 * @param pageName 要跳转到的页面. 如:role,即,跳转到角色管理页
	 * @return 页面路径与请求的参数 
	 * @author HeJiawang
	 * @date   2016.11.02
	 */
	@RequestMapping(value = "/{pageName}", method = {RequestMethod.GET})
	public String index(HttpServletRequest request, HttpServletResponse response, HttpSession session,  Model model, 
			@PathVariable String pageName) {
		
		try {
			Enumeration<String> parameters = request.getParameterNames();
			while(parameters.hasMoreElements()){
				
				String paramKey = parameters.nextElement();
				String paramValue = request.getParameter(paramKey) != null ? URLDecoder.decode(request.getParameter(paramKey), "UTF-8") : "";
				model.addAttribute(paramKey, paramValue);
			}
		} catch (Exception e) {
			pageName = "error/404";	//发生异常,回到登录页
			logger.error("异常发生在"+this.getClass().getName()+"类的index方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return pageName;
	}
	
}
