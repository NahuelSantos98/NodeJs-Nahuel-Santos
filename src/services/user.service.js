import { userDao } from '../dao/user.dao.js';
import { createHash } from '../utils/configPassword.js';

class UserService {
    constructor(dao) {
        this.dao = dao;
    }

    async getByEmail(email) {
        try {
            let response = await this.dao.getByEmail(email);
            if (!response) throw new Error("User not found");
            return response
        } catch (error) {
            console.log('Error getByEmail service');
            throw new Error(error.message);
        }
    }

    async getById(id){
        try {
            let response = await this.dao.getById(id)
            if (!response) throw new Error("User not found");
            return response
        } catch (error) {
            console.log('Error getById service');
            throw new Error(error.message);
        }
    }


    async register({ first_name, last_name, email, age, password }) {
        try {
            let userExists = await this.dao.getByEmail(email);
            if (userExists) throw new Error('Email already in use.');

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
            };

            return await this.dao.create(newUser);
        } catch (error) {
            console.error('Error in register user service:', error);
            throw new Error(error.message);
        }
    }

}

export const userService = new UserService(userDao);
