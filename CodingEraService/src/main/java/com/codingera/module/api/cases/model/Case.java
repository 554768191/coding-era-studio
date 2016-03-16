package com.codingera.module.api.cases.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;

@Entity
@Table(name = "ce_case")
public class Case extends IdEntity {

	
    /**
	 * 
	 */
	private static final long serialVersionUID = 2167007833436749963L;


	

	private String title;

    private String content;


    @Column(name="TITLE",length = 50)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(name="CONTENT",length = 200)
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
