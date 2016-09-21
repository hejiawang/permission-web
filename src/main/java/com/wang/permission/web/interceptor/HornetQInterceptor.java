package com.wang.permission.web.interceptor;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.wang.core.bean.BehaviorBean;
import com.wang.core.util.ClientIPUtils;
import com.wang.service.entity.user.UserEntity;

/**
 * 用户行为采集拦截器，利用HornetQ
 * 
 * @author HeJiawang
 * @date   2015-12-18
 */
public class HornetQInterceptor extends HandlerInterceptorAdapter {
	
	private final static Logger log = LoggerFactory.getLogger(HornetQInterceptor.class);
	
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

    	try {
            HttpSession session = request.getSession();
            UserEntity user = (UserEntity) session.getAttribute("userEntity");
            
            // 向HornetQ发送用户动作，排除掉资源文件的访问
            String url = request.getRequestURL().toString();			// 访问的URL
            if(url.indexOf("/resources/") < 0 && url.indexOf(".css") < 0 
            		&& url.indexOf(".js") < 0 && url.indexOf(".ico") < 0 
            		&& url.indexOf(".png") < 0 && url.indexOf(".jpg") < 0) {
              	// 组装数据
                String loginName = "visitors"; 							// 登陆人，默认非登陆用户统一为访客
                String remoteIP = ClientIPUtils.getClientIp(request);   // 方位者的IP地址
                
            	if(user != null && user.getLoginName() != null && user.getLoginName() != "") {
            		loginName = user.getLoginName();
            	}
            	Date date = new Date();
            	DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS");
            	String time = format.format(date);
            	
            	BehaviorBean behavior = new BehaviorBean();
            	behavior.setLoginName(loginName);
            	behavior.setRemoteIP(remoteIP);
            	behavior.setUrl(url);
            	behavior.setDate(time);
            	
            	// 发送消息
            	try {
            		//HornetqUtil.sendMessage(behavior);
				} catch (Exception e) {
					log.error("向HornetQ发送消息失败：", e);
					log.error(e.getMessage());
				}
            }
            return true;
        } catch (Exception e) {
            log.error("auth interceptor exception:", e);
            return false;
        }
    }
}
