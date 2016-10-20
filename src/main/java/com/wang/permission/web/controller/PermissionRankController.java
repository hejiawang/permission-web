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
import com.wang.service.param.permission.PermissionRankParam;
import com.wang.service.service.permission.PermissionRankService;

/**
 * 职级Controller
 * 
 * @author HeJiawang
 * @date   2016.10.13
 */
@Controller
@RequestMapping(value = "/rank")
public class PermissionRankController extends BaseController  {

	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(PermissionRankController.class);
	
	/**
	 * 岗位service
	 */
	@Autowired
	private PermissionRankService permissionRankService; 
	
	/**
	 * 跳转职级页
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value = "", method = {RequestMethod.GET})
	public String login() {
		return "rank";
	}
	
	/**
	 * 获取分页职级
	 * @param rank 职级参数
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @param draw 分页
	 * @return 职级集合及分页信息
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageRank( PermissionRankParam rank,Integer start,Integer length ){
		Map<String,Object> map =null;
		try {
			rank.setPageStart(start);
			rank.setPageEnd(start+length);
			
			map = permissionRankService.pageRank(rank).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageRank方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return map;
	}
	
	/**
	 * 根据父职级ID获取职级树
	 * @param id	父职级ID
	 * @return		职级树
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/trees",method = RequestMethod.GET,produces="text/plain;charset=UTF-8")
	public @ResponseBody String queryRankForTree(Integer id){
		StringBuffer sb=new StringBuffer();
		try{
			if(id == null){
				id = 0;//根
			}
			List<PermissionRankParam> list = permissionRankService.findRankForTree(id).getResult();//所有机构
			PermissionRankParam ranks;
			sb.append("[");
			for (int i = 0; i < list.size(); i++) {
				ranks = list.get(i);
				if(id == ranks.getRankID()){
					if(i==(list.size()-1)){
						if(ranks.getIsParent()>0){
							sb.append("{id:"+ranks.getRankID()+",name:\""+ranks.getRankName()+"\",checked:true,open:true,isParent:true}");
						}else{
							sb.append("{id:"+ranks.getRankID()+",name:\""+ranks.getRankName()+"\",open:true,checked:true}");
						}
					}else{
						if(ranks.getIsParent()>0){
							sb.append("{id:"+ranks.getRankID()+",name:\""+ranks.getRankName()+"\",checked:true,open:true,isParent:true},");
						}else{
							sb.append("{id:"+ranks.getRankID()+",name:\""+ranks.getRankName()+"\",open:true,checked:true},");
						}
					}
				}else{
					if(i==(list.size()-1)){
						if(ranks.getIsParent()>0){
							sb.append("{id:"+ranks.getRankID()+",name:\""+ranks.getRankName()+"\",open:true,isParent:true}");
						}else{
							sb.append("{id:"+ranks.getRankID()+",name:\""+ranks.getRankName()+"\",open:true}");
						}
					}else{
						if(ranks.getIsParent()>0){
							sb.append("{id:"+ranks.getRankID()+",name:\""+ranks.getRankName()+"\",open:true,isParent:true},");
						}else{
							sb.append("{id:"+ranks.getRankID()+",name:\""+ranks.getRankName()+"\",open:true},");
						}
					}
				}
			}
			sb.append("]");
			logger.info("org树JSON====="+sb.toString());
		}catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的queryRankForTree方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return sb.toString();
	}
	
	/**
	 * 查看职级
	 * @param rankID 职级ID
	 * @return 职级信息
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/view/{rankID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Map<String, Object>> getRankByID( @PathVariable("rankID") Integer rankID ){
		ServiceResult<Map<String, Object>> result = null;
		try {
			result = permissionRankService.getRankByID(rankID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的getRankByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 删除职级
	 * @param rankID 职级ID
	 * @return 返回信息
	 * @author HeJiawang
	 * @date   2016.10.11
	 */
	@RequestMapping(value="/erase/{rankID}",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> deleteRankByID( @PathVariable("rankID") Integer rankID ){
		ServiceResult<Void> result = null;
		try {
			result = permissionRankService.deleteRankByID(rankID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的deleteRankByID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 新增职级
	 * @param rank 职级信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseRank( PermissionRankParam rank ){
		ServiceResult<Void> result = null;
		try {
			result = permissionRankService.addRank(rank);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseRank方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
	/**
	 * 修改职级
	 * @param  rank	职级信息
	 * @return ServiceResult
	 * @author HeJiawang
	 * @date   2016.10.13
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyRank( PermissionRankParam rank ){
		ServiceResult<Void> result = null;
		try {
			result = permissionRankService.updateRank(rank);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyRank方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		
		return result;
	}
	
}
