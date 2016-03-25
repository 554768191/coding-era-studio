package com.codingera.module.api.demo.model;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;

import org.springframework.hateoas.Resources;

import com.codingera.module.api.demo.controll.DemoController;

public class DemoResources extends Resources<DemoResource> {

	 public DemoResources(List<DemoResource> demos) {
	    	super(demos);
	        //this.add(new Link("/api/demo", "demo-uri"));
	        this.add(linkTo(methodOn(DemoController.class).readDemos()).withSelfRel());
	        this.add(linkTo(DemoController.class).withRel("demos page"));
	        this.add(linkTo(methodOn(DemoController.class).readDemo(1L)).withRel("item"));
	    }
	 
}