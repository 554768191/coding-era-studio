package com.codingera.module.user.criteria;

public class UserQueryCriteria {

	private String keyWord;
	
	//展示到门户用户
	private Boolean displayPortal;

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}

	public Boolean getDisplayPortal() {
		return displayPortal;
	}

	public void setDisplayPortal(Boolean displayPortal) {
		this.displayPortal = displayPortal;
	}
	
	
}
