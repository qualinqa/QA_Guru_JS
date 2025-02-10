import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { MainPage, LoginPage, YourFeedPage, AddArticlePage, ArticlePage }
 from '../src/pages/index';



const URL_UI = 'https://realworld.qa.guru/';

const articleData = {
   newArticleTitle: faker.lorem.sentence(3),
   newDescribeArticle: "описание",
   newArticle: "Вот такая интересная статья получилась!",
   newTag: "просто тэг"
};


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
         articleData.newArticleTitle,
         articleData.newDescribeArticle,
         articleData.newArticle, 
         articleData.newTag);

     
      
      await expect(addArticlePage.checkArticleTitleField).toContainText(articleData.newArticleTitle);

      });

      

      test('Пользователь может добавить комментарий к статье', async ({ page }) => {
      
      
   
      const yourFeedPage = new YourFeedPage(page);
      const addArticlePage = new AddArticlePage(page, articleData.newArticleTitle);
      const articlePage = new ArticlePage(page);
      
     
      await yourFeedPage.gotoNewArticle();
    
      await addArticlePage.publishNewArticle(
         articleData.newArticleTitle,
         articleData.newDescribeArticle,
         articleData.newArticle,
         articleData.newTag);
      
      
      await expect(addArticlePage.checkArticleTitleField).toContainText(articleData.newArticleTitle);
      
      const textComment = 'Мой комментарий - лучший! Ай да я!'
      await articlePage.postNewComment(textComment);
      await expect(articlePage.commentField).toContainText(textComment);
      
      
      });
      
      
});