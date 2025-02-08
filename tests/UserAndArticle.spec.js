import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/mainPage';
import { LoginPage } from '../src/pages/loginPage';
import { YourFeedPage } from '../src/pages/yourfeedPage';
import { AddArticlePage} from '../src/pages/addArticlePage';
import { ArticlePage } from '../src/pages/articlePage';
import { RegisterPage } from '../src/pages/registerPage';
import { SettingsPage } from '../src/pages/settingsPage';
import { UserBuilder } from '../src/helpers/buildergi/user.builder';


const URL_UI = 'https://realworld.qa.guru/';

const articleData = {
   newArticleTitle: faker.lorem.sentence(3),
   newDescribeArticle: "описание",
   newArticle: "Вот такая интересная статья получилась!",
   newTag: "просто тэг"
};


// Пользователь

test('Регистрация нового пользователя', async ({ page }) => {

   const userBuilder = new UserBuilder().addEmail().addUsername().addPassword(9).generator();

   /*
const user = {
   username: faker.person.firstName(),
   email: faker.internet.email(),
   password: faker.internet.password({length: 7})
}
*/
 
const mainPage = new MainPage(page);
const registerPage = new RegisterPage(page);
const yourFeedPage = new YourFeedPage(page);

await mainPage.open(URL_UI);
await mainPage.gotoRegister();

await registerPage.registerNewUser(  
   userBuilder.name, 
   userBuilder.email, 
   userBuilder.password);

await expect(yourFeedPage.profileNameField).toBeVisible();
await expect(yourFeedPage.profileNameField).toContainText(userBuilder.name);

});

test('Вход для старого пользователя', async ({ page }) => {


const mainPage     = new MainPage(page);
const loginPage    = new LoginPage(page);
const yourFeedPage = new YourFeedPage(page);

const oldUser = {
    username: 'Irishka',
    email: 'Irishka@ya.ru',
    password: 'Irishka'
  }

await mainPage.open(URL_UI);
await mainPage.gotoLogin();

await loginPage.loginUser(oldUser.email, oldUser.password);
await expect(yourFeedPage.profileNameField).toBeVisible();
await expect(yourFeedPage.profileNameField).toContainText(oldUser.username);


});

test('Пользователь может изменить пароль', async ({ page }) => {

const user = {
   username: faker.person.firstName(),
   email: faker.internet.email(),
   password: faker.internet.password({length: 5})
}


const userNewData = {
   username: user.username,
   email: user.email,
   password: faker.internet.password({length: 8})

}

const mainPage = new MainPage(page);
const registerPage = new RegisterPage(page);
const yourFeedPage = new YourFeedPage(page);
const settingsPage = new SettingsPage(page);
const loginPage    = new LoginPage(page);

await mainPage.open(URL_UI);
await mainPage.gotoRegister();

await registerPage.registerNewUser(
   user.username, 
   user.email, 
   user.password);

await expect(yourFeedPage.profileNameField).toBeVisible();
await expect(yourFeedPage.profileNameField).toContainText(user.username);


await yourFeedPage.gotoSettings(user.username);


await settingsPage.changeSettings(userNewData.password);
expect (settingsPage.updateSettingsButton).not.toBeVisible();

await yourFeedPage.gotoLogout(userNewData.username);


await mainPage.open(URL_UI);
await mainPage.gotoLogin();

await loginPage.loginUser(userNewData.email, userNewData.password);
await expect(yourFeedPage.profileNameField).toBeVisible();
await expect(yourFeedPage.profileNameField).toContainText(userNewData.username);

});

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