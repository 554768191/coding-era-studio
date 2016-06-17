package com.codingera.module.base.converter;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * 同一个 URL 请求，根据逻辑判断返回 JSON 或者 HTML
 * 
 * @author JasonWoo
 *
 */
public class JsonView {
	public static ModelAndView Render(Object model, HttpServletResponse response) {
		MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
		MediaType jsonMimeType = MediaType.APPLICATION_JSON;
		try {
			jsonConverter.write(model, jsonMimeType, new ServletServerHttpResponse(response));
		} catch (HttpMessageNotWritableException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}