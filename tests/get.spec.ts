import { test, expect} from '@playwright/test';
import { getRequestContext } from '../utils/apiClient';
import { UserApi } from '../api/UserApi';
import { DataGenerator } from '../utils/dataGenerator';


test.describe('Validate GET Endpoint - List of users', () => {

  test('GET - List users successfully - Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user1 = DataGenerator.validUser();
    const createResponse1 = await userApi.createUser(user1);

    console.log('User1 Created:', await createResponse1.json());

    const user2 = DataGenerator.validUser();
    const createResponse2 = await userApi.createUser(user2);

    console.log('User2 Created:', await createResponse2.json());

    const getResponse = await userApi.getAllUsers();

    console.log('GET Response:', await getResponse.json());
    console.log('Status Code:', getResponse.status());

    expect(getResponse.status()).toBe(200);

    await userApi.deleteUser(user1.email);
    await userApi.deleteUser(user2.email);
  });

  test('GET - Retrieve specific user successfully by email - Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const getResponse = await userApi.getUserByEmail(user.email);

    console.log('GET Response:', await getResponse.json());
    console.log('Status Code:', getResponse.status());

    expect(getResponse.status()).toBe(200);

    await userApi.deleteUser(user.email);
  });

  test('GET - Retrieve user using non existing email - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const getResponse = await userApi.getUserByEmail(DataGenerator.validUser().email);

    console.log('GET Response:', await getResponse.json());
    console.log('Status Code:', getResponse.status());

    expect(getResponse.status()).toBe(404);
  });

    test('GET - Retrieve specific user by name - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const getResponse = await userApi.getUserByName(user.name);

    console.log('GET Response:', await getResponse.json());
    console.log('Status Code:', getResponse.status());

    expect(getResponse.status()).toBe(404);

    await userApi.deleteUser(user.email);
  });

  test('GET - Retrieve specific user by age - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const getResponse = await userApi.getUserByAge(user.age);

    console.log('GET Response:', await getResponse.json());
    console.log('Status Code:', getResponse.status());

    expect(getResponse.status()).toBe(404);

    await userApi.deleteUser(user.email);
  });
});