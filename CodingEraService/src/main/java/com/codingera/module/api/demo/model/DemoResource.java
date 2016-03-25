package com.codingera.module.api.demo.model;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.ResourceSupport;

public class DemoResource extends ResourceSupport {

    private final Demo demo;
    
    public DemoResource(Demo demo) {
        this.demo = demo;
        //this.add(new Link("/api/demo", "demo-uri"));
        //this.add(linkTo(DemoController.class).withRel("demos"));
        //this.add(linkTo(methodOn(DemoController.class).readDemo(demo.getId())).withSelfRel());
    }

    public Demo getDemo() {
        return demo;
    }
}