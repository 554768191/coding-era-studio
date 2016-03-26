package com.codingera.module.api.comment.model;

import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.codingera.module.api.cases.model.Case;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


/**
 * 
 * 评论
 * 
 * @author JasonWoo
 *
 */

@Entity
@Table(name = "ce_comment")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "@commentid")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Comment extends BaseComment {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3246120447625111803L;
	
	private Case ceCase = new Case();
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "refrence_id")
	@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "@tagid")
//	@JsonIgnore
	public Case getCeCase() {
		return ceCase;
	}

	public void setCeCase(Case ceCase) {
		this.ceCase = ceCase;
	}
//	
//    * 是否有叶子节点
//    */
//   @Formula(value = "(select count(*) from sys_job f_t where f_t.parent_id = id)")
//   private boolean hasChildren;

}
