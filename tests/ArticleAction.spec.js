import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { ArticleBuilder } from '../src/helpers/builder/index';
import { MainPage, LoginPage, YourFeedPage, AddArticlePage, ArticlePage }
 from '../src/pages/index';



const URL_UI = 'https://realworld.qa.guru/';


const articleBuilder = new ArticleBuilder().addArticleTitle().addDescribeArticle().addArticle().addTag().generate();


// Действия пользователя со статьей

test.describe('Действия пользователя со статьей', () => {
   

   test.beforeEach('Пользователь логинится', async ({page}) => {
      
      
      const mainPage = new MainPage (page);
      const loginPage = new LoginPage(page);
      await mainPage.open(URL_UI);
      await mainPage.gotoLogin();

      const oldUser = {
         username: 'Irishka',
         email: 'Irishka@ya.ru',
         password: 'Irishka'
       }

      await loginPage.loginUser(oldUser.email, oldUser.password);
      
      
   });

   test('Пользователь может добавить новую статью', async ({ page }) => {
      
      
      const yourFeedPage = new YourFeedPage(page);
      const addArticlePage = new AddArticlePage(page, articleBuilder.articleTitle);
      const articlePage = new ArticlePage(page);
      
      
      await yourFeedPage.gotoNewArticle();
      
      await addArticlePage.publishNewArticle(
         articleBuilder.articleTitle,
         articleBuilder.describeArticle,
         articleBuilder.newArticle, 
         articleBuilder.newTag);

        await expect(articlePage.articleTitleField).toBeVisible();
        await expect(articlePage.articleTitleField).toContainText(articleBuilder.articleTitle);

      });

      

      test('Пользователь может добавить комментарий к статье', async ({ page }) => {
      
        const yourFeedPage = new YourFeedPage(page);
        const addArticlePage = new AddArticlePage(page, articleBuilder.articleTitle);
        const articlePage = new ArticlePage(page);
        
        
        await yourFeedPage.gotoNewArticle();
        
        await addArticlePage.publishNewArticle(
           articleBuilder.articleTitle,
           articleBuilder.describeArticle,
           articleBuilder.newArticle, 
           articleBuilder.newTag);
  
        await expect(articlePage.articleTitleField).toBeVisible();
        await expect(articlePage.articleTitleField).toContainText(articleBuilder.articleTitle);
      
      const textComment = 'Мой комментарий - лучший! Ай да я!'
      await articlePage.postNewComment(textComment);
      await expect(articlePage.commentField).toBeVisible();
      await expect(articlePage.commentField).toContainText(textComment);
      
      
      });
      
      
});