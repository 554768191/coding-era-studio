package com.codingera.module.api.tag.controll;

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
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.api.tag.criteria.TagQueryCriteria;
import com.codingera.module.api.tag.model.Tag;
import com.codingera.module.api.tag.model.TagResource;
import com.codingera.module.api.tag.service.TagService;
import com.codingera.module.base.controll.ActionResult;

/**
 * Tag
 */
@RestController
@RequestMapping("/api/tag")
public class TagController {

	@Autowired
	private TagService tagService;

	@RequestMapping(value = "/{tagId}", method = RequestMethod.GET)
	public ActionResult getTag(@PathVariable Long tagId) {
		return new ActionResult(ActionResult.RESULT_SUCCESS, new TagResource(this.tagService.getById(tagId)));
	}

	@RequestMapping(method = RequestMethod.GET)
	public ActionResult findTags(Pageable pr, @ModelAttribute TagQueryCriteria criteria) {
		Page<Tag> pages = tagService.findTagByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ActionResult findTags(@ModelAttribute TagQueryCriteria criteria) {
		List<TagResource> tagResourceList = new ArrayList<TagResource>();
		List<Tag> tagList = (List<Tag>) tagService.findTagByCriteria(criteria);
		for (Tag tag : tagList) {
			TagResource tagResource = new TagResource(tag);
			tagResourceList.add(tagResource);
		}
		return new ActionResult(ActionResult.RESULT_SUCCESS, new Resources<TagResource>(tagResourceList));
	}

	@RequestMapping(method = RequestMethod.POST)
	public ActionResult saveTag(Tag tag) {
		tag = tagService.save(tag);
		return new ActionResult(ActionResult.RESULT_SUCCESS, tag);
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	public ActionResult deleteTag(Tag tag) {
		tagService.deleleTag(tag);
		return new ActionResult(ActionResult.RESULT_SUCCESS, null);
	}
	
	
}
