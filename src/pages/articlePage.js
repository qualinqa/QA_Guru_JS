// Страница с опубликованной статьей

export class ArticlePage {

  constructor(page){ 

    this.page = page;

    this.articleTitleField  = page.getByRole('heading', { name: 'Article Title' });
    this.editArticleLink    = page.getByRole('link', { name: 'Edit Article' }).nth(1);
    this.deleteArticleLink  = page.getByRole('button', { name: 'Delete Article' }).first();
    this.addCommentField    = page.getByRole('textbox', { name: 'Write a comment' });
    this.postCommentButton  = page.getByRole('button', { name: 'Post Comment' });
    this.commentField = page.getByRole('main');

  }

  async gotoEditArticle(){
    this.editArticleLink.click();

  }
  
  async postNewComment(textComment) {

    this.addCommentField.click();
    this.addCommentField.fill(textComment);
    this.postCommentButton.click();
  }

};