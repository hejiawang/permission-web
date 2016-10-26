package com.wang.permission.web.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.permission.web.util.SessionUtil;
import com.wang.service.entity.permission.PermissionUserInfoEntity;
import com.wang.service.param.permission.PermissionResourceParam;
import com.wang.service.service.permission.PermissionResourceService;
import com.wang.service.service.permission.PermissionUserInfoService;

/**
 * 资源Controller
 * 
 * @author HeJiawang
 * @date   2016.10.26
 */
@Controller
@RequestMapping(value = "/resource")
public class PermissionResourceController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionResourceController.class);
	
	/**
	 * permissionUserInfoService
	 */
	@Autowired
	private  PermissionUserInfoService permissionUserInfoService;
	
	/**
	 * permissionResourceService
	 */
	@Autowired
	private PermissionResourceService permissionResourceService;
	
	/**
	 * 根据登录角色,使应用系统、菜单、页面以资源的形式构成树
	 * @param id 树节点——resourceID
	 * @param parentType 树节点——父资源类型
	 * @return 资源树
	 * @author HeJiawang
	 * @date   2016.10.26
	 */
	@RequestMapping(value="/trees",method = RequestMethod.POST,produces="text/plain;charset=UTF-8")
	@ResponseBody
	public String queryResourceForTree(Integer id,String parentType, HttpServletRequest request){
		StringBuffer sb = new StringBuffer();
		
		try{
			/**
			 * 获取当前登录用户
			 */
			PermissionUserInfoEntity userInfo = SessionUtil.getFrontUserByRequest(request);
			Integer userID = userInfo.getUserID();
			
			/**
			 * 获取当前登录用户角色ID集合
			 */
			List<Integer> roleIDList = permissionUserInfoService.getRoleIDListByUserID(userID).getResult();
			
			PermissionResourceParam resource = permissionResourceService.getResourceByID(id = id==null?0:id).getResult();
			Integer parID = 0;
			if(resource != null){
				parID = resource.getSelfID();
			}
			if(parentType == null || parentType.equals("")){
				parentType = "SYS_APP";
			}
			
			List<PermissionResourceParam> listApp = new ArrayList<PermissionResourceParam>();
			List<PermissionResourceParam> listM = new ArrayList<PermissionResourceParam>();
			List<PermissionResourceParam> elementList = new ArrayList<PermissionResourceParam>();
			/*if(parID.intValue() == 0){
				listApp = sysRoleRoleService.findResourceApp(parID,accountID,roleIDlist);//所有系统资源
			}else{
				listM = sysRoleRoleService.findResourceMenu(parID,parentType,accountID,roleIDlist);
				elementList = sysRoleRoleService.findResourceEle(parID,parentType,accountID,roleIDlist);
			}*/
			listM.addAll(elementList);
			listApp.addAll(listM);
			PermissionResourceParam res;
			sb.append("[");
			for (int j = 0; j < listApp.size(); j++) {
				res = listApp.get(j);
				if(j==(listApp.size()-1)){
					if(res.getIsParent()>0){
						sb.append("{id:"+res.getResourceID()+",name:\""+res.getSelfName()+"\",parentType:\""+res.getSelfType()+"\",isParent:true");
						if(res.getSelfType().equals("SYS_APP")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_close.png\"}");
						}else if(res.getSelfType().equals("SYS_MENU")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_open.png\"}");
						}else{
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/3.png\"}");
						}
					}else{
						sb.append("{id:"+res.getResourceID()+",name:\""+res.getSelfName()+"\",parentType:\""+res.getSelfType()+"\"");
						if(res.getSelfType().equals("SYS_APP")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_close.png\"}");
						}else if(res.getSelfType().equals("SYS_MENU")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_open.png\"}");
						}else{
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/3.png\"}");
						}
					}
				}else{
					if(res.getIsParent()>0){
						sb.append("{id:"+res.getResourceID()+",name:\""+res.getSelfName()+"\",parentType:\""+res.getSelfType()+"\",isParent:true");
						if(res.getSelfType().equals("SYS_APP")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_close.png\"},");
						}else if(res.getSelfType().equals("SYS_MENU")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_open.png\"},");
						}else{
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/3.png\"},");
						}
					}else{
						sb.append("{id:"+res.getResourceID()+",name:\""+res.getSelfName()+"\",parentType:\""+res.getSelfType()+"\"");
						if(res.getSelfType().equals("SYS_APP")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_close.png\"},");
						}else if(res.getSelfType().equals("SYS_MENU")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_open.png\"},");
						}else{
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/3.png\"},");
						}
					}
				}
			}
			sb.append("]");
			logger.debug("resource树JSON====="+sb.toString());
		} catch ( Exception e ) {
			logger.info("异常发生在"+this.getClass().getName()+"类的queryResourceForTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return sb.toString();
	}
	
}
