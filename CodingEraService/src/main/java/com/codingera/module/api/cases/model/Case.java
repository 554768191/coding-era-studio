package com.codingera.module.api.cases.model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;

@Entity
@Table(name = "ce_case")
public class Case extends IdEntity {

	
    /**
	 * 
	 */
	private static final long serialVersionUID = 2167007833436749963L;

	public enum Status{
		 PUBLISHED,//已发布
		 SKETCH,//草稿
		 DELETED//删除
		 
	}
	

	private String title;

    private String content;
    
    private Date createTime;


    
    private Status status;

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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}


	@Enumerated(EnumType.STRING)
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	
	

}
