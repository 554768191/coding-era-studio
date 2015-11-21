package com.codingera.common.security.handler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;

import com.codingera.module.base.variable.CEVariable;
import com.codingera.module.user.model.User;
import com.fasterxml.jackson.core.JsonEncoding;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CustomLogoutHandler implements LogoutHandler {

	
	@Autowired TokenBasedRememberMeServices tokenBasedRememberMeServices;
	
	@Autowired SessionRegistry sessionRegistry;
	
	public CustomLogoutHandler() {
	}

	@SuppressWarnings("deprecation")
	@Override
	public void logout(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication) {
		try {  
		ObjectMapper objectMapper = new ObjectMapper();  
        response.setHeader("Content-Type", "application/json;charset=UTF-8");  
        JsonGenerator jsonGenerator = objectMapper.getJsonFactory().createJsonGenerator(response.getOutputStream(),  
                JsonEncoding.UTF8);  
        	Map<String,Object> result=new HashMap<String,Object>();
        	result.put("result","success");
        	User user=(User) authentication.getPrincipal();
        	result.put("data",user);
        	tokenBasedRememberMeServices.logout(request, response, authentication);
        	sessionRegistry.removeSessionInformation(CEVariable.USER_ONLINE_SESSION_PREFIX+user.getId());
            objectMapper.writeValue(jsonGenerator, result);  
        } catch (JsonProcessingException ex) {  
            throw new HttpMessageNotWritableException("Could not write JSON: " + ex.getMessage(), ex);  
        } catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
	}

}
