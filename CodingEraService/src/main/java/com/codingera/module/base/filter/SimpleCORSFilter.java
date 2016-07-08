//package com.codingera.module.base.filter;
//import java.io.IOException;
//
//import javax.servlet.Filter;
//import javax.servlet.FilterChain;
//import javax.servlet.FilterConfig;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//
///**
// * 
// * Chrome浏览器在AJAX请求前，会发送OPTIONS请求测试服务器的CORS，
// * 如果不允许OPTIONS请求，就会报跨域错误，返回为空，前端不好处理！
// * ^ 似乎上面问题的关键点不在这！ by Jason 
// * 
// * @author JasonWoo
// *
// */
//@Component
//@Order(Ordered.HIGHEST_PRECEDENCE)
//public class SimpleCORSFilter implements Filter {
//
//	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
//		HttpServletResponse response = (HttpServletResponse) res;
//		HttpServletRequest request = (HttpServletRequest) req;
//		String originHeader = request.getHeader("Origin");
//		response.setHeader("Access-Control-Allow-Origin", originHeader);
//		response.setHeader("Access-Control-Allow-Credentials", "true");
//		response.setHeader("Access-Control-Allow-Methods", "*");
//		response.setHeader("Access-Control-Max-Age", "3600");
//		response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization");
//		
//		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
//	        response.setStatus(HttpServletResponse.SC_OK);
//	    } else {
//	        chain.doFilter(req, res);
//	    }
//		
//	}
//
//	public void init(FilterConfig filterConfig) {}
//
//	public void destroy() {}
//
//}