package com.codingera.module.api.tag.criteria;

import com.codingera.module.api.tag.model.Tag.Status;
import com.codingera.module.jpa.QueryCriteria;

public class TagQueryCriteria extends QueryCriteria {

	private String keyWord;

	private String category;
	
	private Status status;

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	
}
