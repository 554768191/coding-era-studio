package com.codingera.module.base.jpa;

import java.io.Serializable;
import java.util.List;


public class QueryResult<T extends List<?>> implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 560557210261222313L;

	private QueryCriteria queryCriteria;
	
	private T resultObject;
	
	private int pageCount;
	private int currentPage;
	
	public QueryResult(QueryCriteria queryCriteria,T resultObject) {
		this.queryCriteria = queryCriteria;
		this.resultObject = resultObject;
		this.pageCount = queryCriteria.getPageCount();
		this.currentPage = queryCriteria.getCurrentPage();
	}

	public QueryCriteria getQueryCriteria() {
		return queryCriteria;
	}

	public T getResultObject() {
		return resultObject;
	}

	public int getPageCount() {
		return pageCount;
	}
	
	public int getCurrentPage() {
		return currentPage;
	}
	
	public int getTotalRecords() {
		return queryCriteria.getTotalRecords();
	}
}
