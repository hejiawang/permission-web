package com.wang.permission.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.service.param.permission.PermissionMenuParam;
import com.wang.service.param.permission.PermissionResourceParam;
import com.wang.service.service.permission.PermissionMenuService;
import com.wang.service.service.permission.PermissionResourceService;

/**
 * 菜单管理Controller
 * 
 * @author HeJiawang
 * @date   2016.10.18
 */
@Controller
@RequestMapping(value = "/menu")
public class PermissionMenuController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionMenuController.class);
	
	/**
	 * permissionResourceService
	 */
	@Autowired
	private PermissionResourceService permissionResourceService;
	
	/**
	 * permissionMenuService
	 */
	@Autowired
	private PermissionMenuService permissionMenuService;
	
	/**
	 * 跳转菜单管理页
	 * @author HeJiawang
	 * @date   2016.10.18
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "menu";
	}
	
	/**
	 * 获取菜单树资源信息
	 * @param id 资源ID
	 * @return 菜单树资源信息
	 * @author HeJiawang
	 * @date   2016.10.18
	 */
	@RequestMapping(value="/trees",method = RequestMethod.GET,produces="text/plain;charset=UTF-8")
	@ResponseBody
	public String queryMenuTree(Integer id){
		StringBuffer sb = new StringBuffer();
		PermissionResourceParam resource = permissionResourceService.getResourceByID( id = id==null?-1:id ).getResult();
		Integer parID = 0;
		if(resource != null){
			parID = resource.getResourceID();
		}
		try{
			List<PermissionResourceParam> listApp = new ArrayList<PermissionResourceParam>();
			if(parID.intValue() == 0){
				listApp = permissionResourceService.getResourceForApp().getResult();//所有系统资源
			}
			List<PermissionResourceParam> listM = permissionResourceService.getResourceForMenu(parID).getResult();
			listApp.addAll(listM);
			PermissionResourceParam res;
			sb.append("[");
			for (int j = 0; j < listApp.size(); j++) {
				res = listApp.get(j);
				if(j==(listApp.size()-1)){
					if(res.getIsParent()>0){
						sb.append("{id:"+res.getResourceID()+",sid:\""+res.getSelfID()+"\",stype:\""+res.getSelfType()+"\",name:\""+res.getSelfName()+"\",isParent:true");
						if(res.getSelfType().equals("SYS_APP")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_close.png\"}");
						}else if(res.getSelfType().equals("SYS_MENU")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_open.png\"}");
						}
					}else{
						sb.append("{id:"+res.getResourceID()+",sid:\""+res.getSelfID()+"\",stype:\""+res.getSelfType()+"\",name:\""+res.getSelfName()+"\"");
						if(res.getSelfType().equals("SYS_APP")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_close.png\"}");
						}else if(res.getSelfType().equals("SYS_MENU")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_open.png\"}");
						}
					}
				}else{
					if(res.getIsParent()>0){
						sb.append("{id:"+res.getResourceID()+",sid:\""+res.getSelfID()+"\",stype:\""+res.getSelfType()+"\",name:\""+res.getSelfName()+"\",isParent:true");
						if(res.getSelfType().equals("SYS_APP")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_close.png\"},");
						}else if(res.getSelfType().equals("SYS_MENU")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_open.png\"},");
						}
					}else{
						sb.append("{id:"+res.getResourceID()+",sid:\""+res.getSelfID()+"\",stype:\""+res.getSelfType()+"\",name:\""+res.getSelfName()+"\"");
						if(res.getSelfType().equals("SYS_APP")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_close.png\"},");
						}else if(res.getSelfType().equals("SYS_MENU")){
							sb.append(",icon:\"resources/zTree/css/zTreeStyle/img/diy/1_open.png\"},");
						}
					}
				}
			}
			sb.append("]");
			logger.debug("resource树JSON====="+sb.toString());
		}catch (Exception e) {
			logger.info("异常发生在"+this.getClass().getName()+"类的queryMenuTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}	
		return sb.toString();
	}
	
	/**
	 * 获取分页菜单
	 * @param menu 菜单参数
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @param draw 分页
	 * @return 菜单集合及分页信息
	 * @author HeJiawang
	 * @date   2016.10.18
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageMenu( PermissionMenuParam menu,Integer start,Integer length ){
		Map<String,Object> map =null;
		try {
			menu.setPageStart(start);
			menu.setPageEnd(start+length);
			
			map = permissionMenuService.pageMenu(menu).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageMenu方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
	}
	
	/**
	 * 新增菜单
	 * @param  menu 菜单信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.21
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseMenu( PermissionMenuParam menu ){
		ServiceResult<Void> result = null;
		try {
			result = permissionMenuService.addMenu(menu);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseMenu方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * menu查看
	 * @param menuID menuID
	 * @return 应用系统信息
	 * @author HeJiawang
	 * @date   2016.10.21
	 */
	@RequestMapping(value="/view/{menuID}",method=RequestMethod.GET)
	@ResponseBody 
	public ServiceResult<PermissionMenuParam> getMenu(@PathVariable("menuID") Integer menuID){
		ServiceResult<PermissionMenuParam> result = null;
		try {
			result = permissionMenuService.getMenuByID(menuID);
		} catch (Exception e) {
			logger.info("异常发生在"+this.getClass().getName()+"类的getMenu方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 通过资源ID获取菜单信息
	 * @param menuID menuID
	 * @return 应用系统信息
	 * @author HeJiawang
	 * @date   2016.10.21
	 */
	@RequestMapping(value="/getMenuByResourceID/{resourceID}",method=RequestMethod.GET)
	@ResponseBody 
	public ServiceResult<PermissionMenuParam> getMenuByResourceID(@PathVariable("resourceID") Integer resourceID){
		ServiceResult<PermissionMenuParam> result = null;
		try {
			result = permissionMenuService.getMenuByResourceID(resourceID);
		} catch (Exception e) {
			logger.info("异常发生在"+this.getClass().getName()+"类的getMenuByResourceID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 删除menu
	 * @param menuID menuID
	 * @return 返回信息
	 * @author HeJiawang
	 * @date   2016.10.21
	 */
	@RequestMapping(value="/erase/{menuID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> deleteMenuByID( @PathVariable("menuID") Integer menuID ){
		ServiceResult<Void> result = null;
		try {
			result = permissionMenuService.deleteMenuByID(menuID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的deleteMenuByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 修改菜单
	 * @param menu 菜单信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.22
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyMenu( PermissionMenuParam menu ){
		ServiceResult<Void> result = null;
		try {
			result = permissionMenuService.updateMenu(menu);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyMenu方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
}
