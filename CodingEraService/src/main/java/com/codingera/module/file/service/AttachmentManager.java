package com.codingera.module.file.service;

import java.io.File;
import java.io.InputStream;

import com.codingera.module.file.model.Attachment;

/**
 * 
 * 磁盘文件操作接口
 * 
 * @author JasonWoo
 *
 */
public interface AttachmentManager {

	public Attachment addAttachment(String name, File file);

	public Attachment addAttachment(String name, InputStream in);

	public Attachment addAttachment(String name, byte[] data);

	public Attachment addAttachment(String name, String content);

	public Attachment addAttachmentByPath(String path, File file);

	public Attachment addAttachmentByPath(String path, InputStream in);

	public Attachment addAttachmentByPath(String path, byte[] data);

	public Attachment addAttachmentByPath(String path, String content);

	public Attachment getAttachment(String path);

	public InputStream getAttachmentAsStream(String path);

	public byte[] getAttachmentAsBytes(String path);

	public File getAttachmentAsFile(String path);

	public void removeAttachment(String path);

	public void removeAttachment(Attachment attachment);
}
