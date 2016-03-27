package com.codingera.module.file.controll;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.codingera.module.api.demo.criteria.DemoQueryCriteria;
import com.codingera.module.api.demo.model.Demo;
import com.codingera.module.api.demo.service.DemoService;
import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.file.model.Attachment;
import com.codingera.module.file.model.AttachmentView;
import com.codingera.module.file.service.AttachmentManager;

/**
 * Demo
 */
@Controller
@RequestMapping("/api/fileUpload")
public class FileUploadController {

	@Autowired
	private DemoService demoService;
	@Autowired
	private AttachmentManager attachmentManager;

	@RequestMapping
	@ResponseBody
	public ActionResult getFiles(Pageable pr, @ModelAttribute DemoQueryCriteria criteria) {
		Page<Demo> pages = demoService.findDemoByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}

	/**
	 * 上传单个文件
	 *
	 * @param file
	 * @return
	 */
	@RequestMapping(value = "/uploadImage", method = RequestMethod.POST, consumes = "multipart/form-data")
	@ResponseBody
	public ActionResult uploadImage(@RequestParam("file") MultipartFile file) {
		Attachment uploadedFile = null;
		try {
			uploadedFile = attachmentManager.addAttachment(file.getOriginalFilename(), file.getBytes());
			return new ActionResult(ActionResult.RESULT_SUCCESS, uploadedFile);
		} catch (IOException e) {
			return new ActionResult(ActionResult.RESULT_ERROR, e.getMessage());
		}
	}
	
	/**
	 * 上传多个文件
	 *
	 * @param file
	 * @return
	 */
	// TODO Jason 这里还没有实现多文件上传，尝试了多种办法。。。
	@RequestMapping(value = "/uploadImages", method = RequestMethod.POST, consumes = "multipart/form-data")
//	@ResponseMediaType(value = "application/json", foreMediaType = "text/html")
	@ResponseBody
//	public ActionResult uploadImage(@RequestParam("file") MultipartFile[] files) {
//	public ActionResult uploadImage(@RequestBody AttachmentView files) {
	public ActionResult uploadImage(@ModelAttribute AttachmentView files) {
//		try {
//			Attachment uploadedFile = attachmentManager.addAttachment(
//					file.getOriginalFilename(), file.getBytes());
			System.out.println(files.getA() + " --- " + files.getB());
			return new ActionResult(ActionResult.RESULT_SUCCESS, files);
//		} catch (IOException e) {
//			return new ActionResult(ActionResult.RESULT_ERROR, e.getMessage());
//		}
	}

}
