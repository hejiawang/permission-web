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
import com.wang.service.entity.permission.PermissionAppTypeEntity;
import com.wang.service.param.permission.PermissionAppTypeParam;
import com.wang.service.service.permission.PermissionAppTypeService;

/**
 * 系统类型Controller
 * 
 * @author HeJiawang
 * @date   2016.10.16
 */
@Controller
@RequestMapping(value = "/appType")
public class PermissionAppTypeController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionAppTypeController.class);
	
	/**
	 * 系统类型service
	 */
	@Autowired
	private PermissionAppTypeService permissionAppTypeService; 
	
	/**
	 * 跳转系统类型页
	 * @author HeJiawang
	 * @date   2016.10.16
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "appType";
	}
	
	/**
	 * 获取分页系统类型
	 * @param appType 机构参数
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @param draw 分页
	 * @return 系统类型集合及分页信息
	 * @author HeJiawang
	 * @date   2016.10.16
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageAppType( PermissionAppTypeParam appType,Integer start,Integer length ){
		Map<String,Object> map =null;
		try {
			appType.setPageSize(length);
			appType.setPageNumber(start/length+1);
			
			map = permissionAppTypeService.pageAppType(appType).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageAppType方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
	}
	
	/**
	 * 查看系统类型
	 * @param appTypeID 系统类型ID
	 * @return 系统类型信息
	 * @author HeJiawang
	 * @date   2016.10.16
	 */
	@RequestMapping(value="/view/{appTypeID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Map<String, Object>> getAppTypeByID( @PathVariable("appTypeID") Integer appTypeID ){
		ServiceResult<Map<String, Object>> result = null;
		try {
			result = permissionAppTypeService.getAppTypeByID(appTypeID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的getAppTypeByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 删除系统类型
	 * @param appTypeID 系统类型ID
	 * @return 返回信息
	 * @author HeJiawang
	 * @date   2016.10.16
	 */
	@RequestMapping(value="/erase/{appTypeID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> deleteAppTypeByID( @PathVariable("appTypeID") Integer appTypeID ){
		ServiceResult<Void> result = null;
		try {
			result = permissionAppTypeService.deleteAppTypeByID(appTypeID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的deleteAppTypeByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 新增系统类型
	 * @param appType 系统类型信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.16
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseAppType( PermissionAppTypeParam appType ){
		ServiceResult<Void> result = null;
		try {
			result = permissionAppTypeService.addAppType(appType);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseAppType方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 修改系统类型
	 * @param appType 系统类型信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.16
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyAppType( PermissionAppTypeParam appType ){
		ServiceResult<Void> result = null;
		try {
			result = permissionAppTypeService.updateAppType(appType);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyAppType方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 获取系统类型树信息
	 * @param id	appTypeID
	 * @return 系统类型树信息
	 * @author HeJiawang
	 * @date   2016.10.16
	 */
	@RequestMapping(value="/trees", method = RequestMethod.GET, produces="text/plain;charset=UTF-8")
	public @ResponseBody String queryAppTypeForTree(Integer id){
		StringBuffer sb=new StringBuffer();
		try{
			List<PermissionAppTypeEntity> list = permissionAppTypeService.getAllAppType().getResult();	//所有apptype
			PermissionAppTypeEntity types;
			sb.append("[");
			if(id==null){
				id=0;
			}
			if(list!=null && list.size()>0){
				for (int i = 0; i < list.size(); i++) {
					types = list.get(i);
					if(i==(list.size()-1)){
						if(id.intValue()==types.getAppTypeID().intValue()){
							sb.append("{id:"+types.getAppTypeID()+",name:\""+types.getAppTypeName()+"\",checked:true}");
						}else{
							sb.append("{id:"+types.getAppTypeID()+",name:\""+types.getAppTypeName()+"\"}");
						}
					}else{
						if(id.intValue()==types.getAppTypeID().intValue()){
							sb.append("{id:"+types.getAppTypeID()+",name:\""+types.getAppTypeName()+"\",checked:true},");
						}else{
							sb.append("{id:"+types.getAppTypeID()+",name:\""+types.getAppTypeName()+"\"},");
						}
					}
				}
			}
			
			sb.append("]");
			logger.debug("appType树JSON====="+sb.toString());
		}catch(Exception e){
			logger.info("异常发生在"+this.getClass().getName()+"类的queryAppTypeForTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return sb.toString();
	}
	
}
