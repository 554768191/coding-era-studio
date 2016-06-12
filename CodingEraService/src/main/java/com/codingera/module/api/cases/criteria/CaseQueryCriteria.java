package com.codingera.module.api.cases.criteria;

import com.codingera.module.api.cases.model.Case.Status;

public class CaseQueryCriteria {

	private String keyWord;
	
	private Long tagId;
	
	private Status status = Status.PUBLISHED;

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Long getTagId() {
		return tagId;
	}

	public void setTagId(Long tagId) {
		this.tagId = tagId;
	}

	
	
	
	
	
}
