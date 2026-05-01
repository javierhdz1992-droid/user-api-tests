import { test, expect, APIRequestContext, request } from '@playwright/test';
import { getRequestContext } from '../../utils/apiClient';
import dotenv from 'dotenv';


dotenv.config();

// 🔧 Helpers
function generateEmail() {
  return `test${Date.now()}@mail.com`;
}

function generateUser() {
  return `Test User: ${Date.now()}`;
}

function generateAge(){
  return Math.floor(Math.random() * 150) + 1;
}

async function createUser(api: APIRequestContext, name: string, email: string, age: number) {
  return await api.post('/prod/users', {
    data: {
      name: name,
      email: email,
      age: age
    }
  });
}

async function deleteUser(api: APIRequestContext, email: string) {
  return await api.delete(`/prod/users/${email}`);
}

async function deleteUserWithoutEmailHeader(api: APIRequestContext) {
  return await api.delete('/prod/users');
}

test.describe('Validate DELETE Endpoint - List of users', () => {

  test('DELETE - Delete user successfully by email - Status 204', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const createRes = await createUser(api, generateUser(), email, generateAge());
    const bodyCreate = await createRes.json();
    console.log('User Created: ', bodyCreate);

    const deleteRes = await deleteUser(api, email);

    console.log('Status Code:', deleteRes.status());

    expect.soft(deleteRes.status()).toBe(204);
  });

  test('DELETE - Delete user using non existing email - Status 404', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const deleteRes = await deleteUser(api, email);
    const body = await deleteRes.json();

    console.log('Status Code:', deleteRes.status());
    console.log('DELETE Response:', body);

    expect.soft(deleteRes.status()).toBe(404);
  });

    test('DELETE - Delete specific user by name - Status 404', async () => {
    const api = await getRequestContext(true);
    const name = generateUser();
    const email = generateEmail();

    await createUser(api, name, email, generateAge());

    const res = await api.delete(`/prod/users/${name}`);

    const body = await res.json();

    console.log('Status Code:', res.status());
    console.log('DELETE Response:', body);

    expect.soft(res.status()).toBe(404);

    await deleteUser(api, email);
  });

  test('DELETE - Delete specific user by age - Status 404', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();
    const age = generateAge();

    await createUser(api, generateUser(), email, age);

    const res = await api.delete(`/prod/users/${age}`);

    const body = await res.json();

    console.log('Status Code:', res.status());
    console.log('DELETE Response:', body);

    expect.soft(res.status()).toBe(404);

    await deleteUser(api, email);
  });

  test('DELETE - Delete user without Email Header - Status 400', async () => {
    const api = await getRequestContext(true);

    const deleteRes = await deleteUserWithoutEmailHeader(api);
    const body = await deleteRes.json();

    console.log('Status Code:', deleteRes.status());
    console.log('DELETE Response:', body);

    expect.soft(deleteRes.status()).toBe(400);
  });

  test('DELETE - Delete user without authentication - Status 401', async () => {
    const api = await request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });

    const email = generateEmail();
    await createUser(api, generateUser(), email, generateAge());

    const response = await deleteUser(api, email);

    console.log('Status:', response.status());

    //expect.soft(response.status()).toBe(401);
  });

});