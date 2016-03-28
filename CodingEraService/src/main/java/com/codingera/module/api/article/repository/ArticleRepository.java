package com.codingera.module.api.article.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.api.article.model.Article;
import com.codingera.module.api.article.repository.custom.ArticleRepositoryCustom;

public interface ArticleRepository extends PagingAndSortingRepository<Article, Long>,ArticleRepositoryCustom {

}
