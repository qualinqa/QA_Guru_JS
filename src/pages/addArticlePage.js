// Пользователь может добавить статью

export class AddArticlePage {

  constructor(page, newArticleTitle){
    
    this.page = page;
    this.checkArticleTitleField  = this.page.getByRole('heading');
    this.articleTitleField = page.getByRole('textbox', { name: 'Article Title' });
    this.describeArticleField = page.getByPlaceholder("What's this article about?");
    this.articleField = page.getByPlaceholder('Write your article');
    this.enterTagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton =  page.getByRole('button', { name: 'Publish Article' });
   
  }

   async publishNewArticle(articleTitle, describeArticle, article, enterTags){
      await this.articleTitleField.click();
      await this.articleTitleField.fill(articleTitle);
      await this.describeArticleField.click();
      await this.describeArticleField.fill(describeArticle);
      await this.articleField.click();
      await this.articleField.fill(article);
      await this.enterTagsField.click();
      await this.enterTagsField.fill(enterTags);
      await this.publishArticleButton.click();
   } 
  
  };
