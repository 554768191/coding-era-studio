package com.codingera.common.framework;

import java.io.BufferedInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Locale;
import java.util.Properties;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

public class CEResourceBundleMessageSource extends
		ResourceBundleMessageSource {
	
	private static Log LOG = LogFactory.getLog(CEResourceBundleMessageSource.class);

	private String file;

	@Override
	protected ResourceBundle doGetBundle(String basename, Locale locale) {
		BufferedInputStream inputStream = null;
		try {
			String path=file+"_"+locale+".properties";
			Properties props = System.getProperties();
			path = parsePath(path, props);
			PathMatchingResourcePatternResolver resourceLoader = new PathMatchingResourcePatternResolver();
			Resource resource=resourceLoader.getResource(path);
			inputStream = new BufferedInputStream(resource.getInputStream());
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		ResourceBundle rb = null;
		try {
			rb = new PropertyResourceBundle(inputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return rb;
	}

	@Override
	protected String resolveCodeWithoutArguments(String code, Locale locale) {
		String result = null;
		ResourceBundle bundle = getResourceBundle(null, locale);
		if (bundle != null) {
			result = bundle.getString(code);
		}
		return result;
	}

	protected String parsePath(String path, Properties props) {
		StringBuffer buffer = new StringBuffer(path);
		for (int index = buffer.indexOf("${"); index >= 0; index = buffer
				.indexOf("${")) {
			int endIndex = buffer.indexOf("}", index);
			if (endIndex < 0) {
				break;
			}
			String key = buffer.substring(index + 2, endIndex);
			String value = props.getProperty(key);
			if (value == null) {
				throw new java.lang.IllegalArgumentException("Property[" + key
						+ "] not found.");
			}
			buffer.replace(index, endIndex + 1, value);
			// System.out.println(buffer);
		}
		return buffer.toString();
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

}
