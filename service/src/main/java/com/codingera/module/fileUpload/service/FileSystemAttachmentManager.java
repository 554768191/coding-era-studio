package com.codingera.module.fileUpload.service;

import java.awt.Dimension;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.swing.SwingConstants;

import org.apache.commons.io.FileUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

import com.codingera.module.fileUpload.model.Attachment;
import com.codingera.module.fileUpload.model.ImageAttachment;
import com.codingera.module.fileUpload.service.TransformParameter.ScaleFitType;

public class FileSystemAttachmentManager implements AttachmentManager{
	private static Log LOG = LogFactory.getLog(FileSystemAttachmentManager.class);
	private File rootDirectory ;
	
	private AttachmentPathResolver attachmentPathResolver;
	private AttachmentService attachmentPersistenceService;
	

	interface FileSaver {
		File saveFile();
	}
	
	@Override
	public Attachment addImage(String directory, String name, File file,
			Dimension standardSize, Dimension thumbnailSize) {
		return this.addImage(name, file, standardSize, thumbnailSize);
	}

	@Override
	public Attachment addImage(String directory, String name, File file,
			ImageTransform orginTransform, ImageTransform standardTransorm,
			ImageTransform thumbnailTransform) {
		return this.addImage(name, file, orginTransform, standardTransorm, thumbnailTransform);
	}

	@Override
	public Attachment addImage(String name, final File file, Dimension standardSize,
			Dimension thumbnailSize) {
		return addImage(name,file,null,
				standardSize==null?null:ImageTransform.scale(standardSize.width,standardSize.height,true),
						thumbnailSize==null?null:ImageTransform.scale(thumbnailSize.width,thumbnailSize.height,true));
	}
	
	
	
	@Override
	public Attachment addImage(String directory, String name, byte[] data,
			Dimension standardSize, Dimension thumbnailSize) {
		return addImage(null,name,data,null,
				standardSize==null?null:ImageTransform.scale(standardSize.width,standardSize.height,true),
						thumbnailSize==null?null:ImageTransform.scale(thumbnailSize.width,thumbnailSize.height,true));
	}

	@Override
	public Attachment addImage(String directory, String name, byte[] data,
			ImageTransform orginTransform, ImageTransform standardTransorm,
			ImageTransform thumbnailTransform) {
		String noExtName = name;
		String extension = null;
		int lastDotIndex = name.lastIndexOf('.');
		if(lastDotIndex > 0) {
			noExtName = name.substring(0,lastDotIndex);
			extension = name.substring(lastDotIndex + 1);
		}
		String noExtPath = attachmentPathResolver.resolvePath(noExtName);
		File dest = null;
		try{
			if(orginTransform == null) {
				dest = new File(rootDirectory,noExtPath+"."+extension);
				foreCreateNewFile(dest);
				FileUtils.writeByteArrayToFile(dest, data);
			}else {
				extension = "png";
				dest = new File(rootDirectory,noExtPath+".png");
				foreCreateNewFile(dest);
				transformImage(data,dest,orginTransform);
			}
		}catch(Exception e) {
			LOG.error(e);
			return null;
		}
		
		ImageAttachment attachment = new ImageAttachment();
		attachment.setName(noExtName+"."+extension);
		attachment.setOriginalSize(dest.length());
		attachment.setType(extension);
		attachment.setOrginalPath(noExtPath+"."+extension);
		try{
			Dimension dimension = getImageSize(dest);
			attachment.setOriginalWidth(dimension.width);
			attachment.setOriginalHeight(dimension.height);
		}catch(IOException e) {
			LOG.error(e);
			return null;
		}
		
		if(SecurityContextHolder.getContext() != null) {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if(auth != null) {
				//attachment.setOwner(SecurityContextHolder.getContext().getAuthentication().getName());
			}
		}
		if(standardTransorm != null) {
			File standardDest = new File(rootDirectory,noExtPath+".standard.png");
			try{
				if(transformImage(dest, standardDest, standardTransorm)) {
					attachment.setPath(noExtPath+".standard.png");
					Dimension dimension = getImageSize(dest);
					attachment.setWidth(dimension.width);
					attachment.setHeight(dimension.height);
					attachment.setSize(dest.length());
				}else {
					standardDest.delete();
				}
			}catch(Exception e) {
				standardDest.delete();
				LOG.error(e);
			}
		}
		if(thumbnailTransform != null) {
			File thumbnailDest = new File(rootDirectory,noExtPath+".thumbnail.png");
			try{
				if(transformImage(dest, thumbnailDest, thumbnailTransform)) {
					attachment.setThumbnailImagePath(noExtPath+".thumbnail.png");
					Dimension dimension = getImageSize(dest);
					attachment.setThumbnailWidth(dimension.width);
					attachment.setThumbnailHeight(dimension.height);
					attachment.setThumbnailSize(dest.length());
				}else {
					thumbnailDest.delete();
				}
			}catch(Exception e) {
				thumbnailDest.delete();
				LOG.error(e);
			}
		}
		if(attachment.getPath() == null) {
			attachment.setPath(attachment.getOrginalPath());
			attachment.setWidth(attachment.getOriginalWidth());
			attachment.setHeight(attachment.getOriginalHeight());
			attachment.setSize(attachment.getOriginalSize());
		}
		if(attachmentPersistenceService != null) {
			Attachment savedAttachment = attachmentPersistenceService.save(attachment);
			attachment.setId(savedAttachment.getId());
		}
		return attachment;
	}
	
	

	@Override
	public Attachment addImage(String name,File file,ImageTransform orginTransform,ImageTransform standardTransorm,ImageTransform thumbnailTransform) {
		String noExtName = name;
		String extension = null;
		int lastDotIndex = name.lastIndexOf('.');
		if(lastDotIndex > 0) {
			noExtName = name.substring(0,lastDotIndex);
			extension = name.substring(lastDotIndex + 1);
		}
		String noExtPath = attachmentPathResolver.resolvePath(noExtName);
		String destFormatName = ImageProcessor.getImageFormatNameByExtension(extension);
		if(destFormatName == null) {
			destFormatName = ImageProcessor.IMAGE_TYPE_PNG;
		}
		File dest = null;
		try{
			if(orginTransform == null) {
				dest = new File(rootDirectory,noExtPath+"."+destFormatName);
				foreCreateNewFile(dest);
				FileUtils.copyFile(file,dest);
			}else {
				dest = new File(rootDirectory,noExtPath+"."+destFormatName);
				foreCreateNewFile(dest);
				transformImage(file,dest,orginTransform);
			}
		}catch(Exception e) {
			LOG.error(e);
			return null;
		}
		ImageAttachment attachment = new ImageAttachment();
		attachment.setName(noExtName+"."+destFormatName);
		attachment.setOriginalSize(dest.length());
		attachment.setType(destFormatName);
		attachment.setOrginalPath(noExtPath+"."+destFormatName);
		try{
			Dimension dimension = getImageSize(dest);
			attachment.setOriginalWidth(dimension.width);
			attachment.setOriginalHeight(dimension.height);
		}catch(IOException e) {
			LOG.error(e);
			return null;
		}
		if(SecurityContextHolder.getContext() != null) {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if(auth != null) {
				//attachment.setOwner(SecurityContextHolder.getContext().getAuthentication().getName());
			}
		}
		if(standardTransorm != null) {
			String standardFileName = noExtPath+".standard."+destFormatName;
			File standardDest = new File(rootDirectory,standardFileName);
			try{
				if(transformImage(dest, standardDest, standardTransorm)) {
					attachment.setPath(standardFileName);
					Dimension dimension = getImageSize(dest);
					attachment.setWidth(dimension.width);
					attachment.setHeight(dimension.height);
					attachment.setSize(dest.length());
				}else {
					standardDest.delete();
				}
			}catch(Exception e) {
				standardDest.delete();
				LOG.error(e);
			}
		}
		if(thumbnailTransform != null) {
			String thumbnailFileName = noExtPath+".thumbnail."+destFormatName;
			File thumbnailDest = new File(rootDirectory,thumbnailFileName);
			try{
				if(transformImage(dest, thumbnailDest, thumbnailTransform)) {
					attachment.setThumbnailImagePath(thumbnailFileName);
					Dimension dimension = getImageSize(dest);
					attachment.setThumbnailWidth(dimension.width);
					attachment.setThumbnailHeight(dimension.height);
					attachment.setThumbnailSize(dest.length());
				}else {
					thumbnailDest.delete();
				}
			}catch(Exception e) {
				thumbnailDest.delete();
				LOG.error(e);
			}
		}
		if(attachment.getPath() == null) {
			attachment.setPath(attachment.getOrginalPath());
			attachment.setWidth(attachment.getOriginalWidth());
			attachment.setHeight(attachment.getOriginalHeight());
			attachment.setSize(attachment.getOriginalSize());
		}
		if(attachmentPersistenceService != null) {
			Attachment savedAttachment = attachmentPersistenceService.save(attachment);
			attachment.setId(savedAttachment.getId());
		}
		return attachment;
	}

	protected Attachment addAttachment(String name,String path,FileSaver fileSaver) {
		String extension = null;
		int lastDotIndex = name.lastIndexOf('.');
		if(lastDotIndex > 0) {
			extension = name.substring(lastDotIndex + 1);
		}
		File file = fileSaver.saveFile();
		Attachment attachment = new Attachment();
		attachment.setName(name);
		attachment.setSize(file.length());
		attachment.setType(extension);
		if(SecurityContextHolder.getContext() != null) {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if(auth != null) {
				//attachment.setOwner(SecurityContextHolder.getContext().getAuthentication().getName());
			}
		}
		attachment.setPath(path);
		if(attachmentPersistenceService != null) {
			attachment = attachmentPersistenceService.save(attachment);
		}
		return attachment;
	}
	
	private static void foreCreateNewFile(File file) throws IOException{
		if(!file.exists()) {
			FileUtils.forceMkdir(file.getParentFile());
			file.createNewFile();
		}
	}

	
	@Override
	public Attachment addAttachment(String name,final File file) {
		return addAttachmentInternal(name,attachmentPathResolver.resolvePath(name),file);
	}
	
	private Attachment addAttachmentInternal(String name,final String path,final File file) {
		return addAttachment(name,path,new FileSaver(){
			@Override
			public File saveFile() {
				try{
					File dest = new File(rootDirectory,path);
					foreCreateNewFile(dest);
					FileUtils.copyFile(file,dest);
					return dest;
				}catch(IOException e) {
					throw new RuntimeException(e);
				}
			}
		});
	}


	@Override
	public Attachment addAttachment(String name,final InputStream in) {
		return addAttachmentInternal(name,attachmentPathResolver.resolvePath(name),in);
	}
	
	private Attachment addAttachmentInternal(String name,final String path,final InputStream in) {
		return addAttachment(name,path,new FileSaver(){
			@Override
			public File saveFile() {
				File dest = new File(rootDirectory,path);
				try{
					FileUtils.forceMkdir(new File(dest.getParent()));
					foreCreateNewFile(dest);
					byte[] buf = new byte[4096];
					BufferedOutputStream bout = new BufferedOutputStream(new FileOutputStream(dest));
					for(int i = in.read(buf);i > 0;i = in.read(buf)) {
						bout.write(buf, 0, i);
					}
					bout.flush();
					bout.close();
					return dest;
				}catch(IOException e) {
					throw new RuntimeException(e);
				}
			}
		});
	}
	
	@Override
	public Attachment addAttachment(String name,final byte[] data) {
		return addAttachmentInternal(name,attachmentPathResolver.resolvePath(name),data);
	}
	
	public Attachment addAttachmentInternal(String name,final String path,final byte[] data) {
		return addAttachment(name,path,new FileSaver(){
			@Override
			public File saveFile() {
				File dest = new File(rootDirectory,path);
				try{
					foreCreateNewFile(dest);
					FileUtils.writeByteArrayToFile(dest,data);
					return dest;
				}catch(IOException e) {
					throw new RuntimeException(e);
				}
			}
		});
		
	
	}

	@Override
	public Attachment addAttachment(String name,final String content) {
		return addAttachmentInternal(name,attachmentPathResolver.resolvePath(name),content);
	}
	
	private Attachment addAttachmentInternal(String name,final String path,final String content) {
		return addAttachment(name,path,new FileSaver(){
			@Override
			public File saveFile() {
				File dest = new File(rootDirectory,path);
				try{
					foreCreateNewFile(dest);
					FileUtils.writeStringToFile(dest,content);
					return dest;
				}catch(IOException e) {
					throw new RuntimeException(e);
				}
			}
		});
	}
	
	private String getFileName(String path) {
		int lastIndex = path.lastIndexOf('/');
		if(lastIndex >= 0) {
			return path.substring(lastIndex+1);
		}
		return path;
	}
	
	public String toAttachmentPath(String path) {
		if(path.charAt(0) == '/') {
			return attachmentPathResolver.getRootPath()+path;
		}else {
			return attachmentPathResolver.getRootPath()+"/"+path;
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
		if(attachment.getId() != null && attachmentPersistenceService != null) {
			attachmentPersistenceService.deleteById(attachment.getId());
		}
	}

	@Override
	public void removeAttachment(String path) {
		if(!StringUtils.hasText(path) || !attachmentPathResolver.isAttachmentPath(path)) {
			return;
		}
		if(path.indexOf("..") >= 0) {
			throw new IllegalArgumentException("Cannot Delete attachment. Illegal Path: "+path);
		}
		try{
			
			File deleteFile = new File(rootDirectory,path);
			if(!deleteFile.exists() || deleteFile.isDirectory()) {
				return;
			}
			FileUtils.forceDelete(new File(rootDirectory,path));
		}catch(IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public Attachment getAttachment(String path) {
		if(attachmentPersistenceService == null) {
			throw new java.lang.UnsupportedOperationException();
		}
		return attachmentPersistenceService.getByPath(path);
	}
	
	

	@Override
	public InputStream getAttachmentAsStream(String path) {
		try{
			return new FileInputStream(getAttachmentAsFile(path));
		}catch(IOException e) {
			throw new RuntimeException(e);
		}
	}


	@Override
	public byte[] getAttachmentAsBytes(String path) {
		try{
			return FileUtils.readFileToByteArray(getAttachmentAsFile(path));
		}catch(IOException e) {
			throw new RuntimeException(e);
		}
		
	}
	
	@Override
	public File getAttachmentAsFile(String path) {
		return new File(rootDirectory,path);
	}


	public AttachmentService getAttachmentPersistenceService() {
		return attachmentPersistenceService;
	}

	public void setAttachmentPersistenceService(
			AttachmentService attachmentPersistenceService) {
		this.attachmentPersistenceService = attachmentPersistenceService;
	}


	public File getRootDirectory() {
		return rootDirectory;
	}


	public void setRootDirectory(File rootDirectory) {
		this.rootDirectory = rootDirectory;
//		System.out.println("attachment manager : "+rootDirectory.getAbsolutePath());
	}


	public AttachmentPathResolver getAttachmentPathResolver() {
		return attachmentPathResolver;
	}


	public void setAttachmentPathResolver(
			AttachmentPathResolver attachmentPathResolver) {
		this.attachmentPathResolver = attachmentPathResolver;
	}
	
	private boolean transformImage(File src,File dest,ImageTransform imageTransform) throws IOException {
		if(imageTransform instanceof ImageTransform.ImageCut) {
			cutImage(src,dest,(ImageTransform.ImageCut)imageTransform);
			return true;
		}else {
			ImageTransform.ImageScale scale = (ImageTransform.ImageScale)imageTransform;
//			return ImageProcessor.compressImage(src, dest, scale.getWidth(), scale.getHeight(), scale.isKeepProportion());
			TransformParameter.Scale tp = TransformParameter.scale(scale.getWidth(), scale.getHeight(), 
					scale.isKeepProportion()?TransformParameter.ScaleFitType.NONE:ScaleFitType.CUT, 
							SwingConstants.CENTER,true,false);
			return ImageProcessor.transformImage(src, dest, tp);
		}
	}
	
	private boolean transformImage(byte[] src,File dest,ImageTransform imageTransform) throws IOException {
		if(imageTransform instanceof ImageTransform.ImageCut) {
			cutImage(new ByteArrayInputStream(src) ,dest,(ImageTransform.ImageCut)imageTransform);
			return true;
		}else {
			ImageTransform.ImageScale scale = (ImageTransform.ImageScale)imageTransform;
			return ImageProcessor.compressImage(new ByteArrayInputStream(src),FileUtils.openOutputStream(dest), scale.getWidth(), scale.getHeight(), scale.isKeepProportion());
		}
	}
	
	private  void cutImage(File src,File dest,ImageTransform.ImageCut imageTransform) throws IOException{
		cutImage(FileUtils.openInputStream(src),dest,imageTransform);
	}
	
	private  void cutImage(InputStream in,File dest,ImageTransform.ImageCut imageTransform) throws IOException{
		 FileOutputStream fileOutputStream = new FileOutputStream(dest);  
	        try {  
	            Image image = ImageIO.read(in);  
	            int imageWidth = image.getWidth(null);
	            int imageHeight = image.getHeight(null);
	            float x = imageTransform.getX();
	            float y = imageTransform.getY();
	            float w = imageTransform.getWidth();
	            float h = imageTransform.getHeight();
	            float destW = w;
	            float destH = h;
	            if(w > imageTransform.getMaxImageWidth()) {
	            	double factor = imageTransform.getMaxImageWidth() * 1d/w ;
	            	destW = imageTransform.getMaxImageWidth();
	            	destH = (int)(Math.round(h * factor));
	            }
	            BufferedImage bufferedImage = new BufferedImage((int)destW, (int)destH, BufferedImage.TYPE_INT_RGB);  
	            bufferedImage.getGraphics().drawImage(image,0, 0, (int)destW, (int)destH, (int)x, (int)y,(int)(w +x),(int)(h +y), null);  
	            ImageIO.write(bufferedImage, "png", fileOutputStream);
	  
	        } catch (Exception e) {  
	            e.printStackTrace();  
	        } finally {  
	            if (fileOutputStream != null) {  
	                try {  
	                    fileOutputStream.close();  
	                } catch (Exception e) {  
	                    e.printStackTrace();  
	                }  
	            }  
	        }  
	      
	}
	
	private  Dimension getImageSize(File src) throws IOException{
		Image image = ImageIO.read(src);  
		int imageWidth = image.getWidth(null);
		int imageHeight = image.getHeight(null);
		return new Dimension(imageWidth,imageHeight);     

	}

}
