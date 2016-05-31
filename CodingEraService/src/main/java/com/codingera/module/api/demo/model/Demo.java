package com.codingera.module.api.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;

@Entity
@Table(name = "ce_demo")
public class Demo extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2167007833436749963L;

	public Demo() {
		super();
	}

	public Demo(String name, String remark) {
		super();
		this.name = name;
		this.remark = remark;
	}

	@Column(name = "NAME", length = 50)
	private String name;

	@Column(name = "REMARK", length = 200)
	private String remark;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
