package com.codingera.common.framework.jpa;



public class BetweenCriterion implements Criterion{
	
	
	private String name;
	
	
	private Object value1;
	
	private Object value2;
	
	public BetweenCriterion(String name,Object value1,Object value2) {
		this.name = name;
		this.value1 = value1;
		this.value2 = value2;
	}
	
	public String getName() {
		return name;
	}

	public void appendToJpaQuery(JpaQueryBuilder builder) {
		StringBuffer buffer = new StringBuffer("(");
		int nextId = builder.getNextParameterIndex();
		if(!CriterionUtils.isNullOrEmpty(value1)) {
			buffer.append(name).append(">=").append("?").append(nextId);
		}
		if(!CriterionUtils.isNullOrEmpty(value2)) {
			if(!CriterionUtils.isNullOrEmpty(value1)) {
				nextId++;
				buffer.append(" and ");
			}
			buffer.append(name).append("<=").append("?").append(nextId);
		}
		buffer.append(")");
		builder.append(buffer.toString(), CriterionUtils.isNullOrEmpty(value1)?value2:(CriterionUtils.isNullOrEmpty(value2)?value1:new Object[]{value1,value2}));
	}
}
