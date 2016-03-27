package com.codingera.module.file.service.impl;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.io.FileUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.codingera.module.file.model.Attachment;
import com.codingera.module.file.service.AttachmentManager;
import com.codingera.module.file.service.AttachmentPathResolver;
import com.codingera.module.file.service.AttachmentService;

@Service("AttachmentManager")
public class FileSystemAttachmentManager implements AttachmentManager {

	private static Log LOG = LogFactory.getLog(FileSystemAttachmentManager.class);

	@Value("${staticResourceHostRoot:configuration}")
	private File rootDirectory;

	@Autowired
	private AttachmentPathResolver attachmentPathResolver;
	@Autowired
	private AttachmentService attachmentPersistenceService;

	@PersistenceContext
	private EntityManager em;

	interface FileSaver {
		File saveFile();
	}

	protected Attachment addAttachment(String name, String path, FileSaver fileSaver) {
		String extension = null;
		int lastDotIndex = name.lastIndexOf('.');
		if (lastDotIndex > 0) {
			extension = name.substring(lastDotIndex + 1);
		}
		File file = fileSaver.saveFile();
		Attachment attachment = new Attachment();
		attachment.setName(name);
		attachment.setSize(file.length());
		attachment.setType(extension);
		// 操作人
//		if (SecurityContextHolder.getContext() != null) {
//			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//			if (auth != null) {
//				 attachment.setOwner(SecurityContextHolder.getContext().getAuthentication().getName());
//			}
//		}
		// 数据库存映射路径 temp->attachments
		attachment.setPath(path.replaceFirst("attachments", "temp"));
		if (attachmentPersistenceService != null) {
			attachment = attachmentPersistenceService.save(attachment);
		}
		return attachment;
	}

	private static void foreCreateNewFile(File file) throws IOException {
		if (!file.exists()) {
			FileUtils.forceMkdir(file.getParentFile());
			file.createNewFile();
		}
	}

	@Override
	public Attachment addAttachment(String name, final File file) {
		return addAttachmentInternal(name, attachmentPathResolver.resolvePath(name), file);
	}

	private Attachment addAttachmentInternal(String name, final String path, final File file) {
		return addAttachment(name, path, new FileSaver() {
			@Override
			public File saveFile() {
				try {
					File dest = new File(rootDirectory, path);
					foreCreateNewFile(dest);
					FileUtils.copyFile(file, dest);
					return dest;
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			}
		});
	}

	@Override
	public Attachment addAttachment(String name, final InputStream in) {
		return addAttachmentInternal(name, attachmentPathResolver.resolvePath(name), in);
	}

	private Attachment addAttachmentInternal(String name, final String path, final InputStream in) {
		return addAttachment(name, path, new FileSaver() {
			@Override
			public File saveFile() {
				File dest = new File(rootDirectory, path);
				try {
					FileUtils.forceMkdir(new File(dest.getParent()));
					foreCreateNewFile(dest);
					byte[] buf = new byte[4096];
					BufferedOutputStream bout = new BufferedOutputStream(new FileOutputStream(dest));
					for (int i = in.read(buf); i > 0; i = in.read(buf)) {
						bout.write(buf, 0, i);
					}
					bout.flush();
					bout.close();
					return dest;
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			}
		});
	}

	@Override
	public Attachment addAttachment(String name, final byte[] data) {
		return addAttachmentInternal(name, attachmentPathResolver.resolvePath(name), data);
	}

	public Attachment addAttachmentInternal(String name, final String path, final byte[] data) {
		return addAttachment(name, path, new FileSaver() {
			@Override
			public File saveFile() {
				File dest = new File(rootDirectory, path);
				try {
					foreCreateNewFile(dest);
					FileUtils.writeByteArrayToFile(dest, data);
					return dest;
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			}
		});

	}

	@Override
	public Attachment addAttachment(String name, final String content) {
		return addAttachmentInternal(name, attachmentPathResolver.resolvePath(name), content);
	}

	private Attachment addAttachmentInternal(String name, final String path, final String content) {
		return addAttachment(name, path, new FileSaver() {
			@Override
			public File saveFile() {
				File dest = new File(rootDirectory, path);
				try {
					foreCreateNewFile(dest);
					FileUtils.writeStringToFile(dest, content);
					return dest;
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			}
		});
	}

	private String getFileName(String path) {
		int lastIndex = path.lastIndexOf('/');
		if (lastIndex >= 0) {
			return path.substring(lastIndex + 1);
		}
		return path;
	}

	public String toAttachmentPath(String path) {
		if (path.charAt(0) == '/') {
			return attachmentPathResolver.getRootPath() + path;
		} else {
			return attachmentPathResolver.getRootPath() + "/" + path;
		}
	}

	@Override
	public Attachment addAttachmentByPath(String path, File file) {
		return this.addAttachmentInternal(getFileName(path), toAttachmentPath(path), file);
	}

	@Override
	public Attachment addAttachmentByPath(String path, InputStream in) {
		return this.addAttachmentInternal(getFileName(path), toAttachmentPath(path), in);
	}

	@Override
	public Attachment addAttachmentByPath(String path, byte[] data) {
		return this.addAttachmentInternal(getFileName(path), toAttachmentPath(path), data);
	}

	@Override
	public Attachment addAttachmentByPath(String path, String content) {
		return this.addAttachmentInternal(getFileName(path), toAttachmentPath(path), content);
	}

	@Override
	public void removeAttachment(Attachment attachment) {
		removeAttachment(attachment.getPath());
		removeAttachment(attachment.getOrginalPath());
		removeAttachment(attachment.getThumbnailImagePath());
		if (attachment.getId() != null && attachmentPersistenceService != null) {
			attachmentPersistenceService.deleteById(attachment.getId());
		}
	}

	@Override
	public void removeAttachment(String path) {
		if (!StringUtils.hasText(path) || !attachmentPathResolver.isAttachmentPath(path)) {
			return;
		}
		if (path.indexOf("..") >= 0) {
			throw new IllegalArgumentException("Cannot Delete attachment. Illegal Path: " + path);
		}
		try {

			File deleteFile = new File(rootDirectory, path);
			if (!deleteFile.exists() || deleteFile.isDirectory()) {
				return;
			}
			FileUtils.forceDelete(new File(rootDirectory, path));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public Attachment getAttachment(String path) {
		if (attachmentPersistenceService == null) {
			throw new java.lang.UnsupportedOperationException();
		}
		return attachmentPersistenceService.getByPath(path);
	}

	@Override
	public InputStream getAttachmentAsStream(String path) {
		try {
			return new FileInputStream(getAttachmentAsFile(path));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public byte[] getAttachmentAsBytes(String path) {
		try {
			return FileUtils.readFileToByteArray(getAttachmentAsFile(path));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	@Override
	public File getAttachmentAsFile(String path) {
		return new File(rootDirectory, path);
	}

}
