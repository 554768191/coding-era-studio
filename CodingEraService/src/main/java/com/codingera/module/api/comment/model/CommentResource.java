package com.codingera.module.api.comment.model;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.ResourceSupport;

import com.codingera.module.api.comment.controll.CommentController;

public class CommentResource extends ResourceSupport {

    private final Comment comment;

    public CommentResource(Comment comment) {
        this.comment = comment;
        this.add(new Link("/api/comments", "comment-uri"));
        this.add(linkTo(CommentController.class).withRel("comments page"));
        this.add(linkTo(methodOn(CommentController.class).getComment(comment.getId())).withSelfRel());
    }

    public Comment getComment() {
        return comment;
    }
}