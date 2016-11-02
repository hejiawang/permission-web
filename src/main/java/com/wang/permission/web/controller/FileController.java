package com.wang.permission.web.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Date;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件、图片上传下载controller
 * @author HeJiawang
 * @date   2016.11.02
 */
@Controller
@RequestMapping(value = "/file")
public class FileController extends BaseController {
	
	/**
	 * logger
	 */
	private static final Logger logger = LoggerFactory.getLogger(FileController.class);
	
	/**
	 * 图片上传，使用的是dropzone.js</br>
	 * 先判断文件的大小file.getSize，文件大小在页面上也加过判断</br>
	 * 图片上传的路径为 webRoot/assets/upload/文件夹</br>
	 * 图片的文件名为 当前时间的毫秒数 拼接 UUID，然后拼接 原文件的后缀名</br>
	 * 用BufferedImage类去读取原文件的流，用来判断上传文件如果不是图片的情况。比如将txt文件修改后缀名为jpg等。</br>
	 * 根据dropzone的规定，如果有错误需要手动返回 response，错误码为400至500，这里选择了返回500以及错误信息 error</br>
	 * 如何返回错误信息。首先需要在response的header中返回错误代码（HTTP status code）</br>
	 * 返回的具体信息取决于返回的Content-Type，如果是text/plain，则直接返回错误的 message，</br>
	 * 如果返回的是application/json，则需要返回json格式的数据，例如 { "error": "File could not be saved." }</br>
	 * 
	 * @author HeJiawang
	 * @param request
	 * @param response
	 * @param file 上传的文件
	 * @return application/json
	 */
	@RequestMapping(value="/dropzone/upload",method=RequestMethod.POST)
	@ResponseBody
	public String updateThumb( HttpServletRequest request,HttpServletResponse response ,@RequestParam("file") MultipartFile file) {
		String filename = null;
		String subDir = null;
		if(!file.isEmpty()){
			if(file.getSize()>(512*1024)){ //getSize获得的是字节数，0.5m图片
				response.setStatus(500);
				return "{\"error\": \"文件长度过大\"}";
			}
			try {
				UUID uuid = UUID.randomUUID();
				String realPath = request.getSession().getServletContext().getRealPath("/");
				subDir = "assets/upload/";
				String url = realPath + "/" + subDir;
				String oriName = file.getOriginalFilename();
				String suffix = oriName.substring(oriName.lastIndexOf("."),oriName.length());
				filename = new Date().getTime()+"-"+uuid.toString()+suffix;
				BufferedImage bi = ImageIO.read(file.getInputStream());
				if(bi==null){
					response.setStatus(500);
					return "{\"error\": \"文件类型错误\"}";
				}
				file.transferTo(new File(url+filename));
			} catch (Exception e) {
				logger.info("异常发生在"+this.getClass().getName()+"类的updateThumb方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
			}
			return "{\"url\":\""+subDir+filename+"\"}";
		}else{
			response.setStatus(500);
			return "{\"error\": \"文件是空的\"}";
		}
	}
	
}
