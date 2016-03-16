package com.codingera.demo;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import com.codingera.CodingeraBootApplication;
import com.codingera.module.api.demo.model.Demo;
import com.codingera.module.api.demo.repository.DemoRepository;

/**
 * @author Jason
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = CodingeraBootApplication.class)
@WebAppConfiguration
public class DemoRestControllerTest {

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	private HttpMessageConverter mappingJackson2HttpMessageConverter;

	private List<Demo> demoList = new ArrayList<>();

	@Autowired
	private DemoRepository demoRepository;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	void setConverters(HttpMessageConverter<?>[] converters) {
		for (HttpMessageConverter<?> hmc : converters) {
			if(hmc instanceof MappingJackson2HttpMessageConverter){
				this.mappingJackson2HttpMessageConverter = hmc;
			}
		}
//		 Arrays.asList(converters).stream().filter(
//		 hmc -> hmc instanceof MappingJackson2HttpMessageConverter).findAny().get();

		Assert.assertNotNull("the JSON message converter must not be null", this.mappingJackson2HttpMessageConverter);
	}

	@Before
	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();
		
		this.demoRepository.deleteAll();
		this.demoList.add(demoRepository.save(new Demo("http://demo.com/1/", "A description")));
		this.demoList.add(demoRepository.save(new Demo("http://demo.com/2/", "A description")));
	}

	@Test
	public void userNotFound() throws Exception {
		mockMvc.perform(post("/api/demo/")
				.content(this.json(new Demo()))
				.contentType(contentType))
				.andExpect(status().isNotFound());
	}

	@Test
	public void readSingleDemo() throws Exception {
		 mockMvc.perform(
		  get("/api/demos/" + this.demoList.get(0).getId()))
		 .andExpect(status().isOk())
		 .andExpect(content().contentType(contentType))
		 .andExpect(jsonPath("$.id", is(this.demoList.get(0).getId().intValue())))
		 .andExpect(jsonPath("$.uri", is("http://demo.com/1/")))
		 .andExpect(jsonPath("$.description", is("A description")));
	}

	@Test
	public void readDemos() throws Exception {
		 mockMvc.perform(get("/api/demos"))
		 .andExpect(status().isOk())
		 .andExpect(content().contentType(contentType))
		 .andExpect(jsonPath("$", hasSize(2)))
		 .andExpect(jsonPath("$[0].id", is(this.demoList.get(0).getId().intValue())))
		 .andExpect(jsonPath("$[0].uri", is("http://demo.com/1/")))
		 .andExpect(jsonPath("$[0].description", is("A description")))
		 .andExpect(jsonPath("$[1].id", is(this.demoList.get(1).getId().intValue())))
		 .andExpect(jsonPath("$[1].uri", is("http://demo.com/2/")))
		 .andExpect(jsonPath("$[1].description", is("A description")));
	}

	@Test
	public void createdemo() throws Exception {
		 String demoJson = json(new Demo(
		 "http://spring.io",
		 "a demo to the best resource for Spring news and information"));
		 this.mockMvc.perform(post("/api/demos")
		 .contentType(contentType)
		 .content(demoJson))
		 .andExpect(status().isCreated());
	}

	protected String json(Object o) throws IOException {
		MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
		this.mappingJackson2HttpMessageConverter.write(o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
		return mockHttpOutputMessage.getBodyAsString();
	}
}