package com.codingera.module.demo.controll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.demo.criteria.DemoQueryCriteria;
import com.codingera.module.demo.model.Demo;
import com.codingera.module.demo.service.DemoService;

/**
 * Demo
 */
@Controller
//@RestController
//@EnableAutoConfiguration
@RequestMapping("/api/demo")
public class DemoController{

	@Autowired
	private DemoService demoService;
	

	@RequestMapping
	@ResponseBody
	public ActionResult getDemo(Pageable pr,@ModelAttribute DemoQueryCriteria criteria){
		Page<Demo> pages =  demoService.findDemoByCriteria(pr,criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS,pages);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public ActionResult editDemo(@ModelAttribute Demo demo){
		demo = demoService.save(demo);
		return new ActionResult(ActionResult.RESULT_SUCCESS,demo);
	}
	
	
	
}
