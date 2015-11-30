package com.codingera.common.framework.jpa;


public interface Criterion {
	
	public void appendToJpaQuery(JpaQueryBuilder builder);
	
	
}
