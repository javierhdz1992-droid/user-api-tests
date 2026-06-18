import { APIRequestContext } from "@playwright/test";
import { ENDPOINTS } from "../utils/endpoints";

export interface User {
    name?: string;
    email?: string;
    age?: number;
}

export class UserApi{
    constructor(private api: APIRequestContext) {}

    async createUser(user: User) {
        return await this.api.post(ENDPOINTS.USERS, {
            data: user
        });
    }

    async getAllUsers() {
        return await this.api.get(ENDPOINTS.USERS);
    }

    async getUserByEmail(email: string) {
        return await this.api.get(ENDPOINTS.userByEmail(email));
    }

    async getUserByName(name: string) {
        return await this.api.get(ENDPOINTS.userByName(name));
    }

    async getUserByAge(age: number) {
        return await this.api.get(ENDPOINTS.userByAge(age));
    }

    async updateUser(email: string, user: Partial<User>) {
        return await this.api.put(ENDPOINTS.userByEmail(email), {
            data: user
        });
    }

    async updateUserWithoutHeader(user: Partial<User>) {
        return await this.api.put(ENDPOINTS.USERS, {
            data: user
        });
    }

    async deleteUser(email: string) {
        return await this.api.delete(ENDPOINTS.userByEmail(email));
    }

    async deleteUserWithoutEmailHeader() {
        return await this.api.delete(ENDPOINTS.USERS);
    }
}