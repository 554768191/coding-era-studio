package com.codingera.module.base.controll;

public class ActionResult {
	
	public static String RESULT_SUCCESS="success";
	
	public static String RESULT_ERROR="fail";
	
	public ActionResult(){}
	
	public ActionResult(String result,Object obj){
		this.result=result;
		this.data=obj;
	}

	private String result;
	
	private Object data;

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}


}
