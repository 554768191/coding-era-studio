package com.codingera.module.base.configuration;

import java.io.IOException;
import java.util.Properties;

import javax.sql.DataSource;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.properties.EncryptableProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * JASYPT 加密数据库配置文件密码
 * 
 * @author JasonWoo
 *
 */
@Configuration
public class DataSourceConfiguration {
	@Value("${spring.datasource.driverClassName}")
	private String databaseDriverClassName;
	 
	@Value("${spring.datasource.url}")
	private String datasourceUrl;
	 
	@Value("${spring.datasource.username}")
	private String databaseUsername;
	 
	@Value("${spring.datasource.password}")
	private String databasePassword;
	 
	@Bean
	public DataSource datasource() throws IOException {
	    org.apache.tomcat.jdbc.pool.DataSource ds = new org.apache.tomcat.jdbc.pool.DataSource();
	    ds.setDriverClassName(databaseDriverClassName);
	    ds.setUrl(datasourceUrl);
	    ds.setUsername(databaseUsername);
	    ds.setPassword(getSecurePassword());
	 
	    return ds;
	}
	 
	private String getSecurePassword() throws IOException {
	    StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
	    encryptor.setPassword("password");
	    Properties props = new EncryptableProperties(encryptor);
//	    props.load(this.getClass().getClassLoader().getResourceAsStream("./configuration/application.properties"));
	    props.put("datasource.password", databasePassword);
	    return props.getProperty("datasource.password");
	}
}
