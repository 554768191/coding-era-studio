package com.codingera.common.framework;

import java.util.Properties;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.util.Assert;

public class SystemPropertyFileResourceFactory implements FactoryBean<Resource>,InitializingBean{

	private String file ;
	private PathMatchingResourcePatternResolver resourceLoader = new PathMatchingResourcePatternResolver();
	private Resource resource;
	@Override
	public void afterPropertiesSet() throws Exception {
		Assert.notNull(file,"Files can not be null in SystemPropertyFileResourcesFactory2.");
		if(file != null) {
			Properties props = System.getProperties();
			file = parsePath(file,props);
			resource = resourceLoader.getResource(file);
		}
	}
	
	protected String parsePath(String path,Properties props) {
		StringBuffer buffer = new StringBuffer(path);
		for(int index = buffer.indexOf("${");index >= 0;index = buffer.indexOf("${")) {
			int endIndex = buffer.indexOf("}", index);
			if(endIndex < 0) {
				break;
			}
			String key = buffer.substring(index+2,endIndex);
			String value = props.getProperty(key);
			if(value == null) {
				throw new java.lang.IllegalArgumentException("Property["+key+"] not found.");
			}
			buffer.replace(index, endIndex+1, value);
//			System.out.println(buffer);
		}
		return buffer.toString();
	}

	@Override
	public Resource getObject() throws Exception {
		return resource;
	}

	@Override
	public Class getObjectType() {
		return Resource.class;
	}

	@Override
	public boolean isSingleton() {
		return true;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}



}


