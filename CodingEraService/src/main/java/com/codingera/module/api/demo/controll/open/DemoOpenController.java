package com.codingera.module.api.demo.controll.open;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.RequestContext;

import com.codingera.module.api.demo.repository.DemoRepository;
import com.codingera.module.api.demo.service.DemoService;
import com.codingera.module.base.common.util.MessageUtil;
import com.codingera.module.base.controll.ActionResult;

/**
 * Demo
 */
@RestController
@RequestMapping("/api/open/demo")
public class DemoOpenController {

	@Autowired
	private DemoService demoService;
	@Autowired
	private DemoRepository demoRepository;

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public ActionResult readDemo(HttpServletRequest request) {
//		String key = "system.message.ajax.error";
		String key = "success";
		
		// 从后台代码获取国际化信息
		//方式一
		RequestContext requestContext = new RequestContext(request);
//		String message = requestContext.getMessage(key);
		
		//方式二
		String message = MessageUtil.getMessage(key);
		
		return new ActionResult(ActionResult.RESULT_SUCCESS, message);
	}

}
