package com.codingera.module.security.controll;

import javax.validation.ValidationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.VndErrors;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.codingera.module.base.controll.ActionResult;

@ControllerAdvice
class BaseControllerAdvice {

	private static final Logger LOGGER = LoggerFactory.getLogger(BaseControllerAdvice.class);

	@ResponseBody
	@ExceptionHandler(ValidationException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	VndErrors validationExceptionHandler(ValidationException ex) {
		// 返回xml
		return new VndErrors("error", ex.getMessage());
	}

	@ResponseBody
	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	ActionResult illegalArgumentExceptionHandler(IllegalArgumentException ex) {
		// 返回json
		return new ActionResult(ActionResult.RESULT_ERROR, ex.getMessage());
	}
}