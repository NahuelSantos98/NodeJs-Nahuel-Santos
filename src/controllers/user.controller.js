import { userService } from "../services/user.service.js";

class UserController {
    constructor(service) {
        this.service = service;
        this.register = this.register.bind(this);
    }

    async register(req, res, next) {
        try {
            const user = await this.service.register(req.body);
            res.status(201).json({ status: 'success', data: user });
        } catch (error) {
            console.error('Error en UserController:', error);
            next(error);
        }
    }
}

export const userController = new UserController(userService);
