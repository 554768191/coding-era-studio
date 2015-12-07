package com.codingera.module.demo.controll;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.demo.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Demo
 */
@Controller
@RequestMapping("/api/demo")
public class DemoController{

	@Autowired
	DemoService demoService;
	

	@RequestMapping
	@ResponseBody
	public ActionResult getDemo(){

		return new ActionResult(ActionResult.RESULT_SUCCESS,null);
	}
	
	
	
	
}
