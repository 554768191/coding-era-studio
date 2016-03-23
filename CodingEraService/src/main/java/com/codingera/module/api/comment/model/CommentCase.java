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
@Table(name = "ce_comment_case")
public class CommentCase extends BaseComment {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7756096411858808883L;

}
