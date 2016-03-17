package com.codingera.module.api.demo.controll;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.api.demo.criteria.DemoQueryCriteria;
import com.codingera.module.api.demo.model.Demo;
import com.codingera.module.api.demo.model.DemoResource;
import com.codingera.module.api.demo.repository.DemoRepository;
import com.codingera.module.api.demo.service.DemoService;
import com.codingera.module.base.controll.ActionResult;

/**
 * Demo
 */
@RestController
@RequestMapping("/api/demo")
public class DemoController {

	@Autowired
	private DemoService demoService;
	@Autowired
	private DemoRepository demoRepository;

	@RequestMapping(value = "/{demoId}", method = RequestMethod.GET)
	public ActionResult readDemo(@PathVariable Long demoId) {
		return new ActionResult(ActionResult.RESULT_SUCCESS, new DemoResource(this.demoRepository.findOne(demoId)));
	}

	@RequestMapping(method = RequestMethod.GET)
	public ActionResult findDemos(Pageable pr, @ModelAttribute DemoQueryCriteria criteria) {
		Page<Demo> pages = demoService.findDemoByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}

	/**
	 * save
	 * 
	 * @param demo : form data use @RequestBody,  query string parameters use @ModelAttribute/none
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ActionResult saveDemo(Demo demo) {
		demo = demoService.save(demo);
		return new ActionResult(ActionResult.RESULT_SUCCESS, demo);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ActionResult readDemos() {
		List<DemoResource> demoResourceList = new ArrayList<DemoResource>();
		List<Demo> demoList = (List<Demo>) demoRepository.findAll();
		for (Demo demo : demoList) {
			DemoResource demoResource = new DemoResource(demo);
			demoResourceList.add(demoResource);
		}
		return new ActionResult(ActionResult.RESULT_SUCCESS, new Resources<DemoResource>(demoResourceList));
	}

}
