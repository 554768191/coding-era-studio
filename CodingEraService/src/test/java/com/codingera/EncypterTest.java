package com.codingera;
import org.jasypt.util.text.BasicTextEncryptor;
import org.jasypt.util.text.StrongTextEncryptor;
  
/**
 * 
 * Java加密包--Jasypt
 * Jasypt这个Java类包为开发人员提供一种简单的方式来为项目增加加密功能，包括：密码Digest认证，文本和对象加密，集成hibernate
 * ，Spring Security(Acegi)来增强密码管理。Jasypt开发团队推出了Java加密工具Jasypt 1.4，它可与Spring
 * Framework、Hibernate和Acegi Security集成。
 * 与项目有关的一位开发者表示，Jasypt是一个Java库，可以使开发者不需太多操作来给Java项目添加基本加密功能，而且不需要知道加密原理。
 * Jasypt也即Java Simplified
 * Encryption是Sourceforge.net上的一个开源项目。在当地时间11月23号的通告中，
 * Jasypt 1.4的新特征包括：加密属性文件（encryptable properties files）、Spring
 * Framework集成、加密Hibernate数据源配置、新的命令行工具、URL加密的Apache wicket集成以及升级文档。
 * 根据Jasypt文档，该技术可用于加密任务与应用程序，例如加密密码、敏感信息和数据通信、创建完整检查数据的sums.
 * 其他性能包括高安全性、基于标准的加密技术、可同时单向和双向加密的加密密码、文本、数字和二进制文件。Jasypt也可以与Acegi
 * Security整合也即Spring Security。Jasypt亦拥有加密应用配置的集成功能，而且提供一个开放的API从而任何一个Java
 * Cryptography Extension都可以使用Jasypt。
 * Jasypt还符合RSA标准的基于密码的加密，并提供了无配置加密工具以及新的、高可配置标准的加密工具。
 * 
 * 参考： 博客：http://inotgaoshou.iteye.com/blog/1039651
 * 国外：https://justinrodenbostel.com/
 * 2014/06/06/part-5a-additional-credential-security-spring-data-jpa-jasypt/
 * 官网：http://www.jasypt.org/maven.html
 * 
 * @author JasonWoo
 *
 */
public class EncypterTest {  
  
    public static void main(String[] args) {  
    	
         //加密     
        BasicTextEncryptor textEncryptor = new BasicTextEncryptor();     
        textEncryptor.setPassword("password");    
        String newPassword = textEncryptor.encrypt("vagrant");    
        System.out.println(newPassword);    
//        解密     
        BasicTextEncryptor textEncryptor2 = new BasicTextEncryptor();     
        textEncryptor2.setPassword("password");     
        String oldPassword = textEncryptor2.decrypt(newPassword);       
        System.out.println(oldPassword);    
        System.out.println("--------------------------");  
        
        
        /** 
         * Utility class for easily performing high-strength encryption of texts.  
         *  This class internally holds a StandardPBEStringEncryptor configured this way:  
         *  Algorithm: PBEWithMD5AndTripleDES.  
         *  Key obtention iterations: 1000.  
         *  The required steps to use it are:  
         *  Create an instance (using new).  
         *  Set a password (using setPassword(String)).  
         *  Perform the desired encrypt(String) or decrypt(String) operations.  
         *  To use this class, you may need to download and install the Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files.  
         *  This class is thread-safe.  
         */  
        StrongTextEncryptor ste = new StrongTextEncryptor();  
        //加密  
        ste.setPassword("password");  
        String encyptedResult= ste.encrypt("123456");  
        System.out.println("encyptedResult:"+encyptedResult);  
        //解密  
        String dencyptedResult = ste.decrypt(encyptedResult);  
        System.out.println(dencyptedResult);  
          
          
    }  
}  
