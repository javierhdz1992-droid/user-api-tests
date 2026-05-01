# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Dev/dev.put.spec.ts >> Validate PUT Endpoint - Update a user >> PUT - Update user without authentication - Status 401
- Location: tests/Dev/dev.put.spec.ts:276:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200
```

# Test source

```ts
  192 |     console.log('PUT Response:', body);
  193 | 
  194 |     expect.soft(updateRes.status()).toBe(409);
  195 |     await deleteUser(api, email1);
  196 |     await deleteUser(api, email2);
  197 |   });
  198 | 
  199 | 
  200 |   test('PUT - Update user with age less than 1 - Status 400', async () => {
  201 |     const api = await getRequestContext(true);
  202 |     const email = generateEmail();
  203 | 
  204 |     const createRes = await createUser(api, generateUser(), email, generateAge());
  205 |     const bodyCreate = await createRes.json();
  206 |     console.log('User Created: ', bodyCreate);
  207 | 
  208 |     const updateRes = await updateUser(api, generateUser(), email, -1);
  209 |     const body = await updateRes.json();
  210 | 
  211 |     console.log('PUT Response:', body);
  212 |     console.log('Status Code:', updateRes.status());
  213 | 
  214 |     expect.soft(updateRes.status()).toBe(400);
  215 | 
  216 |     await deleteUser(api, body.email);
  217 |   });
  218 | 
  219 |   test('PUT - Update user with age greater than 150 - Status 400', async () => {
  220 |     const api = await getRequestContext(true);
  221 |     const email = generateEmail();
  222 | 
  223 |     const createRes = await createUser(api, generateUser(), email, generateAge());
  224 |     const bodyCreate = await createRes.json();
  225 |     console.log('User Created: ', bodyCreate);
  226 | 
  227 |     const updateRes = await updateUser(api, generateUser(), email, 151);
  228 |     const body = await updateRes.json();
  229 | 
  230 |     console.log('PUT Response:', body);
  231 |     console.log('Status Code:', updateRes.status());
  232 | 
  233 |     expect.soft(updateRes.status()).toBe(400);
  234 | 
  235 |     await deleteUser(api, body.email);
  236 |   });
  237 | 
  238 |   test('PUT - Update user string age - Status 400', async () => {
  239 |     const api = await getRequestContext(true);
  240 |     const email = generateEmail();
  241 | 
  242 |     const createRes = await createUser(api, generateUser(), email, generateAge());
  243 |     const bodyCreate = await createRes.json();
  244 |     console.log('User Created: ', bodyCreate);
  245 | 
  246 |     const updateRes = await updateUserStringAge(api, generateUser(), email, "55");
  247 |     const body = await updateRes.json();
  248 | 
  249 |     console.log('PUT Response:', body);
  250 |     console.log('Status Code:', updateRes.status());
  251 | 
  252 |     expect.soft(updateRes.status()).toBe(400);
  253 | 
  254 |     await deleteUser(api, body.email);
  255 |   });
  256 | 
  257 |   test('PUT - Update user without Email Header - Status 400', async () => {
  258 |     const api = await getRequestContext(true);
  259 |     const email = generateEmail();
  260 | 
  261 |     const createRes = await createUser(api, generateUser(), email, generateAge());
  262 |     const bodyCreate = await createRes.json();
  263 |     console.log('User Created: ', bodyCreate);
  264 | 
  265 |     const updateRes = await updateUserWithoutHeader(api, generateUser(), email, generateAge());
  266 |     const body = await updateRes.json();
  267 | 
  268 |     console.log('PUT Response:', body);
  269 |     console.log('Status Code:', updateRes.status());
  270 | 
  271 |     expect.soft(updateRes.status()).toBe(400);
  272 | 
  273 |     await deleteUser(api, body.email);
  274 |   });
  275 | 
  276 |   test('PUT - Update user without authentication - Status 401', async () => {
  277 |           const api = await request.newContext({
  278 |             baseURL: process.env.BASE_URL,
  279 |             extraHTTPHeaders: {
  280 |               'Content-Type': 'application/json'
  281 |             }
  282 |           });
  283 |           
  284 |           const email = generateEmail();
  285 |           await createUser(api, generateUser(), email, generateAge());
  286 |           const response = await updateUser(api, generateUser(), email, generateAge());
  287 |           const body = await response.json();
  288 |     
  289 |           console.log('POST Response:', body);
  290 |           console.log('Status Code:', response.status());
  291 |       
> 292 |           expect.soft(response.status()).toBe(401);
      |                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  293 |           deleteUser(api, body.email);
  294 |         });
  295 | 
  296 | });
```