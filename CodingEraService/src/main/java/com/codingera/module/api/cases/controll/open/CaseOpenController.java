package com.codingera.module.api.cases.controll.open;

import java.io.IOException;
import java.util.List;

import org.hibernate.Hibernate;
import org.markdown4j.Markdown4jProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
@RequestMapping("/api/open/case")
public class CaseOpenController {


	
	@Autowired CaseService CaseService;

	@RequestMapping(value="/{caseId}",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult getCase(@PathVariable Long caseId) {
		Case ceCase = CaseService.getById(caseId);
		
		
		try {
			String htmlContent = new Markdown4jProcessor().process(ceCase.getContent());
			ceCase.setHtmlContent(htmlContent);
		} catch (IOException e) {
			//报错的话,不转义了,直接输出
			ceCase.setHtmlContent(ceCase.getContent());
		}
		
		return new ActionResult(ActionResult.RESULT_SUCCESS, ceCase);
	}
	

	
	/**
	 * @param pr
	 * @param criteria
	 * @return
	 */
	@RequestMapping(value="/list",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult findCases(Pageable pr, @ModelAttribute CaseQueryCriteria criteria) {
		Page<Case> pages = null;
		if(criteria.getTagId() == null){
			pages = CaseService.findCaseByCriteria(pr, criteria);
		}else{
			//由于多对多JPA不熟悉,这里先用HQL解决
			//TODO v1.1以后务必使用JPA解决
			List<Case> cases = CaseService.findCaseByTagId(criteria.getTagId());
			pages = new PageImpl<Case>(cases);
		}
		for(Case ceCase: pages.getContent()){
			Hibernate.initialize(ceCase.getTags());
		}
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}
	
	


}
