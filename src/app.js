import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { __dirname } from './path.js';
import cors from 'cors'
import corsHandle from './utils/corsHandle.js';
import swaggerUI from 'swagger-ui-express';
import swaggerConfig from './swagger/swagger.js';
import { errorHandler } from './middlewares/error.middleware.js';
import initializePassport from './passport/passportConfig.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import router from './routes/publicRouter/index.routes.js';
import customRouter from './routes/customRouter/index.customRouter.js';
import env from './utils/envVariables.js'
import './utils/connectDB.js'

const app = express();
const PORT = env.port || 8000;
const hdbs = create();

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}/`);
});

app.use(express.json());

app.use(cors({
    origin: corsHandle,
    credentials: true
}));

//Session se necesita para autenticación.
app.use(session({
    secret: process.env.COOKIE_KEY,
    store: MongoStore.create({
        mongoUrl: process.env.URL_DB,
        ttl: 60 * 60,
        crypto: {
            secret: process.env.COOKIE_KEY
        }
    }),
    cookie: { 
        maxAge: 60 * 60 * 1000, 
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false, 
}));

//Passport = para registrarse
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Cookie parser
app.use(cookieParser(process.env.COOKIE_KEY));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hdbs.engine);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/api', router);
app.use('/custom', customRouter);


app.use(errorHandler);

