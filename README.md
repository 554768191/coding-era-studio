#Coding Era编码时代

*首先看这个*
[git完美教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)

##1.部署项目
```
//还是那个配方..那个味道,直接
mvn clean install -Dmaven.test.skip=true
mvn eclipse:eclipse
```

##2.跑起来也跟公司一样
```
//把启动的配置,改成下面这个就好,公司的jetty
Main class:com.codingera.common.util.MyServer
```

>暂时这样吧..其它的慢慢研究
