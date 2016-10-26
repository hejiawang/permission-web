package com.wang.permission.web.interceptor;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.wang.core.util.DomainUrlUtil;
import com.wang.permission.web.util.SessionUtil;
import com.wang.service.entity.permission.PermissionUserInfoEntity;

/**
 * 权限拦截器
 *
 * @author HeJiawang
 * @date   2016.09.20
 */
public class AuthInterceptor extends HandlerInterceptorAdapter {

	private final static Logger logger = LoggerFactory.getLogger(AuthInterceptor.class);

	private final static Set<String> ANONYMOUS_URLS = new HashSet<String>();

	static {
		ANONYMOUS_URLS.add("/login");
		ANONYMOUS_URLS.add("/error.html");
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		
		try {
			
			SessionUtil.getOrCreateSessionId(request, response);
			
			if (ANONYMOUS_URLS.contains(request.getRequestURI())) {
				return true;
			}

			PermissionUserInfoEntity user = SessionUtil.getFrontUserByRequest(request);
			if( null == user ){
				response.sendRedirect(DomainUrlUtil.BASEURL_DOMAIN + "/login");
				return false;
			} else if ( user.getUserID() == null ) {
				response.sendRedirect(DomainUrlUtil.BASEURL_DOMAIN + "/login");
				return false;
			}
			
			return true;
		} catch (Exception e) {
			logger.error("auth interceptor exception:", e);
			return false;
		}
	}

}
