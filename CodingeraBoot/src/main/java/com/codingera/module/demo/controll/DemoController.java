package com.codingera.module.demo.controll;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.demo.criteria.DemoQueryCriteria;
import com.codingera.module.demo.model.Demo;
import com.codingera.module.demo.model.DemoResource;
import com.codingera.module.demo.repository.DemoRepository;
import com.codingera.module.demo.service.DemoService;

/**
 * Demo
 */
@RestController
// @Controller need @ResponseBody
@RequestMapping("/api/demo")
public class DemoController {

	@Autowired
	private DemoService demoService;
	@Autowired
	private DemoRepository demoRepository;

	@RequestMapping
	@ResponseBody
	public ActionResult getDemo(Long id) {
		Demo demo = demoService.getById(id);
		return new ActionResult(ActionResult.RESULT_SUCCESS, demo);
	}

	@RequestMapping(value = "/page", method = RequestMethod.GET)
	@ResponseBody
	public ActionResult findDemos(Pageable pr, @ModelAttribute DemoQueryCriteria criteria) {
		Page<Demo> pages = demoService.findDemoByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ActionResult saveDemo(@ModelAttribute Demo demo) {
		demo = demoService.save(demo);
		return new ActionResult(ActionResult.RESULT_SUCCESS, demo);
	}

	@RequestMapping(value = "/{demoId}", method = RequestMethod.GET)
	public ActionResult readDemo(@PathVariable Long demoId) {
		return new ActionResult(ActionResult.RESULT_SUCCESS, new DemoResource(this.demoRepository.findOne(demoId)));
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
