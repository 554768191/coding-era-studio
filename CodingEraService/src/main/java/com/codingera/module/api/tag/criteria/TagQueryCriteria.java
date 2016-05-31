package com.codingera.module.api.tag.criteria;

import com.codingera.module.base.jpa.QueryCriteria;

public class TagQueryCriteria extends QueryCriteria {

	private String keyWord;

	private String category;
	
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

	
}
