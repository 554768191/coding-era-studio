package com.codingera.module.api.comment.controll;

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
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.api.comment.criteria.CommentQueryCriteria;
import com.codingera.module.api.comment.model.Comment;
import com.codingera.module.api.comment.model.CommentResource;
import com.codingera.module.api.comment.service.CommentService;
import com.codingera.module.base.controll.ActionResult;

/**
 * Comment
 */
@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
	private CommentService commentService;

	@RequestMapping(value = "/{commentId}", method = RequestMethod.GET)
	public ActionResult getComment(@PathVariable Long commentId) {
		return new ActionResult(ActionResult.RESULT_SUCCESS, new CommentResource(this.commentService.getById(commentId)));
	}

	@RequestMapping(method = RequestMethod.GET)
	public ActionResult findComments(Pageable pr, @ModelAttribute CommentQueryCriteria criteria) {
		Page<Comment> pages = commentService.findCommentsByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ActionResult findComments(@ModelAttribute CommentQueryCriteria criteria) {
		List<CommentResource> commentResourceList = new ArrayList<CommentResource>();
		List<Comment> commentList = (List<Comment>) commentService.findCommentsByCriteria(criteria);
		for (Comment comment : commentList) {
			CommentResource commentResource = new CommentResource(comment);
			commentResourceList.add(commentResource);
		}
		return new ActionResult(ActionResult.RESULT_SUCCESS, new Resources<CommentResource>(commentResourceList));
	}

	@RequestMapping(method = RequestMethod.POST)
	public ActionResult saveComment(@RequestBody Comment comment) {
		comment = commentService.save(comment);
		return new ActionResult(ActionResult.RESULT_SUCCESS, comment);
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	public ActionResult deleteComment(Comment comment) {
		commentService.deleleComment(comment);
		return new ActionResult(ActionResult.RESULT_SUCCESS, null);
	}
	
	
}
