package com.codingera.module.api.tag.criteria;

import com.codingera.module.jpa.QueryCriteria;

public class TagQueryCriteria extends QueryCriteria {

	private String keyWord;

	private String type;

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
