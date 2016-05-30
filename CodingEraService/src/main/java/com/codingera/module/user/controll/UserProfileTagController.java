package com.codingera.module.user.controll;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.model.UserProfileTag;
import com.codingera.module.user.service.UserProfileTagService;

/**
 * 
 * @author Yanson
 *
 */
@RestController
@RequestMapping("/api/userProfileTag")
public class UserProfileTagController {

	@Autowired
	UserProfileTagService userProfileTagService;

	@RequestMapping(method = RequestMethod.GET)
	public ActionResult getAllTags() {
		List<UserProfileTag> tagList = userProfileTagService.getAllList();
		return new ActionResult(ActionResult.RESULT_SUCCESS, tagList);
	}
	
	

}
