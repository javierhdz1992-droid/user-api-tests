import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


const validEnvs = ['dev', 'prod'];
const rawEnv = process.env.TEST_ENV?.trim().toLowerCase() ?? '';
const env = validEnvs.includes(rawEnv) ? rawEnv : 'prod';
process.env.TEST_ENV = env;

const envFile = path.resolve(__dirname, `.env.${env}`);
dotenv.config({ path: envFile, override: false });

export default defineConfig({
  testDir: './tests',
  
  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      Authentication: process.env.AUTH_TOKEN || 'mysecrettoken',
      'Content-Type': 'application/json'
    }
  },

  reporter: [
    ['list'],
    ['allure-playwright']
  ]
});
