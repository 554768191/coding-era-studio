package com.codingera.module.base.controll;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.codingera.module.base.model.Credentials;

/**
 * /error错误页面自定义
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
	public ModelAndView a() {
		Map<String, Object> model = new HashMap<String, Object>();
		return new ModelAndView("404", model);
	}
	@RequestMapping(value = "/401", method = RequestMethod.GET)
	public ModelAndView b() {
		Map<String, Object> model = new HashMap<String, Object>();
		return new ModelAndView("401", model);
	}

}