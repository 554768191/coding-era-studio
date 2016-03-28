package com.codingera.module.api.article.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.article.criteria.ArticleQueryCriteria;
import com.codingera.module.api.article.model.Article;
import com.codingera.module.api.article.repository.custom.ArticleRepositoryCustom;
import com.codingera.module.jpa.CriterionUtils;
import com.codingera.module.jpa.JpaCriteria;
import com.codingera.module.jpa.JpaQueryUtils;
import com.codingera.module.jpa.OrCriterion;

public class ArticleRepositoryImpl implements ArticleRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public Page<Article> findArticleByCriteria(Pageable pg, ArticleQueryCriteria criteria) {
		JpaCriteria s = new JpaCriteria("Article a");
		s.add(new OrCriterion(CriterionUtils.contains("c.title", criteria.getKeyWord(), true)));
		s.add(CriterionUtils.equals("a.status", criteria.getStatus(), false));
		s.setSortBy("a.createTime desc");
		return JpaQueryUtils.query(em, s, pg);
	}

}
