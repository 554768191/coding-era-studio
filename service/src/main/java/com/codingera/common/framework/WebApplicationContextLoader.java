package com.codingera.common.framework;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.ContextLoaderListener;

public class WebApplicationContextLoader extends ContextLoaderListener{

	
	@Override
	protected ApplicationContext loadParentContext(ServletContext servletContext) {
		String serviceContextConfigLocation = servletContext.getInitParameter("serviceContextConfigLocation");
		if(serviceContextConfigLocation != null) {
			ClassPathXmlApplicationContext appContext = new ClassPathXmlApplicationContext(new String[]{serviceContextConfigLocation});
			return appContext;
		}else {
			return super.loadParentContext(servletContext);
		}
		
	}

	
	@Override
	public void contextDestroyed(ServletContextEvent event) {
		DisposableBean disposableContext = (DisposableBean)this.getCurrentWebApplicationContext().getParent();
		super.contextDestroyed(event);
		try {
			disposableContext.destroy();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}