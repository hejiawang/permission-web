package com.wang.permission.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.core.util.DomainUrlUtil;
import com.wang.core.util.RegExpValidator;
import com.wang.permission.web.util.SessionUtil;
import com.wang.service.entity.user.UserEntity;
import com.wang.service.service.user.LoginService;

/**
 * 登录Controller
 * 
 * @author HeJiawang
 * @date   2016.09.21
 */
@Controller
public class LoginController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	private final String LOGIN = "login";
	
	@Autowired
	private LoginService loginService;
	
	/**
	 * 跳转登录
	 */
	@RequestMapping(value = "/login", method = {RequestMethod.GET})
	public String login() {
		return LOGIN;
	}
	
	/**
	 * 登录接口
	 */
	@RequestMapping(value = "/login", method = {RequestMethod.POST})
	@ResponseBody
	public Map<String,Object> doLogin(HttpServletRequest request, HttpServletResponse response,HttpSession session, Model model, 
			String loginName, String password, String validateImage) {
		Map<String,Object> map = new HashMap<String,Object>();
		
		if(validateImage.equalsIgnoreCase((String) session.getAttribute("checkNum"))){//判断验证码是否正确
		
			ServiceResult<Void> result = validateLogin(loginName, password);
			
			if (!result.getSuccess()) {
				model.addAttribute("loginName", loginName);
				model.addAttribute("message", result.getMessage());
				map.put("state", "error");
				map.put("message", "账号或密码错误!");
				return map;
			}
			
			UserEntity user  = new UserEntity();
			boolean isGetUser  = false;
			if(RegExpValidator.isPhoneNum(loginName)){
				ServiceResult<UserEntity> serviceResult = loginService.doLogin(loginName, password, null);
				if (!serviceResult.getSuccess()){
					model.addAttribute("loginName", loginName);
					model.addAttribute("message", serviceResult.getMessage());
					map.put("state", "error");
					map.put("info", "账号或密码错误!");
					return map;
				}
				user = serviceResult.getResult();
				if (user == null){
					isGetUser = true;
				}
			}
			
			//如果获取用户信息为null则登录失败
			if(isGetUser){
				model.addAttribute("loginName", loginName);
				model.addAttribute("message", "账号或密码错误!");
				map.put("state", "error");
				map.put("info", "账号或密码错误!");
				return map;
			}
			
			//把用户信息加载到session中
			SessionUtil.writeUserToSession(request, user);
			//加载用户权限
			//loadStationInfoToFrontUser(request, frontUser);
			//记录登录日志
			//writeLoginInfo(frontUser);
			//删除密码错误此时
			//deleteErrorCount(sessionId);
			
			map.put("state", "ok");
			map.put("info", "正常登陆");
			
			logger.info(user.getLoginName() + " 登录 ");
			return map;
		}else{
			map.put("state", "error");
			map.put("message", "验证码错误");
			return map;
		}
	}
	
	/**
	 * 退出系统
	 * @author HeJiawang
	 * @date   2016.10.09
	 */
	@RequestMapping(value = "/logout", method = {RequestMethod.GET})
	public String logout( HttpServletRequest request, HttpServletResponse response, Model model ){
		try {
			SessionUtil.deleteUserFromSession(request);
		} catch (Exception e) {
			logger.error("退出出错", e);
		}
		
		return "redirect:" + DomainUrlUtil.BASEURL_DOMAIN;
	}
	
	/**
	 * 验证登录信息
	 */
	private ServiceResult<Void> validateLogin(String username, String password) {
		ServiceResult<Void> result = new ServiceResult<>();
		if (StringUtils.isBlank(username)) {
			result.setMessage("登录账号不能为空");
			result.setSuccess(false);
			return result;
		}
		if (!RegExpValidator.isLoginNum(username)) {
			result.setMessage("请输入正确的登录账号");
			result.setSuccess(false);
			return result;
		}
		if (StringUtils.isBlank(password)) {
			result.setMessage("密码不能为空");
			result.setSuccess(false);
			return result;
		}

		result.setSuccess(true);
		return result;
	}
}
