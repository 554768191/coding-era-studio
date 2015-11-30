package com.codingera.common.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;


@SuppressWarnings("all")
public class ExceptionHandler implements HandlerExceptionResolver{

	private static Log LOG = LogFactory.getLog(ExceptionHandler.class);
	
	/**
	 * Frame work action 页面返回结果错误
	 */
	private final String FRANME_ACTION_ERROR="error";
	/**
	 * Frame work action 页面返回错误信息
	 */
	private final String FRANME_ACTION_MESSAGE="message";
	/**
	 * 结果
	 */
	private final String FRANME_ACTION_RESULT="result";

	
	
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		Map<String,Object> resultMap = new HashMap();
        HandlerMethod handleMethod=(HandlerMethod) handler;
    	response.setCharacterEncoding("UTF-8"); 
    	
		try {
			PrintWriter writer = response.getWriter();
			resultMap =genExceptionResult(ex, resultMap);
			String json=excuteMap(resultMap);
			writer.write(json);
			writer.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
        return new ModelAndView();
	}
	
	private String excuteMap(Map<String,Object> resultMap){
		String json="{";
		Iterator keys = resultMap.keySet().iterator();
		String keyValue="";
		while(keys.hasNext()){
			Object key = keys.next();
			Object value = resultMap.get(key);
			keyValue+=",\""+key.toString()+"\":\""+value.toString()+"\" ";
		}
		json+=keyValue.substring(1)+"}";
		return json;
	}
	
	private Map<String,Object> genExceptionResult(Exception e,Map<String,Object> resultMap) {
		if (e instanceof ValidateException) {
			resultMap.put(FRANME_ACTION_MESSAGE, e.getMessage());
    	} else{
    		resultMap.put(FRANME_ACTION_MESSAGE, MessageUtil.getMessage("system.message.ajax.error"));
    		e.printStackTrace();
    	}
		resultMap.put(FRANME_ACTION_RESULT, FRANME_ACTION_ERROR);
		return resultMap;
	}

}
