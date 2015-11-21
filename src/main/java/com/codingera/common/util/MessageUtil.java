/**
 * 
 */
package com.codingera.common.util;

import java.util.Locale;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

/**
 * @author Yan
 * 暂时就中文吧!!
 *
 */
public class MessageUtil {
	
	@Autowired
	private MessageSource messageSource;
	
	private static MessageUtil messageUtil;
	
	public void setMessageSource(MessageSource messageSource) {  
        this.messageSource = messageSource;  
    } 
	
	@PostConstruct  
    public void init() {  
		messageUtil = this;  
		messageUtil.messageSource = this.messageSource;  
  
    }    
	
	public static String getMessage(String key){
		return messageUtil.messageSource.getMessage(key,null,Locale.CHINA);
	}
	
	public static String getMessage(String key,Object[] args){
		return messageUtil.messageSource.getMessage(key,args,Locale.CHINA);
	}



	
	
	
	
	
}