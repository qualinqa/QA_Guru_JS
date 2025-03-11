// Пользователь может изменить пароль

export class ChangePasswordPage {

    constructor(page) { 

      this.page = page;

      this.passwordField = page.getByRole('textbox', { name: 'Password' });
      this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async changePassword (newPassword) {
      
      this.passwordField.click();
      this.passwordField.fill(newPassword);
      this.updateSettingsButton.click();
    }

};
