import MongoDao from './mongo.dao.js';
import userModel from '../models/user.model.js';

class UserDao extends MongoDao {
    constructor() {
        super(userModel);
    }

    async getByEmail(email) {
        try {
            return await this.model.findOne({ email });
        } catch (error) {
            console.error('Error en getByEmail:', error);
            throw new Error("Error while obtaining the user");
        }
    }
    
    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error("Error while obtaining the user")
        }
    }

    async createUser(user){
        try {
            return await this.model.create(user);
        } catch (error) {
            throw new Error("Error while creating the user")
        }
    }

}

export const userDao = new UserDao();
