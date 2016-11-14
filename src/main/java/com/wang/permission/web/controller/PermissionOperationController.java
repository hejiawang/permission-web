package com.wang.permission.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.service.entity.permission.PermissionOperationEntity;
import com.wang.service.entity.permission.PermissionResourceEntity;
import com.wang.service.param.permission.PermissionPermissionOperationParam;
import com.wang.service.service.permission.PermissionOperationService;
import com.wang.service.service.permission.PermissionResourceService;

/**
 * 操作Controller
 * 
 * @author HeJiawang
 * @param <PermissionpPermissionOperationParam>
 * @date   2016.10.17
 */
@Controller
@RequestMapping(value = "/operation")
public class PermissionOperationController extends BaseController {

	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionOperationController.class);
	
	/**
	 * permissionOperationService
	 */
	@Autowired
	private PermissionOperationService permissionOperationService;
	
	/**
	 * permissionResourceService
	 */
	@Autowired
	private PermissionResourceService permissionResourceService;
	
	/**
	 * 获取应用系统对应的操作树
	 * @param appID 应用系统ID
	 * @return 操作树
	 * @author HeJiawang
	 * @date   2016.10.17
	 */
	@RequestMapping(value="/trees/app",method = RequestMethod.GET,produces="text/plain;charset=UTF-8")
	public @ResponseBody String queryAppOperationForTree(Integer appID){
		StringBuffer sb=new StringBuffer();
		try{
			List<PermissionOperationEntity> list = permissionOperationService.getOperationForApp().getResult();//所有操作
			List<Integer> opList = new ArrayList<Integer>();
			if(appID!=null){
				PermissionResourceEntity resource = permissionResourceService.getResourceByAppID(appID).getResult();
				opList = permissionOperationService.getOperationIDByResourceID(resource.getResourceID()).getResult();//当前APP对应的操作
			}
			PermissionOperationEntity operations;
			sb.append("[");
			for (int i = 0; i < list.size(); i++) {
				operations = list.get(i);
				if(opList!=null&&opList.size()>0){
					if(opList.contains(operations.getOperationID())){
						if(i==(list.size()-1)){
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\",checked:true}");
						}else{
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\",checked:true},");
						}
					}else{
						if(i==(list.size()-1)){
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"}");
						}else{
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"},");
						}
					}
				}else{
					if(i==(list.size()-1)){
						sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"}");
					}else{
						sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"},");
					}
				}
			}
			sb.append("]");
			logger.debug("操作树JSON====="+sb.toString());
		}catch(Exception e){
			logger.info("异常发生在"+this.getClass().getName()+"类的queryAppOperationForTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return sb.toString();
	}
	
	/**
	 * 获取菜单对应的操作树
	 * @param menuID 菜单ID
	 * @return 操作树
	 * @author HeJiawang
	 * @date   2016.10.21
	 */
	@RequestMapping(value="/trees/menu",method = RequestMethod.GET,produces="text/plain;charset=UTF-8")
	public @ResponseBody String queryMenuOperationForTree(Integer menuID){
		StringBuffer sb=new StringBuffer();
		try{
			List<PermissionOperationEntity> list = permissionOperationService.getOperationForMenu().getResult();//所有操作
			List<Integer> opList = new ArrayList<Integer>();
			if(menuID!=null){
				PermissionResourceEntity resource = permissionResourceService.getResourceByMenuID(menuID).getResult();
				opList = permissionOperationService.getOperationIDByResourceID(resource.getResourceID()).getResult();//当前menu对应的操作
			}
			PermissionOperationEntity operations;
			sb.append("[");
			for (int i = 0; i < list.size(); i++) {
				operations = list.get(i);
				if(opList!=null&&opList.size()>0){
					if(opList.contains(operations.getOperationID())){
						if(i==(list.size()-1)){
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\",checked:true}");
						}else{
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\",checked:true},");
						}
					}else{
						if(i==(list.size()-1)){
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"}");
						}else{
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"},");
						}
					}
				}else{
					if(i==(list.size()-1)){
						sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"}");
					}else{
						sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"},");
					}
				}
			}
			sb.append("]");
			logger.debug("操作树JSON====="+sb.toString());
		}catch(Exception e){
			logger.info("异常发生在"+this.getClass().getName()+"类的queryMenuOperationForTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return sb.toString();
	}
	
	/**
	 * 获取页面元素对应的操作树
	 * @param elementID 页面元素ID
	 * @return 操作树
	 * @author HeJiawang
	 * @date   2016.10.21
	 */
	@RequestMapping(value="/trees/element",method = RequestMethod.GET,produces="text/plain;charset=UTF-8")
	public @ResponseBody String queryElementOperationForTree(Integer elementID){
		StringBuffer sb=new StringBuffer();
		try{
			List<PermissionOperationEntity> list = permissionOperationService.getOperationForElement().getResult();//所有操作
			List<Integer> opList = new ArrayList<Integer>();
			if(elementID!=null){
				PermissionResourceEntity resource = permissionResourceService.getResourceByElementID(elementID).getResult();
				opList = permissionOperationService.getOperationIDByResourceID(resource.getResourceID()).getResult();//当前menu对应的操作
			}
			PermissionOperationEntity operations;
			sb.append("[");
			for (int i = 0; i < list.size(); i++) {
				operations = list.get(i);
				if(opList!=null&&opList.size()>0){
					if(opList.contains(operations.getOperationID())){
						if(i==(list.size()-1)){
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\",checked:true}");
						}else{
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\",checked:true},");
						}
					}else{
						if(i==(list.size()-1)){
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"}");
						}else{
							sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"},");
						}
					}
				}else{
					if(i==(list.size()-1)){
						sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"}");
					}else{
						sb.append("{id:"+operations.getOperationID()+",name:\""+operations.getOperationName()+"\"},");
					}
				}
			}
			sb.append("]");
			logger.debug("操作树JSON====="+sb.toString());
		}catch(Exception e){
			logger.info("异常发生在"+this.getClass().getName()+"类的queryElementOperationForTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return sb.toString();
	}
	
	/**
	 * 获取资源对应的操作树
	 * @param roleID 角色ID
	 * @param resourceID 资源ID
	 * @return 操作树
	 * @author HeJiawang
	 * @date   2016.10.28
	 */
	@RequestMapping(value="/trees/resource",method = RequestMethod.GET,produces="text/plain;charset=UTF-8")
	public @ResponseBody String queryResourceOperationForTree(Integer roleID, Integer resourceID){
		StringBuffer sb=new StringBuffer();
		try {
			List<Integer> list = permissionOperationService.getOperationByRoleIDAndResourceID(roleID,resourceID).getResult();//角色所有的资源的操作权限ID
			List<PermissionPermissionOperationParam> listp = permissionOperationService.getOperationAndPermissionByResourceID(resourceID).getResult();
			PermissionPermissionOperationParam srp; 
			sb.append("[");
			for (int i = 0; i < listp.size(); i++) {
				srp = listp.get(i);
				if(i==(listp.size()-1)){
					if(list.contains(srp.getPermissionID())){
						sb.append("{id:"+srp.getPermissionID()+",opid:\""+srp.getOperationID()+"\",name:\""+srp.getOperationName()+"\",checked:true}");
					}else{
						sb.append("{id:"+srp.getPermissionID()+",opid:\""+srp.getOperationID()+"\",name:\""+srp.getOperationName()+"\"}");
					}
				}else{
					if(list.contains(srp.getPermissionID())){
						sb.append("{id:"+srp.getPermissionID()+",opid:\""+srp.getOperationID()+"\",name:\""+srp.getOperationName()+"\",checked:true},");
					}else{
						sb.append("{id:"+srp.getPermissionID()+",opid:\""+srp.getOperationID()+"\",name:\""+srp.getOperationName()+"\"},");
					}
				}
			}
			sb.append("]");
			logger.debug("操作树JSON====="+sb.toString());
		} catch (Exception e){
			logger.info("异常发生在"+this.getClass().getName()+"类的queryResourceOperationForTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());	
		}
		return sb.toString();
	}
	
}
