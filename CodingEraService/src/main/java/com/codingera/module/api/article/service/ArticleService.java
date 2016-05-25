package com.codingera.module.api.article.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.article.criteria.ArticleQueryCriteria;
import com.codingera.module.api.article.model.Article;

public interface ArticleService {
	
	Article getById(Long id);
	
	Article getByKey(String key);

	void deleteById(Long id);
	
	Article save(Article article) ;
	
	Page<Article> findArticleByCriteria(Pageable pr, ArticleQueryCriteria criteria);
}
