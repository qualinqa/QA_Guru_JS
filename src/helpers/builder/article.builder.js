import { faker } from '@faker-js/faker';

export class ArticleBuilder {

    constructor() {
        this.articleData = {};
    }

    addArticleTitle() {
        this.articleData.ArticleTitle = faker.lorem.sentence(3);
        return this;
    }
    addDescribeArticle() {
           this.articleData.DescribeArticle = "Невероятно привлекательное описание";
        return this;
    }
    addNewArticle() {
        this.articleData.NewArticle = "Вот такая интересная статья получилась!";
        return this;
    }
    addComment() {
        this.articleData.Comment = "Мой комментарий - лучший! Ай да я!";
        return this;
    }
    addTag() {
        this.articleData.Tag = "А это просто тэг";
        return this;
    }
    generate() {
        return this.articleData;
    }
}