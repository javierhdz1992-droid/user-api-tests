import { faker } from '@faker-js/faker';

export class DataGenerator {

  static validUser() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email({ provider: 'testmail.com' }).toLowerCase(),
      age: faker.number.int({ min: 1, max: 150 })
    };
  }

  static userWithoutName() {
    const user = this.validUser();
    delete (user as any).name;
    return user;
  }

  static userWithoutEmail() {
    const user = this.validUser();
    delete (user as any).email;
    return user;
  }

  static userWithoutAge() {
    const user = this.validUser();
    delete (user as any).age;
    return user;
  }

  static userWithAgeLessThanMin() {
    return {
      ...this.validUser(),
      age: -1
    };
  }

  static userWithAgeGreaterThanMax() {
    return {
      ...this.validUser(),
      age: 151
    };
  }

  static userWithStringAge() {
    return {
      ...this.validUser(),
      age: "twenty"
    };
  }
}