# Coding Era编码时代

## 0.环境要求
### 0.1 git教程
[git完美教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)

	术语：
	工作区 是你的本地开发环境
	缓存区 是你add的本地仓库
	引用   是你commit的本地分支（如master）

	1改提交说明：
	$ git reset --soft HEAD^
	工作区和暂存区不改变，但是引用向前回退一次。当对最新的提交说明或者提交的更改不满意时，撤销最新的提交以便重新提交。
		
	2改提交文件内容：	
	$ git reset --mixed HEAD^
	工作区不改变，但是暂存区会回退到上一次提交之前，引用也会回退一次。

	3慎用！！！工作区所有未commit改动永久丢失！！！
	$ git reset --hard HEAD^
	彻底撤销最近的提交。引用回退到前一次，而且工作区和暂存区都会回退到上一次提交的状态。自上一次以来的提交全部丢失。

	4慎用！！！工作区相应的文件未commit改动永久丢失。
	$ git checkout -- filename
	用暂存区中filename文件来覆盖工作区中的filename文件。相当于取消自上次执行git add filename以来（如果执行过）的本地修改。

	5慎用！！！工作区相应的文件未push改动永久丢失。
	$ git checkout branch -- filename
	维持HEAD的指向不变。用branch所指向的提交中filename替换暂存区和工作区中相应的文件。注意会将暂存区和工作区中的filename文件直接覆盖。

	6查看操作记录
	git relog

	7查看提交记录
	git log


### 0.2 开发环境
	mac os x
	Apache Maven 3.0
	Java version 1.7


## 1.部署项目
	//首先进入到相应的pom.xml目录中，执行命令
	mvn clean install -Dmaven.test.skip=true

	//如果有需要的话，下载源码和javadocs
	mvn dependency:sources
	mvn dependency:resolve -Dclassifier=javadoc

	//把上面下载的包引入eclipse
	mvn eclipse:eclipse

	注意：如果执行完命令后报dataSource为null，需要再次执行mvn clean install -Dmaven.test.skip=true才行，不知原因。

## 2.跑起来比公司简单
	//修改配置文件：端口，数据库配置等等
	/CodingeraBoot/src/main/resources/application.properties

	//把启动的配置的Main class改成下面这个就好，另外想加配置直接写在main方法里即可
	com.codingera.CodingeraBootApplication

	//启动配置program argument
	--spring.config.location=file:./configuration/application.properties

### 2.1 可以参考官方配置大全链接
[可以参考官方配置大全](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#common-application-properties)

## 3.sql脚本
	配置文件设置spring.datasource.initialize=true：
	启动服务自动执行sql脚本。
	//把create table语句放到这里
	/CodingeraBoot/src/main/resources/schema.sql
	//把insert语句放到这里
	/CodingeraBoot/src/main/resources/data.sql

	hibernate的ddl-auto机制：
	注意，spring.jpa.hibernate.ddl-auto默认为create-drop。
	如果spring.datasource.initialize=true，当使用内存数据库时，
	会执行schema.sql把表删除再create造成数据丢失哦.
	保留数据可以设置spring.jpa.hibernate.ddl-auto=none或者空
	此时启动服务将不执行schema.sql，但照样执行data.sql。
	或者注释schema.sql，设置spring.jpa.hibernate.ddl-auto=update。

	关闭启动服务自动执行sql脚本
	spring.datasource.initialize=false

## 4.test
	测试驱动开发，你懂得！
	mvn clean install

# 技术点

## Oauth2

>请求示例

### 1.get token
#### 1.1.password
	curl -X post -vu mobile-client:mobile http://localhost:8080/oauth/token -d "password=jason&username=jason&grant_type=password&scope=write&client_secret=mobile&client_id=mobile-client" 
	OR
	curl mobile-client:mobile@localhost:8080/oauth/token -d grant_type=password -d username=user -d password=admin
	SSL
	curl -X post -vku mobile-client:mobile https://localhost:8443/oauth/token -d "password=jason&username=jason&grant_type=password&scope=write&client_secret=mobile&client_id=mobile-client"

#### 1.2.client_credentials
	curl mobile-client:mobile@localhost:8080/oauth/token -d grant_type=client_credentials

#### 1.3.authorization_code
	see https://github.com/nicodewet/template-spring-boot-oauth-server
	In your browser,
	http://localhost:8080/oauth/authorize?response_type=code&client_id=api-client&redirect_uri=http://example.com
	If your grant access, you will be redirected to: http://example.com/?code=OivfyQ
	curl api-client:api@localhost:8080/oauth/token -d grant_type=authorization_code -d client_id=api-client -d redirect_uri=http://example.com -d code=YUQWLH

### 2.refresh token
	curl -X post -u mobile-client:123456 http://localhost:8080/oauth/token\?client_id\=mobile-client\&client_secret\=mobile\&grant_type\=refresh_token\&refresh_token\=a01ea2e2-4af6-4235-9075-c44770ec7bec

### 3.request resource
	curl -X get  http://localhost:8080/api/demo\?access_token\=1389178a-db21-43b7-8621-1ef846cb94bb
	or
	curl -H "Authorization: bearer [access_token]" localhost:8080/api/demo/1

### 4.logout
	this request will remove access_token, redirected to http://your.com:
	curl -H "Authorization: bearer [access_token]" localhost:8080/oauth/logout?next=http://your.com
	
### 5.others
	多个scope使用+号
	scope\=read+write


## CORS
	目前使用全局配置，参考CorsConfiguration.java
	其他配置方式：
	1.application.properties
	不能细化配置，暂时注释
	2.Filter
	参考FilterRegistrationBean.java，保留做demo
	3.注解


## SSL加密（https）
	生成秘钥方式命令：
	$ ssh-keygen -t rsa                                                 
	Generating public/private rsa key pair.
	Enter file in which to save the key (/Users/JasonWoo/.ssh/id_rsa): /Users/JasonWoo/Downloads/codingera
	Enter passphrase (empty for no passphrase): 
	生成文件：
	codingera 私钥；codingera.pub 公钥。

	$ keytool -genkey -alias codingera -keyalg RSA -keystore codingera.keystore
	Enter keystore password: password
	Re-enter new password: password
	生成文件：
	codingera.keystore

	配置
	server.port=8443 
	server.ssl.enabled=true
	server.ssl.key-store=classpath:codingera.jwt
	server.ssl.key-store-password=password
	server.ssl.key-password=password
	
	请求：
	curl -k -X get https://localhost:8080/api/demo/page\?access_token\=dcb3c222-70db-472d-95ad-1645bbb39c24
	使用-k，是不对服务器的证书进行检查，这样就不必关心服务器证书的导出问题了。

	注意：
	1.使用https后端口将改为8443，不再支持http的8080
	2.目前秘钥文件还是放在src/main/resources嵌入jar包，虽然官方不建议这么做，以后再修正！
	3.如果nodejs请求时返回“DEPTH_ZERO_SELF_SIGNED_CERT”记得加上如下参数：
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" 
	// Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

## JWT
	使用openssl
	$ openssl
	生成RSA私钥
	$ genrsa -out rsa_private_key.pem 1024
	生成RSA公钥
	$ rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
	生成PKCS8编码的私钥,如有需要自己复制出来存到任意文件
	$ pkcs8 -topk8 -inform PEM -in rsa_private_key.pem -outform PEM -nocrypt
	参考http://stephen830.iteye.com/blog/2087281
	
	>Json Web Token好像必须使用这种对称秘钥才行
	
	配置
	security.oauth2.resource.jwt.key-value=（ a symmetric secret or PEM-encoded RSA public key）

## 数据库配置加密
	把application.properties的spring.datasource.password使用Jasypt加密
	参看EncypterTest.java
	配置DataSourceConfiguration.java

## 国际化
	配置：
	1.application.properties加上配置
	spring.messages.basename=message #指定默认文件message.properties和前缀
	spring.messages.cache-seconds=-1
	spring.messages.encoding=UTF-8
	2.WebMvcConfiguration.java
	SessionLocaleResolver设置默认资源文件为message_en_US.properties
	LocaleChangeInterceptor设置方言参数为lang

	demo请参考DemoOpenController.java：
	```java
		// 从后台代码获取国际化信息
		//方式一
		RequestContext requestContext = new RequestContext(request);
		String message = requestContext.getMessage(key);
		//方式二
		String message = MessageUtil.getMessage(key);
	```
	如果可以接收到request的话建议使用方式一，因为方式二目前只支持中文
	➜  ~ curl http://localhost:8080/api/open/demo/test

	{
	"result" : "success",
	"data" : "好极了(from message_zh_CN.properties)"
	}%                                                                                                                                                                          	➜  ~ curl http://localhost:8080/api/open/demo/test\?lang\=en_US

	{
	"result" : "success",
	"data" : "good(from message_en_US.properties)"
	}%

## 权限控制
### 1 方法认证注解
	配置类 GlobalMethodAuthConfiguration.java

### 2 url访问权限
	配置类 OAuth2CustomResourceConfiguration.java 或者 OAuth2ResourceConfiguration.java
	经测试，在WebSecurityConfiguration.java配置是无效的。

### 3 自定义hasPermission权限表达式
	CustomPermissionEvaluator.java
	在需要使用该表达式的地方配置
	// hasPermission enable
	OAuth2WebSecurityExpressionHandler expressionHandler = new OAuth2WebSecurityExpressionHandler();
	expressionHandler.setPermissionEvaluator(customPermissionEvaluator);
	[httpSecurity].expressionHandler(expressionHandler);

## 目录结构

## 生产启动
### 【生产配置】
	上传jar或者war包
	在同级目录创建目录configuration

#### 1.application-prod.properties
	更改服务地址：
	server.address=123.57.56.53

	配置freemarker模板（如果build的是war包请忽视）：
	spring.freemarker.template-loader-path=file:/usr/CodingEraStudio/CodingEraService/views/
	把本地/CodingEraService/src/main/webapp/WEB-INF/views下的模板上传到配置的路径

#### 2.attachments文件夹
	把相关的静态文件上传

#### 3.h2数据文件
	coding_era_db.trace.db

###【查看端口】
	lsof -i:8888
	netstat -ap | grep 8080
	ps -ef|grep java
	kill [pid]

###【启动服务】
	cd /usr/CodingEra/service
	nohup java -jar CodingEraService-0.0.1-SNAPSHOT.jar --spring.config.location=application.properties > logs/production.log 2> logs/production.err &
	或者
	cd /usr/CodingEra/service/
	java -jar CodingEraService-0.0.1-SNAPSHOT.jar --spring.config.location=configuration/application.properties

###【数据库端口】
	h2
	8082
	9092

# TODO
	1.building_a_hateoas_rest_service (50%)
	2.PART 4: INTERNATIONALIZATION IN SPRING BOOT (done!)
	3.File Upload (done!)
	4.CacheService (0%)
	
# 参考
## 项目简介
[Spring Oauth2 with JWT Sample](https://www.javacodegeeks.com/2016/04/spring-oauth2-jwt-sample.html?utm_source=tuicool&utm_medium=referral)	

([source code](https://github.com/tuanngda/spring-boot-oauth2-demo.git))

[Spring Boot Oauth2 Security](https://www.javacodegeeks.com/2015/10/spring-boot-oauth2-security.html)

([source code](https://github.com/rajithd/spring-boot-oauth2))

## 官方文档
[Spring Framework Reference Documentation](http://docs.spring.io/spring/docs/4.2.5.RELEASE/spring-framework-reference/htmlsingle/#spring-introduction)

[Spring Boot Reference Guide](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-configure-a-datasource)

[Spring Security Reference](http://docs.spring.io/spring-security/site/docs/4.0.4.RELEASE/reference/htmlsingle/#ns-method-security)