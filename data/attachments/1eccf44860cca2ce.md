# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Dev/dev.post.spec.ts >> Validate POST Endpoint - Create user >> POST - Create user with age greater than 150 - Status 400
- Location: tests/Dev/dev.post.spec.ts:192:7

# Error details

```
TypeError: apiRequestContext.post: Invalid URL
```

# Test source

```ts
  1   | import { test, expect, APIRequestContext, request } from '@playwright/test';
  2   | import { getRequestContext } from '../../utils/apiClient';
  3   | import dotenv from 'dotenv';
  4   | import { create } from 'node:domain';
  5   | 
  6   | dotenv.config();
  7   | 
  8   | // 🔧 Helpers
  9   | function generateEmail() {
  10  |   return `test${Date.now()}@mail.com`;
  11  | }
  12  | 
  13  | function generateUser() {
  14  |   return `Test User: ${Date.now()}`;
  15  | }
  16  | 
  17  | function generateAge(){
  18  |   return Math.floor(Math.random() * 150) + 1;
  19  | }
  20  | 
  21  | async function createUser(api: APIRequestContext, name: string, email: string, age: number) {
> 22  |   return await api.post('/dev/users', {
      |                    ^ TypeError: apiRequestContext.post: Invalid URL
  23  |     data: {
  24  |       name: name,
  25  |       email: email,
  26  |       age: age
  27  |     }
  28  |   });
  29  | }
  30  | 
  31  | async function createUserWithoutName(api: APIRequestContext, email: string, age: number) {
  32  |   return await api.post('/dev/users', {
  33  |     data: {
  34  |       email: email,
  35  |       age: age
  36  |     }
  37  |   });
  38  | }
  39  | 
  40  | async function createUserWithoutEmail(api: APIRequestContext, name: string, age: number) {
  41  |   return await api.post('/dev/users', {
  42  |     data: {
  43  |       name: name,
  44  |       age: age
  45  |     }
  46  |   });
  47  | }
  48  | 
  49  | async function createUserWithoutAge(api: APIRequestContext, name: string, email: string) {
  50  |   return await api.post('/dev/users', {
  51  |     data: {
  52  |       name: name,
  53  |       email: email
  54  |     }
  55  |   });
  56  | }
  57  | 
  58  | async function deleteUser(api: APIRequestContext, email: string) {
  59  |   return await api.delete(`/dev/users/${email}`);
  60  | }
  61  | 
  62  | test.describe('Validate POST Endpoint - Create user', () => {
  63  | 
  64  |   test('POST - Create user successfully - Status 201', async () => {
  65  |     const api = await getRequestContext(true);
  66  | 
  67  |     const res = await createUser(api, generateUser(), generateEmail(), generateAge());
  68  | 
  69  |     const body = await res.json();
  70  | 
  71  |     console.log('POST Response:', body);
  72  |     console.log('Status Code:', res.status());
  73  | 
  74  |     expect.soft(res.status()).toBe(201);
  75  | 
  76  |     await deleteUser(api, body.email);
  77  |   });
  78  | 
  79  |   test('POST - Create user without name - Status 400', async () => {
  80  |     const api = await getRequestContext(true);
  81  | 
  82  |     const res = await createUserWithoutName(api, generateEmail(), generateAge());
  83  | 
  84  |     const body = await res.json();
  85  |     
  86  |     console.log('Status Code:', res.status());
  87  |     console.log('POST Response:', body);
  88  |     
  89  |     expect.soft(res.status()).toBe(400);
  90  |   });
  91  | 
  92  |   test('POST - Create user without email - Status 400', async () => {
  93  |     const api = await getRequestContext(true);
  94  |     
  95  |     const res = await createUserWithoutEmail(api, generateUser(), generateAge());
  96  | 
  97  |     const body = await res.json();
  98  | 
  99  |     console.log('Status Code:', res.status());
  100 |     console.log('POST Response:', body);
  101 | 
  102 |     expect.soft(res.status()).toBe(400);
  103 |   });
  104 | 
  105 |   test('POST - Create user without age - Status 400', async () => {
  106 |     const api = await getRequestContext(true);
  107 |     
  108 |     const res = await createUserWithoutAge(api, generateUser(), generateEmail());
  109 | 
  110 |     const body = await res.json();
  111 | 
  112 |     console.log('Status Code:', res.status());
  113 |     console.log('POST Response:', body);
  114 | 
  115 |     expect.soft(res.status()).toBe(400);
  116 |   });
  117 | 
  118 |   test('POST - Create user with duplicate name - Status 201', async () => {
  119 |     const api = await getRequestContext(true);
  120 |     const name = generateUser();
  121 |     const email1 = generateEmail();
  122 | 
```