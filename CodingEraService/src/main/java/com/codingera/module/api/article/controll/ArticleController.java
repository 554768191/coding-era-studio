package com.codingera.module.api.article.controll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.api.article.criteria.ArticleQueryCriteria;
import com.codingera.module.api.article.model.Article;
import com.codingera.module.api.article.service.ArticleService;
import com.codingera.module.base.controll.ActionResult;

/**
 * Article
 */

@RestController
@RequestMapping("/api/article")
public class ArticleController {


	
	@Autowired ArticleService ArticleService;

	@RequestMapping(value="/{articleId}",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult getArticle(@PathVariable Long articleId) {
		Article article = ArticleService.getById(articleId);
		return new ActionResult(ActionResult.RESULT_SUCCESS, article);
	}
	

	@RequestMapping(method = RequestMethod.POST)
	public ActionResult saveArticle(@RequestBody Article article) {
		ArticleService.save(article);
		return new ActionResult(ActionResult.RESULT_SUCCESS, article);
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseBody
	public ActionResult deleteArticle(@RequestParam Long id) {
		ArticleService.deleteById(id);
		return new ActionResult(ActionResult.RESULT_SUCCESS, null);
	}
	
	/**
	 * @param pr
	 * @param criteria
	 * @return
	 */
	@RequestMapping(value="/list",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult findArticles(Pageable pr, @ModelAttribute ArticleQueryCriteria criteria) {
		Page<Article> pages = ArticleService.findArticleByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}
	
	


}
