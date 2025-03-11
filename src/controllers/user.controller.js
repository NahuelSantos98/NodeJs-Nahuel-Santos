import { userService } from "../services/user.service.js";

class UserController {
    constructor(service) {
        this.service = service;
        this.registerStrategyLocal = this.registerStrategyLocal.bind(this);
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.validationUserWithInfo = this.validationUserWithInfo.bind(this)
    }

    async registerStrategyLocal(req, res, next) {
        try {
            const user = await this.service.registerStrategyLocal(req.body);
            res.status(201).json({ status: 'success', payload: user });
        } catch (error) {
            console.error('Error en UserController:', error);
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const token = await this.service.login(req.body);
            res.cookie('jwt', token, { httpOnly: true }).json({ message: 'Logged in', token });
        } catch (error) {
            next(error);
        }
    };

    async validationUserWithInfo(req, res, next) {
        try {
            if (!req.user)
                throw new Error("Can not access to user info");
            console.log(req.user);
            

            let response = await this.service.validationUserWithInfo(req.user)
            if(!response) res.status(404).json({status:"Error", message: "User not validated"})
            
                res.json({user: response});
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie('jwt').json({ message: 'Logged out' });
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController(userService);
