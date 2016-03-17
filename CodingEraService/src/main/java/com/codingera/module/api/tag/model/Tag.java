package com.codingera.module.api.tag.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;

@Entity
@Table(name = "ce_tag")
public class Tag extends IdEntity {

	
    /**
	 * 
	 */
	private static final long serialVersionUID = 2167007833436749963L;


	public Tag() {
		super();
	}

	public Tag(String name) {
		super();
		this.name = name;
	}

	private String name;
	private String type;


    @Column(name="NAME",length = 50)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name="TYPE",length = 10)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

   
}
