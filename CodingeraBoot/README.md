#Coding Era编码时代

##0.环境要求
```
mac os x
Apache Maven 3.0
Java version 1.7
[git完美教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)
```

##1.部署项目
```
//首先进入到相应的pom.xml目录中，执行命令
mvn clean install -Dmaven.test.skip=true

//如果有需要的话，下载源码和javadocs
mvn dependency:sources
mvn dependency:resolve -Dclassifier=javadoc

//把上面下载的包引入eclipse
mvn eclipse:eclipse

注意：如果执行完命令后报dataSource为null，需要再次执行mvn clean install -Dmaven.test.skip=true才行，不知原因。

```

##2.跑起来比公司简单
```
//修改配置文件：端口，数据库配置等等，[可以参考官方配置大全](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#common-application-properties)
/CodingeraBoot/src/main/resources/application.properties

//把启动的配置的Main class改成下面这个就好，另外想加配置直接写在main方法里即可
com.codingera.CodingeraBootApplication
``` 

##3.每次启动都执行*.sql脚本
```
//把create table语句放到这里
/CodingeraBoot/src/main/resources/schema.sql
```

##4.test
```
测试驱动开发，你懂得！
mvn clean install
```

#技术点

##Oauth2
```
//请求示例

1.get token
1.1.password
	curl -X post -vu mobile-client:123456 http://localhost:8080/oauth/token -d "password=admin&username=user&grant_type=password&scope=write&client_secret=123456&client_id=mobile-client" 
	or
	curl -X post -u mobile-client:123456 http://localhost:8080/oauth/token\?client_id\=mobile-client\&client_secret\=123456\&grant_type\=password\&scope\=write\&username\=user\&password\=admin
	or
	curl mobile-client:mobile@localhost:8080/oauth/token -d grant_type=password -d username=user -d password=admin

1.2.client_credentials
	curl mobile-client:mobile@localhost:8080/oauth/token -d grant_type=client_credentials

1.3.authorization_code
	see https://github.com/nicodewet/template-spring-boot-oauth-server
	In your browser,
	http://localhost:8080/oauth/authorize?response_type=code&client_id=api-client&redirect_uri=http://example.com
	If your grant access, you will be redirected to: http://example.com/?code=OivfyQ
	curl api-client:api@localhost:8080/oauth/token -d grant_type=authorization_code -d client_id=api-client -d redirect_uri=http://example.com -d code=YUQWLH

2.refresh token
	curl -X post -u mobile-client:123456 http://localhost:8080/oauth/token\?client_id\=mobile-client\&client_secret\=mobile\&grant_type\=refresh_token\&refresh_token\=a01ea2e2-4af6-4235-9075-c44770ec7bec
	or
	curl -H "Authorization: bearer [access_token]" localhost:8080/flights/1

3.request resource
	curl -X get  http://localhost:8080/api/demo\?access_token\=1389178a-db21-43b7-8621-1ef846cb94bb

4.others
	多个scope使用+号
	scope\=read+write

```

##CORS
```
目前使用全局配置，参考CorsConfiguration.java
其他配置方式：
1.application.properties
不能细化配置，暂时注释
2.Filter
参考FilterRegistrationBean.java，保留做demo
3.注解

```

##SSL加密（https）
```
生成秘钥方式命令：
$ keytool -genkey -alias codingera -keyalg RSA -keystore src/main/resources/codingera.keystore
Enter keystore password: password
Re-enter new password: password

生成文件：
codingera 公钥；codingera.keystore私钥。

请求：
curl -k -X get https://localhost:8080/api/demo/page\?access_token\=dcb3c222-70db-472d-95ad-1645bbb39c24
使用-k，是不对服务器的证书进行检查，这样就不必关心服务器证书的导出问题了。
```

##目录结构


#TODO
1.building_a_hateoas_rest_service
2.PART 4: INTERNATIONALIZATION IN SPRING BOOT
3.File Upload
4.CacheService