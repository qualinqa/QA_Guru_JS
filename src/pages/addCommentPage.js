// Пользователь может оставить комментарий к статье

export class AddCommentPage {

    constructor(page) { 

      this.page = page;

      this.addCommentField = page.getByRole('textbox', { name: 'Write a comment' });
      this.addCommentButton  = page.getByRole('button', { name: 'Post Comment' });
    }

    async addNewComment (newComment){

      this.addCommentField.click();
      this.addCommentField.fill(newComment);
      this.addCommentButton.click();
      
    }

};