package com.codingera.module.jpa;


public interface Criterion {
	
	public void appendToJpaQuery(JpaQueryBuilder builder);
	
	
}
