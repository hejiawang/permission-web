package com.wang.permission.web.controller;

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
import com.wang.service.param.permission.PermissionRoleParam;
import com.wang.service.service.permission.PermissionRoleService;

/**
 * 角色Controller
 * 
 * @author HeJiawang
 * @date   2016.10.14
 */
@Controller
@RequestMapping(value = "/role")
public class PermissionRoleController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionRoleController.class);
	
	/**
	 * 角色service
	 */
	@Autowired
	private PermissionRoleService permissionRoleService; 
	
	/**
	 * 跳转角色页
	 * @author HeJiawang
	 * @date   2016.10.14
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "role";
	}
	
	/**
	 * 获取分页角色
	 * @param role 角色参数
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @param draw 分页
	 * @return 角色集合及分页信息
	 * @author HeJiawang
	 * @date   2016.10.14
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageRole( PermissionRoleParam role,Integer start,Integer length ){
		Map<String,Object> map =null;
		try {
			role.setPageStart(start);
			role.setPageEnd(start+length);
			
			map = permissionRoleService.pageRole(role).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageRole方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
	}
	
	/**
	 * 查看角色
	 * @param roleID 角色ID
	 * @return 角色信息
	 * @author HeJiawang
	 * @date   2016.10.14
	 */
	@RequestMapping(value="/view/{roleID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Map<String, Object>> getRoleByID( @PathVariable("roleID") Integer roleID ){
		ServiceResult<Map<String, Object>> result = null;
		try {
			result = permissionRoleService.getRoleByID(roleID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的getRoleByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 删除角色
	 * @param roleID 角色ID
	 * @return 返回信息
	 * @author HeJiawang
	 * @date   2016.10.14
	 */
	@RequestMapping(value="/erase/{roleID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> deleteRoleByID( @PathVariable("roleID") Integer roleID ){
		ServiceResult<Void> result = null;
		try {
			result = permissionRoleService.deleteRoleByID(roleID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的deleteRoleByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 新增角色
	 * @param role 角色信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.14
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseRole( PermissionRoleParam role ){
		ServiceResult<Void> result = null;
		try {
			result = permissionRoleService.addRole(role);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseRole方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 修改角色
	 * @param role 角色信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.14
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyRole( PermissionRoleParam role ){
		ServiceResult<Void> result = null;
		try {
			result = permissionRoleService.updateRole(role);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyRole方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 为角色分配权限
	 * @param role 角色信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.28
	 */
	@RequestMapping(value="/raisePermission",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raisePermission( PermissionRoleParam role ){
		ServiceResult<Void> result = null;
		try {
			result = permissionRoleService.raisePermission(role);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raisePermission方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 获取角色树</br>
	 * 即、全部角色
	 * @return 角色树
	 * @author HeJiawang
	 * @date   2016.11.03
	 */
	@RequestMapping(value="/trees",method = RequestMethod.GET,produces="text/plain;charset=UTF-8")
	public @ResponseBody String queryRoleForTree(){
		StringBuffer sb=new StringBuffer();
		try {
			List<PermissionRoleParam> listp = permissionRoleService.queryRoleForTree().getResult();
			PermissionRoleParam srp; 
			sb.append("[");
			for (int i = 0; i < listp.size(); i++) {
				srp = listp.get(i);
				if(i==(listp.size()-1)){
					sb.append("{id:"+srp.getRoleID()+"\",name:\""+srp.getRoleName()+"\"}");
				}else{
					sb.append("{id:"+srp.getRoleID()+"\",name:\""+srp.getRoleName()+"\"},");
				}
			}
			sb.append("]");
			logger.debug("操作树JSON====="+sb.toString());
		} catch (Exception e){
			logger.info("异常发生在"+this.getClass().getName()+"类的queryRoleForTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());	
		}
		return sb.toString();
	}
}
