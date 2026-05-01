# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Prod/prod.put.spec.ts >> Validate PUT Endpoint - Update a user >> PUT - Update user without age - Status 400
- Location: tests/Prod/prod.put.spec.ts:140:7

# Error details

```
TypeError: apiRequestContext.post: Invalid URL
```

# Test source

```ts
  1   | import { test, expect, APIRequestContext, request } from '@playwright/test';
  2   | import { getRequestContext } from '../../utils/apiClient';
  3   | import dotenv from 'dotenv';
  4   | 
  5   | dotenv.config();
  6   | 
  7   | // 🔧 Helpers
  8   | function generateEmail() {
  9   |   return `test${Date.now()}@mail.com`;
  10  | }
  11  | 
  12  | function generateUser() {
  13  |   return `Test User: ${Date.now()}`;
  14  | }
  15  | 
  16  | function generateAge(){
  17  |   return Math.floor(Math.random() * 150) + 1;
  18  | }
  19  | 
  20  | async function createUser(api: APIRequestContext, name: string, email: string, age: number) {
> 21  |   return await api.post('/prod/users', {
      |                    ^ TypeError: apiRequestContext.post: Invalid URL
  22  |     data: {
  23  |       name: name,
  24  |       email: email,
  25  |       age: age
  26  |     }
  27  |   });
  28  | }
  29  | 
  30  | async function updateUser(api: APIRequestContext, name: string, email: string, age: number) {
  31  |   return await api.put(`/prod/users/${email}`, {
  32  |     data: {
  33  |       name: name,
  34  |       email: email,
  35  |       age: age
  36  |     }
  37  |   });
  38  | }
  39  | 
  40  | async function updateUserWithoutName(api: APIRequestContext, email: string, age: number) {
  41  |   return await api.put(`/prod/users/${email}`, {
  42  |     data: {
  43  |       email: email,
  44  |       age: age
  45  |     }
  46  |   });
  47  | }
  48  | 
  49  | async function updateUserWithoutEmail(api: APIRequestContext, name: string, age: number) {
  50  |   return await api.put(`/prod/users/${name}`, {
  51  |     data: {
  52  |       name: name,
  53  |       age: age
  54  |     }
  55  |   });
  56  | }
  57  | 
  58  | async function updateUserWithoutAge(api: APIRequestContext, name: string, email: string) {
  59  |   return await api.put(`/prod/users/${email}`, {
  60  |     data: {
  61  |       name: name,
  62  |       email: email
  63  |     }
  64  |   });
  65  | }
  66  | 
  67  | async function updateUserWithoutHeader(api: APIRequestContext, name: string, email: string, age: number) {
  68  |   return await api.put('/prod/users', {
  69  |     data: {
  70  |       name: name,
  71  |       email: email,
  72  |       age: age
  73  |     }
  74  |   });
  75  | }
  76  | 
  77  | async function deleteUser(api: APIRequestContext, email: string) {
  78  |   return await api.delete(`/prod/users/${email}`);
  79  | }
  80  | 
  81  | test.describe('Validate PUT Endpoint - Update a user', () => {
  82  | 
  83  |   test('PUT - Update user successfully - Status 200', async () => {
  84  |     const api = await getRequestContext(true);
  85  |     const email = generateEmail();
  86  | 
  87  |     const createRes = await createUser(api, generateUser(), email, generateAge());
  88  |     const bodyCreate = await createRes.json();
  89  |     console.log('User Created: ', bodyCreate);
  90  | 
  91  |     const updateRes = await updateUser(api, generateUser(), email, generateAge());
  92  |     const body = await updateRes.json();
  93  | 
  94  |     console.log('PUT Response:', body);
  95  |     console.log('Status Code:', updateRes.status());
  96  | 
  97  |     expect.soft(updateRes.status()).toBe(200);
  98  | 
  99  |     await deleteUser(api, body.email);
  100 |   });
  101 | 
  102 |   test('PUT - Update user without name - Status 400', async () => {
  103 |     const api = await getRequestContext(true);
  104 |     const email = generateEmail();
  105 | 
  106 |     const createRes = await createUser(api, generateUser(), email, generateAge());
  107 |     const bodyCreate = await createRes.json();
  108 |     console.log('User Created: ', bodyCreate);
  109 | 
  110 |     const updateRes = await updateUserWithoutName(api, email, generateAge());
  111 |     const body = await updateRes.json();
  112 | 
  113 |     console.log('PUT Response:', body);
  114 |     console.log('Status Code:', updateRes.status());
  115 | 
  116 |     expect.soft(updateRes.status()).toBe(400);
  117 | 
  118 |     await deleteUser(api, body.email);
  119 |   });
  120 | 
  121 |   test('PUT - Update user without email - Status 400', async () => {
```