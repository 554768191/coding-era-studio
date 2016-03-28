package com.codingera.module.base.converter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;

/**
 * 
 * 配置 jackson-datatype-hibernate4 识别懒加载字段
 * 
 * @see  http://stackoverflow.com/questions/33727017/configure-jackson-to-omit-lazy-loading-attributes-in-springboot
 *
 * @author JasonWoo
 *
 */
@SuppressWarnings("serial")
public class HibernateAwareObjectMapper extends ObjectMapper {

	public HibernateAwareObjectMapper() {
		registerModule(new Hibernate4Module());
	}
}
