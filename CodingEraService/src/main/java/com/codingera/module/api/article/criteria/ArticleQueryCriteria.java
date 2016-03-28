package com.codingera.module.api.article.criteria;

import com.codingera.module.api.article.model.Article.Status;

public class ArticleQueryCriteria {

	private String keyWord;
	
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

	
	
	
	
	
}
