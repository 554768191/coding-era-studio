package com.codingera.module.demo.model;


import com.codingera.module.base.model.IdEntity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "ce_demo")
public class Demo extends IdEntity {



    private String name;

    private String remark;


    @Column(name="NAME",length = 50)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name="REMARK",length = 200)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
