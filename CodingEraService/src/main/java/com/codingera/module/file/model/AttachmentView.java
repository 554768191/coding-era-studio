package com.codingera.module.file.model;

import java.io.Serializable;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;


public class AttachmentView implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5815128138744529535L;
	
	MultipartFile[] b;
	List<MultipartFile> a;

	public MultipartFile[] getB() {
		return b;
	}

	public void setB(MultipartFile[] b) {
		this.b = b;
	}

	public List<MultipartFile> getA() {
		return a;
	}

	public void setA(List<MultipartFile> a) {
		this.a = a;
	}
	
	
}
