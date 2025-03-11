// Страница регистрации

export class RegisterPage {

    constructor(page){ 
      this.page = page;

      this.usernameField= page.getByPlaceholder('Your Name');
      this.emailField = page.getByPlaceholder('Email');
      this.passwordField = page.getByPlaceholder('Password');
      this.sighupButton = page.getByRole('button', { name: 'Sign up' });
     

    }

     async registerNewUser(username, email, password){
        await this.usernameField.click();
        await this.usernameField.fill(username);
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.sighupButton.click();
     } 
    
  };

