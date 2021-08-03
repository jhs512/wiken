package com.jhs.wiken.controller

import com.jhs.wiken.service.ArticleService
import com.jhs.wiken.vo.Article
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class UsrArticleController(private val articleService: ArticleService) {
    @RequestMapping("/usr/article/getArticles")
    @ResponseBody
    fun showMain(): List<Article> {
        return articleService.getArticles()
    }
}