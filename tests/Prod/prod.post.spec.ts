import { test, expect, APIRequestContext, request } from '@playwright/test';
import { getRequestContext } from '../../utils/apiClient';
import dotenv from 'dotenv';
import { create } from 'node:domain';

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

async function createUserWithoutName(api: APIRequestContext, email: string, age: number) {
  return await api.post('/prod/users', {
    data: {
      email: email,
      age: age
    }
  });
}

async function createUserWithoutEmail(api: APIRequestContext, name: string, age: number) {
  return await api.post('/prod/users', {
    data: {
      name: name,
      age: age
    }
  });
}

async function createUserWithoutAge(api: APIRequestContext, name: string, email: string) {
  return await api.post('/prod/users', {
    data: {
      name: name,
      email: email
    }
  });
}

async function createUserStringAge(api: APIRequestContext, name: string, email: string, age: string) {
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

test.describe('Validate POST Endpoint - Create user', () => {

  test('POST - Create user successfully - Status Code 201', async () => {
    const api = await getRequestContext(true);

    const res = await createUser(api, generateUser(), generateEmail(), generateAge());

    const body = await res.json();

    console.log('POST Response:', body);
    console.log('Status Code:', res.status());

    expect.soft(res.status()).toBe(201);

    await deleteUser(api, body.email);
  });

  test('POST - Create user without name - Status Code 400', async () => {
    const api = await getRequestContext(true);

    const res = await createUserWithoutName(api, generateEmail(), generateAge());

    const body = await res.json();
    
    console.log('Status Code:', res.status());
    console.log('POST Response:', body);
    
    expect.soft(res.status()).toBe(400);
  });

  test('POST - Create user without email - Status Code 400', async () => {
    const api = await getRequestContext(true);
    
    const res = await createUserWithoutEmail(api, generateUser(), generateAge());

    const body = await res.json();

    console.log('Status Code:', res.status());
    console.log('POST Response:', body);

    expect.soft(res.status()).toBe(400);
  });

  test('POST - Create user without age - Status Code 400', async () => {
    const api = await getRequestContext(true);
    
    const res = await createUserWithoutAge(api, generateUser(), generateEmail());

    const body = await res.json();

    console.log('Status Code:', res.status());
    console.log('POST Response:', body);

    expect.soft(res.status()).toBe(400);
  });

  test('POST - Create user with duplicate name - Status Code 201', async () => {
    const api = await getRequestContext(true);
    const name = generateUser();
    const email1 = generateEmail();

    let res = await createUser(api, name, email1, generateAge());

    const email2 = generateEmail();
    res = await createUser(api, name, email2, generateAge());

    const body = await res.json();

    console.log('Status Code:', res.status());
    console.log('POST Response:', body);

    expect.soft(res.status()).toBe(201);
    await deleteUser(api, email1);
    await deleteUser(api, email2);
  });

    test('POST - Create user with duplicate email - Status Code 409', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    let res = await createUser(api, generateUser(), email, generateAge());

    res = await createUser(api, generateUser(), email, generateAge());

    const body = await res.json();

    console.log('Status Code:', res.status());
    console.log('POST Response:', body);

    expect.soft(res.status()).toBe(409);
    await deleteUser(api, email);
  });

  test('POST - Create user with duplicate age - Status Code 201', async () => {
    const api = await getRequestContext(true);
    const age = generateAge();
    const email1 = generateEmail();

    let res = await createUser(api, generateUser(), email1, age);

    const email2 = generateEmail();
    res = await createUser(api, generateUser(), email2, age);

    const body = await res.json();

    console.log('Status Code:', res.status());
    console.log('POST Response:', body);

    expect.soft(res.status()).toBe(201);
    await deleteUser(api, email1);
    await deleteUser(api, email2);
  });


  test('POST - Create user with age less than 1 - Status Code 400', async () => {
    const api = await getRequestContext(true);

    const res = await createUser(api, generateUser(), generateEmail(), -1);

    const body = await res.json();

    console.log('Status Code:', res.status());
    console.log('POST Response:', body);

    expect.soft(res.status()).toBe(400);
  });

  test('POST - Create user with age greater than 150 - Status Code 400', async () => {
    const api = await getRequestContext(true);

    const res = await createUser(api, generateUser(), generateEmail(), 151);

    const body = await res.json();

    console.log('Status Code:', res.status());
    console.log('POST Response:', body);

    expect.soft(res.status()).toBe(400);
  });

    test('POST - Create user with String age  - Status Code 400', async () => {
      const api = await getRequestContext(true);
  
      const res = await createUserStringAge(api, generateUser(), generateEmail(), "55");
  
      const body = await res.json();
  
      console.log('Status Code:', res.status());
      console.log('POST Response:', body);
  
      expect.soft(res.status()).toBe(400);
    });

  test('POST - Create user without authentication - Status Code 401', async () => {
        const api = await request.newContext({
          baseURL: process.env.BASE_URL,
          extraHTTPHeaders: {
            'Content-Type': 'application/json'
          }
        });
    
        const response = await createUser(api, generateUser(), generateEmail(), generateAge());
        const body = await response.json();
  
        console.log('POST Response:', body);
        console.log('Status Code:', response.status());
    
        expect.soft(response.status()).toBe(401);
        deleteUser(api, body.email);
      });

});