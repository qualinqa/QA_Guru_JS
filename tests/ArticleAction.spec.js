import { test, expect } from '@playwright/test';
import { ArticleBuilder } from '../src/helpers/builder/index';
import { MainPage, LoginPage, YourFeedPage, AddArticlePage, ArticlePage }
 from '../src/pages/index';



const URL_UI = 'https://realworld.qa.guru/';

const articleData = new ArticleBuilder().addNewArticle().addDescribeArticle().addArticleTitle().addTag().addComment().generate();

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
      const addArticlePage = new AddArticlePage(page, articleData.newArticleTitle);
      const articlePage = new ArticlePage(page);
      
      
      await yourFeedPage.gotoNewArticle();
      
      await addArticlePage.publishNewArticle(
         articleData.ArticleTitle,
         articleData.DescribeArticle,
         articleData.NewArticle, 
         articleData.Tag);
     
      
      await expect(articlePage.articleTitleField).toContainText(articleData.ArticleTitle);

      });

      
      test('Пользователь может добавить комментарий к статье', async ({ page }) => {
      
         
      const yourFeedPage = new YourFeedPage(page);
      const addArticlePage = new AddArticlePage(page, articleData.newArticleTitle);
      const articlePage = new ArticlePage(page);
      
     
      await yourFeedPage.gotoNewArticle();
    
      await addArticlePage.publishNewArticle(
         articleData.ArticleTitle,
         articleData.DescribeArticle,
         articleData.NewArticle,
         articleData.Tag);
            
       
      await expect(articlePage.articleTitleField).toContainText(articleData.ArticleTitle);
      
      await articlePage.postNewComment(articleData.Comment);
      await expect(articlePage.commentField).toContainText(articleData.Comment);
            
      });
      
});