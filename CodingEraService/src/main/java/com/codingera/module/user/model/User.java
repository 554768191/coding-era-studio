package com.codingera.module.user.model;



import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.codingera.module.base.model.IdEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ce_user")
public class User extends IdEntity implements UserDetails,Comparable<User> {

	private static final long serialVersionUID = -192550188817193798L;

	private String username;
	
	private String password;
	
	private boolean accountNonExpired;
	
	private boolean accountNonLocked;
	
	private boolean credentialsNonExpired;
	
	private boolean enabled;
	
	private String avatar;
	
	private Integer sex;
	
	private String intro;
	
	private Date lastLoginTime;
	
	
	private List<UserRole> roles=new ArrayList<UserRole>();
	
	
	@Transient
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (UserRole userRole : this.getRoles()) {
        	GrantedAuthority grantedAuthority=new SimpleGrantedAuthority(userRole.getRole().toString());
            authorities.add(grantedAuthority);
        }
		
		return authorities;
	}

	
	
	public void setPassword(String password) {
		this.password = password;
	}



	@Override
	@Column(name="password",length=32)
	public String getPassword() {
		return password;
	}
	

	public void setUsername(String username) {
		this.username = username;
	}



	@Override
	@Column(name="user_name",length=20,unique=true)
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return accountNonExpired;
	}
	
	public void setAccountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}



	@Override
	public boolean isAccountNonLocked() {
		return accountNonLocked;
	}
	
	

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	public void setCredentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return enabled;
	}

	

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	@JsonIgnore
	@OneToMany(mappedBy="user",cascade={CascadeType.PERSIST},fetch=FetchType.EAGER )
	public List<UserRole> getRoles() {
		return roles;
	}



	public void setRoles(List<UserRole> roles) {
		this.roles = roles;
	}



	public String getAvatar() {
		return avatar;
	}



	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}



	public Integer getSex() {
		return sex;
	}



	public void setSex(Integer sex) {
		this.sex = sex;
	}


	@Column(name="intro",length=140)
	public String getIntro() {
		return intro;
	}



	public void setIntro(String intro) {
		this.intro = intro;
	}


	@Transient
	public Date getLastLoginTime() {
		return lastLoginTime;
	}



	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}



	@Override
	public int compareTo(User arg0) {
		return arg0.getLastLoginTime().compareTo(this.getLastLoginTime());
	}


	
	


	
	



	
	
	

}
