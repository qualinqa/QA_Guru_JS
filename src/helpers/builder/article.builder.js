import { faker } from '@faker-js/faker';

export class ArticleBuilder {

addArticleTitle() {
    this.newArticleTitle = faker.lorem.sentence(3);
    return this;
}
addDescribeArticle() {
       this.newDescribeArticle = "Привлекающее описание";
    return this;
}
addArticle() {
    this.newArticle = "Вот такая интересная статья получилась!";
    return this;
}
addTag() {
    this.newTag = "А это тэг, просто тэг";
    return this;
}
generate() {
    return {
        
        articleTitle: this.newArticleTitle,
        describeArticle: this.newDescribeArticle,
        newArticle: this.newArticle,
        newTag: this.newTag
        }
    }

}

//

const articleData = {
    newArticleTitle: faker.lorem.sentence(3),
    newDescribeArticle: "описание",
    newArticle: "Вот такая интересная статья получилась!",
    newTag: "просто тэг"
 };