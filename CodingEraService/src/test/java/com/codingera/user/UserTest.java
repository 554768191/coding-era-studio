package com.codingera.user;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.codehaus.jackson.map.DeserializerFactory.Config;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.ConfigFileApplicationContextInitializer;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import com.codingera.CodingeraBootApplication;
import com.codingera.module.api.demo.model.Demo;
import com.codingera.module.common.util.CeSecurityUtil;
import com.codingera.module.user.model.User;
import com.codingera.module.user.service.UserService;

/**
 * @author Jason
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = CodingeraBootApplication.class)
//@WebAppConfiguration
@WebIntegrationTest({"spring.config.location=file:./configuration/application.properties"})
public class UserTest {

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	private HttpMessageConverter mappingJackson2HttpMessageConverter;

	private List<Demo> demoList = new ArrayList<>();

	
	@Autowired
	private DataSource dataSource;
	
	@Autowired
	private UserService userService;

//	@Autowired
//	private WebApplicationContext webApplicationContext;

	@Before
	public void setup() throws Exception {
//		this.mockMvc = webAppContextSetup(webApplicationContext).build();
		
//		this.demoList.add(demoRepository.save(new Demo("http://demo.com/2/", "A description")));
	}

	@Test
	public void userNotFound() throws Exception {
//		mockMvc.perform(get("/api/open/user?userName=jason")
//				.content(this.json(new User()))
//				.contentType(contentType))
//				.andExpect(status().isNotFound());
		User user = userService.getUserByUserName("admin");
		System.out.println();
		Assert.assertTrue("user admin must has role admin:", false);
		
	}

	protected String json(Object o) throws IOException {
		MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
		this.mappingJackson2HttpMessageConverter.write(o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
		return mockHttpOutputMessage.getBodyAsString();
	}
}