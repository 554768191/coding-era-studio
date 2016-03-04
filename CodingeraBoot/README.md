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
