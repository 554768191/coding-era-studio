package com.codingera.common.framework.aop.event;

import org.springframework.context.ApplicationEventPublisher;

import com.codingera.common.framework.aop.MethodInvocationContextHolder;

public class ApplicationEventPublishers {

	public static ApplicationEventPublisher immediately() {
		return MethodInvocationContextHolder.getContext().getImmediateEventPublisher();
	}
	
	public static ApplicationEventPublisher afterTransaction() {
		return MethodInvocationContextHolder.getContext().getAfterTransactionEventPublisher();
	}
}
