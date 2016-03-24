package com.codingera.module.api.demo.model;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;

import com.codingera.module.api.demo.controll.DemoController;

/**
 * 
 * 资源组装器
 * 
 * // 组装单个资源对象
 * new DemoResourceAssembler().toResource(Demo);
 * 
 * // 组装资源对象的集合
 * new DemoResourceAssembler().toResources(Demos);
 * 
 * @author JasonWoo
 *
 */
public class DemoResourceAssembler extends ResourceAssemblerSupport<Demo, DemoResource> {

	public DemoResourceAssembler() {
		super(DemoController.class, DemoResource.class);
	}

	@Override
	public DemoResource toResource(Demo demo) {
		//创建一个包含 self 链接的资源对象
		DemoResource resource = createResourceWithId(demo.getId(), demo);
		return resource;
	}

	@Override
	protected DemoResource instantiateResource(Demo entity) {
		return new DemoResource(entity);
	}
	
	
}