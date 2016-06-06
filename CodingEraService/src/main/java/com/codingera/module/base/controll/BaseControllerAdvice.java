package com.codingera.module.base.controll;

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

	/**
	 * 针对个别异常进行捕捉，先保留
	 * 
	 * @param ex
	 * @return
	 */
//	@ResponseBody
//	@ExceptionHandler(ValidationException.class)
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	VndErrors validationExceptionHandler(ValidationException ex) {
//		// 返回xml
//		return new VndErrors("error", ex.getMessage());
//	}
//
//	@ResponseBody
//	@ExceptionHandler(IllegalArgumentException.class)
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	ActionResult illegalArgumentExceptionHandler(IllegalArgumentException ex) {
//		// 返回json
//		return new ActionResult(ActionResult.RESULT_ERROR, ex.getMessage());
//	}
	
	/**
	 * 全局异常捕捉，统一格式 { "result" : "fail", "data" : "不允许访问" }
	 * 
	 * @param ex
	 * @return
	 */
	@ResponseBody
	@ExceptionHandler(Exception.class)
	//@ResponseStatus(HttpStatus.BAD_REQUEST)
	ActionResult exceptionHandler(Exception ex) {
		LOGGER.info(ex.getLocalizedMessage());
		// 返回json
		String message = ex.getMessage() == null ? ex.getClass().toString() : ex.getMessage();
		return new ActionResult(ActionResult.RESULT_ERROR, message);
	}
}