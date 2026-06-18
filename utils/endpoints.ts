export const ENDPOINTS = {
  USERS: 'users',
  userByEmail: (email: string) => `users/${encodeURIComponent(email)}`,
  userByName: (name: string) => `users/${encodeURIComponent(name)}`,
  userByAge: (age: number) => `users/${age}`
};