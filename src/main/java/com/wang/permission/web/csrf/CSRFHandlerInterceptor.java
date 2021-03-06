package com.wang.permission.web.csrf;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.wang.core.exception.BusinessException;


/**
 * 只针对post请求做检查，本机制认为只有post请求为改变数据状态</br>
 * 比较request中的CSRFToken值和token值如果相同则允许操作否则到错误页面</br>
 *
 * @author HeJiawang
 * @date   2016.09.20
 */
public class CSRFHandlerInterceptor extends HandlerInterceptorAdapter {

	//private final static Logger      log         = LoggerFactory.getLogger(CSRFTokenManager.class);
	private final static Set<String> DIRECT_URLS = new HashSet<String>();

	static {
		DIRECT_URLS.add("/login.html");
		DIRECT_URLS.add("/login");
		DIRECT_URLS.add("/error.html");
		
		DIRECT_URLS.add("/org/raise");
		DIRECT_URLS.add("/org/modify");
		
		DIRECT_URLS.add("/post/raise");
		DIRECT_URLS.add("/post/modify");
		
		DIRECT_URLS.add("/rank/raise");
		DIRECT_URLS.add("/rank/modify");
		
		DIRECT_URLS.add("/role/raise");
		DIRECT_URLS.add("/role/modify");
		DIRECT_URLS.add("/role/raisePermission");
		
		DIRECT_URLS.add("/appType/raise");
		DIRECT_URLS.add("/appType/modify");
		
		DIRECT_URLS.add("/app/raise");
		DIRECT_URLS.add("/app/modify");
		
		DIRECT_URLS.add("/menu/raise");
		DIRECT_URLS.add("/menu/modify");
		
		DIRECT_URLS.add("/element/raise");
		DIRECT_URLS.add("/element/modify");
		
		DIRECT_URLS.add("/userInfo/raise");
		DIRECT_URLS.add("/userInfo/modify");
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		if (!request.getMethod().equalsIgnoreCase("POST") || DIRECT_URLS.contains(request.getRequestURI())) {
			// Not a POST - allow the request
			return true;
		} else {
			// This is a POST request - need to check the CSRF token
			String memKey = CSRFTokenManager.getMemkeyFromRequest(request);

			if (StringUtils.isEmpty(memKey)) {
				//response.sendError(HttpServletResponse.SC_FORBIDDEN, "Bad or missing CSRF value");
				throw new BusinessException("请使用正常方式提交，不要进行重复提交操作!" + request.getRequestURI());
				//return false;
			}
			String memToken = CSRFTokenManager.getTokenForSession(session, memKey);
			String requestToken = CSRFTokenManager.getTokenFromRequest(request);

			if (memToken.equals(requestToken)) {
				CSRFTokenManager.destroyTokenForSession(session, memKey);
				return true;
			} else {
				//response.sendError(HttpServletResponse.SC_FORBIDDEN, "Bad or missing CSRF value");
				throw new BusinessException("请使用正常方式提交，不要进行重复提交操作!");
				//return false;
			}
		}
	}
}
