package com.codingera.common.framework;

import java.util.Enumeration;
import java.util.Properties;

//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import com.codingera.common.framework.transform.DataCoder;

public class SystemPropertyPlaceholderConfigurer extends PropertyPlaceholderConfigurer {
//	private static Log LOG = LogFactory.getLog(SystemPropertyPlaceholderConfigurer.class);
	private DataCoder<String,String> stringCoder;
	
	private String encodedPropertyPrefix = "**";
	
	private PropertiesConvertor convertor = new PropertiesConvertor();
	@Override
	protected void convertProperties(Properties props) {
		super.convertProperties(props);
		decodeProperties(props);
		convertor.convert(props);
	}
	
	
	public DataCoder<String, String> getStringCoder() {
		return stringCoder;
	}

	public void setStringCoder(DataCoder<String, String> stringCoder) {
		this.stringCoder = stringCoder;
	}


	public String getEncodedPropertyPrefix() {
		return encodedPropertyPrefix;
	}


	public void setEncodedPropertyPrefix(String encodedPropertyPrefix) {
		this.encodedPropertyPrefix = encodedPropertyPrefix;
	}

	protected void decodeProperties(Properties props) {
		if(stringCoder == null) {
			return;
		}
		Enumeration<?> propertyNames = props.propertyNames();
		while (propertyNames.hasMoreElements()) {
			String propertyName = (String) propertyNames.nextElement();
			String propertyValue = props.getProperty(propertyName);
			if(propertyValue.startsWith(encodedPropertyPrefix)) {
				try{
					props.setProperty(propertyName, stringCoder.decode(propertyValue));
				}catch(RuntimeException e) {
					//LOG.error("Error occured while decode property value["+propertyValue+"].",e);
				}
				
			}
		}
	}
}