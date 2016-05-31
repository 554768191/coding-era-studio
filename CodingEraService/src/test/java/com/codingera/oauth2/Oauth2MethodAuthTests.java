package com.codingera.oauth2;

import static org.junit.Assert.*;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.oauth2.client.test.OAuth2ContextConfiguration;
import org.springframework.security.oauth2.client.test.OAuth2ContextSetup;
import org.springframework.security.oauth2.client.test.RestTemplateHolder;
import org.springframework.security.oauth2.client.token.grant.password.ResourceOwnerPasswordResourceDetails;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestOperations;

import com.codingera.module.base.common.util.CeSecurityUtil;

/**
 * 
 * Integration test
 * For integration tests one can then simply use built in OAuth2 test support rule and annotions:
 * 
 * 参看：http://stackoverflow.com/questions/29510759/how-to-test-spring-security-oauth2-resource-server-security
 * 
 * 作用：
 * 对权限注解进行测试
 * 
 * ce_user_role表
 * @Secured({CeSecurityUtil.ROLE_GUEST})
 * 
 * oauth_client_details表字段authorities、scope
 * @PreAuthorize("#oauth2.hasScope('read') or (#oauth2.hasScope('other') and hasRole('ROLE_USER'))"）
 * @PreAuthorize("hasRole('ADMIN')")
 * @PreAuthorize("hasAuthority('ROLE_ADMIN')")
 * @PreAuthorize("#oauth2.clientHasRole('ROLE_ADMIN')")
 * 
 * 权限表达式解析：http://haohaoxuexi.iteye.com/blog/2247073
 * Spring Security官方文档： http://docs.spring.io/spring-security/site/docs/4.0.4.RELEASE/reference/htmlsingle/#ns-method-security
 * 
 * @author JasonWoo
 *
 */
// @RunWith(SpringJUnit4ClassRunner.class)
// @SpringApplicationConfiguration(classes = MyApp.class)
// @WebIntegrationTest(randomPort = true)
public class Oauth2MethodAuthTests implements RestTemplateHolder {
	
	//@Value("http://localhost:${local.server.port}")
	private String host = "http://localhost:8080";

	private  RestOperations restTemplate = new TestRestTemplate();

	@Rule
	public OAuth2ContextSetup context = OAuth2ContextSetup.standard(this);

	@Test
	@OAuth2ContextConfiguration(MyDetails.class)
	public void testHelloOAuth2WithRole() {
			try {
				ResponseEntity<String> entity = getRestTemplate().getForEntity(host + "/api/article/list", String.class);
				// 无权限访问返回结果为fail
				//assertTrue(entity.getBody().contains("\"result\" : \"fail\""));
				// 无权限访问返回结果403
				assertTrue(entity.getStatusCode().is4xxClientError());
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println(e.getMessage());
			}
	}
	@Test
	@OAuth2ContextConfiguration(MyDetails11.class)
	public void testHelloOAuth2WithRole2() {
		ResponseEntity<String> entity = getRestTemplate().getForEntity(host + "/api/article/list", String.class);
		// 有权限访问返回结果202
		assertTrue(entity.getStatusCode().is2xxSuccessful());
	}

	@Override
	public void setRestTemplate(RestOperations restTemplate) {
		this.restTemplate = restTemplate;
	}

	@Override
	public RestOperations getRestTemplate() {
		return restTemplate;
	}

	public String getHost() {
		return host;
	}
}

/**
 * 请求token配置
 * 用户jason 角色是 ROLE_JASON
 * 资源api-client的角色是ROLE_CLIENT，SCOPE是read,write
 * 
 */
class MyDetails extends ResourceOwnerPasswordResourceDetails {
	public MyDetails(final Object obj) {
		Oauth2MethodAuthTests it = (Oauth2MethodAuthTests) obj;
		setAccessTokenUri(it.getHost() + "/oauth/token");
		setGrantType("password");
		setClientId("api-client");
		setClientSecret("api");
		setUsername("jason");
		setPassword("jason");
	}
}

/**
 * 请求token配置11
 * admin 角色是 ROLE_ADMIN
 * 
 */
class MyDetails11 extends ResourceOwnerPasswordResourceDetails {
	public MyDetails11(final Object obj) {
		Oauth2MethodAuthTests it = (Oauth2MethodAuthTests) obj;
		setAccessTokenUri(it.getHost() + "/oauth/token");
		setGrantType("password");
		setClientId("api-client");
		setClientSecret("api");
		setUsername("admin");
		setPassword("admin");
	}
}

/**
 * 请求token配置2
 * jason2 角色是 ROLE_GUEST
 * 
 */
class MyDetails2 extends ResourceOwnerPasswordResourceDetails {
	public MyDetails2(final Object obj) {
		Oauth2MethodAuthTests it = (Oauth2MethodAuthTests) obj;
		setAccessTokenUri(it.getHost() + "/oauth/token");
		setGrantType("password");
		setClientId("api-client");
		setClientSecret("api");
		setUsername("jason2");
		setPassword("jason");
	}
}

/**
 * 请求token配置3
 * jason2 角色是 ROLE_GUEST
 * 资源jason-client的角色是ROLE_ADMIN，SCOPE是read,write
 */
class MyDetails3 extends ResourceOwnerPasswordResourceDetails {
	public MyDetails3(final Object obj) {
		Oauth2MethodAuthTests it = (Oauth2MethodAuthTests) obj;
		setAccessTokenUri(it.getHost() + "/oauth/token");
		setGrantType("password");
		setClientId("jason-client");
		setClientSecret("jason");
		setUsername("jason2");
		setPassword("jason");
	}
}