import passport from 'passport';
import local from 'passport-local';
import { userService } from '../services/user.service.js';
import { createHash } from '../utils/configPassword.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        usernameField: 'email', 
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const { first_name, last_name, age } = req.body;

            if (!first_name || !last_name || !age || !email || !password) {
                return done(null, false, { message: "All fields are required" });
            }
            //Null pq no hay error tecnico del servidor, false pq no se registro el usuario, mensaje...
            
            let userExists = await userService.getByEmail(email);
            
            if (userExists) {
                return done(null, false, { message: 'Email already in use.' });
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
            };

            const user = await userService.register(newUser);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id); // Guarda solo el ID del usuario
    });

    // Deserializar usuario (recuperar el usuario de la base de datos por ID)
    passport.deserializeUser(async (id, done) => {
        let user = await userService.getById(id); // Busca el usuario por su ID
        done(null, user); // Devuelve el usuario completo a req.user
    });
};

export default initializePassport;
