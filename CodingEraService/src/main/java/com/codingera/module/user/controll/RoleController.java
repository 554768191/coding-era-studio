package com.codingera.module.user.controll;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.criteria.RoleQueryCriteria;
import com.codingera.module.user.model.Role;
import com.codingera.module.user.model.RolePermission;
import com.codingera.module.user.service.RoleService;
import com.codingera.module.user.view.RoleView;

/**
 * 
 * @author Jason
 *
 */
@RestController
@RequestMapping("/api/roles")
public class RoleController {

	@Autowired
	RoleService roleService;

	@RequestMapping(method = RequestMethod.GET)
	public ActionResult findRoles(Pageable pr, @ModelAttribute RoleQueryCriteria criteria) {
		Page<Role> pages = roleService.findRolesByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}
	
	@RequestMapping(path="/list", method = RequestMethod.GET)
	public ActionResult findRoleList() {
		List<Role> result = roleService.findRoles();
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
	}
	
	/**
	 * 编辑
	 * 
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ActionResult updateRole(@RequestBody Role role) {
		role = roleService.save(role);
		return new ActionResult(ActionResult.RESULT_SUCCESS, role);
	}
	
	@RequestMapping(path="/permissions", method = RequestMethod.GET)
	public ActionResult findRolePermissions(String role) {
		List<RolePermission> result = roleService.findRolePermissions(role);
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
	}
	@RequestMapping(path="/permissions", method = RequestMethod.POST)
	public ActionResult saveRolePermissions(@RequestBody RoleView roleView) {
		List<RolePermission> result = roleService.saveRolePermissions(roleView);
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
	}

}
