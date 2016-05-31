package com.codingera.module.api.tag.controll.open;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.api.tag.criteria.TagQueryCriteria;
import com.codingera.module.api.tag.model.Tag;
import com.codingera.module.api.tag.service.TagService;
import com.codingera.module.base.controll.ActionResult;

/**
 * TAG
 */

@RestController
@RequestMapping("/api/open/tag")
public class TagOpenController {


	
	@Autowired TagService tagService;

	@RequestMapping(method = RequestMethod.GET)
	public ActionResult findTags(Pageable pr, @ModelAttribute TagQueryCriteria criteria) {
		Page<Tag> pages = tagService.findTagsByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}
	
	


}
