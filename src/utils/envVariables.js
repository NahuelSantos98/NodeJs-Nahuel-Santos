import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    db: process.env.URL_DB,
    keyCookie: process.env.COOKIE_KEY
}