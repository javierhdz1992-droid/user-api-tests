# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Dev/dev.get.spec.ts >> Validate GET Endpoint - List of users >> GET - Retrieve specific user by age - Status 404
- Location: tests/Dev/dev.get.spec.ts:97:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 500
```

# Test source

```ts
  11  | function generateUser() {
  12  |   return `Test User: ${Date.now()}`;
  13  | }
  14  | 
  15  | function generateAge(){
  16  |   return Math.floor(Math.random() * 150) + 1;
  17  | }
  18  | 
  19  | async function createUser(api: APIRequestContext, name: string, email: string, age: number) {
  20  |   return await api.post('/dev/users', {
  21  |     data: {
  22  |       name: name,
  23  |       email: email,
  24  |       age: age
  25  |     }
  26  |   });
  27  | }
  28  | 
  29  | async function deleteUser(api: APIRequestContext, email: string) {
  30  |   return await api.delete(`/dev/users/${email}`);
  31  | }
  32  | 
  33  | test.describe('Validate GET Endpoint - List of users', () => {
  34  | 
  35  |   test('GET - List users successfully - Status 200', async () => {
  36  |     const api = await getRequestContext(true);
  37  |     const res = await api.get('/dev/users');
  38  |     const body = await res.json();
  39  | 
  40  |     console.log('GET Response:', body);
  41  |     console.log('Status Code:', res.status());
  42  | 
  43  |     expect.soft(res.status()).toBe(200);
  44  |   });
  45  | 
  46  |   test('GET - Retrieve specific user successfully by email - Status 200', async () => {
  47  |     const api = await getRequestContext(true);
  48  |     const email = generateEmail();
  49  | 
  50  |     await createUser(api, generateUser(), email, generateAge());
  51  | 
  52  |     const res = await api.get(`/dev/users/${email}`);
  53  | 
  54  |     const body = await res.json();
  55  | 
  56  |     console.log('GET Response:', body);
  57  |     console.log('Status Code:', res.status());
  58  | 
  59  |     expect.soft(res.status()).toBe(200);
  60  | 
  61  |     await deleteUser(api, email);
  62  |   });
  63  | 
  64  |   test('GET - Retrieve user using non existing email - Status 404', async () => {
  65  |     const api = await getRequestContext(true);
  66  |     const email = generateEmail();
  67  | 
  68  |     const res = await api.get(`/dev/users/${email}`);
  69  | 
  70  |     const body = await res.json();
  71  | 
  72  |     console.log('GET Response:', body);
  73  |     console.log('Status Code:', res.status());
  74  | 
  75  |     expect.soft(res.status()).toBe(404);
  76  |   });
  77  | 
  78  |     test('GET - Retrieve specific user by name - Status 404', async () => {
  79  |     const api = await getRequestContext(true);
  80  |     const name = generateUser();
  81  |     const email = generateEmail();
  82  | 
  83  |     await createUser(api, name, email, generateAge());
  84  | 
  85  |     const res = await api.get(`/dev/users/${name}`);
  86  | 
  87  |     const body = await res.json();
  88  | 
  89  |     console.log('GET Response:', body);
  90  |     console.log('Status Code:', res.status());
  91  | 
  92  |     expect.soft(res.status()).toBe(404);
  93  | 
  94  |     await deleteUser(api, email);
  95  |   });
  96  | 
  97  |   test('GET - Retrieve specific user by age - Status 404', async () => {
  98  |     const api = await getRequestContext(true);
  99  |     const email = generateEmail();
  100 |     const age = generateAge();
  101 | 
  102 |     await createUser(api, generateUser(), email, age);
  103 | 
  104 |     const res = await api.get(`/dev/users/${age}`);
  105 | 
  106 |     const body = await res.json();
  107 | 
  108 |     console.log('GET Response:', body);
  109 |     console.log('Status Code:', res.status());
  110 | 
> 111 |     expect.soft(res.status()).toBe(404);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  112 | 
  113 |     await deleteUser(api, email);
  114 |   });
  115 | 
  116 |   test('GET - Get users without authentication - Status 401', async () => {
  117 |       const api = await request.newContext({
  118 |         baseURL: process.env.BASE_URL,
  119 |         extraHTTPHeaders: {
  120 |           'Content-Type': 'application/json'
  121 |         }
  122 |       });
  123 |   
  124 |       const response = await api.get('/dev/users');
  125 |       const body = await response.json();
  126 | 
  127 |       console.log('GET Response:', body);
  128 |       console.log('Status Code:', response.status());
  129 |   
  130 |       expect.soft(response.status()).toBe(401);
  131 |     });
  132 | 
  133 | });
```