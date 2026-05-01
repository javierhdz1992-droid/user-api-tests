import { request } from '@playwright/test';

export async function getRequestContext(withAuth: boolean = true) {
  return await request.newContext({
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: withAuth
      ? {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
        }
      : {
          'Content-Type': 'application/json'
        }
  });
}