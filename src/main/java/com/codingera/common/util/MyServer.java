package com.codingera.common.util;

import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.nio.SelectChannelConnector;
import org.eclipse.jetty.webapp.WebAppContext;

public class MyServer {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
		Server server = new Server();
        Connector connector=new SelectChannelConnector();
        connector.setPort(Integer.getInteger("jetty.port",8888).intValue());
        server.setConnectors(new Connector[]{connector});
        WebAppContext webapp = new WebAppContext();
        webapp.setDefaultsDescriptor("./src/main/webapp/WEB-INF/web.xml");
        webapp.setContextPath(System.getProperty("context.path", "/"));
        webapp.setWar(System.getProperty("jetty.webdir", "./src/main/webapp"));
        server.setHandler(webapp);
        
        server.start();
        server.join();

	}
}
