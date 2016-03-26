package com.codingera.module.api.comment.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import com.codingera.module.base.model.IdEntity;

/**
 * 
 * 评论
 * 
 * @author JasonWoo
 *
 */
@MappedSuperclass
public abstract class BaseComment extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3246120447625111803L;
	
	private String title;
	private String content;

	// 评论人昵称
	private String userName;
	// 评论人ID
	private Long userId;
	// 评论时间
	private Date createdTime;

	// 父ID root:0 child:commentId
	private Long parentId;
	// 状态：删除-1 置顶2 审核通过1 未审核0
	private Integer status;

	@Column(name = "TITLE", length = 50)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	@Column(name = "CONTENT")
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "USER_NAME", length = 50)
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "USER_ID")
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	@Column(name = "PARENT_ID")
	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	@Column(name = "CREATED_TIME")
	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	@Column(name = "STATUS", length = 1)
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


}
