//package com.codingera.module.user.controll;
//
//import java.security.Principal;
//import java.util.HashMap;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.ModelAndView;
//
//import com.google.common.base.Optional;
//
///**
// * 
// * @author Jason
// *
// */
//@RestController
//public class LoginController {
//
////	@Autowired
////	private Authentication authentication;
//	
//	@RequestMapping(value="/")
//	public ModelAndView index(final HttpServletRequest request, Principal principal) {
//		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
////		if(authentication != null){
////			final Object principal = authentication.getPrincipal();
////			
////		}
//		Map<String, Object> model = new HashMap<String, Object>();
////		model.put("logout", "true");
////		model.put("error", "false");
////		return new ModelAndView("login", model);
//		return new ModelAndView("login", model);
//	}
//	
////	@RequestMapping(value="/login")
////	public ModelAndView login() {
////		Map<String, Object> model = new HashMap<String, Object>();
////		model.put("logout", "true");
////		model.put("error", "false");
////		return new ModelAndView("login", model);
////	}
//
//	@RequestMapping(value = "/login", method = RequestMethod.GET)
//    public ModelAndView getLoginPage(@RequestParam Optional<String> error) {
//        return new ModelAndView("login", "error", error);
//    }
//}
