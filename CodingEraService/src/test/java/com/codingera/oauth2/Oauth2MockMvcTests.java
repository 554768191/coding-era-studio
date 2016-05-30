package com.codingera.oauth2;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

/**
 * MockMvc test
 * 
 * Your MockMvc tests must then get a RequestPostProcessor from the OauthHelper
 * class and pass it when making requests:
 * 
 * 参看 ：
 * http://stackoverflow.com/questions/29510759/how-to-test-spring-security-oauth2-resource-server-security
 *
 * A full sample project is available on GitHub:
 * https://github.com/timtebeek/resource-server-testing
 * 
 * @author JasonWoo
 *
 */
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringApplicationConfiguration(classes = MyApp.class)
//@WebAppConfiguration
public class Oauth2MockMvcTests {
	@Autowired
	private WebApplicationContext webapp;

	private MockMvc mvc;

	@Before
	public void before() {
		mvc = MockMvcBuilders.webAppContextSetup(webapp)
		 //.apply(springSecurity())
		 .alwaysDo(print())
				.build();
	}

	@Autowired
	private OAuthHelper helper;

	@Test
	public void testHelloWithRole() throws Exception {
		RequestPostProcessor bearerToken = helper.bearerToken("myclientwith");
		mvc.perform(get("/hello").with(bearerToken)).andExpect(status().isOk());
	}

	@Test
	public void testHelloWithoutRole() throws Exception {
		RequestPostProcessor bearerToken = helper.bearerToken("myclientwithout");
		mvc.perform(get("/hello").with(bearerToken)).andExpect(status().isForbidden());
	}
}