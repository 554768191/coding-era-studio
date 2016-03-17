package com.codingera.module.api.tag.model;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.ResourceSupport;

import com.codingera.module.api.tag.controll.TagController;

public class TagResource extends ResourceSupport {

    private final Tag tag;

    public TagResource(Tag tag) {
        this.tag = tag;
        this.add(new Link("/api/tag", "tag-uri"));
        this.add(linkTo(TagController.class).withRel("tags page"));
        this.add(linkTo(methodOn(TagController.class).getTag(tag.getId())).withSelfRel());
    }

    public Tag getTag() {
        return tag;
    }
}