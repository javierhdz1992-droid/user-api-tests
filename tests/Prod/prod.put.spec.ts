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

async function updateUser(api: APIRequestContext, name: string, email: string, age: number) {
  return await api.put(`/prod/users/${email}`, {
    data: {
      name: name,
      email: email,
      age: age
    }
  });
}

async function updateUserWithoutName(api: APIRequestContext, email: string, age: number) {
  return await api.put(`/prod/users/${email}`, {
    data: {
      email: email,
      age: age
    }
  });
}

async function updateUserWithoutEmail(api: APIRequestContext, name: string, age: number) {
  return await api.put(`/prod/users/${name}`, {
    data: {
      name: name,
      age: age
    }
  });
}

async function updateUserWithoutAge(api: APIRequestContext, name: string, email: string) {
  return await api.put(`/prod/users/${email}`, {
    data: {
      name: name,
      email: email
    }
  });
}

async function updateUserWithoutHeader(api: APIRequestContext, name: string, email: string, age: number) {
  return await api.put('/prod/users', {
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

test.describe('Validate PUT Endpoint - Update a user', () => {

  test('PUT - Update user successfully - Status 200', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const createRes = await createUser(api, generateUser(), email, generateAge());
    const bodyCreate = await createRes.json();
    console.log('User Created: ', bodyCreate);

    const updateRes = await updateUser(api, generateUser(), email, generateAge());
    const body = await updateRes.json();

    console.log('PUT Response:', body);
    console.log('Status Code:', updateRes.status());

    expect.soft(updateRes.status()).toBe(200);

    await deleteUser(api, body.email);
  });

  test('PUT - Update user without name - Status 400', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const createRes = await createUser(api, generateUser(), email, generateAge());
    const bodyCreate = await createRes.json();
    console.log('User Created: ', bodyCreate);

    const updateRes = await updateUserWithoutName(api, email, generateAge());
    const body = await updateRes.json();

    console.log('PUT Response:', body);
    console.log('Status Code:', updateRes.status());

    expect.soft(updateRes.status()).toBe(400);

    await deleteUser(api, body.email);
  });

  test('PUT - Update user without email - Status 400', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const createRes = await createUser(api, generateUser(), email, generateAge());
    const bodyCreate = await createRes.json();
    console.log('User Created: ', bodyCreate);

    const updateRes = await updateUserWithoutEmail(api, generateUser(), generateAge());
    const body = await updateRes.json();

    console.log('PUT Response:', body);
    console.log('Status Code:', updateRes.status());

    expect.soft(updateRes.status()).toBe(400);

    await deleteUser(api, body.email);
  });

  test('PUT - Update user without age - Status 400', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const createRes = await createUser(api, generateUser(), email, generateAge());
    const bodyCreate = await createRes.json();
    console.log('User Created: ', bodyCreate);

    const updateRes = await updateUserWithoutAge(api, generateUser(), email);
    const body = await updateRes.json();

    console.log('PUT Response:', body);
    console.log('Status Code:', updateRes.status());

    expect.soft(updateRes.status()).toBe(400);

    await deleteUser(api, body.email);
  });

  test('PUT - Update user with duplicate email - Status 409', async () => {
    const api = await getRequestContext(true);
    const email1 = generateEmail();

    const createRes1 = await createUser(api, generateUser(), email1, generateAge());
    const bodyCreate1 = await createRes1.json();
    console.log('User Created: ', bodyCreate1);

     // Create another user with the same name but different email
    const email2 = generateEmail();
    const createRes2 = await createUser(api, generateUser(), email2, generateAge());
    const bodyCreate2 = await createRes2.json();
    console.log('User Created: ', bodyCreate2);

    const updateRes = await api.put(`/prod/users/${email1}`, {
    data: {
      name: generateUser(),
      email: email2,
      age: generateAge()
    }
    });
    
    const body = await updateRes.json();

    console.log('Status Code:', updateRes.status());
    console.log('PUT Response:', body);

    expect.soft(updateRes.status()).toBe(409);
    await deleteUser(api, email1);
    await deleteUser(api, email2);
  });


  test('PUT - Update user with age less than 1 - Status 400', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const createRes = await createUser(api, generateUser(), email, generateAge());
    const bodyCreate = await createRes.json();
    console.log('User Created: ', bodyCreate);

    const updateRes = await updateUser(api, generateUser(), email, -1);
    const body = await updateRes.json();

    console.log('PUT Response:', body);
    console.log('Status Code:', updateRes.status());

    expect.soft(updateRes.status()).toBe(400);

    await deleteUser(api, body.email);
  });

  test('PUT - Update user with age greater than 150 - Status 400', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const createRes = await createUser(api, generateUser(), email, generateAge());
    const bodyCreate = await createRes.json();
    console.log('User Created: ', bodyCreate);

    const updateRes = await updateUser(api, generateUser(), email, 151);
    const body = await updateRes.json();

    console.log('PUT Response:', body);
    console.log('Status Code:', updateRes.status());

    expect.soft(updateRes.status()).toBe(400);

    await deleteUser(api, body.email);
  });

  test('PUT - Update user without Email Header - Status 400', async () => {
    const api = await getRequestContext(true);
    const email = generateEmail();

    const createRes = await createUser(api, generateUser(), email, generateAge());
    const bodyCreate = await createRes.json();
    console.log('User Created: ', bodyCreate);

    const updateRes = await updateUserWithoutHeader(api, generateUser(), email, generateAge());
    const body = await updateRes.json();

    console.log('PUT Response:', body);
    console.log('Status Code:', updateRes.status());

    expect.soft(updateRes.status()).toBe(400);

    await deleteUser(api, body.email);
  });

  test('PUT - Update user without authentication - Status 401', async () => {
          const api = await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
              'Content-Type': 'application/json'
            }
          });
          
          const email = generateEmail();
          await createUser(api, generateUser(), email, generateAge());
          const response = await updateUser(api, generateUser(), email, generateAge());
          const body = await response.json();
    
          console.log('POST Response:', body);
          console.log('Status Code:', response.status());
      
          expect.soft(response.status()).toBe(401);
          deleteUser(api, body.email);
        });

});