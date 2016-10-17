package com.wang.permission.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.service.entity.permission.PermissionOperationEntity;
import com.wang.service.entity.permission.PermissionResourceEntity;
import com.wang.service.service.permission.PermissionOperationService;
import com.wang.service.service.permission.PermissionResourceService;

/**
 * 操作Controller
 * 
 * @author HeJiawang
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
	private PermissionOperationService permissionOperationService;
	
	/**
	 * permissionResourceService
	 */
	private PermissionResourceService permissionResourceService;
	
	/**
	 * 获取应用系统对应的操作树
	 * @param appID 应用系统ID
	 * @return 操作树
	 * @author HeJiawang
	 * @date   2016.10.17
	 */
	@RequestMapping(value="/trees/app",method = RequestMethod.POST,produces="text/plain;charset=UTF-8")
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
	
}
