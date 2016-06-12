package com.codingera.module.api.article.service.impl;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codingera.module.api.article.criteria.ArticleQueryCriteria;
import com.codingera.module.api.article.model.Article;
import com.codingera.module.api.article.model.Article.Status;
import com.codingera.module.api.article.repository.ArticleRepository;
import com.codingera.module.api.article.service.ArticleService;

@Service("ArticleService")
public class ArticleServiceImpl implements ArticleService {

	
	@Autowired ArticleRepository articleRepository;
	
	@Override
	public Article save(Article article) {
		
		if(article.getStatus() == null){
			//如果为空,默认草稿
			article.setStatus(Article.Status.SKETCH);
		}
		return articleRepository.save(article);
	}

	@Override
	public Page<Article> findArticleByCriteria(Pageable pr, ArticleQueryCriteria criteria) {
		return articleRepository.findArticleByCriteria(pr, criteria);
	}

	@Override
	public void deleteById(Long id) {
		Article article = articleRepository.findOne(id);
		article.setStatus(Status.DELETED);
		articleRepository.save(article);
	}

	@Override
	public Article getById(Long id) {
		Article article = articleRepository.findOne(id);
		return article;
	}

	@Override
	public Article getByTarget(String key) {
		return articleRepository.getByTarget(key);
	}




}
