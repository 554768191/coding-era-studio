package com.codingera.module.api.comment.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * 评论
 * 
 * @author JasonWoo
 *
 */
@Entity
@Table(name = "ce_comment_demo")
public class CommentDemo extends BaseComment {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3698488316220512409L;

}
