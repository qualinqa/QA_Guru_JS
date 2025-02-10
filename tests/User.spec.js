import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builder/index';
import { MainPage, LoginPage, RegisterPage, YourFeedPage, SettingsPage } from '../src/pages/index';



const URL_UI = 'https://realworld.qa.guru/';

// Пользователь

test('Регистрация нового пользователя', async ({ page }) => {

   const userBuilder = new UserBuilder().addEmail().addUsername().addPassword(9).generate();

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

   // данные нового пользователя
   const userBuilder = new UserBuilder().addEmail().addUsername().addPassword(5).generate();

   /*
   const user = {
      username: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({length: 5})
   }
   */
   
// новый пароль

   const userNewPass = new UserBuilder().addPassword(7).generate();
   
   const mainPage = new MainPage(page);
   const registerPage = new RegisterPage(page);
   const yourFeedPage = new YourFeedPage(page);
   const settingsPage = new SettingsPage(page);
   const loginPage    = new LoginPage(page);
   
   await mainPage.open(URL_UI);
   await mainPage.gotoRegister();
   
   await registerPage.registerNewUser(
      userBuilder.name, 
      userBuilder.email, 
      userBuilder.password);
   
   await expect(yourFeedPage.profileNameField).toBeVisible();
   await expect(yourFeedPage.profileNameField).toContainText(userBuilder.name);
   
   
   await yourFeedPage.gotoSettings(userBuilder.name);
   
   
   await settingsPage.changeSettings(userNewPass.password);
   expect (settingsPage.updateSettingsButton).not.toBeVisible();
   
   await yourFeedPage.gotoLogout(userBuilder.name);
   
   
   await mainPage.open(URL_UI);
   await mainPage.gotoLogin();
   
   await loginPage.loginUser(userBuilder.email, userNewPass.password);
   await expect(yourFeedPage.profileNameField).toBeVisible();
   await expect(yourFeedPage.profileNameField).toContainText(userBuilder.name);
   
   });

