import { test, expect, APIRequestContext, request } from '@playwright/test';
import { getRequestContext } from '../utils/apiClient';
import { UserApi } from '../api/UserApi';
import { DataGenerator } from '../utils/dataGenerator';

test.describe('Validate PUT Endpoint - Update a user', () => {

  test('PUT - Update user successfully (All Fields)- Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: DataGenerator.validUser().name,
      email: DataGenerator.validUser().email,
      age: DataGenerator.validUser().age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect(updateResponse.status()).toBe(200);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user successfully (Name and Age)- Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: DataGenerator.validUser().name,
      email: user.email,
      age: DataGenerator.validUser().age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect(updateResponse.status()).toBe(200);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user successfully (Name and Email)- Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: DataGenerator.validUser().name,
      email: DataGenerator.validUser().email,
      age: user.age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect(updateResponse.status()).toBe(200);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user successfully (Age and Email)- Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: user.name,
      email: DataGenerator.validUser().email,
      age: DataGenerator.validUser().age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect(updateResponse.status()).toBe(200);

    await userApi.deleteUser(user.email);
  });

    test('PUT - Update user successfully (Email)- Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: user.name,
      email: DataGenerator.validUser().email,
      age: user.age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect(updateResponse.status()).toBe(200);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user successfully (Name)- Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: DataGenerator.validUser().name,
      email: user.email,
      age: user.age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect(updateResponse.status()).toBe(200);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user successfully (Age)- Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: user.name,
      email: user.email,
      age: DataGenerator.validUser().age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect(updateResponse.status()).toBe(200);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user successfully (No changes)- Status Code 200', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: user.name,
      email: user.email,
      age: user.age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect(updateResponse.status()).toBe(200);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user without name - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      email: DataGenerator.validUser().email,
      age: DataGenerator.validUser().age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect.soft(updateResponse.status()).toBe(400);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user without email - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: DataGenerator.validUser().name,
      age: DataGenerator.validUser().age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect.soft(updateResponse.status()).toBe(400);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user without age - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: DataGenerator.validUser().name,
      email: DataGenerator.validUser().email
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect.soft(updateResponse.status()).toBe(400);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user with duplicate email - Status Code 409', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user1 = DataGenerator.validUser();
    const createResponse1 = await userApi.createUser(user1);

    console.log('User1 Created:', await createResponse1.json());

    const user2 = DataGenerator.validUser();
    const createResponse2 = await userApi.createUser(user2);

    console.log('User2 Created:', await createResponse2.json());

    const updateResponse = await userApi.updateUser(user2.email,{
      name: DataGenerator.validUser().name,
      email: user1.email,
      age: DataGenerator.validUser().age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect.soft(updateResponse.status()).toBe(409);

    await userApi.deleteUser(user1.email);
    await userApi.deleteUser(user2.email);
  });


  test('PUT - Update user with age less than 1 - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: user.name,
      email: user.email,
      age: DataGenerator.userWithAgeLessThanMin().age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect.soft(updateResponse.status()).toBe(400);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user with age greater than 150 - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: user.name,
      email: user.email,
      age: DataGenerator.userWithAgeGreaterThanMax().age
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect.soft(updateResponse.status()).toBe(400);

    await userApi.deleteUser(user.email);
  });

    test('PUT - Update user string age - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUser(user.email,{
      name: user.name,
      email: user.email,
      age: DataGenerator.userWithStringAge().age as any
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect.soft(updateResponse.status()).toBe(400);

    await userApi.deleteUser(user.email);
  });

  test('PUT - Update user without Email Header - Status Code 400', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const updateResponse = await userApi.updateUserWithoutHeader({
      name: user.name,
      email: user.email,
      age: DataGenerator.userWithStringAge().age as any
    });

    console.log('PUT Response:', await updateResponse.json());
    console.log('Status Code:', updateResponse.status());

    expect.soft(updateResponse.status()).toBe(500);

    await userApi.deleteUser(user.email);
  });
});