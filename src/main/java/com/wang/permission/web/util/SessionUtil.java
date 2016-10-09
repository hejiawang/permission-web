package com.wang.permission.web.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.wang.core.util.ClientIPUtils;
import com.wang.core.util.CookieHelper;
import com.wang.core.util.SaltUtil;
import com.wang.service.entity.user.UserEntity;

/**
 * session工具类
 * @author HeJiawang
 */
public class SessionUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(SessionUtil.class);
	
	private static final String COOKIE_SESSION_ID = "SOMPLE_PERMISSION" + "_SESSION_ID";
	private static final String SESSION_ID_CACHE_KEY = "SESSION_ID_CACHE_KEY";

	/**
	 * 生成sessionId写入cookie
	 */
	public static String getOrCreateSessionId(HttpServletRequest request, HttpServletResponse response) {
		String sessionId = getSessionId(request);
		if (StringUtils.isEmpty(sessionId)) {
			sessionId = genSessionId(ClientIPUtils.getIpAddr(request));
			CookieHelper.addCookie(
					COOKIE_SESSION_ID,
					sessionId,
//					/DomainUrlUtil.COOKIE_DOMAIN,
					"/",
					-1, //session有效时间为关闭浏览器失效
					response
			);
		}
		request.setAttribute(SESSION_ID_CACHE_KEY, sessionId);
		return sessionId;
	}
	
	/**
	 * 从request中获取用户信息
	 */
	public static UserEntity getFrontUserByRequest(HttpServletRequest request) {
		return getFrontUserBySessionId(request);
	}
	
	/**
	 * 获取sessionId
	 */
	public static String getSessionId(HttpServletRequest request) {
		if (request == null) {
			return null;
		}
		String sessionId = (String) request.getAttribute(SESSION_ID_CACHE_KEY);
		if (sessionId != null) {
			return sessionId;
		}
//		sessionId = request.getSession().getId();
		Cookie cookie = CookieHelper.getCookieByName(request, COOKIE_SESSION_ID);
		if (cookie != null) {
			sessionId = cookie.getValue();
		}
		request.setAttribute(SESSION_ID_CACHE_KEY, sessionId);
		return sessionId;
	}
	
	/**
	 * 生成sessionId
	 *
	 * @param ip 客户端IP
	 * @return 生成的 sessionId 应用:在用户访问页面里，如果没有sessionId时，调用生成。
	 */
	public static String genSessionId(String ip) {
		return Md5.getMd5String(ip + System.currentTimeMillis() + SaltUtil.generateWord(4));
	}
	
	/**
	 * 从sessionId中获取用户信息
	 */
	public static UserEntity getFrontUserBySessionId(HttpServletRequest request) {

		try {
			String sessionId = getSessionId(request);
			String key = WebConstants.NAMESPACE_PERMISSION_WEB_SESSION + sessionId;
			HttpSession session = request.getSession();
			UserEntity frontUser = (UserEntity)session.getAttribute(key);
			if (frontUser == null)
				return new UserEntity();
			if (frontUser != null ) {
				logger.debug("从session中取[{}]用户没有登录",key);
			}
			return  frontUser;
		} catch (Exception e) {
			logger.error("获取从session中UserEntity异常", e);
			return new UserEntity();
		}
	}
	
	/**
	 * 缓存用户信息至session
	 */
	public static UserEntity writeUserToSession(HttpServletRequest request, UserEntity user) {

		try {
			if (request == null || user == null) {
				return new UserEntity();
			}
			String sessionId = getSessionId(request);
			if (user == null || sessionId == null) {
				return new UserEntity();
			}
			final String key = WebConstants.NAMESPACE_PERMISSION_WEB_SESSION + sessionId;
			HttpSession session = request.getSession();
			session.setAttribute(key, user);
		} catch (Exception e) {
			logger.error("用户信息写入session中异常", e);
		}
		return user;
	}
	
	/**
	 * 删除session
	 * @author HeJiawang
	 * @date   2016.10.09
	 */
	public static void deleteUserFromSession(HttpServletRequest request){
		try {
			String sessionId = getSessionId(request);
			final String key = WebConstants.NAMESPACE_PERMISSION_WEB_SESSION + sessionId;
			HttpSession session = request.getSession();
			session.removeAttribute(key);
			session.invalidate();
		} catch (Exception e) {
			logger.error("用户信息写入session中异常", e);
		}
	}
	
}
