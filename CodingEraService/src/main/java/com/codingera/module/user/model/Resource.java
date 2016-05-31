package com.codingera.module.user.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * 资源表
 * 
 * @author JasonWoo
 *
 */
@Entity
@Table(name = "ce_resource")
public class Resource implements Serializable  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6529807424722399560L;

	@Id
	@Column(name = "resource", length = 20, nullable=false)
	private String resource;


	public String getResource() {
		return resource;
	}


	public void setResource(String resource) {
		this.resource = resource;
	}


}
