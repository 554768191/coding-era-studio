package com.codingera.module.base.jpa;


public interface Criterion {
	
	public void appendToJpaQuery(JpaQueryBuilder builder);
	
	
}
