import { test, expect} from '@playwright/test';
import { getRequestContext } from '../utils/apiClient';
import { UserApi } from '../api/UserApi';
import { DataGenerator } from '../utils/dataGenerator';

test.describe('Validate DELETE Endpoint - List of users', () => {

  test('DELETE - Delete user successfully by email - Status Code 204', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const deleteResponse = await userApi.deleteUser(user.email);

    console.log('Status Code:', deleteResponse.status());

    expect.soft(deleteResponse.status()).toBe(204);
  });

  test('DELETE - Delete user using non existing email - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const deleteResponse = await userApi.deleteUser(user.email);

    console.log('DELETE Response:', await deleteResponse.json());
    console.log('Status Code:', deleteResponse.status());

    expect.soft(deleteResponse.status()).toBe(404);
  });

    test('DELETE - Delete specific user by name - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const deleteResponse = await userApi.deleteUser(user.name);
    
    console.log('DELETE Response:', await deleteResponse.json());
    console.log('Status Code:', deleteResponse.status());

    expect.soft(deleteResponse.status()).toBe(404);

    await userApi.deleteUser(user.email);
  });

  test('DELETE - Delete specific user by age - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const deleteResponse = await userApi.deleteUser(user.age?.toString() || '');
    
    console.log('DELETE Response:', await deleteResponse.json());
    console.log('Status Code:', deleteResponse.status());

    expect.soft(deleteResponse.status()).toBe(404);

    await userApi.deleteUser(user.email);
  });

  test('DELETE - Delete user twice - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    let deleteResponse = await userApi.deleteUser(user.email);
    deleteResponse = await userApi.deleteUser(user.email);
    
    console.log('DELETE Response:', await deleteResponse.json());
    console.log('Status Code:', deleteResponse.status());

    expect.soft(deleteResponse.status()).toBe(404);
  });

  test('DELETE - Delete user without Email Header - Status Code 500', async () => {
    const api = await getRequestContext(true);
    const userApi = new UserApi(api);

    const deleteResponse = await userApi.deleteUserWithoutEmailHeader();
    const body = await deleteResponse.json();

    console.log('Status Code:', deleteResponse.status());
    console.log('DELETE Response:', body);

    expect.soft(deleteResponse.status()).toBe(500);
  });

  test('DELETE - Delete user without authentication - Status Code 401', async () => {
    let api = await getRequestContext(false);
    let userApi = new UserApi(api);

    const user = DataGenerator.validUser();

    const createResponse = await userApi.createUser(user);

    console.log('User Created:', await createResponse.json());

    const deleteResponse = await userApi.deleteUser(user.email);

    //console.log('DELETE Response:', await deleteResponse.json());
    console.log('Status Code:', deleteResponse.status());

    expect.soft(deleteResponse.status()).toBe(401);

    api = await getRequestContext(true);
    userApi = new UserApi(api);
    await userApi.deleteUser(user.email);
  });

});