package com.codingera.module.oauth2.controll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.codingera.module.api.demo.criteria.DemoQueryCriteria;
import com.codingera.module.api.demo.model.Demo;
import com.codingera.module.api.demo.service.DemoService;
import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.model.User;
import com.codingera.module.user.service.UserService;
/***********************************************
测试参考：http://git.oschina.net/shengzhao/spring-oauth-server/blob/master/others/oauth_test.txt

grant_type(授权方式)
	1.authorization_code                      授权码模式(即先登录获取code,再获取token)
	2.password                                密码模式(将用户名,密码传过去,直接获取token)
	3.refresh_token                           刷新token
	4.implicit                                简化模式(在redirect_uri 的Hash传递token; Auth客户端运行在浏览器中,如JS,Flash)
	5.client_credentials                      客户端模式(无用户,用户向客户端注册,然后客户端以自己的名义向'服务端'获取资源)

scope
	1.read
	2.write
	3.trust

1 获取token：密码模式(将用户名,密码传过去,直接获取token)
	curl -X post http://localhost:8999/oauth/token\?client_id\=mobile-client\&client_secret\=mobile\&grant_type\=password\&scope\=read,write\&username\=admin\&password\=admin
	成功返回
	{"access_token":"1a80bb71-f156-45b0-b1af-03765d8c2e61","token_type":"bearer","refresh_token":"01472aba-0c98-4e75-a2b8-65a58d7b3f7b","expires_in":43199,"scope":"read write"}% 
	用户密码错误
	{"error":"invalid_grant","error_description":"坏的凭证"}%
	不带参数
	{"error":"unauthorized","error_description":"未在SecurityContext中查找到认证对象"}
	参数不正确
	{"message":"系统异常,立马解决◑﹏◐" ,"result":"error" }% 

2 刷新token
	curl -X post http://localhost:8999/oauth/token\?client_id\=mobile-client\&client_secret\=mobile\&grant_type\=refresh_token\&refresh_token\=01472aba-0c98-4e75-a2b8-65a58d7b3f7b
	成功返回
	{"access_token":"58f15b97-2091-439c-9d26-c9a51a7a4968","token_type":"bearer","refresh_token":"01472aba-0c98-4e75-a2b8-65a58d7b3f7b","expires_in":43199,"scope":"read write"}% 

3 使用token请求API
	curl -X get http://localhost:8999/m/demo/user_info\?access_token\=d6650ebf-0709-4f41-a47a-3bb1091dec94
	成功返回
	{"id":3,"username":"admin","password":"21232f297a57a5a743894a0e4a801fc3","accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true,"enabled":true,"avatar":null,"sex":null,"intro":null,"lastLoginTime":null,"authorities":[{"authority":"ROLE_ADMIN"},{"authority":"ROLE_UNITY"},{"authority":"ROLE_CLIENT"},{"authority":"ROLE_MOBILE"},{"authority":"MOBILE"}]}% 
	token过期
	{"error":"invalid_token","error_description":"Invalid access token: 1a80bb71-f156-45b0-b1af-03765d8c2e61"}% 
	没有权限ROLE
	{"error":"access_denied","error_description":"不允许访问"}%
	
登录
	curl -u "admin" -X post  http://localhost:8999/admin/ajaxLoginProcess\?username\=admin\&password\=admin
	成功返回
 	{"result":"success","data":{"id":3,"username":"admin","password":"21232f297a57a5a743894a0e4a801fc3","accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true,"enabled":true,"avatar":null,"sex":null,"intro":null,"lastLoginTime":null,"authorities":[{"authority":"ROLE_ADMIN"},{"authority":"ROLE_UNITY"},{"authority":"ROLE_MOBILE"}]}}% 
POST
	curl -X POST -H "Content-Type:application/json" -d '{  "email" : "test@test.com",  "name" : "Ruici" }' http://localhost:8080/users
	
*************************************************/

/**
 * OAUTH2测试
 * 
 * @author Jason
 * 
 */
@Controller
@RequestMapping("/m/demo")
public class MobileDemoController{

	@Autowired
	private DemoService demoService;
	@Autowired
	private UserService userService;

	@RequestMapping
	@ResponseBody
	public ActionResult getDemo(Pageable pr,@ModelAttribute DemoQueryCriteria criteria){
		Page<Demo> pages =  demoService.findDemoByCriteria(pr,criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS,pages);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public ActionResult editDemo(@ModelAttribute Demo demo){
		demo = demoService.save(demo);
		return new ActionResult(ActionResult.RESULT_SUCCESS,demo);
	}
	
	/**
	 * 获取当前登录用户信息
	 * 
	 * @return
	 */
	@RequestMapping("/user_info")
    @ResponseBody
    public User userInfo() {
        return userService.loadCurrentUser();
    }

}
