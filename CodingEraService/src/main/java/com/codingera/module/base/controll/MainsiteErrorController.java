package com.codingera.module.base.controll;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.codingera.module.base.converter.JsonView;

/**
 * /error错误页面自定义
 * 
 * 根据逻辑判断返回 JSON 或者 HTML
 * 
 * @author JasonWoo
 *
 */
@Controller
public class MainsiteErrorController implements ErrorController {

	private static final String ERROR_PATH = "/error";

	@RequestMapping(value = ERROR_PATH)
	public String handleError() {
		return "404";
	}

	@Override
	public String getErrorPath() {
		return ERROR_PATH;
	}
	
	@RequestMapping(value = "/404", method = RequestMethod.GET)
	public ModelAndView a(HttpServletRequest request, HttpServletResponse response) {
		
		String accept = request.getHeader("Accept").toLowerCase();  
    	if(accept.contains(MediaType.TEXT_HTML_VALUE)){
    		Map<String, Object> model = new HashMap<String, Object>();
    		return new ModelAndView("404", model);
    	}
    	return JsonView.Render(new ActionResult(ActionResult.RESULT_ERROR, "Not found"), response);//其他终端，返回失败的 JSON 串  
	}
	@RequestMapping(value = "/401", method = RequestMethod.GET)
	public ModelAndView b(HttpServletRequest request, HttpServletResponse response) {
		
		String accept = request.getHeader("Accept").toLowerCase();  
    	if(accept.contains(MediaType.TEXT_HTML_VALUE)){
    		Map<String, Object> model = new HashMap<String, Object>();
    		return new ModelAndView("401", model);
    	}
    	return JsonView.Render(new ActionResult(ActionResult.RESULT_ERROR, "Access Denied"), response);//其他终端，返回失败的 JSON 串  
    	
	}

}