package com.codingera.module.api.cases.controll;

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

import com.codingera.module.api.cases.criteria.CaseQueryCriteria;
import com.codingera.module.api.cases.model.Case;
import com.codingera.module.api.cases.service.CaseService;
import com.codingera.module.base.controll.ActionResult;

/**
 * CASE
 */
@RestController
@RequestMapping("/api/case")
public class CaseController {


	
	@Autowired CaseService CaseService;

	@RequestMapping(value="/{caseId}",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult saveDemo(@PathVariable Long caseId) {
		Case ceCase = CaseService.getById(caseId);
		return new ActionResult(ActionResult.RESULT_SUCCESS, ceCase);
	}
	

	@RequestMapping(method = RequestMethod.POST)
	public ActionResult saveDemo(@RequestBody Case ceCase) {
		CaseService.save(ceCase);
		return new ActionResult(ActionResult.RESULT_SUCCESS, ceCase);
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseBody
	public ActionResult deleteDemo(@RequestParam Long id) {
		CaseService.deleteById(id);
		return new ActionResult(ActionResult.RESULT_SUCCESS, null);
	}
	
	/**
	 * get方法不行,佶闪你看下
	 * @param pr
	 * @param criteria
	 * @return
	 */
	@RequestMapping(value="/list",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult findCases(Pageable pr, @ModelAttribute CaseQueryCriteria criteria) {
		Page<Case> pages = CaseService.findCaseByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}
	
	


}
