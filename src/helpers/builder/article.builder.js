import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    constructor(page) {
        this.page = page;
        this.articleData = {
            title: '',
            description: '',
            body: '',
            tag: ''
        };
    }

    addTitle(title = faker.lorem.sentence(3)) {
        this.articleData.title = title;
        return this;
    }

    addDescription(description = "описание") {
        this.articleData.description = description;
        return this;
    }

    addBody(body = "Вот такая интересная статья получилась!") {
        this.articleData.body = body;
        return this;
    }

    addTag(tag = "просто тэг") {
        this.articleData.tag = tag;
        return this;
    }

    publish() {
        const addArticlePage = new AddArticlePage(this.page, this.articleData.title);
        return addArticlePage.publishNewArticle(
            this.articleData.title,
            this.articleData.description,
            this.articleData.body,
            this.articleData.tag
        );
    }
}