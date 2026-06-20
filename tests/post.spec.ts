import { test, expect} from '@playwright/test';
import { getRequestContext } from '../utils/apiClient';
import { UserApi } from '../api/UserApi';
import { DataGenerator } from '../utils/dataGenerator';

test.describe('Validate POST Endpoint - Create user', () => {

  test('POST - Create user successfully - Status Code 201', async () => {

    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const response = await userApi.createUser(user);

    console.log('POST Response:', await response.json());
    console.log('Status Code:', response.status());


    expect(response.status()).toBe(201);

    await userApi.deleteUser(user.email);
  });

  test('POST - Create user without name - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.userWithoutName();
    const response = await userApi.createUser(user);

    console.log('POST Response:', await response.json());
    console.log('Status Code:', response.status());

    expect(response.status()).toBe(400);
  });

  test('POST - Create user without email - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.userWithoutEmail();
    const response = await userApi.createUser(user);

    console.log('POST Response:', await response.json());
    console.log('Status Code:', response.status());

    expect(response.status()).toBe(400);
  });

  test('POST - Create user without age - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.userWithoutAge();
    const response = await userApi.createUser(user);

    console.log('POST Response:', await response.json());
    console.log('Status Code:', response.status());

    expect(response.status()).toBe(400);
  });

  test('POST - Create user with duplicate name - Status Code 201', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user1 = DataGenerator.validUser();
    const response1 = await userApi.createUser(user1);

    console.log('POST Response User 1:', await response1.json());
    console.log('Status Code User 1:', response1.status());

    const user2 = DataGenerator.validUser();
    user2.name = user1.name;
    const response2 = await userApi.createUser(user2);

    console.log('POST Response User 2:', await response2.json());
    console.log('Status Code User 2:', response2.status());

    expect(response2.status()).toBe(201);
    await userApi.deleteUser(user1.email);
    await userApi.deleteUser(user2.email);
  });

    test('POST - Create user with duplicate email - Status Code 409', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user1 = DataGenerator.validUser();
    const response1 = await userApi.createUser(user1);

    console.log('POST Response User 1:', await response1.json());
    console.log('Status Code User 1:', response1.status());

    const user2 = DataGenerator.validUser();
    user2.email = user1.email;
    const response2 = await userApi.createUser(user2);

    console.log('POST Response User 2:', await response2.json());
    console.log('Status Code User 2:', response2.status());

    expect.soft(response2.status()).toBe(409);
    await userApi.deleteUser(user1.email);
  });

  test('POST - Create user with duplicate age - Status Code 201', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user1 = DataGenerator.validUser();
    const response1 = await userApi.createUser(user1);

    console.log('POST Response User 1:', await response1.json());
    console.log('Status Code User 1:', response1.status());

    const user2 = DataGenerator.validUser();
    user2.age = user1.age;
    const response2 = await userApi.createUser(user2);

    console.log('POST Response User 2:', await response2.json());
    console.log('Status Code User 2:', response2.status());

    expect(response2.status()).toBe(201);
    await userApi.deleteUser(user1.email);
    await userApi.deleteUser(user2.email);
  });


  test('POST - Create user with age less than 1 - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.userWithAgeLessThanMin();
    const response = await userApi.createUser(user);

    console.log('POST Response:', await response.json());
    console.log('Status Code:', response.status());


    expect(response.status()).toBe(400);
  });

  test('POST - Create user with age greater than 150 - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.userWithAgeGreaterThanMax();
    const response = await userApi.createUser(user);

    console.log('POST Response:', await response.json());
    console.log('Status Code:', response.status());


    expect(response.status()).toBe(400);
  });
});