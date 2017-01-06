#Coding Era Studio 编码时代平台

## 简述
codingEra系列都是和有相同兴趣爱好的朋友一起开发的。
coding-era-studio算是一个门户网站，前端使用静态页面展示数据，nodejs作为中间层，由SpringBoot搭建Restfull API服务，数据库使用了H2，当然切换成Mysql也是很方便的。
coding-era-admin是后台管理系统，主要用于发布文章、管理用户权限，还是我们的试验田。
该门户网站已经可以成功运行在www.codingera.com（但是目前已经下线orz）。

> 我们的生产版本提交在[coding](https://coding.net)上，github上的是展示用版本。

## 亮点

### 模块化
我们一开始就是抱着模块化的目的去搭建框架。这里的模块化指的是不用重复造轮子，比如用户管理模块，包含了用户的登录、注册，认证模块包含了对用户角色权限的管理，那么如果在新的项目中要实现用户的注册、权限认证等功能，直接引入该模块，再根据具体需求做少量改动即可快速实现功能。


## 启动
*首先看这个*
[git完美教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)

### 1.部署项目
```
//还是那个配方..那个味道,直接
mvn clean install -Dmaven.test.skip=true
mvn eclipse:eclipse
```
### 2.跑起来也很简单
```
//把启动的配置,改成下面这个就好,基于jetty
Main class:com.codingera.common.util.MyServer
```


