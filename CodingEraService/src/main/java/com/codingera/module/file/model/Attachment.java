package com.codingera.module.file.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;

@Entity
@Table(name = "ce_attachment")
public class Attachment extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4502954018818631424L;

	// 文件名
	@Column(name = "NAME", length = 100, nullable = false)
	private String name;

	// 对应 主表的实体类简写名称,如Claim类,则是 com.sevendaysinn.claim.model.Claim
	@Column(name = "MODEL_NAME", length = 100, nullable = false)
	public String modelName;

	// 对应关联主表的ID
	@Column(name = "MODEL_ID", nullable = false)
	public Long modelId;

	// 远程文件夹相对路径
	@Column(name = "PATH", length = 200, nullable = true)
	private String path;
	
	@Column(name = "THUMBNAIL_IMAGE_PATH", nullable = false)
	private String thumbnailImagePath;
	
	@Column(name = "ORGINAL_PATH", nullable = false)
	private String orginalPath;
	
	// 文件大小,单位 B
	@Column(name = "SIZE", nullable = true)
	private long size;

	/**
	 * 附件类型（本地存储、云端存储）
	 */
	@Column(name = "TYPE")
	private String type;

	/**
	 * 上传到云,成功or失败
	 */
	@Column(name = "STATUS")
	private String status;

	public Attachment() {
		super();
	}

	public Attachment(String name, String modelName, Long modelId) {
		super();
		this.name = name;
		this.modelName = modelName;
		this.modelId = modelId;
	}

	public Attachment(String name, String path, String modelName, Long modelId, String type) {
		super();
		this.name = name;
		this.modelName = modelName;
		this.modelId = modelId;
		this.path = path;
		this.type = type;
	}

	public Attachment(String name, String modelName, Long modelId, long size) {
		super();
		this.name = name;
		this.modelName = modelName;
		this.modelId = modelId;
		this.size = size;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public Long getModelId() {
		return modelId;
	}

	public void setModelId(Long modelId) {
		this.modelId = modelId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getThumbnailImagePath() {
		return thumbnailImagePath;
	}

	public void setThumbnailImagePath(String thumbnailImagePath) {
		this.thumbnailImagePath = thumbnailImagePath;
	}

	public String getOrginalPath() {
		return orginalPath;
	}

	public void setOrginalPath(String orginalPath) {
		this.orginalPath = orginalPath;
	}
	

}
