package com.codingera.module.file.service;

/**
 * 文件路径解析
 * 
 * @author JasonWoo
 *
 */
public interface AttachmentPathResolver {
	
	/**
	 * 
	 * 解析文件名
	 * 
	 * @param name
	 * @return
	 */
	public String resolvePath(String name) ;
	
	/**
	 * 根路径，默认为/attachments
	 * 
	 * @return
	 */
	public String getRootPath();
	
	/**
	 * 路径是否/attachments开头
	 * 
	 * @param path
	 * @return
	 */
	public boolean isAttachmentPath(String path);
}
