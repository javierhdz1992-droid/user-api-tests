import { request, APIRequestContext } from '@playwright/test';

export async function getRequestContext(authenticated: boolean = true): Promise<APIRequestContext> {

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (authenticated) {
    if (!process.env.AUTH_TOKEN) {
      throw new Error('AUTH_TOKEN is not set. A .env file was not loaded or AUTH_TOKEN is missing.');
    }
    headers['Authentication'] = process.env.AUTH_TOKEN;
  }

  const baseURL = process.env.BASE_URL;
  if (!baseURL) {
    throw new Error('BASE_URL is not set. A .env file was not loaded or BASE_URL is missing.');
  }

  return await request.newContext({
    baseURL,
    extraHTTPHeaders: headers
  });
}