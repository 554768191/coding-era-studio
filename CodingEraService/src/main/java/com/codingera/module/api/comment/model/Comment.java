package com.codingera.module.api.comment.model;

import javax.persistence.Entity;
import javax.persistence.Table;


/**
 * 
 * 评论
 * 
 * @author JasonWoo
 *
 */

@Entity
@Table(name = "ce_comment")
public class Comment extends BaseComment {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3246120447625111803L;
	


}
