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
curl -X POST -vu mobile-client:mobile http://localhost:8080/oauth/token -d "password=admin&username=user&grant_type=password&scope=write&client_secret=mobile&client_id=mobile-client" or 
curl -X post -u mobile-client:mobile http://localhost:8080/oauth/token\?client_id\=mobile-client\&client_secret\=mobile\&grant_type\=password\&scope\=write\&username\=user\&password\=admin 

2.refresh token 
curl -X post -u mobile-client:mobile http://localhost:8080/oauth/token\?client_id\=mobile-client\&client_secret\=mobile\&grant_type\=refresh_token\&refresh_token\=a01ea2e2-4af6-4235-9075-c44770ec7bec 

3.request resource 
curl -X get http://localhost:8080/api/demo\?access_token\=1389178a-db21-43b7-8621-1ef846cb94bb
or
curl -H "Authorization: bearer [access_token]" localhost:8080/flights/1
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

##SSL加密
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
.
├── README.md
├── mvnw
├── mvnw.cmd
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── codingera
│   │   │           ├── CodingeraBootApplication.java
│   │   │           ├── ServletInitializer.java
│   │   │           └── module
│   │   │               ├── base
│   │   │               │   ├── controll
│   │   │               │   │   └── ActionResult.java
│   │   │               │   └── model
│   │   │               │       └── IdEntity.java
│   │   │               ├── demo
│   │   │               │   ├── controll
│   │   │               │   │   └── DemoController.java
│   │   │               │   ├── criteria
│   │   │               │   │   └── DemoQueryCriteria.java
│   │   │               │   ├── model
│   │   │               │   │   └── Demo.java
│   │   │               │   ├── repository
│   │   │               │   │   ├── DemoRepository.java
│   │   │               │   │   ├── custom
│   │   │               │   │   │   └── DemoRepositoryCustom.java
│   │   │               │   │   └── impl
│   │   │               │   │       └── DemoRepositoryImpl.java
│   │   │               │   └── service
│   │   │               │       ├── DemoService.java
│   │   │               │       └── impl
│   │   │               │           └── DemoServiceImpl.java
│   │   │               ├── file
│   │   │               │   ├── controll
│   │   │               │   │   └── FileUploadController.java
│   │   │               │   ├── model
│   │   │               │   │   ├── Attachment.java
│   │   │               │   │   ├── AttachmentView.java
│   │   │               │   │   └── ImageAttachment.java
│   │   │               │   ├── repository
│   │   │               │   │   ├── AttachmentRepository.java
│   │   │               │   │   ├── custom
│   │   │               │   │   │   └── AttachmentRepositoryCustom.java
│   │   │               │   │   └── impl
│   │   │               │   └── service
│   │   │               │       └── impl
│   │   │               ├── oauth2
│   │   │               │   ├── OAuth2Configuration.java
│   │   │               │   └── controll
│   │   │               │       └── MobileDemoController.java
│   │   │               ├── security
│   │   │               │   ├── ApplicationSecurity.java
│   │   │               │   └── AuthenticationManagerConfiguration.java
│   │   │               └── user
│   │   │                   ├── controll
│   │   │                   │   └── UserController.java
│   │   │                   ├── criteria
│   │   │                   │   └── UserQueryCriteria.java
│   │   │                   ├── model
│   │   │                   │   ├── User.java
│   │   │                   │   └── UserRole.java
│   │   │                   ├── repository
│   │   │                   │   ├── UserRepository.java
│   │   │                   │   ├── custom
│   │   │                   │   │   └── UserRepositoryCustom.java
│   │   │                   │   └── impl
│   │   │                   │       └── UserRepositoryImpl.java
│   │   │                   └── service
│   │   │                       ├── UserService.java
│   │   │                       └── impl
│   │   │                           └── UserServiceImpl.java
│   │   └── resources
│   │       ├── application.properties
│   │       ├── message_en_US.properties
│   │       ├── message_zh_CN.properties
│   │       ├── static
│   │       └── templates
│   └── test
│       └── java
│           └── com
│               └── codingera
│                   ├── CodingeraBootApplicationTests.java
│                   ├── SampleWebSecureCustomApplicationTests.java
│                   └── demo
│                       └── DemoRestControllerTest.java


#TODO
1.building_a_hateoas_rest_service
2.PART 4: INTERNATIONALIZATION IN SPRING BOOT
3.File Upload
4.CacheService