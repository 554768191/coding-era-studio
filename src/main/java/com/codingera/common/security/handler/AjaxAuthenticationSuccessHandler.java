package com.codingera.common.security.handler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;

import com.codingera.module.base.variable.CEVariable;
import com.codingera.module.user.model.User;
import com.fasterxml.jackson.core.JsonEncoding;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class AjaxAuthenticationSuccessHandler implements AuthenticationSuccessHandler  {  
	  
	@Autowired SessionRegistry sessionRegistry;
	
	
	@Autowired RememberMeServices rememberMeServices;
	
	@Autowired TokenBasedRememberMeServices tokenBasedRememberMeServices;
	
    public AjaxAuthenticationSuccessHandler() {  
    }  
  
    @SuppressWarnings("deprecation")
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,  
            Authentication authentication) throws IOException, ServletException {  
    	
        ObjectMapper objectMapper = new ObjectMapper();  
        response.setHeader("Content-Type", "application/json;charset=UTF-8");  
        JsonGenerator jsonGenerator = objectMapper.getJsonFactory().createJsonGenerator(response.getOutputStream(),  
                JsonEncoding.UTF8);  
        try {  
        	
        	
        	//rememberMeServices.autoLogin(request, response);
        	Map<String,Object> result=new HashMap<String,Object>();
        	result.put("result","success");
        	User user=(User) authentication.getPrincipal();
        	sessionRegistry.registerNewSession(CEVariable.USER_ONLINE_SESSION_PREFIX+user.getId(), user);
        	result.put("data",user);
        	tokenBasedRememberMeServices.loginSuccess(request, response, authentication);
        	//tokenBasedRememberMeServices.onLoginSuccess(request, response, authentication);
            objectMapper.writeValue(jsonGenerator, result);  
        } catch (JsonProcessingException ex) {  
            throw new HttpMessageNotWritableException("Could not write JSON: " + ex.getMessage(), ex);  
        }  
    }  
}  
