package com.codingera.module.api.comment.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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

	public enum Status {
		WAITING, // 待审
		PASSED, // 通过
		BLOCKED, // 屏蔽
		DELETED, // 删除
	}

	// 标题
	@Column(name = "TITLE", length = 50)
	private String title;

	// 内容
	@Column(name = "CONTENT")
	private String content;

	// 评论人昵称
	@Column(name = "USER_NAME", length = 50)
	private String userName;

	// 评论人ID
	@Column(name = "USER_ID")
	private Long userId;

//	// 评论时间
//	@Column(name = "CREATED_TIME")
//	private Date createdTime;

	// 父ID root:0 child:commentId
	@Column(name = "PARENT_ID")
	private Long parentId;

	// 状态：删除-1 置顶2 审核通过1 未审核0
	@Column(name = "STATUS", length = 1)
	@Enumerated(EnumType.STRING)
	private Status status;

	// 置顶
	@Column(name = "TOP", length = 1)
	private Integer top;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

//	public Date getCreatedTime() {
//		return createdTime;
//	}
//
//	public void setCreatedTime(Date createdTime) {
//		this.createdTime = createdTime;
//	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Integer getTop() {
		return top;
	}

	public void setTop(Integer top) {
		this.top = top;
	}

}
