package com.codingera.module.api.cases.controll;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.crypto.Data;

import org.springframework.beans.PropertyEditorRegistrySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
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

	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.setDisallowedFields("timestamp"); 
		//binder.registerCustomEditor(Date.class,new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"), true));
		binder.registerCustomEditor(Date.class,
			    new PropertyEditorSupport() {
			        public void setAsText(String value) {
							Date valueDate = new Date(Long.parseLong(value));
							setValue(valueDate);
			        }
			    });
	}
	
	@Autowired CaseService CaseService;

	@RequestMapping(value="/{caseId}",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult saveDemo(@PathVariable Long caseId) {
		Case ceCase = CaseService.getById(caseId);
		return new ActionResult(ActionResult.RESULT_SUCCESS, ceCase);
	}
	

	@RequestMapping(method = RequestMethod.POST)
	public ActionResult saveDemo(Case ceCase) {
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
