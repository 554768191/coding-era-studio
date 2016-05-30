package com.codingera.module.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codingera.module.user.model.UserProfileTag;
import com.codingera.module.user.repository.UserProfileTagRepository;
import com.codingera.module.user.service.UserProfileTagService;

@Service("UserProfileTagService")
public class UserProfileTagServiceImpl implements UserProfileTagService {

	@Autowired
	UserProfileTagRepository userProfileTagRepository;
	
	@Override
	public List<UserProfileTag> getAllList() {
		// TODO Auto-generated method stub
		return (List<UserProfileTag>) userProfileTagRepository.findAll();
	}

	

}
