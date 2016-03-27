package com.codingera.module.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.codingera.module.base.model.NewIdEntity;

/**
 * 
 * 组织
 * 
 * @author JasonWoo
 *
 */
@Entity
@Table(name = "ce_organization")
public class Organization extends NewIdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8737918786244178755L;

	@Column(name = "LOGO", length = 100)
	private String logo;

	@Column(name = "NAME", length = 50)
	private String name;

	@Column(name = "EN_NAME", length = 100)
	private String enName;

	@Column(name = "DESCRIPTION")
	private String description;

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
