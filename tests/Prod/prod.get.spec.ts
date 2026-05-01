import { test, expect, APIRequestContext, request } from '@playwright/test';
import { getRequestContext } from '../../utils/apiClient';
import dotenv from 'dotenv';

dotenv.config();

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

test.describe('Validate GET Endpoint - List of users', () => {

  test('GET - List users successfully - Status Code 200', async () => {
    const api = await getRequestContext(true);
    const res = await api.get('/prod/users');
    const body = await res.json();

    console.log('GET Response:', body);
    console.log('Status Code:', res.status());

    expect.soft(res.status()).toBe(200);
  });

  test('GET - Retrieve specific user successfully by email - Status Code 200', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    await createUser(api, generateUser(), email, generateAge());

    const res = await api.get(`/prod/users/${email}`);

    const body = await res.json();

    console.log('GET Response:', body);
    console.log('Status Code:', res.status());

    expect.soft(res.status()).toBe(200);

    await deleteUser(api, email);
  });

  test('GET - Retrieve user using non existing email - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const res = await api.get(`/prod/users/${email}`);

    const body = await res.json();

    console.log('GET Response:', body);
    console.log('Status Code:', res.status());

    expect.soft(res.status()).toBe(404);
  });

    test('GET - Retrieve specific user by name - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const name = generateUser();
    const email = generateEmail();

    await createUser(api, name, email, generateAge());

    const res = await api.get(`/prod/users/${name}`);

    const body = await res.json();

    console.log('GET Response:', body);
    console.log('Status Code:', res.status());

    expect.soft(res.status()).toBe(404);

    await deleteUser(api, email);
  });

  test('GET - Retrieve specific user by age - Status Code 404', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();
    const age = generateAge();

    await createUser(api, generateUser(), email, age);

    const res = await api.get(`/prod/users/${age}`);

    const body = await res.json();

    console.log('GET Response:', body);
    console.log('Status Code:', res.status());

    expect.soft(res.status()).toBe(404);

    await deleteUser(api, email);
  });

  test('GET - Get users without authentication - Status Code 401', async () => {
      const api = await request.newContext({
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json'
        }
      });
  
      const response = await api.get('/prod/users');
      const body = await response.json();

      console.log('GET Response:', body);
      console.log('Status Code:', response.status());
  
      expect.soft(response.status()).toBe(401);
    });

});