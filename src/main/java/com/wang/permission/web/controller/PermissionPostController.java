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
import com.wang.service.param.permission.PermissionPostParam;
import com.wang.service.service.permission.PermissionPostService;

/**
 * 岗位Controller
 * 
 * @author HeJiawang
 * @date   2016.10.12
 */
@Controller
@RequestMapping(value = "/post")
public class PermissionPostController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionPostController.class);
	
	/**
	 * 岗位service
	 */
	@Autowired
	private PermissionPostService permissionPostService; 
	
	/**
	 * 跳转岗位页
	 * @author HeJiawang
	 * @date   2016.10.12
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "post";
	}
	
	/**
	 * 获取分页岗位
	 * @param post 机构参数
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @param draw 分页
	 * @return 岗位集合及分页信息
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pagePost( PermissionPostParam post,Integer start,Integer length ){
		Map<String,Object> map =null;
		try {
			post.setPageStart(start);
			post.setPageEnd(start+length);
			
			map = permissionPostService.pagePost(post).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pagePost方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
	}
	
	/**
	 * 查看岗位
	 * @param postID 岗位ID
	 * @return 岗位信息
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/view/{postID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Map<String, Object>> getPostByID( @PathVariable("postID") Integer postID ){
		ServiceResult<Map<String, Object>> result = null;
		try {
			result = permissionPostService.getPostByID(postID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的getPostByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 删除岗位
	 * @param postID 岗位ID
	 * @return 返回信息
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/erase/{postID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> deletePostByID( @PathVariable("postID") Integer postID ){
		ServiceResult<Void> result = null;
		try {
			result = permissionPostService.deletePostByID(postID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的deletePostByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 新增岗位
	 * @param post 岗位信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raisePost( PermissionPostParam post ){
		ServiceResult<Void> result = null;
		try {
			result = permissionPostService.addPost(post);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raisePost方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 修改岗位
	 * @param post 岗位信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyPost( PermissionPostParam post ){
		ServiceResult<Void> result = null;
		try {
			result = permissionPostService.updatePost(post);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyPost方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 获取岗位树</br>
	 * 即、全部岗位
	 * @return 岗位树
	 * @author HeJiawang
	 * @date   2016.11.02
	 */
	@RequestMapping(value="/trees",method = RequestMethod.GET,produces="text/plain;charset=UTF-8")
	public @ResponseBody String queryPostForTree(){
		StringBuffer sb=new StringBuffer();
		try {
			List<PermissionPostParam> listp = permissionPostService.queryPostForTree().getResult();
			PermissionPostParam srp; 
			sb.append("[");
			for (int i = 0; i < listp.size(); i++) {
				srp = listp.get(i);
				if(i==(listp.size()-1)){
					sb.append("{id:"+srp.getPostID()+"\",name:\""+srp.getPostName()+"\"}");
				}else{
					sb.append("{id:"+srp.getPostID()+"\",name:\""+srp.getPostName()+"\"},");
				}
			}
			sb.append("]");
			logger.debug("操作树JSON====="+sb.toString());
		} catch (Exception e){
			logger.info("异常发生在"+this.getClass().getName()+"类的queryPostForTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());	
		}
		return sb.toString();
	}
	
}
