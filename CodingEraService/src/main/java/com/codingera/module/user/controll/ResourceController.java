package com.codingera.module.user.controll;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.criteria.ResourceQueryCriteria;
import com.codingera.module.user.model.Resource;
import com.codingera.module.user.service.ResourceService;

/**
 * 
 * @author Jason
 *
 */
@RestController
@RequestMapping("/api/resources")
public class ResourceController {

	@Autowired
	ResourceService resourceService;

	@RequestMapping(method = RequestMethod.GET)
	public ActionResult findResources(Pageable pr, @ModelAttribute ResourceQueryCriteria criteria) {
		Page<Resource> pages = resourceService.findResourcesByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}
	
	@RequestMapping(path="/list", method = RequestMethod.GET)
	public ActionResult findResourceList() {
		List<Resource> result = resourceService.findResources();
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
	}
	
	/**
	 * 编辑
	 * 
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ActionResult updateResource(@RequestBody Resource resource) {
		resource = resourceService.save(resource);
		return new ActionResult(ActionResult.RESULT_SUCCESS, resource);
	}

}
