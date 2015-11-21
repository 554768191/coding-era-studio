package com.codingera.common.util;

public class ValidateException extends RuntimeException {

	public static final String CREATED_BY_OTHERS = "记录重复";
	public static final String DELETED_BY_OTHERS = "记录已被其他人删除，请重新查询";
	public static final String UPDATED_BY_OTHERS = "记录已被其他人修改，请重新查询";
	public static final String DELETED_OR_UPDATED_BY_OTHERS = "记录已被其他人修改或删除，请重新查询";
	public static final String USED_BY_OTHERS = "记录已被引用，不可删除";
	
	private static final long serialVersionUID = -7067506919151673199L;
	public ValidateException() {
		super();
	}
	
	public ValidateException(String msg) {
		super(msg);
	}
	
	public ValidateException(Throwable cause) {
		super(cause);
	}
	
	public ValidateException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
