import { userDao } from "../dao/user.dao.js";
import UserOutputDTO from '../dto/output/user.output.dto.js'
import UserInputDTO from '../dto/input/user.input.dto.js'

class UserRepository{
    constructor(dao){
        this.dao = dao
    }

    async getByEmail(email) {
        try {
            let response = await this.dao.getByEmail(email);
            return response
        } catch (e) {
            throw new Error(e);
        }
    }

    async getById(id) {
        try {
            let response = await this.dao.getById(id);
            return new UserOutputDTO(response)
        } catch (e) {
            throw new Error(e)
        }
    }

    async createUser(user){
        try {
            let userDto = new UserInputDTO(user)
            let response = await this.dao.createUser(userDto)
            return new UserOutputDTO(response)
        } catch (e) {
            throw new Error(e)
        }
    }

}

export const userRepository = new UserRepository(userDao)