package com.codingera.module.api.comment.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codingera.module.api.comment.criteria.CommentQueryCriteria;
import com.codingera.module.api.comment.model.Comment;
import com.codingera.module.api.comment.model.CommentCase;
import com.codingera.module.api.comment.model.CommentRoot;
import com.codingera.module.api.comment.repository.CommentRepository;
import com.codingera.module.api.comment.repository.CommentRootRepository;
import com.codingera.module.api.comment.service.CommentService;
import com.codingera.module.api.comment.view.CommentView;

@Service("CommentService")
public class CommentServiceImpl implements CommentService {

	@Autowired
	CommentRepository commentRepository;
	@Autowired
	CommentRootRepository commentRootRepository;

	@Override
	public Comment save(Comment comment) {

		return commentRepository.save(comment);
	}

	@Override
	public Comment getById(Long id) {
		return commentRepository.findOne(id);
	}

	@Override
	public void delById(Long id) {
		commentRepository.delete(id);
	}

	@Override
	public Page<Comment> findCommentsByCriteria(Pageable pr, CommentQueryCriteria criteria) {
		return commentRepository.findCommentsByCriteria(pr, criteria);
	}

	@Override
	public List<Comment> findCommentsByCriteria(CommentQueryCriteria criteria) {
		return commentRepository.findCommentsByCriteria(criteria);
	}

	@Override
	public void deleleComment(Comment comment) {
		commentRepository.delete(comment);
	}

	@Override
	public CommentView getCommentViewById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommentView getCommentViewByCriteria(CommentQueryCriteria criteria) {
		String modelName = criteria.getType();
		Long modelId = criteria.getModelId();
		Long commentId = criteria.getCommentId();

		if (modelName == null || modelId == null || commentId == null) {
			throw new ValidationException("参数缺失");
		}

		return null;
	}

	@Override
	public List<CommentView> findCommentViewsByCriteria(CommentQueryCriteria criteria) {
		String modelName = criteria.getType();
		Long modelId = criteria.getModelId();
		if (modelName == null || modelId == null) {
			throw new ValidationException("参数缺失");
		}
		List<CommentRoot> roots = this.commentRootRepository.findCommentRootByModelIdAndModelName(modelId, modelName);
		List<CommentView> views = new ArrayList<CommentView>();
		List<Long> rootIds = new ArrayList<Long>();
		for (CommentRoot commentRoot : roots) {
			Comment comment = commentRoot.getComment();
			rootIds.add(comment.getId());

			CommentView view = new CommentView();
			view.setComment(comment);
			views.add(view);

			// List<Comment> replies = this.commentRepository.findCommentByParentId(comment.getId());
			// view.setReplies(replies);
		}
		List<Comment> repliesList = this.commentRepository.findCommentByParentIdIn(rootIds);
		Map<Long, List<Comment>> repliesMap = new HashMap<Long, List<Comment>>();
		for (Comment reply : repliesList) {
			List<Comment> replies = repliesMap.get(reply.getParentId());
			if (replies == null) {
				replies = new ArrayList<Comment>();
				repliesMap.put(reply.getParentId(), replies);
			}
			replies.add(reply);
		}
		for (CommentView view : views) {
			Comment comment = view.getComment();
			view.setReplies(repliesMap.get(comment.getParentId()));
		}
		return views;
	}

	@Override
	public List<Comment> findRootCommentsByCriteria(CommentQueryCriteria criteria) {
		String modelName = criteria.getType();
		Long modelId = criteria.getModelId();
		if (modelName == null || modelId == null) {
			throw new ValidationException("参数缺失");
		}
		List<CommentRoot> roots = this.commentRootRepository.findCommentRootByModelIdAndModelName(modelId, modelName);
		List<Comment> result = new ArrayList<Comment>();
		for (CommentRoot commentRoot : roots) {
			Comment comment = commentRoot.getComment();
			result.add(comment);
		}
		return result;
	}

}
