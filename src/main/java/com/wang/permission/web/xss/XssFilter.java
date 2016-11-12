package com.wang.permission.web.xss;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * 防跨域脚本攻击过滤器
 * 
 * @author HeJiawang
 * @date   2016.09.20
 */
public class XssFilter implements Filter {

	FilterConfig filterConfig = null;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;

	}

	private final static Set<String> ANONYMOUS_URLS = new HashSet<String>();

	static {
		ANONYMOUS_URLS.add("/app/raise");
		ANONYMOUS_URLS.add("/app/modify");
		
		ANONYMOUS_URLS.add("/menu/raise");
		ANONYMOUS_URLS.add("/menu/modify");
		
		ANONYMOUS_URLS.add("/element/raise");
		ANONYMOUS_URLS.add("/element/modify");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		if (ANONYMOUS_URLS.contains(httpRequest.getRequestURI())) {
			chain.doFilter(request, response);
		} else {
			chain.doFilter(new XssHttpServletRequestWrapper((HttpServletRequest) request), (HttpServletResponse) response);
		}
	}

	@Override
	public void destroy() {
		this.filterConfig = null;
	}

}
