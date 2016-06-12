package com.codingera.module.api.article.controll.open;

import java.io.IOException;

import org.markdown4j.Markdown4jProcessor;
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
@RequestMapping("/api/open/article")
public class ArticleOpenController {


	
	@Autowired ArticleService ArticleService;

	@RequestMapping(value="/{key}",method = RequestMethod.GET)
	@ResponseBody
	public ActionResult getArticle(@PathVariable String key) {
		Article article = ArticleService.getByTarget(key);
		try {
			String htmlContent = new Markdown4jProcessor().process(article.getContent());
			article.setHtmlContent(htmlContent);
		} catch (IOException e) {
			//e.printStackTrace();
			//报错的话,不转义了,直接输出
			article.setHtmlContent(article.getContent());
		}
		return new ActionResult(ActionResult.RESULT_SUCCESS, article);
	}
	


	
	


}
