package com.codingera.module.user.controll;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.model.Permission;
import com.codingera.module.user.service.PermissionService;

/**
 * 
 * @author Jason
 *
 */
@RestController
@RequestMapping("/api/permission")
public class PermissionController {

	@Autowired
	PermissionService permissionService;

	@RequestMapping(path="/list", method = RequestMethod.GET)
	public ActionResult findPermissionList() {
		List<Permission> result = permissionService.findPermissions();
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
	}
	
	/**
	 * 编辑
	 * 
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ActionResult updatePermission(@RequestBody Permission permission) {
		permission = permissionService.save(permission);
		return new ActionResult(ActionResult.RESULT_SUCCESS, permission);
	}

}
