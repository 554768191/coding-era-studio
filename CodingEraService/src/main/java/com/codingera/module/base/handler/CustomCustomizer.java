package com.codingera.module.base.handler;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

/**
 * 
 * 自定义错误页面，请参看 MainsiteErrorController.java
 * 
 * @author JasonWoo
 *
 */
@Configuration
class CustomCustomizer implements EmbeddedServletContainerCustomizer {

    @Override
    public void customize(ConfigurableEmbeddedServletContainer container) {
        container.addErrorPages(
    		new ErrorPage(HttpStatus.NOT_FOUND, "/404"),
    		new ErrorPage(HttpStatus.UNAUTHORIZED, "/401")
        );
    }

}