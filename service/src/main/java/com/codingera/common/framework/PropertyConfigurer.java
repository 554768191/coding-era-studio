package com.codingera.common.framework;

import java.util.Enumeration;
import java.util.Properties;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.support.PropertiesLoaderSupport;

import com.codingera.common.framework.transform.DataCoder;



public class PropertyConfigurer extends PropertiesLoaderSupport implements InitializingBean{

	private Properties properties;
	
	private DataCoder<String,String> stringCoder;
	
	private String encodedPropertyPrefix = "**";
	
	private boolean parseReference = true;
	
	private PropertiesConvertor convertor;

	@Override
	public void afterPropertiesSet() throws Exception {
		properties = this.mergeProperties();
		decodeProperties(properties);
		if(parseReference) {
			convertor = new PropertiesConvertor();
			convertor.convert(properties);
		}
	}
	
	
	
	public Properties getProperties() {
		return properties;
	}



	public boolean isParseReference() {
		return parseReference;
	}



	public void setParseReference(boolean parseReference) {
		this.parseReference = parseReference;
	}



	public DataCoder<String, String> getStringCoder() {
		return stringCoder;
	}

	public void setStringCoder(DataCoder<String, String> stringCoder) {
		this.stringCoder = stringCoder;
	}

	public String getValue(String key) {
		return properties.getProperty(key);
	}
	
	public Integer getIntegerValue(String key) {
		String value = properties.getProperty(key);
		if(value != null) {
			return Integer.parseInt(value);
		}
		return null;
	}
	
	public Float getFloatValue(String key) {
		String value = properties.getProperty(key);
		if(value != null) {
			return Float.parseFloat(value);
		}
		return null;
	}
	
	public Boolean getBooleanValue(String key) {
		String value = properties.getProperty(key);
		if(value != null) {
			return Boolean.parseBoolean(value);
		}
		return null;
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
					
				}
				
			}
		}
	}
}
