import { faker } from '@faker-js/faker';

export class UserBuilder {
    
    addEmail(){
        this.userEmail = faker.internet.email()
        return this;

    };

    addPassword(symbol = 7){
        this.userPassword = faker.internet.password({length: symbol})
        return this;

    };

    addUsername(){
        this.userUsername = faker.person.firstName()
        return this;

    };

    generate() {
        return {
            email: this.userEmail,
            password: this.userPassword,
            name: this.userName            
        };
    }

}
