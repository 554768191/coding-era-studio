package com.codingera.module.api.dynamic.controll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.api.dynamic.criteria.DynamicQueryCriteria;
import com.codingera.module.api.dynamic.model.Dynamic;
import com.codingera.module.api.dynamic.service.DynamicService;
import com.codingera.module.base.controll.ActionResult;

/**
 * CASE
 */

@RestController
@RequestMapping("/api/dynamic")
public class DynamicController {


	
	@Autowired DynamicService DynamicService;

	@RequestMapping(value="/{dynamicId}",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult getDynamic(@PathVariable Long dynamicId) {
		Dynamic dynamic = DynamicService.getById(dynamicId);
		return new ActionResult(ActionResult.RESULT_SUCCESS, dynamic);
	}
	

	@RequestMapping(method = RequestMethod.POST)
	public ActionResult saveDynamic(@RequestBody Dynamic dynamic) {
		DynamicService.save(dynamic);
		return new ActionResult(ActionResult.RESULT_SUCCESS, dynamic);
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseBody
	public ActionResult deleteDynamic(@RequestParam Long id) {
		DynamicService.deleteById(id);
		return new ActionResult(ActionResult.RESULT_SUCCESS, null);
	}
	
	/**
	 * @param pr
	 * @param criteria
	 * @return
	 */
	@RequestMapping(value="/list",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult findDynamics(Pageable pr, @ModelAttribute DynamicQueryCriteria criteria) {
		Page<Dynamic> pages = DynamicService.findDynamicByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}
	
	


}
