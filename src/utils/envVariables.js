import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    db: process.env.URL_DB,
    keyCookie: process.env.COOKIE_KEY,
    emailHost: process.env.EMAIL_HOST,
    emailPort: Number(process.env.EMAIL_PORT),
    emailName: process.env.EMAIL_NAME,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS
}
