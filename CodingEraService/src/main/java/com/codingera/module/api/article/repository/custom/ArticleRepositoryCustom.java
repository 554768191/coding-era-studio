package com.codingera.module.api.article.repository.custom;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.article.criteria.ArticleQueryCriteria;
import com.codingera.module.api.article.model.Article;

public interface ArticleRepositoryCustom {

	public Page<Article> findArticleByCriteria(Pageable pg, ArticleQueryCriteria criteria);
}
